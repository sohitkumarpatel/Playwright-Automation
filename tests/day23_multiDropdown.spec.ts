import {test, expect} from '@playwright/test'
test('Verify the Multidropdown',async({page})=>{
    await page.goto("https://testautomationpractice.blogspot.com/");

    //1. select option from dropdown 4 ways
    //await page.locator("#colors").selectOption(['Red','Blue']); // using visible text
    //await page.locator("#colors").selectOption(['green','white'])//by using the value
    //await page.locator("#colors").selectOption([{label:'Red'},{label:'Green'}]); //By using the label
    //await page.locator("#colors").selectOption([{index:0},{index:2}]); //By using the index

    //await page.pause();

    //2.Check the number of count in dropdown
    const dropdownCount=page.locator("#colors option");
    const count:number=await dropdownCount.count();
    console.log("count of dropdown:",count);
    expect(dropdownCount).toHaveCount(7);


    //3.check an options present in dropdown
    const optionText:string[]= (await dropdownCount.allTextContents()).map(text=>text.trim());
    console.log('Dropdown elements are:',optionText);
    expect(optionText).toContain("Red");

    //4. printing options from dropdown

    for(const option of optionText){
        console.log(option);
    }


});