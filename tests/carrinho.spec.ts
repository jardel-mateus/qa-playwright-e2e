import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { InventoryPage } from '../pages/InventoryPage';

test.describe('Produtos e carrinho', () => {
  let inv: InventoryPage;

  test.beforeEach(async ({ page }) => {
    const login = new LoginPage(page);
    await login.open();
    await login.login('standard_user');
    inv = new InventoryPage(page);
  });

  test('lista 6 produtos', async () => {
    await expect(inv.items).toHaveCount(6);
  });

  test('ordena por preco menor pro maior', async () => {
    await inv.sort.selectOption('lohi');
    const p = await inv.prices();
    expect(p).toEqual([...p].sort((a, b) => a - b));
  });

  test('ordena por nome Z-A', async () => {
    await inv.sort.selectOption('za');
    const n = await inv.names();
    expect(n).toEqual([...n].sort().reverse());
  });

  test('adiciona e remove itens do carrinho', async () => {
    await inv.add('Sauce Labs Backpack');
    await inv.add('Sauce Labs Bike Light');
    await expect(inv.cartBadge).toHaveText('2');
    await inv.remove('Sauce Labs Backpack');
    await expect(inv.cartBadge).toHaveText('1');
    await inv.remove('Sauce Labs Bike Light');
    await expect(inv.cartBadge).toBeHidden();
  });

  test('carrinho mantem os itens ao recarregar', async ({ page }) => {
    await inv.add('Sauce Labs Onesie');
    await page.reload();
    await expect(inv.cartBadge).toHaveText('1');
    await inv.openCart();
    await expect(page.getByTestId('inventory-item-name')).toHaveText(['Sauce Labs Onesie']);
  });
});
