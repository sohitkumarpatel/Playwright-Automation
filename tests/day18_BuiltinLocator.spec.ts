import { test, expect,Locator } from '@playwright/test';


test('Verify Logo of page', async ({ page }) => {
    // Wait until there are no network connections for at least 500ms
    
    /*
      page.getByText() ->Find an element by the text it contains, you can match by the substring, exact string
      locate by visible text
      use this locator to find non-interactive element like div, spam, p etc.
      For interactive elements like button, a, input etc. use role locator.
      <p>Welcom</p>
      <div>Hello</div>

    */
   await page.goto('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login'); 
    const Logo:Locator = page.getByAltText("company-branding");
    await expect(Logo).toBeVisible();

});

test('login test failed',async({page})=>{

    await page.goto('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login'); 
    //Login funtionality
    await page.getByPlaceholder("Username").fill("Admin");
    await page.getByPlaceholder("Password").fill("Admin#123");

    /*
    page.getByRole() -> locating by role (Role is not an attribute)
    Role loactor include button, link, checkbox, heading,lists, tables and follow many more and follow
    the W3C specification for ARIA role.
*/
    await page.getByRole('button', { name: 'Login' }).click();

    const invalidresult= page.getByText("Invalid credentials");
    await expect(invalidresult).toHaveText("Invalid credentials");


});

test('Register in application',async({page})=>{
    await page.goto("https://demo.nopcommerce.com/");
    /*
    const validatetext:Locator= page.getByText('Welcome to our store');
    await page.waitForTimeout(5000);
    await expect(validatetext).toBeVisible();
    await page.getByRole('link', { name: 'Register' }).click();
    */
});

/*
    page.getByLabel() ->Locate from control by label text
    when to use idea form field with visible labels
    await page.getByLabel('First name:').fill('John');
    await page.getByLable('Last name:').fill("kedny");
*/

/*
    page.getByPlaceholder() - finds elements with a given placeholder text.
    best for input without a label but having the placeholder

    await page.getByPlaceholder('Search store').fill('Apple mackbook pro');
*/

/*
    page.getByTitle() - to locate an element by its title attribute
*/

/*
    page.getByTestId() - to locate an element based on its data test attibute 
    (other attribute can be configure)
*/
