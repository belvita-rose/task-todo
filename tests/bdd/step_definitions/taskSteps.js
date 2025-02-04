const { test, expect } = require('@playwright/test');

test('should add a new task', async ({ page }) => {
    await page.goto('http://localhost:3000');
    await page.fill('#email', 'test@example.com');
    await page.fill('#password', 'password123');
    await page.click('button[type="submit"]');

    await page.waitForURL('**/add_task.html');
    await page.fill('#title', 'New Task');
    await page.click('button[type="submit"]');

    await expect(page.locator('body')).toContainText('Task added successfully');
});