const { test, expect } = require('@playwright/test');

test('should delete a task', async ({ page }) => {
    await page.goto('http://localhost:3001');
    await page.fill('#email', 'test@example.com');
    await page.fill('#password', 'password123');
    await page.click('button[type="submit"]');

    await page.waitForURL('**/add_task.html');
    //bouton pour supprimer une tâche spécifique
    await page.click('button.delete-task');

    await expect(page.locator('body')).toContainText('Task deleted successfully');
});
