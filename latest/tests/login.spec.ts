import { test, expect } from '@playwright/test';
import { loginData } from '../../test_data/login.data';

test.describe('User login to SauceDemo', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('succesfull login with correct credencials', async ({ page }) => {
    //Arrange
    const userId = loginData.userId;
    const userPassword = loginData.userPassword;
    //Act
    await page.locator('#user-name').fill(userId);
    await page.locator('#password').fill(userPassword);
    await page.locator('#login-button').click();
    //Assert
    await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html');
  });
  test('unsuccesfull login with incorrect userId', async ({ page }) => {
    //Arrange
    const wrongUserId = 'fake_user';
    const userPassword = loginData.userPassword;
    const errorLoginId =
      'Epic sadface: Username and password do not match any user in this service';
    //Act
    await page.locator('#user-name').fill(wrongUserId);
    await page.locator('#password').fill(userPassword);
    await page.locator('#login-button').click();
    //Assert
    await expect(page.locator('[data-test="error"]')).toHaveText(errorLoginId);
  });
  test('unsuccesfull login with incorrect userPassword', async ({ page }) => {
    //Arrange
    const userId = loginData.userId;
    const wrongUserPassword = 'fakePassword';
    const errorLoginId =
      'Epic sadface: Username and password do not match any user in this service';
    //Act
    await page.locator('#user-name').fill(userId);
    await page.locator('#password').fill(wrongUserPassword);
    await page.locator('#login-button').click();
    //Assert
    await expect(page.locator('[data-test="error"]')).toHaveText(errorLoginId);
  });
});
