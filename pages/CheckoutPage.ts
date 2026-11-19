import { Page, Locator } from '@playwright/test';

export class CheckoutPage {
  readonly error: Locator;
  readonly total: Locator;
  readonly subtotal: Locator;
  readonly tax: Locator;
  readonly complete: Locator;

  constructor(private page: Page) {
    this.error = page.getByTestId('error');
    this.total = page.getByTestId('total-label');
    this.subtotal = page.getByTestId('subtotal-label');
    this.tax = page.getByTestId('tax-label');
    this.complete = page.getByTestId('complete-header');
  }

  async start() {
    await this.page.getByTestId('checkout').click();
  }

  async fill(first: string, last: string, zip: string) {
    await this.page.getByTestId('firstName').fill(first);
    await this.page.getByTestId('lastName').fill(last);
    await this.page.getByTestId('postalCode').fill(zip);
    await this.page.getByTestId('continue').click();
  }

  async finish() {
    await this.page.getByTestId('finish').click();
  }

  money(text: string | null) {
    return Number((text ?? '').replace(/[^0-9.]/g, ''));
  }
}
