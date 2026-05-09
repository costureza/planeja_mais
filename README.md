
# Planeja+ — Consumo Inteligente (Consumer Insight Intelligence)
Sobre o Projeto

O Planeja+ é um sistema web inteligente voltado à análise de padrões de consumo financeiro, desenvolvido para identificar hábitos de gastos, classificar despesas por categorias e gerar insights automáticos que auxiliem o usuário na tomada de decisões financeiras de forma mais consciente e estratégica.

A aplicação foi desenvolvida utilizando React e JavaScript, com foco em visualização de dados, processamento dinâmico de informações financeiras e experiência intuitiva para o usuário.

# Objetivo do Projeto

Desenvolver uma aplicação frontend capaz de:

- Simular dados financeiros e de consumo;
- Processar informações dinamicamente;
- Classificar gastos automaticamente;
- Gerar insights automáticos;
- Exibir dashboards e gráficos interativos;
- Auxiliar usuários na compreensão dos seus hábitos financeiros.




## Funcionalidades

- Classificação de gastos por categoria:
    - Alimentação
    - Lazer
    - Transporte
    - Saúde
    - Educação
    - Moradia
    - Outros
- Identificação de categorias dominantes;
- Geração de insights financeiros automáticos;
- Dashboard interativo;
- Gráficos e estatísticas;
- Planejamento financeiro inteligente.

## Interface e Experiência

- Interface responsiva;
- Navegação intuitiva;
- Componentização React;
- Visualização dinâmica de dados;
- Organização escalável da aplicação.

## Arquitetura da Solução
### Entrada de Dados
- Dados financeiros simulados via JSON;
- APIs públicas ou dados mockados;
- Informações de consumo do usuário.
## Processamento
 - Classificação automática de gastos;
 - Cálculo de padrões financeiros;
 - Processamento de insights;
 - Identificação das categorias dominantes;
 - Gerenciamento global de estado utilizando Context API/useReducer.
## Saída
- Dashboard interativo;
- Gráficos financeiros;
- Insights personalizados;
- Estatísticas de consumo;
- Recomendações de planejamento financeiro.

![Logo](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/th5xamgrr6se0x5ro4g6.png)


## Tecnologias Utilizadas
- React
- JavaScript
- Context API
- useReducer
- Axios
- SCSS/SASS
- Chart.js
- React ChartJS 2
- React Icons
- Figma
## Bibliotecas Necessárias

Para o perfeito funcionamento do projeto, é necessário utilizar o Yarn como gerenciador de pacotes e instalar as seguintes bibliotecas:

```bash
  git clone https://github.com/costureza/planeja_mais.git
```

Instale as dependências

```bash
  yarn 
  yarn add chart.js react-chartjs-2
  yarn add react-icons sass
```

Execute o projeto

```bash
  yarn start
```


## Estrutura do Projeto

## 📂 Estrutura de Pastas

```text
planeja-mais-app/
├── public/
├── src/
│   ├── charts/
│   │   └── GastosPorCategoriaChart.js
│   ├── components/
│   │   ├── FinanceHealthChart.js
│   │   ├── Login.js
│   │   ├── Login.module.scss
│   │   ├── Navbar.js
│   │   └── Navbar.module.scss
│   ├── context/
│   │   ├── FinanceiroContext.js
│   │   ├── financeiroLogic.js
│   │   ├── financeiroLogic.test.js
│   │   └── PlanejamentoContext.js
│   ├── mocks/
│   │   └── consumoMock.js
│   ├── pages/
│   │   ├── Analise.js
│   │   ├── Analise.module.scss
│   │   ├── ForgotPassword.js
│   │   ├── ForgotPassword.module.scss
│   │   ├── Planejamento.js
│   │   ├── Planejamento.module.scss
│   │   ├── Register.js
│   │   ├── Register.module.scss
│   │   ├── Resumo.js
│   │   └── Resumo.module.scss
│   ├── services/
│   │   ├── api.js
│   │   └── consumoService.js
│   ├── App.js
│   ├── App.css
│   ├── index.js
│   ├── index.css
│   ├── reportWebVitals.js
│   └── setupTests.js
├── package.json
├── yarn.lock
└── README.md



## Organização da Equipe



| Integrante                      | Responsabilidade                                        |
| ------------------------------- | ------------------------------------------------------- |
| Maria Rosa Chagas Lima  [@costureza](https://www.github.com/costureza)        | UI/UX Design, prototipação no Figma e identidade visual |
| Tatiane da Cruz Ferreira  [@Tatiferr](https://www.github.com/Tatiferr)        | Estruturação do projeto React, componentes e roteamento |
| Mariana Alexandre Alves Amorim  [@marialexandre](https://www.github.com/marialexandre)  | Implementação dos gráficos e dashboards                 |
| Nankin Zane Teixeira Melo Sales  [@kimzanee](https://www.github.com/kimzanee) | Integração de APIs externas e mocks financeiros         |
| Ana Paula de Souza Menezes  [@menezessanapaula](https://www.github.com/menezessanapaula)      | Gerenciamento de estado e geração de insights           |

## 📱 Protótipo

O design da interface foi focado na experiência do usuário (UX) e segue as diretrizes de acessibilidade.

*   **Link do Projeto:** [![Figma](https://img.shields.io/badge/Figma-F24E1E?style=for-the-badge&logo=figma&logoColor=white)](https://www.figma.com/design/0ghUUYUQMqOlJJtPjisgX4/planeja-?node-id=0-1&t=CmZlBCPOPrej4sEp-1)
*   **Status:** Concluído / Em Iteração

