interface NavLink {
  name: string;
  href: string;
}
interface ICollection {
  id: string;
  title: string;
  description: string;
  image: string;
}

export interface ICategory {
  id: string;
  name: string;
  slug: string;
  description?: string | null;
  image?: string | null;
  updatedAt?: Date;
}

export interface IProduct {
  id: string;
  name: string;
  slug: string;
  description: string;
  price: number;
  discountPrice?: number;
  images: string[];
  stock: number;
  category: string;
  isFeatured: boolean;
  isNew: boolean;
  sku?: string;
  features: string[];
  details?: any;
  createdAt?: Date;
  updatedAt?: Date;
}

export const navlinks: NavLink[] = [
  {
    name: 'Home',
    href: '/',
  },
  {
    name: 'Products',
    href: '/products',
  },
  {
    name: 'Collections',
    href: '/collections',
  },
  {
    name: 'About',
    href: '/about',
  },
];

export const collections: ICollection[] = [
  {
    id: '1',
    title: 'Minimalist Shoes',
    description: 'Clean lines and premium materials for the modern urbanite.',
    image:
      'https://images.unsplash.com/photo-1549298916-b41d501d3772?q=80&w=2012&auto=format&fit=crop',
  },
  {
    id: '2',
    title: 'Luxury Watches',
    description: 'Precision engineering meets timeless craftsmanship.',
    image:
      'https://images.unsplash.com/photo-1524592094714-0f0654e20314?q=80&w=1999&auto=format&fit=crop',
  },
  {
    id: '3',
    title: 'Premium Bags',
    description: 'Durable and stylish companions for your daily journey.',
    image:
      'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?q=80&w=1769&auto=format&fit=crop',
  },
];

export const products: IProduct[] = [
  {
    id: '1',
    name: 'Urban Runner Pro',
    slug: 'urban-runner-pro',
    description:
      'The ultimate performance running shoe for urban environments. Lightweight, breathable, and built for speed.',
    price: 159,
    discountPrice: 129,
    images: [
      'https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=2070&auto=format&fit=crop',
    ],
    stock: 50,
    category: 'Shoes',
    isFeatured: true,
    isNew: true,
    features: ['Responsive cushioning', 'Breathable mesh'],
  },
  {
    id: '2',
    name: 'Classic Chronograph',
    slug: 'classic-chronograph',
    description:
      'A timeless timepiece that combines precision engineering with a sleek, modern aesthetic. Perfect for any occasion.',
    price: 349,
    images: [
      'https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=1999&auto=format&fit=crop',
    ],
    stock: 30,
    category: 'Watches',
    isFeatured: true,
    isNew: false,
    features: ['Water resistant', 'Leather strap'],
  },
  {
    id: '3',
    name: 'Leather Weekend Bag',
    slug: 'leather-weekend-bag',
    description:
      'Crafted from premium full-grain leather, this bag is designed to last a lifetime. Spacious enough for all your weekend essentials.',
    price: 280,
    discountPrice: 240,
    images: [
      'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?q=80&w=1887&auto=format&fit=crop',
    ],
    stock: 20,
    category: 'Bags',
    isFeatured: true,
    isNew: false,
    features: ['Full-grain leather', 'Brass hardware'],
  },
  {
    id: '4',
    name: 'Stealth Backpack',
    slug: 'stealth-backpack',
    description:
      'A minimalist backpack designed for the modern commuter. Water-resistant and packed with smart organizational features.',
    price: 120,
    images: [
      'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?q=80&w=1887&auto=format&fit=crop',
    ],
    stock: 100,
    category: 'Bags',
    isFeatured: false,
    isNew: true,
    features: ['Water resistant', 'Anti-theft'],
  },
  {
    id: '5',
    name: 'Sonic Over-Ear ANC',
    slug: 'sonic-over-ear-anc',
    description:
      'Immerse yourself in pure studio-quality sound with adaptive active noise cancellation. Designed for ultimate comfort during long listening sessions.',
    price: 299,
    discountPrice: 249,
    images: [
      'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=2070&auto=format&fit=crop',
    ],
    stock: 45,
    category: 'Electronics',
    isFeatured: true,
    isNew: true,
    features: [
      'Adaptive Noise Cancellation',
      '40-hour Battery life',
      'Hi-Res Audio certified',
      'Multipoint Bluetooth connection',
      'Memory foam ear cushions',
    ],
    details: {
      Driver: '40mm Neodymium',
      Battery: '40 Hours',
      Charging: 'USB-C Fast Charge',
      Bluetooth: 'V5.3',
    },
  },
];
