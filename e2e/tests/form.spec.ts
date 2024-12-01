import { test, expect } from '@playwright/test';

test('Submit form and navigate to login', async ({ page }) => {
    await page.goto('http://frontend:3000');

    await page.click('main');

    await page.waitForSelector('input[placeholder="Enter your username"]', {
        state: 'visible',
      });

    await page.fill('input[placeholder="Enter your username"]', 'John Doe');
    await page.fill('input[placeholder="Enter your email"]', 'johndoe@example.com');
    await page.fill('input[placeholder="Enter your password"]', 'password123');

    await page.click('button[type="submit"]');

});