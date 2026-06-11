import { test, expect } from '@playwright/test';

test('test verify page title',async({page})=>{
    await page.goto('https://demowebshop.tricentis.com/');
    let title:string = await page.title();
    console.log('Title of page',title);
    await expect(page).toHaveTitle("Demo Web Shop");

});

test('Verify Url of the page',async({page})=>{
    await page.goto('https://demowebshop.tricentis.com/');
    let url:string = await page.url();
    console.log('Url of page',url);
    await expect(page).toHaveURL("https://demowebshop.tricentis.com/");

});