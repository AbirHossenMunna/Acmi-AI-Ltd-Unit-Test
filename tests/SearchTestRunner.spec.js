import { test,expect } from "@playwright/test";
import SearchPage from "../Pages/SearchPage";

test.describe('Legal Assistant Search System', () => {

    test.beforeEach(async ({ page }) => {
        await page.goto('/');
    });

    //Test Case 1
    test("Legal Assistant page loads successfully", async ({ page }) => {
        const searchPage = new SearchPage(page);
        await expect(searchPage.text).toBeVisible();
        await expect(searchPage.searchButton).toBeVisible();
    });
    //Test Case 2
    test("Search with valid input", async ({ page }) => {
        const searchPage = new SearchPage(page);
        const data = 'Data';
        await searchPage.doSearch(data);

        await expect(searchPage.documentMatch).toBeVisible({ timeout: 40000 });
        await expect(searchPage.FirstFoundDocument).toBeVisible({ timeout: 40000 });
        await expect(searchPage.SecondFoundDocument).toBeVisible({ timeout: 40000 });
    });
    //Test Case 3
    test("Search with invalid input", async ({ page }) => {
        const searchPage = new SearchPage(page);
        const data1 = "123554";
        await searchPage.doSearch(data1);

        await expect(searchPage.documentNotMatch).toBeVisible({ timeout: 40000 });
    });
    //Test Case 4
    test("Search with empty input", async ({ page }) => {
        const searchPage = new SearchPage(page)
        await searchPage.searchInput.fill('');
        await expect(searchPage.searchButton).toBeDisabled();
    });
    //Test Case 5
    test("Press Enter key to search", async ({ page }) => {
        const searchPage = new SearchPage(page);
        await searchPage.searchInput.fill('Data');
        const searchButton1 = searchPage.searchButton;
        await searchButton1.press('Enter');

        await expect(searchPage.documentMatch).toBeVisible();
        await expect(searchPage.FirstFoundDocument).toBeVisible();
        await expect(searchPage.SecondFoundDocument).toBeVisible();
    });
    //Test Case 6
    test("Special characters input", async ({ page }) => {
        const searchPage = new SearchPage(page);
        const input = '$%^^%';
        await searchPage.doSearch(input);

        await expect(searchPage.documentNotMatch).toBeVisible({ timeout: 40000 });
    });
});
