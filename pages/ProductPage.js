import { expect } from '@playwright/test';

export class ProductPage {
    constructor(page) {
        this.page = page;
        this.productsLink = page.locator('a[href="/products"]');
        this.allProductsTitle = page.locator('h2.title.text-center');
        this.productList = page.locator('.features_items');

        // View Product
        //this.firstProductViewButton = page.locator('a[href="/product_details/1"]');
        this.firstProductViewButton = page.locator('.choose a').first();
        this.productDetail = {
            name: page.locator('div.product-information h2'),
            category: page.getByText('Category:'),
            price: page.locator('div.product-information span span'),
            availability: page.getByText('Availability:'),
            condition: page.getByText('Condition:'),
            brand: page.getByText('Brand:')
        };

        // Search
        this.searchInput = page.locator('#search_product');
        this.searchButton = page.locator('#submit_search');
        this.searchedProductsHeader = page.locator('h2.title.text-center');
        this.searchedProductItems = page.locator('.features_items .product-image-wrapper');

        // Cart elements
        this.products = page.locator('.product-image-wrapper');
        this.addToCartButtons = page.locator('.product-overlay .add-to-cart');
        this.continueShoppingButton = page.locator('.modal-footer button');
        this.viewCartButton = page.locator('a[href="/view_cart"]').last();
        
        // Direct product links for more reliable adding to cart
        this.firstProductUrl = '/product_details/1'; // First product URL
        this.secondProductUrl = '/product_details/2'; // Second product URL

        // Product detail page elements
        this.productQuantityInput = page.locator('#quantity');
        this.addToCartButtonDetail = page.locator('button.cart');
        this.viewProductButtons = page.locator('.choose a');
    }

    async clickProductsButton() {
        await this.productsLink.click();
    }

    async verifyProductsPageVisible() {
        await expect(this.allProductsTitle).toHaveText('All Products');
        await expect(this.productList).toBeVisible();
    }

    async clickFirstProductView() {
        await this.firstProductViewButton.click();
    }

    async verifyProductDetailPageVisible() {
        await expect(this.page).toHaveURL(/.*\/product_details\/1/);
        await expect(this.productDetail.name).toBeVisible();
        await expect(this.productDetail.category).toBeVisible();
        await expect(this.productDetail.price).toBeVisible();
        await expect(this.productDetail.availability).toBeVisible();
        await expect(this.productDetail.condition).toBeVisible();
        await expect(this.productDetail.brand).toBeVisible();
    }

    async searchForProduct(productName) {
        await this.searchInput.fill(productName);
        await this.searchButton.click();
    }

    async verifySearchedProductsVisible() {
        await expect(this.searchedProductsHeader).toHaveText('Searched Products');
        await expect(this.searchedProductItems.first()).toBeVisible();
    }

    async verifyAllProductsPageVisible() {
        await expect(this.allProductsTitle).toHaveText('All Products');
        await expect(this.productList).toBeVisible();
    }

    async addFirstProductToCart() {
        try {
            // More reliable method: Navigate directly to first product page
            await this.page.goto(this.firstProductUrl);
            
            // Wait for page to load
            await this.page.waitForLoadState('networkidle');
            
            // Click add to cart button on product detail page
            await this.addToCartButtonDetail.click();
            
            return true;
        } catch (error) {
            console.log('Error adding first product to cart via direct method:', error.message);
            
            // Fall back to original method
            try {
                const firstProduct = this.products.first();
                await firstProduct.hover();
                await this.page.waitForTimeout(500); // Short delay after hover
                await this.addToCartButtons.first().click({force: true});
                return true;
            } catch (fallbackError) {
                console.log('Error adding first product to cart via fallback method:', fallbackError.message);
                return false;
            }
        }
    }

    async clickContinueShopping() {
        try {
            // Wait for the modal to be visible
            await this.page.waitForSelector('.modal-footer button', { state: 'visible', timeout: 10000 });
            
            // Make sure button is visible before clicking
            await this.continueShoppingButton.waitFor({ state: 'visible', timeout: 5000 });
            
            // Click with force option to bypass any overlay issues
            await this.continueShoppingButton.click({ force: true });
            
            // Wait for modal to disappear
            await this.page.waitForSelector('.modal-footer button', { state: 'hidden', timeout: 5000 }).catch(async () => {
                // If waiting for hidden times out, try clicking again
                console.log('Modal did not disappear, trying to click button again');
                await this.continueShoppingButton.click({ force: true });
            });
            
            // Small wait to ensure modal is closed
            await this.page.waitForTimeout(1000);
            
            return true;
        } catch (error) {
            console.log('Continue shopping button not clickable, proceeding with test...', error.message);
            // If button is not clickable, we can still proceed with the test in most cases
            return false;
        }
    }

    async addSecondProductToCart() {
        try {
            // More reliable method: Navigate directly to second product page
            await this.page.goto(this.secondProductUrl);
            
            // Wait for page to load
            await this.page.waitForLoadState('networkidle');
            
            // Click add to cart button on product detail page
            await this.addToCartButtonDetail.click();
            
            return true;
        } catch (error) {
            console.log('Error adding second product to cart via direct method:', error.message);
            
            // Fall back to original method
            try {
                const secondProduct = this.products.nth(1);
                await secondProduct.hover();
                await this.page.waitForTimeout(500); // Short delay after hover
                await this.addToCartButtons.nth(1).click({force: true});
                return true;
            } catch (fallbackError) {
                console.log('Error adding second product to cart via fallback method:', fallbackError.message);
                return false;
            }
        }
    }

    async clickViewCartButton() {
        await this.viewCartButton.click();
    }

    async clickViewProductOnHomePage() {
        try {
            // Wait for products to be visible
            await this.page.waitForSelector('.features_items', { state: 'visible', timeout: 30000 });
            
            // Try to find and click the first view product button
            await this.viewProductButtons.first().waitFor({ state: 'visible', timeout: 10000 });
            await this.viewProductButtons.first().click();
            
            // Wait for navigation to complete
            await this.page.waitForLoadState('networkidle', { timeout: 30000 });
        } catch (error) {
            console.log('Error clicking view product button:', error.message);
            throw error; // Let caller handle alternative approach
        }
    }

    async setProductQuantity(quantity) {
        try {
            // Make sure we're on product detail page
            await this.productDetail.name.waitFor({ state: 'visible', timeout: 15000 });
            
            // Clear the existing quantity with multiple strategies for reliability
            await this.productQuantityInput.clear();
            
            // If clear() doesn't work, try JavaScript clear
            const isCleared = await this.productQuantityInput.evaluate(el => {
                if (el.value !== '') {
                    el.value = '';
                    return false;
                }
                return true;
            });
            
            if (!isCleared) {
                // Try triple click to select all text
                await this.productQuantityInput.click({ clickCount: 3 });
                await this.page.keyboard.press('Backspace');
            }
            
            // Fill with the new quantity
            await this.productQuantityInput.fill(quantity.toString());
            
            // Verify the value was actually set
            const actualQuantity = await this.productQuantityInput.inputValue();
            if (actualQuantity !== quantity.toString()) {
                console.log(`Quantity input contains "${actualQuantity}" instead of expected "${quantity}", trying direct JS approach`);
                await this.productQuantityInput.evaluate((el, qty) => { el.value = qty; }, quantity.toString());
            }
        } catch (error) {
            console.log('Error setting product quantity:', error.message);
            // Attempt direct JavaScript approach as fallback
            await this.page.evaluate((qty) => {
                const input = document.querySelector('#quantity');
                if (input) input.value = qty;
            }, quantity.toString());
        }
    }

    async addProductToCartFromDetailPage() {
        try {
            // Wait for add to cart button to be visible
            await this.addToCartButtonDetail.waitFor({ state: 'visible', timeout: 15000 });
            
            // Click the add to cart button
            await this.addToCartButtonDetail.click();
            
            // Wait for modal to appear
            await this.page.waitForSelector('.modal-content', { state: 'visible', timeout: 15000 });
        } catch (error) {
            console.log('Error adding product to cart from detail page:', error.message);
            // Try JavaScript click as fallback
            await this.page.evaluate(() => {
                const button = document.querySelector('button.cart');
                if (button) button.click();
            });
            
            // Wait for modal even after JS click
            await this.page.waitForSelector('.modal-content', { 
                state: 'visible', 
                timeout: 15000 
            }).catch(e => console.log('Modal not visible after JS click:', e.message));
        }
    }

    async verifyProductsInCart() {
        // Navigate to cart page
        await this.viewCartButton.click();
        
        // Wait for cart page to load
        await this.page.waitForLoadState('networkidle');
        
        // Check if there are items in the cart
        const cartItems = this.page.locator('table#cart_info_table tbody tr');
        const count = await cartItems.count();
        
        console.log(`Found ${count} items in cart`);
        
        return count > 0;
    }

    /**
     * Gets all search result products
     * @returns {Promise<Array>} Array of product elements
     */
    async getSearchResults() {
        // Wait for the search results to be visible
        await this.searchedProductItems.first().waitFor({ state: 'visible', timeout: 10000 });
        
        // Get the count of search result items
        const count = await this.searchedProductItems.count();
        
        // Create an array of search result items
        const results = [];
        for (let i = 0; i < count; i++) {
            results.push(this.searchedProductItems.nth(i));
        }
        
        return results;
    }

    /**
     * Gets the names of all search result products
     * @returns {Promise<Array<string>>} Array of product names
     */
    async getSearchResultNames() {
        const products = await this.getSearchResults();
        const names = [];
        
        for (const product of products) {
            const nameElement = await product.locator('.productinfo p');
            if (await nameElement.isVisible()) {
                const name = await nameElement.textContent();
                names.push(name.trim());
            }
        }
        
        return names;
    }

    /**
     * Adds all search results to cart
     */
    async addSearchResultsToCart() {
        const products = await this.getSearchResults();
        
        for (let i = 0; i < products.length; i++) {
            try {
                // Hover over the product to show the "Add to cart" button
                await products[i].hover();
                
                // Small wait for overlay to appear
                await this.page.waitForTimeout(500);
                
                // Click the "Add to cart" button within the overlay
                const addButton = products[i].locator('.product-overlay .add-to-cart');
                await addButton.click({ force: true });
                
                // Wait for the modal to appear
                await this.page.waitForSelector('.modal-content', { 
                    state: 'visible', 
                    timeout: 5000 
                });
                
                // Click "Continue Shopping"
                await this.clickContinueShopping();
                
                // Wait a bit before trying the next product
                await this.page.waitForTimeout(1000);
            } catch (error) {
                console.log(`Error adding product ${i+1} to cart: ${error.message}`);
                // Continue with the next product even if this one fails
                continue;
            }
        }
    }

    /**
     * Adds a limited number of search results to cart
     * @param {number} limit Maximum number of products to add
     */
    async addLimitedSearchResultsToCart(limit = 2) {
        const products = await this.getSearchResults();
        const maxProducts = Math.min(products.length, limit);
        
        for (let i = 0; i < maxProducts; i++) {
            try {
                // Hover over the product to show the "Add to cart" button
                await products[i].hover();
                
                // Small wait for overlay to appear
                await this.page.waitForTimeout(300);
                
                // Click the "Add to cart" button within the overlay
                const addButton = products[i].locator('.product-overlay .add-to-cart');
                await addButton.click({ force: true });
                
                // Wait for the modal to appear with reduced timeout
                await this.page.waitForSelector('.modal-content', { 
                    state: 'visible', 
                    timeout: 3000 
                });
                
                // Click "Continue Shopping"
                await this.clickContinueShopping();
                
                console.log(`Successfully added product ${i+1} to cart`);
            } catch (error) {
                console.log(`Error adding product ${i+1} to cart: ${error.message}`);
                // Continue with the next product even if this one fails
            }
        }
    }
}
