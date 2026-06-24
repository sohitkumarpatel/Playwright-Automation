import {test, expect,Locator} from '@playwright/test'

/*
    Xpath is two type -> Realtive xpath amd absloute xpath
    most we prefered to use the relative xpath
*/


test('verify the Xpath Locators',async({page})=>{

    await page.goto("https://demowebshop.tricentis.com/");

    //Relative Xpath -->single attribute to find the xpath
    const logo:Locator=page.locator("//img[@alt='Tricentis Demo Web Shop']");
    await expect(logo).toBeVisible();

    //Relative Xpath -->multiple attribute to find the xapth
    
    const search_box:Locator=page.locator("//input[@value='Search store'][@id='small-searchterms']");
    await expect(search_box).toBeVisible();
    await search_box.fill("Apple mackbook pro");

    //Realtive Xpath -->multiple attribute to find the xapth in different way
    // and -->//input[@type='submit' and @value='Search']" -->Both should be match
    //or-->//input[@type='submit' or @value='Search']" -->Either one should match
    const btn_search:Locator=page.locator("//input[@type='submit' and @value='Search']");
    await expect(btn_search).toBeVisible();
    await btn_search.click();

    

})

test("verify the Contains method",async({page})=>{

    /*
        Xpath with contains() function
        Matches elements that contain a specific substring within an attribute
        Xpath format =>//*[contains(@class,'btn')]
        Example -->//h2//a[contains(@herf,'computer')]
        WebElement example =>Select products whose name contains "computer" under featured product
        Note: The contains()function is useful for partial match 
    */
    await page.goto("https://demowebshop.tricentis.com/");
    //contains()
    await page.waitForSelector("//div/h2/a")
    
    const products:Locator=page.locator("//div/h2/a");
    const product_count:number=await products.count();
    console.log('Number of product', product_count);
    expect(product_count).toBeGreaterThan(0);

    //wants to extract each every elements from the products
   // console.log(await products.textContent()); // Error ->strict mode voilaion
    console.log('Extract the first related product:',await products.first().textContent());
    console.log('Extract the last related product:',await products.last().textContent());
    console.log('Extract nth related product:',await products.nth(1).textContent()); //index is starting from zero

    const all_product:string[]=await products.allTextContents();
    console.log('All products in array form=>',all_product);
    for(let pt of all_product){
        console.log(pt);
    }
});

test('Verify the starts-with locator',async({page})=>{
    await page.goto("https://demowebshop.tricentis.com/");

    /*
     Xpath with starts-with() function
        Matches elements whose attribut value start with a specified value.
        Xpath format =>//*[starts-with(@id,'user')]
        Example -->//h2//a[starts-with(@herf,'/build')]
        WebElement example =>Select products whose name start with "build" 
        Note: The starts-with()function is helpful for dynamics element whose id or class are partial consistent. 
    */
    //starts-with()
    const build_product:Locator=page.locator("//div/h2/a[starts-with(@href,'/build')]");
    const build_product_count:number=await build_product.count();
    console.log('Number of product', build_product_count);
    expect(build_product_count).toBeGreaterThan(0);
    const all_product:string[]=await build_product.allTextContents();
    console.log('All products in array form=>',all_product);
    for(let pt of all_product){
        console.log(pt);
    }
    
});

test("verify the text() xpath for innertext",async({page})=>{
    await page.goto("https://demowebshop.tricentis.com/");
    /*
     Xpath with text() function
        Select elements based on the exact text content of element
        Xpath format =>//*[text()=''Login]
        Example -->//h2//a[text()='Register'] ->select the register link
        Example2:-->//*contains(text()='Fiction')-->select all product titls under book that contains 'fiction'
    */
    //text()
    const register_link:Locator=page.locator("//a[text()='Register']");
    await expect(register_link).toBeVisible();
    await register_link.click();

});

test('Verify the Last() Xpath',async({page})=>{
    await page.goto("https://demowebshop.tricentis.com/");
    /*
        Xpath with last() function
        Select the last element in set of matching node
        Xpath formar: //input[last()]
        Example: //div[@class='column follow-us']//li[last()] 
        WebElement Example: Select Google+ under the follow us footer mennu.
        Note:The last() function is useful when you want to last occurance of an element
    */      
   
        const google_plus:Locator=page.locator("//div[@class='column follow-us']/ul/li[last()]");
        await expect(google_plus).toBeVisible();
        await google_plus.click();

});

test('Verify the postion() Xpath',async({page})=>{
    await page.goto("https://demowebshop.tricentis.com/");
    /*
        Xpath with position() function
        Select an element base on its position
        Xpath formar: //input[position()=2]
        Example: //div[@class='column follow-us']//li[position()=2] 
        WebElement Example: Select 2nd option under the follow us footer mennu.
    
    */      
   
        const twitter_link:Locator=page.locator("//div[@class='column follow-us']/ul/li[position()=2]");
        await expect(twitter_link).toBeVisible();
        await twitter_link.click();

});
// Using the Xpath
test('Handle Dynamic Elements using XPath', async ({ page }) => {
  await page.goto('https://testautomationpractice.blogspot.com/');
  
  // Loop to click the button 5 times
  for (let i = 1; i <= 5; i++) {
   
    let button:Locator = page.locator('//button[text()="STOP" or text()="START"]'); // Locate the button with either 'STOP' or 'START' text
    // let button = await page.locator('//button[@name="start"]');
    //let button = await page.locator('//button[@name="start" or @name="stop"]');
    // let button = await page.locator('//button[contains(@name,"st")]');
    // let button = await page.locator('//button[starts-with(@name,"st")]');
    
    // Click the button
    await button.click();
    
    // Wait for 2 seconds
    await page.waitForTimeout(2000);
  }
});

//Using Playwright Locator


test('Handle Dynamic Elements using PW Locators', async ({ page }) => {

  await page.goto('https://testautomationpractice.blogspot.com/');

  // Loop to click the button 5 times
  for (let i = 1; i <= 5; i++) {
    // Locate button by role and dynamic name
    const button = page.getByRole('button', { name: /START|STOP/ });

    // Click the button
    await button.click();

    // Wait for 2 seconds
    await page.waitForTimeout(2000);
  }
});


//Using CSS Locator

test('Handle Dynamic Elements using using CSS locator', async ({ page }) => {
  // Navigate to the target page
  await page.goto('https://testautomationpractice.blogspot.com/');

  // Loop to click the button 5 times
  for (let i = 1; i <= 5; i++) {
    // Locate the button using a CSS attribute selector (name can be 'start' or 'stop')
    const button = page.locator('button[name="start"], button[name="stop"]');

    // Click the button
    await button.click();

    // Wait for 2 seconds
    await page.waitForTimeout(2000);
  }
});
