/*
    CSS Locators
    2 types of the css locatore
    ->absolute css locator
    ->reative css locator

    Generic locators
    tag with id --> tag#id or #id
    tag with class -->tag.class or .class
    tag with any other attribute --> tag[attribute=value] or [attribute=value]
    tag with class and attibute --> tag.class[attribute=value] or .class[attribute=value]

    page.loactor(css/xpath)
*/
import {test, expect, Locator} from '@playwright/test';

test("Verify the CSS locators",async({page})=>{

    //tag#id or #id
    await page.goto("https://demowebshop.tricentis.com/");
    const searchbox:Locator= page.locator("input#small-searchterms");
    await expect(searchbox).toBeVisible();
    await searchbox.fill("14.1-inch Laptop");

    //tag.class or .class
    const btn_search:Locator=page.locator("input.button-1.search-box-button");
    await expect(btn_search).toBeVisible();
    await btn_search.click()

    //tag[attribute=value]
    const add_cart:Locator=page.locator("input[value='Add to cart']");
    await add_cart.scrollIntoViewIfNeeded();
    await expect(add_cart).toBeVisible();
    await add_cart.click();

    //tag.class[attribute=value]
    const shopping_cart:Locator=page.locator('span.cart-label').first();
    await expect(shopping_cart).toBeVisible();
    await shopping_cart.click();

    await page.waitForTimeout(5000);

});

/*
    absolute css locator ->it start from the rooot of the node till the target node
    ->if you want to search the title of page.
    ->html>head>title

    Realtive Css selector
    --> class start with "ma" ->p[class^='ma']
    -->class end with 'ub'->p[class$='ub']
    -->class contains 'ai'->p[class*='ai']

*/
