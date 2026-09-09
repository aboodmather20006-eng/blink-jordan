import type { Product } from './types';

const apparelSizes = ['S', 'M', 'L', 'XL'];
const pantsSizes = ['30', '32', '34', '36'];
const shoeSizes = ['40', '41', '42', '43', '44'];

const inventory = [
  { slug: 'boys-midnight-crew-t-shirt', name: 'Boys Midnight Crew T-Shirt', price: 22, category: 't-shirts', image: '/images/products/t-shirt1.jpeg', sizes: apparelSizes, description: 'A clean midnight tee with a relaxed everyday feel. Easy to pair with denim, cargos, or layered under an overshirt.' },
  { slug: 'bar-black-graphic-t-shirt', name: 'BAR Black Graphic T-Shirt', price: 25, category: 't-shirts', image: '/images/products/t-shirt2.jpeg', sizes: apparelSizes, description: 'A black graphic tee with a bold front print and an easy streetwear attitude. A simple statement piece for everyday outfits.' },
  { slug: 'burgundy-long-sleeve-shirt', name: 'Burgundy Long Sleeve Shirt', price: 28, category: 'shirts', image: '/images/products/shirt.jpeg', sizes: apparelSizes, description: 'A rich burgundy long-sleeve shirt with a clean, versatile profile. Wear it solo or layer it into a relaxed daily look.' },
  { slug: 'vintage-wash-wide-leg-jeans', name: 'Vintage Wash Wide-Leg Jeans', price: 32, category: 'pants', image: '/images/products/pants1.jpeg', sizes: pantsSizes, description: 'Vintage-wash wide-leg jeans with a relaxed silhouette and lived-in denim character. Made for easy, casual styling from day to night.' },
  { slug: 'light-blue-wide-leg-jeans', name: 'Light Blue Wide-Leg Jeans', price: 30, category: 'pants', image: '/images/products/pants2.jpeg', sizes: pantsSizes, description: 'Light-blue wide-leg jeans with a relaxed shape and fresh everyday color. Pair them with simple tees or layered shirts.' },
  { slug: 'blue-wide-leg-jeans', name: 'Blue Wide-Leg Jeans', price: 32, category: 'pants', image: '/images/products/pants3.jpeg', sizes: pantsSizes, description: 'Classic blue wide-leg jeans with a roomy, laid-back profile. A versatile base for casual looks and everyday rotation.' },
  { slug: 'retro-technical-sneakers', name: 'Retro Technical Sneakers', price: 45, category: 'shoes', image: '/images/products/shose.jpeg', sizes: shoeSizes, description: 'Retro-inspired sneakers with a layered, technical look and an easy everyday attitude. Style them with denim, cargos, or relaxed tailoring.' },
  { slug: 'beige-two-strap-sandals', name: 'Beige Two-Strap Sandals', price: 28, category: 'shoes', image: '/images/products/sliper.jpeg', sizes: shoeSizes, description: 'Beige two-strap sandals with a clean, minimal profile. An easy warm-weather choice for relaxed everyday outfits.' },
] as const;

export const products: Product[] = inventory.map((item, index) => ({
  id: `p${index + 1}`,
  slug: item.slug,
  name: item.name,
  price: item.price,
  category: item.category,
  images: [item.image],
  sizes: [...item.sizes],
  variants: item.sizes.map((size) => ({
    id: `p${index + 1}-${size}`,
    size,
    stock: 99,
    available: true,
  })),
  description: item.description,
  featured: false,
  newArrival: true,
  bestSeller: true,
  tags: [item.category, ...item.name.toLowerCase().split(' ')],
  material: '',
  fit: '',
}));
