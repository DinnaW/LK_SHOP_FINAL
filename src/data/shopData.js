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
import homeItem1 from '@/assets/home-item1.png'
import homeItem2 from '@/assets/home-item2.png'
import homeItem3 from '@/assets/home-item3.png'
import homeItem4 from '@/assets/home-item4.png'
import homeItem5 from '@/assets/home-item5.png'
import homeItem6 from '@/assets/home-item6.png'
import homeItem7 from '@/assets/home-item7.png'
import longPro from '@/assets/longpro.jpg'
import prodc2 from '@/assets/prodc2.jpg'
import skinCare1 from '@/assets/skin-care1.png'
import skinCare2 from '@/assets/skin-care2.png'
import skinCare3 from '@/assets/skin-care3.png'
import skinCare4 from '@/assets/skin-care4.png'
import skinCare5 from '@/assets/skin-care5.png'

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
    title: 'Smart watch wide banner',
    img: featured4,
  },
  {
    title: 'Streaming device banner',
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
    img: homeItem1,
  },
  {
    title: 'Modern Table Lamp',
    category: 'Lighting',
    price: 8950,
    old: 10500,
    badge: '15% Off',
    buttonLabel: 'Add To Cart',
    img: homeItem2,
  },
  {
    title: 'Premium Cushion Collection',
    category: 'Bedding & Cushions',
    price: 6630,
    old: 7800,
    badge: 'Deal',
    buttonLabel: 'Add To Cart',
    img: homeItem3,
  },
  {
    title: 'Decorative Storage Basket',
    category: 'Storage',
    price: 10370,
    old: 12200,
    badge: 'Best',
    buttonLabel: 'Select Options',
    img: homeItem4,
  },
  {
    title: 'Marble Serving Tray',
    category: 'Kitchen Accessories',
    price: 5850,
    old: 6900,
    badge: 'New',
    buttonLabel: 'Add To Cart',
    img: homeItem5,
  },
  {
    title: 'Premium Side By Side Refrigerator',
    category: 'Home Appliances',
    price: 12950,
    old: 14950,
    badge: 'Premium',
    buttonLabel: 'Add To Cart',
    img: longPro,
  },
  {
    title: 'Portable Party Speaker',
    category: 'Audio Devices',
    price: 4450,
    old: 5200,
    badge: 'Deal',
    buttonLabel: 'Add To Cart',
    img: prodc2,
  },
  {
    title: 'Wooden Desk Organizer',
    category: 'Storage',
    price: 7650,
    old: 8900,
    badge: 'Best',
    buttonLabel: 'Add To Cart',
    img: homeItem7,
  },
]

export const mosaicBanners = [
  {
    title: 'Unleash Your Music',
    badge: '-30%',
    className: 'tile-a',
    img: 'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?q=80&w=900&auto=format&fit=crop',
  },
  {
    title: 'Top Brand Toys 60% Off',
    badge: 'BIG SALE',
    className: 'tile-b',
    img: 'https://images.unsplash.com/photo-1596461404969-9ae70f2830c1?q=80&w=900&auto=format&fit=crop',
  },
  {
    title: 'Immersive Gaming Realm',
    badge: 'NEW',
    className: 'tile-c',
    img: 'https://images.unsplash.com/photo-1605901309584-818e25960a8f?q=80&w=900&auto=format&fit=crop',
  },
  {
    title: 'Immersive Gaming Realm',
    badge: 'NEW',
    className: 'tile-d',
    img: 'https://images.unsplash.com/photo-1607853202273-797f1c22a38e?q=80&w=900&auto=format&fit=crop',
  },
  {
    title: 'Camera Sale!',
    kicker: 'Popular Brands',
    className: 'tile-e',
    img: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?q=80&w=1100&auto=format&fit=crop',
  },
]


export const megaSaleProducts = [
  {
    title: 'Xiaomi 43 Inch A Pro 4K QLED Smart TV',
    category: 'Mega Sale TV',
    price: 126100,
    old: 134100,
    monthly: 2235,
    discount: '',
    extra: '5%',
    save: 8000,
    badge: 'Mega Sale',
    img: megaSaleTv,
  },
  {
    title: 'Xiaomi Mobile Phone Redmi 15C 5G 4GB RAM',
    category: 'Mega Sale Mobile',
    price: 49140,
    old: 55999,
    monthly: 910,
    discount: '2%',
    extra: '9%',
    save: 6859,
    badge: 'Mega Sale',
    img: megaSalePhone,
  },
  {
    title: 'Xiaomi 1.75L Blender Pro',
    category: 'Mega Sale Appliance',
    price: 38466,
    old: 47990,
    monthly: 713,
    discount: '10%',
    extra: '10%',
    save: 9524,
    badge: 'Mega Sale',
    img: megaSaleBlender,
  },
  {
    title: 'Xiaomi Redmi Watch 5 Active Amoled Square Shape',
    category: 'Mega Sale Wearable',
    price: 9000,
    old: 19999,
    monthly: 167,
    discount: '49%',
    extra: '10%',
    save: 10999,
    badge: 'Mega Sale',
    img: megaSaleWatch,
  },
]

export const recommendedProducts = [
  {
    title: 'Deep Action Exfoliating Cleanser',
    category: 'Skin Care',
    price: 6950,
    old: 8250,
    reviews: 24,
    badge: 'New',
    img: skinCare1,
  },
  {
    title: 'Hydrating Face Cream',
    category: 'Skin Care',
    price: 7450,
    old: 8900,
    reviews: 31,
    badge: 'Sale',
    img: skinCare2,
  },
  {
    title: 'Minimal Ceramic Vase Set',
    category: 'Home Decor',
    price: 6950,
    old: 8250,
    reviews: 19,
    badge: 'Deal',
    img: homeItem1,
  },
  {
    title: 'Modern Table Lamp',
    category: 'Lighting',
    price: 8950,
    old: 10500,
    reviews: 52,
    badge: 'Popular',
    img: homeItem2,
  },
  {
    title: 'Premium Cushion Collection',
    category: 'Bedding & Cushions',
    price: 6630,
    old: 7800,
    reviews: 14,
    badge: 'Premium',
    img: homeItem3,
  },
]

export const electronicsProducts = [
  {
    title: 'Q16 AMD Console 3.5 Inch Game Player',
    category: 'Gaming Console',
    price: 9500,
    old: 11900,
    reviews: 67,
    badge: 'Top',
    img: 'https://images.unsplash.com/photo-1606144042614-b2417e99c4e3?q=80&w=600&auto=format&fit=crop',
  },
  {
    title: 'UGREEN 4K HDMI Extension Cable',
    category: 'Computer Accessories',
    price: 8450,
    old: 9350,
    reviews: 44,
    badge: 'New',
    img: 'https://images.unsplash.com/photo-1611174797138-52c2873ca2b1?q=80&w=600&auto=format&fit=crop',
  },
  {
    title: 'PS5 Hot Wheels Monster Trucks',
    category: 'PS5 Games',
    price: 13950,
    old: 15950,
    reviews: 37,
    badge: 'Sale',
    img: 'https://images.unsplash.com/photo-1607853202273-797f1c22a38e?q=80&w=600&auto=format&fit=crop',
  },
  {
    title: 'ADATA SC750 External SSD',
    category: 'Storage Devices',
    price: 39950,
    old: 45950,
    reviews: 23,
    badge: 'Fast',
    img: 'https://images.unsplash.com/photo-1601737487795-dab272f52420?q=80&w=600&auto=format&fit=crop',
  },
  {
    title: 'Logitech MK215 Wireless Keyboard',
    category: 'Computer Accessories',
    price: 7950,
    old: 8950,
    reviews: 81,
    badge: 'Best',
    img: 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?q=80&w=600&auto=format&fit=crop',
  },
]

export const premiumFeature = {
  title: 'Sony WH-1000XM Premium Headphones',
  category: 'Premium Audio',
  price: 98500,
  old: 115000,
  reviews: 96,
  badge: 'Premium',
  img: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=900&auto=format&fit=crop',
}

export const premiumProducts = [
  {
    title: 'PS5 DualSense Controller',
    category: 'Gaming',
    price: 28950,
    old: 32950,
    img: 'https://images.unsplash.com/photo-1605901309584-818e25960a8f?q=80&w=600&auto=format&fit=crop',
  },
  {
    title: 'Apple Watch Style Tracker',
    category: 'Wearable',
    price: 74900,
    old: 89900,
    img: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=600&auto=format&fit=crop',
  },
  {
    title: 'Premium Portable Speaker',
    category: 'Audio',
    price: 24500,
    old: 29900,
    img: 'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?q=80&w=600&auto=format&fit=crop',
  },
  {
    title: 'Ergonomic Wireless Mouse',
    category: 'Office',
    price: 13950,
    old: 16500,
    img: 'https://images.unsplash.com/photo-1527814050087-3793815479db?q=80&w=600&auto=format&fit=crop',
  },
]

export const lifestyleProducts = [
  {
    title: 'Harpic Bathroom Cleaner',
    category: 'Personal Care',
    price: 4374,
    old: 5450,
    reviews: 25,
    badge: '10% Off',
    img: 'https://images.unsplash.com/photo-1585421514284-efb74c2b69ba?q=80&w=900&auto=format&fit=crop',
  },
  {
    title: 'Atlas Active Fit Backpack',
    category: 'Bags',
    price: 2750,
    old: 3750,
    reviews: 30,
    badge: 'Deal',
    img: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?q=80&w=600&auto=format&fit=crop',
  },
  {
    title: 'Casio Scientific Calculator',
    category: 'Office',
    price: 8200,
    old: 9200,
    reviews: 52,
    badge: 'Popular',
    img: 'https://images.unsplash.com/photo-1564473185935-58113cba1e80?q=80&w=900&auto=format&fit=crop',
  },
  {
    title: 'Premium Hot Water Shower',
    category: 'Home',
    price: 44491,
    old: 48990,
    reviews: 14,
    badge: 'Premium',
    img: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?q=80&w=900&auto=format&fit=crop',
  },
  {
    title: 'Double A A4 80 GSM Paper',
    category: 'Paper Products',
    price: 1580,
    old: 1750,
    reviews: 63,
    badge: 'Office',
    img: 'https://images.unsplash.com/photo-1586075010923-2dd4570fb338?q=80&w=600&auto=format&fit=crop',
  },
]

export const bestProducts = [
  {
    title: 'Brightening Serum',
    category: 'Skin Care',
    price: 8950,
    old: 10500,
    reviews: 38,
    badge: 'Best',
    img: skinCare3,
  },
  {
    title: 'Modern Table Lamp',
    category: 'Home Accessories',
    price: 8950,
    old: 10500,
    reviews: 52,
    badge: 'Sale',
    img: homeItem2,
  },
  {
    title: 'Decorative Storage Basket',
    category: 'Storage',
    price: 10370,
    old: 12200,
    reviews: 77,
    badge: 'Best',
    img: homeItem4,
  },
  {
    title: 'Premium Cushion Collection',
    category: 'Home Decor',
    price: 6630,
    old: 7800,
    reviews: 49,
    badge: 'New',
    img: homeItem3,
  },
  {
    title: 'Gentle Facial Cleanser',
    category: 'Skin Care',
    price: 5850,
    old: 6900,
    reviews: 21,
    badge: 'Deal',
    img: skinCare4,
  },
  {
    title: 'Minimal Ceramic Vase Set',
    category: 'Home Decor',
    price: 6950,
    old: 8250,
    reviews: 36,
    badge: 'Home',
    img: homeItem1,
  },
  {
    title: 'Hydrating Face Cream',
    category: 'Beauty',
    price: 7450,
    old: 8900,
    reviews: 58,
    badge: 'Top',
    img: skinCare2,
  },
  {
    title: 'Daily Moisture Lotion',
    category: 'Personal Care',
    price: 6350,
    old: 7600,
    reviews: 42,
    badge: 'Fresh',
    img: skinCare5,
  },
  {
    title: 'Glass Tableware Set',
    category: 'Tableware',
    price: 12950,
    old: 14950,
    reviews: 64,
    badge: 'Premium',
    img: homeItem6,
  },
  {
    title: 'Marble Serving Tray',
    category: 'Kitchen Accessories',
    price: 5850,
    old: 6900,
    reviews: 29,
    badge: 'Pick',
    img: homeItem5,
  },
]


applyProductImages(weeklyShowcaseCards)
applyProductImages(electronicsProducts)
applyProductImages(premiumProducts)
applyProductImages(lifestyleProducts)
premiumFeature.img = product1

export const moreProductGridProducts = [
  {
    title: 'Smart Home Control Hub',
    category: 'Smart Devices',
    price: 14950,
    old: 17950,
    reviews: 46,
    badge: 'New',
  },
  {
    title: 'Premium Desk Setup Kit',
    category: 'Office Picks',
    price: 12950,
    old: 14950,
    reviews: 29,
    badge: 'Popular',
  },
  {
    title: 'Wireless Audio Dock',
    category: 'Audio',
    price: 16950,
    old: 19950,
    reviews: 38,
    badge: 'Hot',
  },
  {
    title: 'Compact Kitchen Helper',
    category: 'Home Essentials',
    price: 9950,
    old: 11950,
    reviews: 31,
    badge: 'Deal',
  },
  {
    title: 'Everyday Tech Organizer',
    category: 'Top Rated',
    price: 5750,
    old: 6950,
    reviews: 54,
    badge: 'Best',
  },
]


applyProductImages(moreProductGridProducts)
export const reviews = [
  {
    initial: 'P',
    name: 'Pasandul Senadhira',
    time: '1 month ago',
    text: 'Excellent shopping experience. Delivery was fast, the item was packed safely, and the product quality matched the listing.',
  },
  {
    initial: 'A',
    name: 'Abdullah Hisham',
    time: '1 month ago',
    text: 'Very smooth process from order to delivery. The package arrived the next day and everything was handled professionally.',
  },
  {
    initial: 'T',
    name: 'Thorushka Dinujaya',
    time: '2 months ago',
    text: 'Customer support was responsive and helpful. They confirmed my order quickly and arranged delivery without any delay.',
  },
  {
    initial: 'A',
    name: 'Ajeema Shafeek',
    time: '1 month ago',
    text: 'Great collection with clear product details. The website was easy to use and checkout felt simple and reliable.',
  },
]
