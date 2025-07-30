# Painel GLPI - TI

Este projeto foi desenvolvido para exibir de forma visual e organizada os chamados do GLPI diretamente em uma TV no setor de TI. Criado com **React + TypeScript**, o painel consome os dados da **API REST do GLPI**, exibindo os chamados em tempo real com categorizacão e filtros visuais.

## 📊 Funcionalidades

* Conecta na API REST do GLPI usando tokens armazenados via `.env`
* Exibe chamados abertos, pendentes e finalizados
* Layout responsivo para visualização em telas grandes (TV)
* Filtros por título, solicitante, técnico, categoria etc.
* Alternação entre visualização em **cards** e **tabela**
* Atualização periódica dos chamados (configurável)

## 📚 Tecnologias Utilizadas

* [React](https://reactjs.org/) + [TypeScript](https://www.typescriptlang.org/)
* [Vite](https://vitejs.dev/) para build e desenvolvimento
* [Tailwind CSS](https://tailwindcss.com/) para estilização
* [GLPI REST API](https://glpi-developer-documentation.readthedocs.io/) para integração
* [Lucide](https://lucide.dev/) para os ícones

## ⚙️ Como Executar Localmente

1. Clone o repositório:

```bash
git clone https://github.com/LuizBonato/Painel-glpi.git
```

2. Instale as dependências:

```bash
npm install
```

3. Configure o arquivo `.env` na raiz do projeto com os dados da API do GLPI:

```env
VITE_GLPI_API_URL=http://seu-glpi/apirest.php
VITE_GLPI_APP_TOKEN=seu_token_da_aplicacao
VITE_GLPI_USER_TOKEN=seu_token_de_usuario
```

4. Rode o projeto:

```bash
npm run dev
```

## ✨ Ideias Futuras

* Divisão automática por setores (infra, Sistemas, Suporte)
* Indicadores de desempenho (tempo médio de atendimento)
* Alerta visual para chamados com mais de X dias
* Autenticação de perfil (gestor, técnico, analista)

## 🚀 Objetivo do Projeto

Esse painel foi idealizado para otimizar a visualização dos chamados, evitando a necessidade de acessar diretamente o GLPI. A interface limpa e objetiva melhora o acompanhamento da equipe e fornece transparência para os gestores.

---

Desenvolvido por Luiz Eduardo Bonato - Estagiário de Infraestrutura e Desenvolvedor em formação com foco em automações e backend com JavaScript/Node.js.
