import { expect } from '@playwright/test';

export class BrandsPage {
    constructor(page) {
        this.page = page;
        
        // Brand sidebar elements
        this.brandsSidebar = page.locator('.brands_products');
        this.brandsTitle = page.locator('.brands_products h2');
        this.brandsList = page.locator('.brands-name');
        
        // Individual brand links
        this.poleoBrandLink = page.locator('.brands-name ul li:has-text("Polo")');
        this.hmBrandLink = page.locator('.brands-name ul li:has-text("H&M")');
        this.madameBrandLink = page.locator('.brands-name ul li:has-text("Madame")');
        this.mastHarbourBrandLink = page.locator('.brands-name ul li:has-text("Mast & Harbour")');
        this.babyhugBrandLink = page.locator('.brands-name ul li:has-text("Babyhug")');
        this.allenSollyJuniorBrandLink = page.locator('.brands-name ul li:has-text("Allen Solly Junior")');
        this.kookieKidsBrandLink = page.locator('.brands-name ul li:has-text("Kookie Kids")');
        this.bibaBrandLink = page.locator('.brands-name ul li:has-text("Biba")');
        
        // Brand page elements
        this.brandProductsTitle = page.locator('.title.text-center');
        this.brandProducts = page.locator('.features_items .product-image-wrapper');
    }
    
    async verifyBrandsAreVisible() {
        await expect(this.brandsSidebar).toBeVisible();
        await expect(this.brandsTitle).toContainText('Brands', { ignoreCase: true });
        await expect(this.brandsList).toBeVisible();
    }
    
    async clickPoloBrand() {
        await this.poleoBrandLink.click();
    }
    
    async clickHMBrand() {
        await this.hmBrandLink.click();
    }
    
    async clickMadameBrand() {
        await this.madameBrandLink.click();
    }
    
    async clickMastHarbourBrand() {
        await this.mastHarbourBrandLink.click();
    }
    
    async clickBabyhugBrand() {
        await this.babyhugBrandLink.click();
    }
    
    async clickAllenSollyJuniorBrand() {
        await this.allenSollyJuniorBrandLink.click();
    }
    
    async clickKookieKidsBrand() {
        await this.kookieKidsBrandLink.click();
    }
    
    async clickBibaBrand() {
        await this.bibaBrandLink.click();
    }
    
    async verifyBrandPage(brandName) {
        // Verify the URL contains the brand_products parameter with the brand name
        // Updated to use relative URL instead of hardcoded absolute URL
        await expect(this.page).toHaveURL(new RegExp(`/brand_products/${brandName}`, 'i'));
        
        // Verify the title contains the brand name
        await expect(this.brandProductsTitle).toContainText(brandName, { ignoreCase: true });
        
        // Verify products are displayed
        const productCount = await this.brandProducts.count();
        expect(productCount).toBeGreaterThan(0);
        
        // Verify at least the first product is visible
        await expect(this.brandProducts.first()).toBeVisible();
    }
}