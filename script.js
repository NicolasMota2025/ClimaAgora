```javascript
const campoCidade = document.getElementById("campo-cidade");
const botaoBuscar = document.getElementById("botao-buscar");
const resultado = document.getElementById("resultado");
const mensagem = document.getElementById("mensagem");


// Quando o usuário clicar no botão
botaoBuscar.addEventListener("click", () => {
    const cidade = campoCidade.value.trim();

    if (!cidade) {
        mostrarErro("Digite o nome de uma cidade.");
        return;
    }

    buscarClima(cidade);
});


// Permite apertar ENTER para pesquisar
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


// Função principal
async function buscarClima(cidade) {

    mostrarCarregando();

    try {

        // 1. Busca a cidade na API de geocodificação
        const respostaCidade = await fetch(
            `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(cidade)}&count=1&language=pt&format=json`
        );

        if (!respostaCidade.ok) {
            throw new Error("Erro ao buscar a cidade.");
        }

        const dadosCidade = await respostaCidade.json();

        // Verifica se encontrou a cidade
        if (!dadosCidade.results || dadosCidade.results.length === 0) {
            throw new Error("Cidade não encontrada.");
        }

        const local = dadosCidade.results[0];

        const nomeCidade = local.name;
        const pais = local.country;
        const latitude = local.latitude;
        const longitude = local.longitude;
        const timezone = local.timezone;


        // 2. Busca o clima usando latitude e longitude
        const respostaClima = await fetch(
            `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,apparent_temperature,relative_humidity_2m,wind_speed_10m,weather_code&timezone=auto`
        );

        if (!respostaClima.ok) {
            throw new Error("Erro ao consultar o clima.");
        }

        const dadosClima = await respostaClima.json();

        const climaAtual = dadosClima.current;


        // 3. Extrai os dados do JSON
        const temperatura = climaAtual.temperature_2m;
        const sensacao = climaAtual.apparent_temperature;
        const umidade = climaAtual.relative_humidity_2m;
        const vento = climaAtual.wind_speed_10m;
        const codigoTempo = climaAtual.weather_code;


        // 4. Converte o código do tempo para texto
        const condicao = interpretarClima(codigoTempo);


        // 5. Exibe os dados na tela
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
        `;

        mensagem.textContent = "";

    } catch (erro) {

        console.error(erro);

        mostrarErro(
            "Ops! Não conseguimos encontrar essa cidade ou consultar o clima. Tente novamente."
        );
    }
}


// Mostra mensagem de carregamento
function mostrarCarregando() {

    mensagem.textContent = "";

    resultado.innerHTML = `
        <div class="carregando">
            ⏳ Consultando informações do clima...
        </div>
    `;
}


// Mostra mensagem de erro
function mostrarErro(texto) {

    resultado.innerHTML = `
        <div class="erro">
            ❌ ${texto}
        </div>
    `;

    mensagem.textContent = "";
}


// Traduz os códigos meteorológicos
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
```
