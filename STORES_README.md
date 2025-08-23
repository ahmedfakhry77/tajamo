# Pinia Stores Documentation

This project uses separate Pinia stores for different functionalities to maintain clean separation of concerns and better state management.

## Store Structure

### 1. Products Store (`stores/products.js`)
Manages all product-related state and operations.

**State:**
- `products`: Array of all products
- `featuredProducts`: Array of featured products
- `loading`: Loading state
- `error`: Error state

**Getters:**
- `getProductById(id)`: Get product by ID
- `getProductsByCategory(categoryId)`: Get products by category
- `getFeaturedProducts`: Get featured products
- `getProductsBySlug(slug)`: Get products by slug
- `getProductsInStock`: Get products that are in stock
- `getDiscountedProducts`: Get products with discounts

**Actions:**
- `loadProducts()`: Load products (currently mock data)
- `fetchProducts()`: Fetch products from API
- `fetchProductById(id)`: Fetch specific product
- `searchProducts(query)`: Search products

### 2. Categories Store (`stores/categories.js`)
Manages category-related state and operations.

**State:**
- `categories`: Array of all categories
- `loading`: Loading state
- `error`: Error state

**Getters:**
- `getCategoryById(id)`: Get category by ID
- `getCategoryBySlug(slug)`: Get category by slug
- `getActiveCategories`: Get active categories

**Actions:**
- `loadCategories()`: Load categories (currently mock data)
- `fetchCategories()`: Fetch categories from API

### 3. Banners Store (`stores/banners.js`)
Manages banner-related state and operations.

**State:**
- `banners`: Array of all banners
- `loading`: Loading state
- `error`: Error state

**Getters:**
- `getBannerById(id)`: Get banner by ID
- `getActiveBanners`: Get active banners
- `getBannersByPosition(position)`: Get banners by position
- `getBannersByType(type)`: Get banners by type

**Actions:**
- `loadBanners()`: Load banners (currently mock data)
- `fetchBanners()`: Fetch banners from API

### 4. Favorites Store (`stores/favorites.js`)
Manages user favorites with localStorage persistence.

**State:**
- `favorites`: Array of favorite product IDs
- `loading`: Loading state
- `error`: Error state

**Getters:**
- `isFavorite(productId)`: Check if product is favorited
- `favoritesCount`: Get total favorites count
- `hasFavorites`: Check if user has favorites

**Actions:**
- `toggleFavorite(productId)`: Toggle favorite status
- `addToFavorites(productId)`: Add to favorites
- `removeFromFavorites(productId)`: Remove from favorites
- `clearFavorites()`: Clear all favorites
- `saveUserPreferences()`: Save to localStorage
- `loadUserPreferences()`: Load from localStorage

### 5. Cart Store (`stores/cart.js`)
Manages shopping cart with localStorage persistence.

**State:**
- `cart`: Array of cart items
- `loading`: Loading state
- `error`: Error state

**Getters:**
- `cartItemsCount`: Get total items in cart
- `cartTotal`: Get cart total (placeholder calculation)
- `getCartItem(productId)`: Get specific cart item
- `hasItems`: Check if cart has items

**Actions:**
- `addToCart(productId, quantity)`: Add item to cart
- `removeFromCart(productId)`: Remove item from cart
- `updateCartItemQuantity(productId, quantity)`: Update quantity
- `incrementQuantity(productId)`: Increment quantity
- `decrementQuantity(productId)`: Decrement quantity
- `clearCart()`: Clear cart
- `checkout()`: Process checkout (placeholder)

## Usage Examples

### In Components

```vue
<script setup>
import { useProductsStore } from '~/stores/products'
import { useFavoritesStore } from '~/stores/favorites'
import { useCartStore } from '~/stores/cart'

// Initialize stores
const productsStore = useProductsStore()
const favoritesStore = useFavoritesStore()
const cartStore = useCartStore()

// Use store state
const products = computed(() => productsStore.products)
const isFavorite = computed(() => favoritesStore.isFavorite(productId))
const cartCount = computed(() => cartStore.cartItemsCount)

// Use store actions
const toggleFavorite = () => favoritesStore.toggleFavorite(productId)
const addToCart = () => cartStore.addToCart(productId, 1)
</script>
```

### Store Initialization

The stores are automatically initialized when the app starts via the `plugins/stores.client.js` plugin. This plugin:

1. Imports all stores
2. Loads initial data
3. Loads user preferences from localStorage
4. Makes stores available globally if needed

## Data Structure

### Product Object
```javascript
{
  id: 1,
  slug: "product-slug",
  name: {
    es: "Spanish Name",
    en: "English Name"
  },
  description: ["Description text"],
  stock: 29,
  price: {
    original: "1,199.000",
    has_discount: true,
    after_discount: "1,019.000",
    discount_percentage: 15,
    currency: "ج.م"
  },
  category: {
    id: 1,
    slug: "category-slug"
  },
  thumbnail: "/images/product.jpg",
  gallery: ["/images/gallery1.jpg"]
}
```

### Category Object
```javascript
{
  id: 1,
  slug: "category-slug",
  name: {
    es: "Spanish Name",
    en: "English Name"
  },
  description: [],
  image: null,
  active: true
}
```

### Banner Object
```javascript
{
  id: 1,
  slug: "banner-slug",
  name: {
    ar: "Arabic Name",
    en: "English Name"
  },
  url: "/collections/url",
  image: "/images/banner.jpg",
  active: true,
  position: "hero",
  type: "collection"
}
```

## Local Storage

User preferences (favorites and cart) are automatically saved to and loaded from localStorage for persistence across browser sessions.

## Future Enhancements

1. **API Integration**: Replace mock data with actual API calls
5. **Performance**: Implement store lazy loading and code splitting

## Best Practices

1. **Use computed properties** for derived state
2. **Keep stores focused** on single responsibility
3. **Handle loading and error states** in components
4. **Use actions for async operations**
5. **Validate data** before updating store state
6. **Clean up event listeners** in component lifecycle hooks
