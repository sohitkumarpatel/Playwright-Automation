import { test, expect } from '@playwright/test';


test('Verify Logo of page', async ({ page }) => {
    // Wait until there are no network connections for at least 500ms
    await page.goto('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login'); 
    const Logo:Locator = page.getByAltText("company-branding");
    await expect(Logo).toBeVisible();
    /*
      page.getByText() ->Find an element by the text it contains, you can match by the substring, exact string
      locate by visible text
      use this locator to find non-interactive element like div, spam, p etc.
      For interactive elements like button, a, input etc. use role locator.
      <p>Welcom</p>
      <div>Hello</div>

    */

});

test('login in to Application',async({page})=>{

    await page.goto('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login'); 
    //Login funtionality
    await page.getByPlaceholder("Username").fill("Admin");
    await page.getByPlaceholder("Password").fill("Admin#123");
    await page.getByRole('button', { name: 'Login' }).click();
    const invalidresult= page.getByText("Invalid credentials");
    await expect(invalidresult).toHaveText("Invalid credentials");


});
