import { Page, Locator } from '@playwright/test';

export class InventoryPage {
  readonly title: Locator;
  readonly items: Locator;
  readonly cartBadge: Locator;
  readonly sort: Locator;

  constructor(private page: Page) {
    this.title = page.getByTestId('title');
    this.items = page.getByTestId('inventory-item');
    this.cartBadge = page.getByTestId('shopping-cart-badge');
    this.sort = page.getByTestId('product-sort-container');
  }

  slug(name: string) {
    return name.toLowerCase().replace(/ /g, '-');
  }

  async add(name: string) {
    await this.page.getByTestId(`add-to-cart-${this.slug(name)}`).click();
  }

  async remove(name: string) {
    await this.page.getByTestId(`remove-${this.slug(name)}`).click();
  }

  async prices() {
    const txt = await this.page.getByTestId('inventory-item-price').allTextContents();
    return txt.map(t => Number(t.replace('$', '')));
  }

  async names() {
    return this.page.getByTestId('inventory-item-name').allTextContents();
  }

  async openCart() {
    await this.page.getByTestId('shopping-cart-link').click();
  }

  async logout() {
    await this.page.getByRole('button', { name: 'Open Menu' }).click();
    await this.page.getByTestId('logout-sidebar-link').click();
  }
}
