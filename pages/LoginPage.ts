import { Page, Locator } from '@playwright/test';

export class LoginPage {
  readonly username: Locator;
  readonly password: Locator;
  readonly button: Locator;
  readonly error: Locator;

  constructor(private page: Page) {
    this.username = page.getByTestId('username');
    this.password = page.getByTestId('password');
    this.button = page.getByTestId('login-button');
    this.error = page.getByTestId('error');
  }

  async open() {
    await this.page.goto('/');
  }

  async login(user: string, pass = 'secret_sauce') {
    await this.username.fill(user);
    await this.password.fill(pass);
    await this.button.click();
  }
}
