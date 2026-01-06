import { PrismaClient } from '@/lib/generated/prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';
import pg from 'pg';
import * as dotenv from 'dotenv';

dotenv.config();

const connectionString = process.env.DATABASE_URL;
const pool = new pg.Pool({ connectionString });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

async function main() {
  console.log('Start seeding...');

  // Clear existing data
  // Note: Delete products first because they depend on categories
  try {
    await prisma.orderItem.deleteMany();
    await prisma.order.deleteMany();
    await prisma.product.deleteMany();
    await prisma.category.deleteMany();
  } catch (error) {
    console.log('Error clearing data, moving on...', error);
  }

  // 1. Create Categories
  const categoriesData = [
    {
      name: 'Shoes',
      slug: 'shoes',
      description: 'Premium footwear for urban life and performance.',
      image:
        'https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=2070&auto=format&fit=crop',
    },
    {
      name: 'Watches',
      slug: 'watches',
      description: 'Elegant timepieces for every occasion.',
      image:
        'https://images.unsplash.com/photo-1524592094714-0f0654e20314?q=80&w=1999&auto=format&fit=crop', // Watch image
    },
    {
      name: 'Bags',
      slug: 'bags',
      description: 'Functional and stylish carry goods.',
      image:
        'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?q=80&w=1887&auto=format&fit=crop', // Bag image
    },
    {
      name: 'Electronics',
      slug: 'electronics',
      description: 'High-tech gadgets for the modern world.',
      image:
        'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=2070&auto=format&fit=crop', // Headphones
    },
  ];

  const categories: Record<string, string> = {};

  for (const cat of categoriesData) {
    const created = await prisma.category.create({
      data: cat,
    });
    categories[cat.name] = created.id;
    console.log(`Created category: ${cat.name}`);
  }

  // 2. Create Products
  const products = [
    {
      name: 'Urban Runner Pro',
      slug: 'urban-runner-pro',
      description:
        'The ultimate performance running shoe for urban environments. Engineered with responsive cushioning and a breathable mesh upper for maximum comfort during your city sprints.',
      price: 159,
      discountPrice: 129,
      stock: 50,
      categoryId: categories['Shoes'], // Link using ID
      images: [
        'https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=2070&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?q=80&w=2000&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1608231387042-66d1773070a5?q=80&w=2000&auto=format&fit=crop',
      ],
      isFeatured: true,
      isNew: true,
      sku: 'SH-URB-001',
      features: [
        'Responsive Nitro-foam cushioning',
        'Breathable engineered mesh upper',
        'Durable rubber outsole for city grip',
        'Reflective details for night safety',
        'Lightweight design (240g)',
      ],
      details: {
        Weight: '240g',
        Drop: '8mm',
        Terrain: 'Road',
        Support: 'Neutral',
      },
    },
    {
      name: 'Classic Chronograph',
      slug: 'classic-chronograph',
      description:
        'A timeless timepiece that combines precision Swiss engineering with a sleek, modern aesthetic. Featuring a surgical-grade stainless steel case and scratch-resistant sapphire crystal.',
      price: 349,
      stock: 30,
      categoryId: categories['Watches'],
      images: [
        'https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=1999&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1522312346375-d1a52e2b99b3?q=80&w=2000&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1547996160-81dfa63595dd?q=80&w=2000&auto=format&fit=crop',
      ],
      isFeatured: true,
      isNew: false,
      sku: 'WT-CLS-002',
      features: [
        'Swiss Quartz movement',
        'Sapphire crystal glass',
        '5ATM Water resistance',
        'Genuine Italian leather strap',
        'Surgical-grade stainless steel case',
      ],
      details: {
        'Case Material': 'Stainless Steel',
        Movement: 'Swiss Quartz',
        'Water Resistance': '50 Meters',
        'Band Width': '22mm',
      },
    },
    {
      name: 'Leather Weekend Bag',
      slug: 'leather-weekend-bag',
      description:
        'Crafted from premium full-grain leather, this bag is designed to last a lifetime. Spacious enough for all your weekend essentials with dedicated compartments for tech and travel documents.',
      price: 280,
      discountPrice: 240,
      stock: 20,
      categoryId: categories['Bags'],
      images: [
        'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?q=80&w=1887&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?q=80&w=1769&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1590874103328-eac38a683ce7?q=80&w=2000&auto=format&fit=crop',
      ],
      isFeatured: true,
      isNew: false,
      sku: 'BG-LWB-003',
      features: [
        'Premium full-grain leather',
        'Heavy-duty brass hardware',
        'Removable padded shoulder strap',
        'Separate shoe compartment',
        'Internal laptop sleeve (up to 15")',
      ],
      details: {
        Dimensions: '50 x 30 x 25 cm',
        Capacity: '35 Liters',
        Material: 'Full-grain Leather',
        Hardware: 'Antiqued Brass',
      },
    },
    {
      name: 'Stealth Backpack',
      slug: 'stealth-backpack',
      description:
        'A minimalist backpack designed for the modern commuter. Water-resistant and packed with smart organizational features to keep your gear safe and organized in any weather.',
      price: 120,
      stock: 100,
      categoryId: categories['Bags'],
      images: [
        'https://images.unsplash.com/photo-1622560480605-d83c853bc5c3?q=80&w=2000&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1581605405669-fcdf81165afa?q=80&w=2000&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?q=80&w=1887&auto=format&fit=crop', // Same bag image as fallback
      ],
      isFeatured: false,
      isNew: true,
      sku: 'BG-STH-004',
      features: [
        'Water-resistant 1000D Cordura',
        'Secret anti-theft pocket',
        'Quick-access tech compartment',
        'Ergonomic S-curve shoulder straps',
        'Luggage handle pass-through',
      ],
      details: {
        Material: '1000D Nylon',
        Volume: '20 Liters',
        'Laptop Size': '16"',
        Weight: '0.9 kg',
      },
    },
    {
      name: 'Sonic Over-Ear ANC',
      slug: 'sonic-over-ear-anc',
      description:
        'Immerse yourself in pure studio-quality sound with adaptive active noise cancellation. Designed for ultimate comfort during long listening sessions.',
      price: 299,
      discountPrice: 249,
      stock: 45,
      categoryId: categories['Electronics'],
      images: [
        'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=2070&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1546435770-a3e426bf472b?q=80&w=2000&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1583394838336-acd97773cf3f?q=80&w=2000&auto=format&fit=crop',
      ],
      isFeatured: true,
      isNew: true,
      sku: 'EL-SNC-005',
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

  for (const product of products) {
    await prisma.product.create({
      data: product,
    });
    console.log(`Created product: ${product.name}`);
  }

  console.log('Seeding finished.');
}

main()
  .catch((e) => {
    console.dir(e, { depth: null });
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
