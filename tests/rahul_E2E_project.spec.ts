import {test, expect, Locator} from '@playwright/test';

test('Login test verify', async({page})=>{

    //page load
    await page.goto("https://rahulshettyacademy.com/client/#/auth/login");

    //Login page locator
    const user_email:Locator=page.locator('#userEmail');
    const password:Locator=page.locator('#userPassword');
    const submit_btn:Locator= page.getByRole('button',{name:'Login'});
    const logo:Locator=page.getByText("Automation Practice");

    //Action method
    await expect(user_email).toBeVisible();
    await expect(user_email).toBeEnabled();
    await user_email.fill('sohit.patel9889@gmail.com');

    await expect(password).toBeVisible();
    await expect(password).toBeEnabled();
    await password.fill('Sohit#123');

    await expect(submit_btn).toBeVisible();
    await submit_btn.click();

    await expect(logo).toBeVisible();
    await expect(logo).toContainText("Automation Practice");

    //await page.waitForTimeout(10000);

    //Locator for the element to add element in card
    const products:Locator=page.locator('.card-body');
    //const product_names:Locator=page.locator('b');
    //const add_product_in_card:Locator=page.getByText(" Add To Cart");
    const product_name='ZARA COAT 3';
    const product_title=page.locator('.card-body b');

   //Actions
   await page.waitForLoadState('networkidle');
   await product_title.first().waitFor();
   const title=product_title.allTextContents();
   console.log("All the products ==>",title);
   const count =await products.count();
   for(let i:number =0;i<count;i++){
        if(await products.nth(i).locator('b').textContent()===product_name){
            await products.nth(i).locator("text=Add To Cart").click();
        }
   }
   //await page.pause();
   await page.locator("[routerlink*='cart']").click();
   //await page.locator("div li").first().waitFor(); //-->whenever we received the sync issue we have to used.
   const bool=await page.locator("h3:has-text('ZARA COAT 3')");
   expect(bool).toBeTruthy();

   await page.locator("text=Checkout").click();
   await page.locator("(//input[@type='text'])[2]").fill("1234");
   await page.locator("(//input[@type='text'])[3]").fill("Sohit Patel");
   await page.locator("input[name='coupon']").fill("SOHIT10");
   await page.locator("button:has-text('Apply Coupon')").click();
   await expect(page.locator("//p[@class='mt-1 ng-star-inserted']")).toHaveText("* Invalid Coupon");
   await page.locator("[placeholder='Select Country']").pressSequentially("ind");
   const dropdown:Locator=page.locator(".ta-results.list-group.ng-star-inserted");
   await dropdown.waitFor();
   const optionsCount=await dropdown.locator("button").count();
   for(let i=0;i<optionsCount;i++){
        const text =await dropdown.locator("button").nth(i).textContent();
        if(text?.trim()==="India"){
            await dropdown.locator("button").nth(i).click();
            break;
        }
   }
   await page.locator("text=Place Order ").click();
   await expect(page.locator(".hero-primary")).toHaveText(" Thankyou for the order. ");
   const order_id=page.locator("label[class='ng-star-inserted']");
   const order=(await order_id.textContent());
   console.log("Order id is: ",order);

   //ckicked on order from menu 
   await page.locator("button[routerlink*='myorders']").click();
   const rows:Locator=page.locator("tbody tr");
   for(let i=0;i<await rows.count();i++){
        const rowOrder_id=await rows.nth(i).locator("th").textContent();
        if(rowOrder_id && order?.includes(rowOrder_id)){
            await rows.nth(i).locator("button").first().click();
            break;
        }

   }
   await expect(page.locator("p[class=tagline]")).toHaveText("Thank you for Shopping With Us");
   await expect(page.locator("div[class=title]")).toHaveText(" ZARA COAT 3 ");
   const orderdeatil_page= await page.locator("div[class='col-text -main']").textContent();
   await expect(orderdeatil_page && order?.includes(orderdeatil_page)).toBeTruthy();
   await page.waitForTimeout(10000);
   //await page.pause();

});