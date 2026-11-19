import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { InventoryPage } from '../pages/InventoryPage';
import { CheckoutPage } from '../pages/CheckoutPage';

test.describe('Checkout', () => {
  let inv: InventoryPage;
  let co: CheckoutPage;

  test.beforeEach(async ({ page }) => {
    const login = new LoginPage(page);
    await login.open();
    await login.login('standard_user');
    inv = new InventoryPage(page);
    co = new CheckoutPage(page);
  });

  test('compra completa com 2 itens', async () => {
    await inv.add('Sauce Labs Backpack');
    await inv.add('Sauce Labs Fleece Jacket');
    await inv.openCart();
    await co.start();
    await co.fill('Jardel', 'Mateus', '99470000');
    await expect(co.subtotal).toHaveText('Item total: $79.98');
    await co.finish();
    await expect(co.complete).toHaveText('Thank you for your order!');
  });

  test('total = subtotal + taxa', async () => {
    await inv.add('Sauce Labs Bolt T-Shirt');
    await inv.add('Test.allTheThings() T-Shirt (Red)');
    await inv.openCart();
    await co.start();
    await co.fill('Jardel', 'Mateus', '99470000');
    const sub = co.money(await co.subtotal.textContent());
    const tax = co.money(await co.tax.textContent());
    const total = co.money(await co.total.textContent());
    expect(total).toBeCloseTo(sub + tax, 2);
  });

  test('valida campos obrigatorios', async () => {
    await inv.add('Sauce Labs Backpack');
    await inv.openCart();
    await co.start();
    await co.fill('', '', '');
    await expect(co.error).toContainText('First Name is required');
    await co.fill('Jardel', '', '');
    await expect(co.error).toContainText('Last Name is required');
    await co.fill('Jardel', 'Mateus', '');
    await expect(co.error).toContainText('Postal Code is required');
  });
});
