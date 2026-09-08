# ClimaAgora 🌤️

## Autor

**Nícolas de Vasconcelos Mota Silva** — RA 22308074

## Descrição

O ClimaAgora é uma aplicação web desenvolvida para consultar informações meteorológicas de diferentes cidades. O usuário informa o nome de uma cidade e a aplicação realiza uma consulta a uma API pública para apresentar os dados do clima de forma simples, organizada e fácil de visualizar.

## API utilizada

A aplicação utiliza a **Open-Meteo**, uma API pública de dados meteorológicos que não exige chave de autenticação.

* **API:** Open-Meteo
* **Documentação:** https://open-meteo.com/en/docs
* **API de geocodificação:** https://geocoding-api.open-meteo.com/
* **API de previsão:** https://api.open-meteo.com/

### Endpoints consumidos

**Busca de localização:**

```text
https://geocoding-api.open-meteo.com/v1/search
```

Utilizado para encontrar a cidade e obter informações como nome, país, latitude, longitude e fuso horário.

**Previsão meteorológica:**

```text
https://api.open-meteo.com/v1/forecast
```

Utilizado para obter informações atuais do clima, como temperatura, sensação térmica, umidade, velocidade do vento e código meteorológico.

## Funcionalidades

* 🔎 Busca de cidades pelo nome.
* 🌡️ Consulta da temperatura atual.
* 🌡️ Exibição da sensação térmica.
* 💧 Exibição da umidade relativa do ar.
* 💨 Exibição da velocidade do vento.
* ☁️ Identificação da condição meteorológica.
* 📍 Exibição da cidade e do país.
* 🕐 Exibição do fuso horário da localização.
* ⏳ Mensagem de carregamento durante a consulta.
* ❌ Tratamento de erros para cidades inexistentes ou problemas na API.
* 📱 Interface adaptada para dispositivos móveis.
* ⌨️ Possibilidade de realizar a busca pressionando a tecla Enter.

## Tecnologias utilizadas

* HTML5
* CSS3
* JavaScript
* Fetch API
* Open-Meteo API
* Git
* GitHub
* GitHub Pages

## Como executar localmente

1. Clone o repositório:

```bash
git clone https://github.com/NicolasMota2025/ClimaAgora.git
```

2. Acesse a pasta do projeto:

```bash
cd ClimaAgora
```

3. Abra o arquivo `index.html` em um navegador.

Também é possível utilizar a extensão **Live Server** no Visual Studio Code ou outro servidor local para executar a aplicação.

## Estrutura do projeto

```text
ClimaAgora/
│
├── index.html
├── style.css
├── script.js
└── README.md
```

## Links

* **Aplicação no ar (GitHub Pages):** https://nicolasmota2025.github.io/ClimaAgora/
* **Repositório no GitHub:** https://github.com/NicolasMota2025/ClimaAgora

## Observações

Este projeto foi desenvolvido como parte da atividade **Bootcamp II — Etapa 01 — Desafio Individual**, com o objetivo de desenvolver uma aplicação frontend capaz de consumir uma API pública, manipular dados em formato JSON, utilizar requisições assíncronas com `fetch` e realizar a publicação da aplicação utilizando o GitHub Pages.
