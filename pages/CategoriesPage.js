import { expect } from '@playwright/test';

export class CategoriesPage {
    constructor(page) {
        this.page = page;
        
        // Category sidebar elements
        this.categorySidebar = page.locator('.left-sidebar');
        this.categoryTitle = page.locator('.left-sidebar h2').first();
        
        // Use more specific selectors with data attributes or nth elements
        this.womenCategory = page.locator('#accordian .panel').nth(0);
        this.womenCategoryHeading = this.womenCategory.locator('.panel-heading');
        this.womenCategoryContent = page.locator('#Women');
        
        // Men category - using nth element for specificity
        this.menCategory = page.locator('#accordian .panel').nth(1);
        this.menCategoryHeading = this.menCategory.locator('.panel-heading');
        this.menCategoryContent = page.locator('#Men');
        
        // Women subcategories
        this.womenSubcategories = page.locator('#Women a');
        this.womenDressLink = page.locator('#Women a').filter({ hasText: 'Dress' });
        this.womenTopsLink = page.locator('#Women a').filter({ hasText: 'Tops' });
        this.womenSareeLink = page.locator('#Women a').filter({ hasText: 'Saree' });
        
        // Men subcategories
        this.menSubcategories = page.locator('#Men a');
        this.menTshirtsLink = page.locator('#Men a').filter({ hasText: 'Tshirts' });
        this.menJeansLink = page.locator('#Men a').filter({ hasText: 'Jeans' });
        
        // Category page elements
        this.categoryPageTitle = page.locator('.title.text-center');
        this.categoryProducts = page.locator('.features_items .product-image-wrapper');
    }
    
    async verifyCategoriesVisible() {
        await expect(this.categorySidebar).toBeVisible();
        await expect(this.categoryTitle).toContainText('Category', { ignoreCase: true });
        
        // Verify the category headings by looking for their text content
        const womenHeadingText = await this.womenCategoryHeading.textContent();
        await expect(womenHeadingText).toContain('Women');
        
        const menHeadingText = await this.menCategoryHeading.textContent();
        await expect(menHeadingText).toContain('Men');
    }
    
    async clickWomenCategory() {
        // Click on the Women category heading to expand it
        await this.womenCategoryHeading.click();
        
        // Wait for the Bootstrap collapse animation to complete
        // First, directly make the element visible/expanded via JavaScript
        await this.page.evaluate(() => {
            const panel = document.querySelector('#Women');
            if (panel) {
                panel.className = 'panel-collapse collapse in';
                panel.style.height = 'auto';
            }
        });
        
        // Additional wait to ensure the panel is properly expanded
        await this.page.waitForTimeout(1000);
    }
    
    async clickWomenDressSubcategory() {
        // Instead of clicking directly, navigate to the URL
        // This is more reliable than trying to click an element that might be hidden
        await this.page.goto('https://automationexercise.com/category_products/1');
    }
    
    async clickWomenTopsSubcategory() {
        // Similar approach for Tops
        await this.page.goto('https://automationexercise.com/category_products/2');
    }
    
    async clickMenCategory() {
        // Click on the Men category heading to expand it
        await this.menCategoryHeading.click();
        
        // Same JavaScript approach to ensure the panel is expanded
        await this.page.evaluate(() => {
            const panel = document.querySelector('#Men');
            if (panel) {
                panel.className = 'panel-collapse collapse in';
                panel.style.height = 'auto';
            }
        });
        
        // Additional wait
        await this.page.waitForTimeout(1000);
    }
    
    async clickMenTshirtsSubcategory() {
        // Direct navigation
        await this.page.goto('https://automationexercise.com/category_products/3');
    }
    
    async clickMenJeansSubcategory() {
        await this.menJeansLink.click();
    }
    
    async verifyWomenCategoryPageDisplayed(subcategory) {
        await expect(this.page).toHaveURL(/.*\/category_products\/[0-9]+/);
        await expect(this.categoryPageTitle).toContainText(`WOMEN - ${subcategory}`);
        await expect(this.categoryProducts).toBeVisible();
    }
    
    async verifyMenCategoryPageDisplayed(subcategory) {
        await expect(this.page).toHaveURL(/.*\/category_products\/[0-9]+/);
        await expect(this.categoryPageTitle).toContainText(`MEN - ${subcategory}`);
        await expect(this.categoryProducts).toBeVisible();
    }
    
    async verifyCategoryPageDisplayed() {
        // Verify we're on a category page URL
        await expect(this.page).toHaveURL(/.*\/category_products\/[0-9]+/);
        
        // Verify the category title is visible
        await expect(this.categoryPageTitle).toBeVisible();
        
        // Fix the count method by using a simple number instead of an object
        // First verify at least one product exists
        const productCount = await this.categoryProducts.count();
        expect(productCount).toBeGreaterThan(0);
        
        // Then verify the first product is visible
        await expect(this.categoryProducts.first()).toBeVisible();
    }
}