import { test, expect } from '@playwright/test';
import { loginData } from '../../test_data/login.data';

test.describe('Checkout tests', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });
  test('quick purchase with correct data', async ({ page }) => {
    //Arrange
    const userId = loginData.userId;
    const userPassword = loginData.userPassword;
    const firstName = 'userName';
    const lastName = 'userLastName';
    const postalCode = '12000';
    //Act
    await page.locator('#user-name').fill(userId);
    await page.locator('#password').fill(userPassword);
    await page.locator('#login-button').click();
    await page.locator('#add-to-cart-sauce-labs-backpack').click();
    await page.locator('#shopping_cart_container').click();
    await page.locator('#checkout').click();
    await page.locator('#first-name').fill(firstName);
    await page.locator('#last-name').fill(lastName);
    await page.locator('#postal-code').fill(postalCode);
    await page.locator('#continue').click();
    await page.locator('#finish').click();
    //Assert
    await expect(page.locator('#checkout_complete_container')).toHaveText(
      'Thank you for your order!Your order has been dispatched, and will arrive just as fast as the pony can get there!Back Home'
    );
  });
  test('quick purchase with incorrect userName', async ({ page }) => {
    //Arrange
    const userId = loginData.userId;
    const userPassword = loginData.userPassword;
    const lastName = 'userLastName';
    const postalCode = '12000';
    const errorFirstName = 'Error: First Name is required';
    //Act
    await page.locator('#user-name').fill(userId);
    await page.locator('#password').fill(userPassword);
    await page.locator('#login-button').click();
    await page.locator('#add-to-cart-sauce-labs-backpack').click();
    await page.locator('#shopping_cart_container').click();
    await page.locator('#checkout').click();
    await page.locator('#last-name').fill(lastName);
    await page.locator('#postal-code').fill(postalCode);
    await page.locator('#continue').click();
    //Assert
    await expect(page.locator('[data-test="error"]')).toHaveText(
      errorFirstName
    );
  });
  test('quick purchase with incorrect userLastName', async ({ page }) => {
    //Arrange
    const userId = loginData.userId;
    const userPassword = loginData.userPassword;
    const firstName = 'userName';
    const postalCode = '12000';
    const errorLastName = 'Error: Last Name is required';
    //Act
    await page.locator('#user-name').fill(userId);
    await page.locator('#password').fill(userPassword);
    await page.locator('#login-button').click();
    await page.locator('#add-to-cart-sauce-labs-backpack').click();
    await page.locator('#shopping_cart_container').click();
    await page.locator('#checkout').click();
    await page.locator('#first-name').fill(firstName);
    await page.locator('#postal-code').fill(postalCode);
    await page.locator('#continue').click();
    //Assert
    await expect(page.locator('[data-test="error"]')).toHaveText(errorLastName);
  });
  test('quick purchase with incorrect postalCode', async ({ page }) => {
    //Arrange
    const userId = loginData.userId;
    const userPassword = loginData.userPassword;
    const firstName = 'userName';
    const lastName = 'userLastName';
    const errorPostalCode = 'Error: Postal Code is required';
    //Act
    await page.locator('#user-name').fill(userId);
    await page.locator('#password').fill(userPassword);
    await page.locator('#login-button').click();
    await page.locator('#add-to-cart-sauce-labs-backpack').click();
    await page.locator('#shopping_cart_container').click();
    await page.locator('#checkout').click();
    await page.locator('#first-name').fill(firstName);
    await page.locator('#last-name').fill(lastName);
    await page.locator('#continue').click();
    //Assert
    await expect(page.locator('[data-test="error"]')).toHaveText(
      errorPostalCode
    );
  });
});
