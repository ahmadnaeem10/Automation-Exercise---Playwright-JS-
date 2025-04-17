import { expect } from '@playwright/test';

export class CategoriesPage {
    constructor(page) {
        this.page = page;
        this.categorySidebar = page.locator('.left-sidebar .category-products');
        // Use more specific selectors to avoid strict mode violations
        this.categoryTitle = page.locator('.left-sidebar h2').filter({ hasText: 'Category' });
        
        // Women category elements - more specific selectors
        this.womenCategory = page.locator('a[href="#Women"][data-toggle="collapse"]');
        this.womenSubcategories = page.locator('#Women');
        this.womenDress = page.locator('#Women a:has-text("Dress")');
        this.womenTops = page.locator('#Women a:has-text("Tops")');
        this.womenSaree = page.locator('#Women a:has-text("Saree")');
        
        // Men category elements - more specific selectors
        this.menCategory = page.locator('a[href="#Men"][data-toggle="collapse"]');
        this.menSubcategories = page.locator('#Men');
        this.menTshirts = page.locator('#Men a:has-text("Tshirts")');
        this.menJeans = page.locator('#Men a:has-text("Jeans")');
        
        // Kids category elements - more specific selectors
        this.kidsCategory = page.locator('a[href="#Kids"][data-toggle="collapse"]');
        this.kidsSubcategories = page.locator('#Kids');
        this.kidsDress = page.locator('#Kids a:has-text("Dress")');
        this.kidsTopsShirts = page.locator('#Kids a:has-text("Tops & Shirts")');
        
        // Category products page elements
        this.productsTitle = page.locator('.title.text-center');
        this.products = page.locator('.features_items .product-image-wrapper');
    }
    
    async verifyCategoriesSidebarVisible() {
        await expect(this.categorySidebar).toBeVisible();
        
        // Use a more specific selector to avoid strict mode violation
        const categoryHeading = this.page.locator('.left-sidebar h2').filter({ hasText: 'Category' });
        await expect(categoryHeading).toBeVisible();
        await expect(categoryHeading).toContainText('Category');
    }
    
    async verifyCategoriesVisible() {
        // Verify that the category sidebar is visible
        await this.verifyCategoriesSidebarVisible();
        
        // Additional checks to verify all category elements are visible
        await expect(this.womenCategory).toBeVisible();
        await expect(this.menCategory).toBeVisible();
        await expect(this.kidsCategory).toBeVisible();
        
        console.log('Categories are visible on the left sidebar');
    }
    
    async clickWomenCategory() {
        await this.womenCategory.click();
        // Wait for subcategories to be visible
        await this.page.waitForLoadState('domcontentloaded');
    }
    
    async clickWomenSubcategoryDress() {
        await this.womenDress.click();
        // Wait for the category page to load
        await this.page.waitForLoadState('networkidle');
    }
    
    async clickWomenSubcategoryTops() {
        await this.womenTops.click();
        // Wait for the category page to load
        await this.page.waitForLoadState('networkidle');
    }
    
    async clickWomenSubcategorySaree() {
        await this.womenSaree.click();
        // Wait for the category page to load
        await this.page.waitForLoadState('networkidle');
    }
    
    async clickMenCategory() {
        await this.menCategory.click();
        // Wait for subcategories to be visible
        await this.page.waitForLoadState('domcontentloaded');
    }
    
    async clickMenSubcategoryTshirts() {
        await this.menTshirts.click();
        // Wait for the category page to load
        await this.page.waitForLoadState('networkidle');
    }
    
    async clickMenSubcategoryJeans() {
        await this.menJeans.click();
        // Wait for the category page to load
        await this.page.waitForLoadState('networkidle');
    }
    
    async clickKidsCategory() {
        await this.kidsCategory.click();
        // Wait for subcategories to be visible
        await this.page.waitForLoadState('domcontentloaded');
    }
    
    async clickKidsSubcategoryDress() {
        await this.kidsDress.click();
        // Wait for the category page to load
        await this.page.waitForLoadState('networkidle');
    }
    
    async clickKidsSubcategoryTopsShirts() {
        await this.kidsTopsShirts.click();
        // Wait for the category page to load
        await this.page.waitForLoadState('networkidle');
    }
    
    async verifyCategoryPage(categoryName) {
        // Verify we are on the category products page with the correct title
        await expect(this.productsTitle).toContainText(categoryName, { ignoreCase: true });
        
        // Verify products are displayed
        const productCount = await this.products.count();
        expect(productCount).toBeGreaterThan(0);
        
        // Verify at least the first product is visible
        await expect(this.products.first()).toBeVisible();
        
        console.log(`Verified ${productCount} products for category: ${categoryName}`);
    }
}