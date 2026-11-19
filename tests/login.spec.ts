import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { InventoryPage } from '../pages/InventoryPage';

test.describe('Login', () => {
  let login: LoginPage;

  test.beforeEach(async ({ page }) => {
    login = new LoginPage(page);
    await login.open();
  });

  test('entra com usuario valido', async ({ page }) => {
    await login.login('standard_user');
    await expect(page).toHaveURL(/inventory/);
    await expect(new InventoryPage(page).title).toHaveText('Products');
  });

  test('bloqueia usuario travado', async () => {
    await login.login('locked_out_user');
    await expect(login.error).toContainText('this user has been locked out');
  });

  test('mostra erro com senha errada', async () => {
    await login.login('standard_user', 'errada');
    await expect(login.error).toContainText('do not match any user');
  });

  for (const campo of ['username', 'password'] as const) {
    test(`exige ${campo}`, async () => {
      if (campo === 'username') await login.password.fill('secret_sauce');
      else await login.username.fill('standard_user');
      await login.button.click();
      await expect(login.error).toContainText(campo === 'username' ? 'Username is required' : 'Password is required');
    });
  }

  test('nao deixa abrir o inventario sem login', async ({ page }) => {
    await page.goto('/inventory.html');
    await expect(login.error).toContainText("You can only access '/inventory.html' when you are logged in");
  });

  test('logout volta pro login', async ({ page }) => {
    await login.login('standard_user');
    await new InventoryPage(page).logout();
    await expect(login.button).toBeVisible();
  });
});
