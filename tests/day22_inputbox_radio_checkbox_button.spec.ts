import{test, expect, Locator} from '@playwright/test';

test.skip('Text Input Action',async({page})=>{
    await page.goto("https://testautomationpractice.blogspot.com/");
    const name_textbox:Locator= page.locator("input[id='name']");
    await expect(name_textbox).toBeVisible();
    await expect(name_textbox).toBeEnabled();
    const maxlenth:string | null= await name_textbox.getAttribute("maxlength"); // returning the value of maxlength attibute of element
    expect(maxlenth).toBe("15");    
    await name_textbox.fill("Sohit Patel");
    const inputvalue:string= await name_textbox.inputValue();
    console.log('Input value of first Name:', inputvalue);
    expect(inputvalue).toBe("Sohit Patel");

    const email_textbox:Locator= page.locator("input[id='email']");
    await expect(name_textbox).toBeVisible();
    await expect(name_textbox).toBeEnabled();
    await email_textbox.fill("sohit@gmail.com");
});

test.skip('Radio Button',async ({page})=>{
    await page.goto("https://testautomationpractice.blogspot.com/");
    const radio_male= page.locator("#male");
    await expect(radio_male).toBeVisible();
    await expect(radio_male).toBeEnabled();
    expect(await radio_male.isChecked()).toBe(false);
    await radio_male.check();
    expect(await radio_male.isChecked()).toBe(true);
    await expect(radio_male).toBeChecked();

    
});

test('Chekbox',async ({page})=>{
    await page.goto("https://testautomationpractice.blogspot.com/");

    //1. Select the specific checkbox (Sunday) using the getByLabel
    const sunday_checkbox= page.getByLabel('Sunday');
    await expect(sunday_checkbox).toBeVisible();
    await expect(sunday_checkbox).toBeEnabled();
    expect(await sunday_checkbox.isChecked()).toBe(false);
    await sunday_checkbox.check();
    expect(await sunday_checkbox.isChecked()).toBe(true);
    await expect(sunday_checkbox).toBeChecked();

    //2. Select all checkboxes and assert each is checked
    const days:string[]=['Monday','Tuesday','Wednesday','Thursday','Friday','Saturday','Sunday'];
    const checkboxes:Locator[]=days.map(index=>page.getByLabel(index));
    expect(checkboxes.length).toBe(7);

    //3. select all the checkboxes and assert each
    for(let checkbox of checkboxes){
        await expect(checkbox).toBeVisible();
        await expect(checkbox).toBeEnabled();
        await checkbox.check();
        expect(await checkbox.isChecked()).toBe(true);
        expect(checkbox).toBeChecked();
    
    }
});