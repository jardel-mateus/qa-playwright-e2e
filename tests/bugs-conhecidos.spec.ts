import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { InventoryPage } from '../pages/InventoryPage';

// o saucedemo tem usuarios com bugs de proposito, esses testes documentam os defeitos
test.describe('Bugs conhecidos', () => {
  test('problem_user: todas as imagens dos produtos sao iguais', async ({ page }) => {
    test.fail(true, 'BUG-01: imagens trocadas pro problem_user');
    const login = new LoginPage(page);
    await login.open();
    await login.login('problem_user');
    const srcs = await page.locator('.inventory_item_img img').evaluateAll(imgs => imgs.map(i => i.getAttribute('src')));
    expect(new Set(srcs).size).toBe(srcs.length);
  });

  test('error_user: botao remover nao funciona em alguns itens', async ({ page }) => {
    test.fail(true, 'BUG-02: remover do inventario falha pro error_user');
    const login = new LoginPage(page);
    await login.open();
    await login.login('error_user');
    const inv = new InventoryPage(page);
    await inv.add('Sauce Labs Backpack');
    await inv.remove('Sauce Labs Backpack');
    await expect(inv.cartBadge).toBeHidden({ timeout: 2000 });
  });

  test('performance_glitch_user: login demora mais de 2s', async ({ page }) => {
    test.fail(true, 'BUG-03: login lento pro performance_glitch_user');
    const login = new LoginPage(page);
    await login.open();
    const t = Date.now();
    await login.login('performance_glitch_user');
    await page.waitForURL(/inventory/);
    expect(Date.now() - t).toBeLessThan(2000);
  });
});
