# ClimaAgora 🌤️ — Bootcamp II, Etapa 02

## Autor

**Nícolas de Vasconcelos Mota Silva** — RA 22308074

## Descrição

O ClimaAgora é uma aplicação web que permite consultar informações meteorológicas de diferentes cidades por meio da API Open-Meteo. A aplicação também possui uma funcionalidade de favoritos com persistência de dados utilizando o Supabase e pode ser executada em um container Docker.

## APIs e serviços utilizados

- **Open-Meteo:** consulta de dados meteorológicos.
- **Supabase:** banco de dados PostgreSQL utilizado para persistir os favoritos.
- **Docker:** criação e execução da aplicação em container.
- **Docker Hub:** publicação da imagem Docker.
- **GitHub Pages:** publicação da aplicação web.

## Funcionalidades

- Busca de cidades pelo nome.
- Consulta de temperatura, sensação térmica, umidade e velocidade do vento.
- Exibição da condição meteorológica, país e fuso horário.
- Salvamento e listagem de cidades favoritas.
- Persistência dos favoritos no Supabase.
- Tratamento de erros durante as consultas.
- Interface responsiva.
- Execução da aplicação utilizando Docker.

## Tecnologias utilizadas

- HTML5
- CSS3
- JavaScript
- Fetch API
- Open-Meteo API
- Supabase
- Docker
- Git e GitHub

## Como executar com Docker

Execute:

```bash
docker run -d -p 8080:80 --name climaagora nicolasmotaa/bootcamp2-app:latest
```

Depois, acesse http://localhost:8080.

## Links

- **GitHub Pages:** https://nicolasmota2025.github.io/ClimaAgora/
- **Repositório GitHub:** https://github.com/NicolasMota2025/ClimaAgora
- **Docker Hub:** https://hub.docker.com/r/nicolasmotaa/bootcamp2-app

## Observações

Este projeto foi desenvolvido no Bootcamp II do CEUB, evoluindo a aplicação inicial de consulta meteorológica com a integração de persistência de favoritos e execução por meio de containers Docker.
