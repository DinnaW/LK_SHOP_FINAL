import product1 from '@/assets/product-1.webp'
import product2 from '@/assets/product-2.webp'
import product3 from '@/assets/product-3.webp'
import product4 from '@/assets/product-4.webp'
import product5 from '@/assets/product-5.webp'
import featured1 from '@/assets/featured-1.png'
import featured2 from '@/assets/featured-2.png'
import featured3 from '@/assets/featured-3.png'
import featured4 from '@/assets/featured-4.png'
import featured5 from '@/assets/featured-5.png'
import homeAccessoriesMiddleBanner from '@/assets/home-accessories-middle-banner.png'
import megaSaleTv from '@/assets/mega-sale-tv.png'
import megaSalePhone from '@/assets/mega-sale-phone.png'
import megaSaleBlender from '@/assets/mega-sale-blender.png'
import megaSaleWatch from '@/assets/mega-sale-watch.png'

export { product1, product2, product3, product4, product5 }

const productImages = [product1, product2, product3, product4, product5]

const applyProductImages = (items) => {
  items.forEach((item, index) => {
    item.img = productImages[index % productImages.length]
  })

  return items
}

export const categorySidebarItems = [
  { label: 'Mega Sale', href: '#mega-sale', icon: 'fa-solid fa-bolt' },
  { label: 'Electronics', href: '#electronics', icon: 'fa-solid fa-microchip' },
  { label: 'Home Appliances', href: '#home-appliances', icon: 'fa-solid fa-blender-phone' },
  { label: 'Home Accessories', href: '#home-accessories', icon: 'fa-solid fa-couch' },
  { label: 'Mobile & Tablets', href: '#electronics', icon: 'fa-solid fa-mobile-screen-button' },
  { label: 'Computer Accessories', href: '#electronics', icon: 'fa-solid fa-keyboard' },
  { label: 'Gaming', href: '#featured-banners', icon: 'fa-solid fa-gamepad' },
  { label: 'Audio Devices', href: '#electronics', icon: 'fa-solid fa-headphones-simple' },
  { label: 'Cameras', href: '#electronics', icon: 'fa-solid fa-camera-retro' },
  { label: 'Smart Home', href: '#home-appliances', icon: 'fa-solid fa-house-signal' },
  { label: 'Health & Beauty', href: '#deals', icon: 'fa-solid fa-spa' },
  { label: 'Office Equipment', href: '#best-week', icon: 'fa-solid fa-briefcase' },
  { label: 'Cleaning Products', href: '#deals', icon: 'fa-solid fa-spray-can-sparkles' },
  { label: 'Kitchen Accessories', href: '#home-accessories', icon: 'fa-solid fa-mug-hot' },
  { label: 'Storage', href: '#home-accessories', icon: 'fa-solid fa-box-archive' },
  { label: 'Bedding & Cushions', href: '#home-accessories', icon: 'fa-solid fa-bed' },
  { label: 'Tableware', href: '#home-accessories', icon: 'fa-solid fa-utensils' },
  { label: 'Fashion', href: '#deals', icon: 'fa-solid fa-shirt' },
  { label: 'Sports & Outdoors', href: '#reviews', icon: 'fa-solid fa-dumbbell' },
  { label: 'Toys & Baby', href: '#featured-banners', icon: 'fa-solid fa-puzzle-piece' },
  { label: 'Best Sellers', href: '#best-week', icon: 'fa-solid fa-crown' },
]

export const scrollingCategories = [
  'Audio Devices',
  'Cameras',
  'Computer Accessories',
  'E-Readers',
  'Gaming Consoles',
  'Home Appliances',
  'Office Equipment',
  'Personal Care',
]

export const promos = [
  {
    badge: 'Trending',
    title: 'Gaming Zone',
    text: 'Controllers, consoles and accessories',
    image: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=900&auto=format&fit=crop',
  },
  {
    badge: '40% Off',
    title: 'Top Deals',
    text: 'Special prices for selected products',
    image: 'https://images.unsplash.com/photo-1599940824399-b87987ceb72a?q=80&w=900&auto=format&fit=crop',
  },
  {
    badge: 'New',
    title: 'Headphones',
    text: 'Newest audio arrivals',
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=900&auto=format&fit=crop',
  },
  {
    badge: 'Hot',
    title: 'PS5 Games',
    text: 'Gaming products for every player',
    image: 'https://images.unsplash.com/photo-1605901309584-818e25960a8f?q=80&w=900&auto=format&fit=crop',
  },
]

export const featuredProductBanners = [
  {
    title: 'Mobile phone banner',
    img: featured1,
  },
  {
    title: 'Smart watch banner',
    img: featured4,
  },
  {
    title: 'Streaming devices banner',
    img: featured2,
  },
  {
    title: 'Google Pixel banner',
    img: featured3,
  },
  {
    title: 'Featured product side banner',
    img: featured5,
  },
]

export const weeklyShowcaseCards = [
  {
    heading: 'Best of the Week',
    title: 'INNO64 Nissan Skyline GT-R Top Secret White IN64-R34TS-WHI',
    category: 'Diecast Model Cars',
    price: 6950,
    old: 8250,
    badge: '',
    cta: 'Add To Cart',
    img: 'https://images.unsplash.com/photo-1581235720704-06d3acfcb36f?q=80&w=900&auto=format&fit=crop',
  },
  {
    heading: 'Sale Products',
    title: 'GCD 1:64 Mini Cooper 1964 Racecar Set 4 Versions',
    category: 'Collectable Toys',
    price: 8950,
    old: 10500,
    badge: '8% OFF',
    cta: 'Select Options',
    img: 'https://images.unsplash.com/photo-1594736797933-d0501ba2fe65?q=80&w=900&auto=format&fit=crop',
  },
]

export const topWideBanners = [
  {
    badge: 'NEW',
    title: 'The Latest E-Readers',
    img: 'https://images.unsplash.com/photo-1513001900722-370f803f498d?q=80&w=1200&auto=format&fit=crop',
  },
  {
    badge: 'NEW',
    title: 'Decorate Your Table With a Desk Clock',
    img: 'https://images.unsplash.com/photo-1501139083538-0139583c060f?q=80&w=1200&auto=format&fit=crop',
  },
]

export const homeAccessoryCategories = [
  'All',
  'Home Decor',
  'Lighting',
  'Kitchen Accessories',
  'Storage',
  'Bedding & Cushions',
  'Tableware',
]
export const homeAccessoriesFeatureImage = homeAccessoriesMiddleBanner

export const homeAccessoryProducts = [
  {
    title: 'Minimal Ceramic Vase Set',
    category: 'Home Decor',
    price: 6950,
    old: 8250,
    badge: 'New',
    buttonLabel: 'Add To Cart',
  },
  {
    title: 'Modern Table Lamp',
    category: 'Lighting',
    price: 8950,
    old: 10500,
    badge: '15% Off',
    buttonLabel: 'Add To Cart',
  },
  {
    title: 'Premium Cushion Collection',
    category: 'Bedding & Cushions',
    price: 6630,
    old: 7800,
    badge: 'Deal',
    buttonLabel: 'Add To Cart',
  },
  {
    title: 'Decorative Storage Basket',
    category: 'Storage',
    price: 10370,
    old: 12200,
    badge: 'Best',
    buttonLabel: 'Select Options',
  },
  {
    title: 'Marble Serving Tray',
    category: 'Kitchen Accessories',
    price: 5850,
    old: 6900,
    badge: 'New',
    buttonLabel: 'Add To Cart',
  },
  {
    title: 'Glass Tableware Set',
    category: 'Tableware',
    price: 12950,
    old: 14950,
    badge: 'Premium',
    buttonLabel: 'Add To Cart',
  },
  {
    title: 'Soft Linen Throw Pillow',
    category: 'Bedding & Cushions',
    price: 4450,
    old: 5200,
    badge: 'Deal',
    buttonLabel: 'Add To Cart',
  },
  {
    title: 'Wooden Desk Organizer',
    category: 'Storage',
    price: 7650,
    old: 8990,
    badge: 'Top',
    buttonLabel: 'Add To Cart',
  },
]

export const megaSaleProducts = applyProductImages([
  {
    title: 'Apple Watch Series 9',
    category: 'Wearables',
    price: 75999,
    old: 82999,
    badge: '10% OFF',
    buttonLabel: 'Buy Now',
  },
  {
    title: 'Sony Noise Cancelling Headphones',
    category: 'Audio Devices',
    price: 68999,
    old: 74999,
    badge: 'Deal',
    buttonLabel: 'Buy Now',
  },
  {
    title: 'Apple iPhone 15 Pro Max',
    category: 'Mobile Phones',
    price: 479999,
    old: 519999,
    badge: 'Mega Sale',
    buttonLabel: 'Buy Now',
  },
  {
    title: 'Samsung UHD Smart TV',
    category: 'Televisions',
    price: 289999,
    old: 319999,
    badge: 'Best Price',
    buttonLabel: 'Buy Now',
  },
])

export const recommendedProducts = applyProductImages([
  {
    title: 'JBL Party Speaker',
    category: 'Audio Devices',
    price: 179999,
    old: 194999,
    badge: 'Trending',
    buttonLabel: 'Add To Cart',
  },
  {
    title: 'Apple AirPods Pro',
    category: 'Wearables',
    price: 88999,
    old: 95999,
    badge: 'Popular',
    buttonLabel: 'Add To Cart',
  },
  {
    title: 'Canon Mirrorless Camera',
    category: 'Cameras',
    price: 349999,
    old: 379999,
    badge: 'Limited',
    buttonLabel: 'Add To Cart',
  },
  {
    title: 'Samsung Galaxy Tablet',
    category: 'Mobile & Tablets',
    price: 124999,
    old: 134999,
    badge: 'New',
    buttonLabel: 'Add To Cart',
  },
  {
    title: 'Logitech Mechanical Keyboard',
    category: 'Computer Accessories',
    price: 26999,
    old: 29999,
    badge: 'Hot',
    buttonLabel: 'Add To Cart',
  },
])

export const electronicsProducts = applyProductImages([
  {
    title: 'PlayStation 5 Console',
    category: 'Gaming',
    price: 249999,
    old: 269999,
    badge: 'Best Seller',
    buttonLabel: 'Add To Cart',
  },
  {
    title: 'ASUS Gaming Laptop',
    category: 'Computer Accessories',
    price: 459999,
    old: 489999,
    badge: 'Featured',
    buttonLabel: 'Add To Cart',
  },
  {
    title: 'Anker Fast Charger',
    category: 'Mobile & Tablets',
    price: 9990,
    old: 11500,
    badge: 'New',
    buttonLabel: 'Add To Cart',
  },
  {
    title: 'GoPro Action Camera',
    category: 'Cameras',
    price: 155000,
    old: 169999,
    badge: 'Deal',
    buttonLabel: 'Add To Cart',
  },
  {
    title: 'Xiaomi Smart Display',
    category: 'Smart Home',
    price: 44999,
    old: 49999,
    badge: 'Special',
    buttonLabel: 'Add To Cart',
  },
])

export const bestProducts = applyProductImages([
  {
    title: 'Dyson Hair Dryer',
    category: 'Personal Care Gadget',
    price: 194999,
    old: 214999,
    badge: 'Premium',
    buttonLabel: 'Add To Cart',
  },
  {
    title: 'HP Laser Printer',
    category: 'Office Equipment',
    price: 82999,
    old: 89999,
    badge: 'Office Pick',
    buttonLabel: 'Add To Cart',
  },
  {
    title: 'Nintendo Switch OLED',
    category: 'Gaming',
    price: 119999,
    old: 129999,
    badge: 'Hot',
    buttonLabel: 'Add To Cart',
  },
  {
    title: 'Philips Air Fryer',
    category: 'Home Appliances',
    price: 55999,
    old: 61999,
    badge: 'Top Deal',
    buttonLabel: 'Add To Cart',
  },
  {
    title: 'Amazon Echo Dot',
    category: 'Audio Devices',
    price: 18999,
    old: 22999,
    badge: 'Smart Pick',
    buttonLabel: 'Add To Cart',
  },
])

export const reviews = [
  {
    name: 'Amanda Perera',
    role: 'Tech Enthusiast',
    text: 'The delivery was super fast and the products felt genuinely premium. LK Shop has become my go-to place for electronics and home finds.',
  },
  {
    name: 'Ryan Fernando',
    role: 'Interior Stylist',
    text: 'I love the clean layout and curated accessory range. Shopping feels easy, classy and very well organized from start to finish.',
  },
  {
    name: 'Nadeesha Silva',
    role: 'Frequent Buyer',
    text: 'Everything from the product cards to the quick checkout feels polished. It gives a modern brand experience that builds trust instantly.',
  },
]
