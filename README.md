# ClimaAgora 🌤️ — Bootcamp II, Etapa 03

## Integrantes

| Nome | Matrícula | GitHub | Funcionalidade pela qual foi responsável | Principal PR |
|---|---|---|---|---|
| Nícolas de Vasconcelos Mota Silva | 22308074 | [NicolasMota2025](https://github.com/NicolasMota2025) | Implementação dos testes automatizados, modularização da interpretação das condições climáticas e configuração do pipeline de integração contínua (CI). | [PR #1](https://github.com/NicolasMota2025/ClimaAgora/pull/1) |
| Pedro Henrique Lima Postay | 22308711 | [pedro-postay](https://github.com/pedro-postay) | Revisão do código, análise dos testes automatizados e integração das alterações na branch principal após a revisão do Pull Request. | [PR #1](https://github.com/NicolasMota2025/ClimaAgora/pull/1) |

## 1. Descrição do projeto

O **ClimaAgora** é uma aplicação web que permite consultar informações meteorológicas de diferentes cidades por meio da API Open-Meteo. O sistema apresenta informações sobre as condições climáticas e permite salvar cidades favoritas em um banco de dados.

Nesta etapa do Bootcamp II, o projeto recebeu testes automatizados utilizando o Node.js, integração contínua com GitHub Actions e atualização da imagem Docker disponibilizada no Docker Hub.

## 2. Funcionalidades

- Consulta das condições meteorológicas de diferentes cidades.
- Exibição de temperatura, sensação térmica, umidade e velocidade do vento.
- Identificação das condições climáticas por meio dos códigos meteorológicos.
- Consulta de informações utilizando a API Open-Meteo.
- Salvamento de cidades favoritas no banco de dados Supabase.
- Testes automatizados para verificar a interpretação das condições climáticas.
- Execução automática dos testes por meio do GitHub Actions em eventos de Pull Request e atualização da branch principal.
- Disponibilização da aplicação por meio de uma imagem Docker.

## 3. Tecnologias utilizadas

- **HTML5:** estrutura da aplicação.
- **CSS3:** estilização e layout.
- **JavaScript:** funcionalidades e integração com as APIs.
- **Node.js:** execução dos testes automatizados.
- **Node.js Test Runner:** execução dos testes utilizando o módulo nativo `node:test`.
- **Open-Meteo API:** consulta de dados meteorológicos.
- **Supabase:** banco de dados PostgreSQL utilizado para armazenar as cidades favoritas.
- **Git e GitHub:** versionamento e colaboração.
- **GitHub Actions:** automação dos testes e integração contínua.
- **Docker:** empacotamento e execução da aplicação.
- **Nginx:** servidor web utilizado na imagem Docker.

## 4. Links do projeto

- **Repositório GitHub:** https://github.com/NicolasMota2025/ClimaAgora
- **Aplicação publicada no GitHub Pages:** https://nicolasmota2025.github.io/ClimaAgora/
- **Imagem Docker Hub:** https://hub.docker.com/r/nicolasmotaa/bootcamp2-app
- **Pull Request da implementação dos testes:** https://github.com/NicolasMota2025/ClimaAgora/pull/1

## 5. APIs e banco de dados

### Open-Meteo

A aplicação utiliza a API Open-Meteo para obter informações meteorológicas das cidades pesquisadas.

- **Geocoding API:** https://geocoding-api.open-meteo.com/
- **Forecast API:** https://api.open-meteo.com/

### Supabase

O Supabase é utilizado como banco de dados PostgreSQL para armazenar as cidades favoritas dos usuários.

A tabela `favoritos` é utilizada para persistir as cidades salvas pela aplicação.

A aplicação utiliza as credenciais públicas apropriadas para acesso pelo frontend, com as permissões controladas pelas políticas de segurança configuradas no Supabase.

## 6. Como executar localmente

### Pré-requisitos

- Git instalado.
- Node.js instalado.
- Python instalado, para utilizar o servidor HTTP local, ou outro servidor web estático.

### Clonar o repositório

```bash
git clone https://github.com/NicolasMota2025/ClimaAgora.git
cd ClimaAgora
```

### Instalar as dependências

```bash
npm install
```

### Executar os testes automatizados

```bash
npm test
```

O comando executa os testes definidos no arquivo `clima.test.js`.

### Executar a aplicação

Na pasta do projeto, execute:

```bash
python -m http.server 8000
```

Em seguida, acesse:

http://localhost:8000

Caso o comando `python` não esteja disponível, tente:

```bash
py -m http.server 8000
```

## 7. Testes automatizados

Os testes automatizados foram implementados no arquivo `clima.test.js`, utilizando os módulos nativos `node:test` e `node:assert/strict`.

São verificados os seguintes cenários:

| Teste | Resultado esperado |
|---|---|
| Código meteorológico `0` | Retorna `Céu limpo`. |
| Código meteorológico `61` | Retorna `Chuva leve`. |
| Código meteorológico desconhecido (`999`) | Retorna `Condição desconhecida`. |

Para executar os testes, utilize:

```bash
npm test
```

## 8. Integração contínua com GitHub Actions

O projeto utiliza GitHub Actions para executar os testes automatizados em um ambiente Ubuntu com Node.js 20.

O workflow está localizado em:

`.github/workflows/ci.yml`

A execução ocorre nos seguintes eventos:

- Abertura ou atualização de Pull Requests destinados à branch `main`.
- Envio de alterações diretamente para a branch `main`.

O pipeline realiza as seguintes etapas:

1. Obtém o código do repositório.
2. Configura o ambiente Node.js.
3. Instala as dependências.
4. Executa os testes automatizados com `npm test`.

A verificação de CI utiliza o job `testes`. Foi configurada uma regra de proteção para a branch `main`, incluindo a verificação de status correspondente.

**Pull Request relacionado:** [PR #1 — Testes automatizados e configuração de CI](https://github.com/NicolasMota2025/ClimaAgora/pull/1).

## 9. Execução com Docker

A aplicação está disponível no Docker Hub por meio da imagem:

`nicolasmotaa/bootcamp2-app:latest`

### Baixar a imagem

```bash
docker pull nicolasmotaa/bootcamp2-app:latest
```

### Executar o container

```bash
docker run --rm -d -p 8080:80 --name climaagora nicolasmotaa/bootcamp2-app:latest
```

Acesse a aplicação em:

http://localhost:8080

### Parar o container

```bash
docker stop climaagora
```

### Construir a imagem localmente

Na pasta do projeto, execute:

```bash
docker build -t nicolasmotaa/bootcamp2-app:latest .
```

### Publicar a imagem no Docker Hub

Após autenticar no Docker Hub, execute:

```bash
docker push nicolasmotaa/bootcamp2-app:latest
```

O Dockerfile utiliza a imagem `nginx:alpine` e copia os arquivos necessários para o diretório público do Nginx.

## 10. Colaboração e revisão de código

O desenvolvimento foi organizado utilizando Git e GitHub, com alterações submetidas por meio de Pull Request.

O Pull Request relacionado aos testes automatizados foi revisado e posteriormente integrado à branch principal.

- **Pull Request:** [PR #1](https://github.com/NicolasMota2025/ClimaAgora/pull/1)
- **Branch principal:** `main`
- **Verificação automatizada:** GitHub Actions — job `testes`

A branch principal possui uma regra de proteção configurada para exigir a verificação de status selecionada.

## 11. Evidências da entrega

As evidências devem corresponder aos acontecimentos reais do desenvolvimento e podem ser adicionadas abaixo.

### Testes automatizados

Inserir, se solicitado, uma captura de tela do terminal mostrando a execução de `npm test` com os três testes aprovados.

### GitHub Actions

Consultar a execução do workflow no repositório:

https://github.com/NicolasMota2025/ClimaAgora/actions

### Pull Request

Consultar o Pull Request utilizado para integrar as alterações:

https://github.com/NicolasMota2025/ClimaAgora/pull/1

### Docker Hub

Consultar a imagem publicada:

https://hub.docker.com/r/nicolasmotaa/bootcamp2-app

### Tentativa de merge bloqueada por falha nos testes

Caso tenha ocorrido uma tentativa de merge bloqueada pela falha de uma verificação obrigatória, adicionar uma captura de tela que demonstre o bloqueio e o resultado da execução.

Se isso não aconteceu, não declarar que ocorreu nem apresentar uma captura de tela simulada.

### Resolução de conflitos de merge

Caso tenha ocorrido um conflito de merge, descrever o conflito, explicar como foi resolvido e adicionar a evidência correspondente.

Se não houve conflito durante o desenvolvimento, informar isso de maneira transparente e verificar com o professor como atender à exigência de evidência.

## 12. Conclusão

A Etapa 03 do Bootcamp II ampliou o projeto ClimaAgora com testes automatizados, integração contínua e disponibilização da aplicação por meio do Docker Hub.

Essas melhorias contribuem para a verificação do comportamento do código, a identificação de problemas durante as alterações e a distribuição da aplicação em um ambiente padronizado.

O projeto continua utilizando a API Open-Meteo para consulta meteorológica e o Supabase para persistência das cidades favoritas.

Documentação revisada para a entrega da Etapa 03.
