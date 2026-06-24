import {test,expect,Locator} from '@playwright/test'

test('Verify the single dropdown',async({page})=>{
    await page.goto("https://testautomationpractice.blogspot.com/");
    //await page.locator("#country").selectOption("India");
    await page.locator("#country").selectOption({label:"India"});
    //await page.locator("#country").selectOption({value:"uk"});
    //await page.locator("#country").selectOption({index:5});

    //2.Check the number of count in dropdown
    const dropdownCount:Locator=page.locator("#country option");
    const count:number=await dropdownCount.count();
    console.log("count of dropdown:",count);
    expect(dropdownCount).toHaveCount(10);

    //3.check an options present in dropdown
    const optionText:string[]= (await dropdownCount.allTextContents()).map(text=>text.trim());
    console.log('Dropdown elements are:',optionText);
    expect(optionText).toContain("Japan");

    //4. printing options from dropdown
    for(const option of optionText){
        console.log(option);
    }

    //await page.pause();

});