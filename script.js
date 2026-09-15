import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const SUPABASE_URL = "https://cwdjzpybvfdiqpyeqyab.supabase.co";
const SUPABASE_ANON_KEY = "sb_publishable_su3UDM48PooIPXWVItHM2Q_kRYDVboQ";

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

const campoCidade = document.getElementById("campo-cidade");
const botaoBuscar = document.getElementById("botao-buscar");
const resultado = document.getElementById("resultado");
const mensagem = document.getElementById("mensagem");
const favoritosContainer = document.getElementById("favoritos");

let cidadeAtual = null;

botaoBuscar.addEventListener("click", () => {
    const cidade = campoCidade.value.trim();

    if (!cidade) {
        mostrarErro("Digite o nome de uma cidade.");
        return;
    }

    buscarClima(cidade);
});

campoCidade.addEventListener("keypress", (evento) => {
    if (evento.key === "Enter") {
        const cidade = campoCidade.value.trim();

        if (!cidade) {
            mostrarErro("Digite o nome de uma cidade.");
            return;
        }

        buscarClima(cidade);
    }
});

async function buscarClima(cidade) {
    mostrarCarregando();

    try {
        const respostaCidade = await fetch(
            `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(cidade)}&count=1&language=pt&format=json`
        );

        if (!respostaCidade.ok) {
            throw new Error("Erro ao buscar a cidade.");
        }

        const dadosCidade = await respostaCidade.json();

        if (!dadosCidade.results || dadosCidade.results.length === 0) {
            throw new Error("Cidade não encontrada.");
        }

        const local = dadosCidade.results[0];

        const nomeCidade = local.name;
        const pais = local.country;
        const latitude = local.latitude;
        const longitude = local.longitude;
        const timezone = local.timezone;

        const respostaClima = await fetch(
            `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,apparent_temperature,relative_humidity_2m,wind_speed_10m,weather_code&timezone=auto`
        );

        if (!respostaClima.ok) {
            throw new Error("Erro ao consultar o clima.");
        }

        const dadosClima = await respostaClima.json();
        const climaAtual = dadosClima.current;

        const temperatura = climaAtual.temperature_2m;
        const sensacao = climaAtual.apparent_temperature;
        const umidade = climaAtual.relative_humidity_2m;
        const vento = climaAtual.wind_speed_10m;
        const codigoTempo = climaAtual.weather_code;

        const condicao = interpretarClima(codigoTempo);

        cidadeAtual = {
            nome: nomeCidade,
            pais: pais,
            latitude: latitude,
            longitude: longitude,
            timezone: timezone,
            temperatura: temperatura,
            sensacao: sensacao,
            umidade: umidade,
            vento: vento,
            condicao: condicao
        };

        resultado.innerHTML = `
            <div class="cidade">
                <h2>📍 ${nomeCidade}</h2>
                <p>${pais} • Fuso horário: ${timezone}</p>
            </div>

            <div class="temperatura">
                <div class="valor">${temperatura}°C</div>
                <div class="condicao">${condicao}</div>
            </div>

            <div class="info-grid">

                <div class="info-card">
                    <div class="icone">🌡️</div>
                    <div class="titulo">Sensação térmica</div>
                    <div class="valor">${sensacao}°C</div>
                </div>

                <div class="info-card">
                    <div class="icone">💧</div>
                    <div class="titulo">Umidade</div>
                    <div class="valor">${umidade}%</div>
                </div>

                <div class="info-card">
                    <div class="icone">💨</div>
                    <div class="titulo">Velocidade do vento</div>
                    <div class="valor">${vento} km/h</div>
                </div>

                <div class="info-card">
                    <div class="icone">☁️</div>
                    <div class="titulo">Condição</div>
                    <div class="valor">${condicao}</div>
                </div>

            </div>

            <div class="favoritar-area">
                <button id="botao-favoritar" class="botao-favoritar">
                    ⭐ Favoritar cidade
                </button>
            </div>
        `;

        mensagem.textContent = "";

        document
            .getElementById("botao-favoritar")
            .addEventListener("click", salvarCidadeFavorita);

    } catch (erro) {
        console.error(erro);

        mostrarErro(
            "Ops! Não conseguimos encontrar essa cidade ou consultar o clima."
        );
    }
}

async function salvarCidadeFavorita() {
    if (!cidadeAtual) {
        mostrarErro("Nenhuma cidade foi pesquisada.");
        return;
    }

    try {
        const { data: existente, error: erroBusca } = await supabase
            .from("favoritos")
            .select("id")
            .eq("nome_item", cidadeAtual.nome)
            .maybeSingle();

        if (erroBusca) {
            throw erroBusca;
        }

        if (existente) {
            mensagem.textContent = "⭐ Essa cidade já está nos seus favoritos.";
            return;
        }

        const { error } = await supabase
            .from("favoritos")
            .insert({
                nome_item: cidadeAtual.nome,
                dados_extra: cidadeAtual
            });

        if (error) {
            throw error;
        }

        mensagem.textContent =
            `✅ ${cidadeAtual.nome} foi adicionada aos favoritos!`;

        listarFavoritos();

    } catch (erro) {
        console.error(erro);

        mostrarErro(
            "Não foi possível salvar essa cidade nos favoritos."
        );
    }
}

async function listarFavoritos() {
    favoritosContainer.innerHTML = `
        <div class="carregando">
            ⏳ Carregando favoritos...
        </div>
    `;

    try {
        const { data, error } = await supabase
            .from("favoritos")
            .select("*")
            .order("criado_em", {
                ascending: false
            });

        if (error) {
            throw error;
        }

        if (!data || data.length === 0) {
            favoritosContainer.innerHTML = `
                <div class="sem-favoritos">
                    <p>⭐ Você ainda não possui cidades favoritas.</p>
                </div>
            `;

            return;
        }

        favoritosContainer.innerHTML = "";

        data.forEach((favorito) => {
            const dados = favorito.dados_extra || {};

            const card = document.createElement("div");

            card.className = "favorito-card";

            card.innerHTML = `
                <div class="favorito-info">
                    <h3>📍 ${favorito.nome_item}</h3>

                    <p>
                        ${dados.pais || "País não informado"}
                    </p>

                    ${
                        dados.temperatura !== undefined
                            ? `<span>🌡️ ${dados.temperatura}°C</span>`
                            : ""
                    }

                    ${
                        dados.condicao
                            ? `<span>☁️ ${dados.condicao}</span>`
                            : ""
                    }
                </div>

                <div class="favorito-acoes">

                    <button
                        class="botao-carregar"
                        data-id="${favorito.id}"
                    >
                        🔎 Consultar
                    </button>

                    <button
                        class="botao-excluir"
                        data-id="${favorito.id}"
                    >
                        🗑️ Excluir
                    </button>

                </div>
            `;

            const botaoCarregar =
                card.querySelector(".botao-carregar");

            botaoCarregar.addEventListener("click", () => {
                buscarClima(favorito.nome_item);

                window.scrollTo({
                    top: 0,
                    behavior: "smooth"
                });
            });

            const botaoExcluir =
                card.querySelector(".botao-excluir");

            botaoExcluir.addEventListener("click", () => {
                removerFavorito(favorito.id);
            });

            favoritosContainer.appendChild(card);
        });

    } catch (erro) {
        console.error(erro);

        favoritosContainer.innerHTML = `
            <div class="erro">
                ❌ Não foi possível carregar seus favoritos.
            </div>
        `;
    }
}

async function removerFavorito(id) {
    const confirmou = confirm(
        "Deseja realmente excluir esta cidade dos favoritos?"
    );

    if (!confirmou) {
        return;
    }

    try {
        const { error } = await supabase
            .from("favoritos")
            .delete()
            .eq("id", id);

        if (error) {
            throw error;
        }

        mensagem.textContent =
            "✅ Cidade removida dos favoritos.";

        listarFavoritos();

    } catch (erro) {
        console.error(erro);

        mostrarErro(
            "Não foi possível excluir essa cidade."
        );
    }
}

function mostrarCarregando() {
    mensagem.textContent = "";

    resultado.innerHTML = `
        <div class="carregando">
            ⏳ Consultando informações do clima...
        </div>
    `;
}

function mostrarErro(texto) {
    resultado.innerHTML = `
        <div class="erro">
            ❌ ${texto}
        </div>
    `;

    mensagem.textContent = "";
}

function interpretarClima(codigo) {
    const condicoes = {
        0: "Céu limpo",
        1: "Principalmente limpo",
        2: "Parcialmente nublado",
        3: "Nublado",
        45: "Neblina",
        48: "Neblina com geada",
        51: "Garoa leve",
        53: "Garoa moderada",
        55: "Garoa intensa",
        61: "Chuva leve",
        63: "Chuva moderada",
        65: "Chuva forte",
        71: "Neve leve",
        73: "Neve moderada",
        75: "Neve forte",
        80: "Pancadas de chuva leves",
        81: "Pancadas de chuva moderadas",
        82: "Pancadas de chuva fortes",
        95: "Trovoada",
        96: "Trovoada com granizo",
        99: "Trovoada com granizo forte"
    };

    return condicoes[codigo] || "Condição desconhecida";
}

listarFavoritos();