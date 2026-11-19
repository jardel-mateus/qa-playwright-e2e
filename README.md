# qa-playwright-e2e

[![testes](https://github.com/jardel-mateus/qa-playwright-e2e/actions/workflows/testes.yml/badge.svg)](https://github.com/jardel-mateus/qa-playwright-e2e/actions/workflows/testes.yml)

Testes E2E do [Sauce Demo](https://www.saucedemo.com) (loja de exemplo) com Playwright e TypeScript.

Relatório da última execução: https://jardel-mateus.github.io/qa-playwright-e2e/

## O que é testado

- **Login:** usuário válido, usuário bloqueado, senha errada, campos obrigatórios, acesso sem login e logout
- **Produtos e carrinho:** listagem, ordenação por preço e nome, adicionar/remover e carrinho depois do reload
- **Checkout:** compra completa, cálculo do total (subtotal + taxa) e validação do formulário
- **Bugs conhecidos:** o site tem usuários com defeitos de propósito. Deixei os testes documentando cada bug com `test.fail`, então se alguém corrigir o teste avisa

Roda em desktop (Chrome) e mobile (Pixel 7).

## Estrutura

```
pages/   page objects (Login, Inventory, Checkout)
tests/   specs
```

## Rodando

```bash
npm ci
npx playwright install chromium
npm test
npm run report
```

O GitHub Actions roda a cada push e todo dia útil de manhã, e publica o relatório HTML no GitHub Pages.
