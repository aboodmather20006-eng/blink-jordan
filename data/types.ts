export interface ProductVariant {
  id: string;
  size: string;
  stock: number;
  available: boolean;
}
export interface Product {
  id: string;
  slug: string;
  name: string;
  price?: number;
  description: string;
  category: string;
  images: string[];
  sizes: string[];
  variants: ProductVariant[];
  featured: boolean;
  newArrival: boolean;
  bestSeller: boolean;
  tags: string[];
  material: string;
  fit: string;
}
export interface CartLine {
  productId: string;
  variantId: string;
  productName: string;
  productImage: string;
  selectedSize: string;
  quantity: number;
}
export interface CheckoutData {
  fullName: string;
  phone: string;
  governorate: string;
  area: string;
  address: string;
  notes: string;
}
