import prisma from '@/lib/prisma';
import { IProduct, ICategory } from '@/constants/data';

export async function getProducts(): Promise<IProduct[]> {
  try {
    const dbProducts = await prisma.product.findMany({
      orderBy: { createdAt: 'desc' },
      include: { category: true },
    });

    // Map Prisma model to our IProduct interface
    return dbProducts.map(
      (p: any) =>
        ({
          ...p,
          category: p.category?.name ?? 'Uncategorized',
          // details is already on p and matches IProduct.details (any)
        } as unknown as IProduct)
    );
  } catch (error) {
    console.error('Error fetching products:', error);
    return [];
  }
}

export async function getProductBySlug(slug: string): Promise<IProduct | null> {
  try {
    const product = await prisma.product.findUnique({
      where: { slug },
      include: { category: true },
    });

    if (!product) return null;

    return {
      ...product,
      category: product.category?.name ?? 'Uncategorized',
    } as unknown as IProduct;
  } catch (error) {
    console.error(`Error fetching product with slug ${slug}:`, error);
    return null;
  }
}

export async function getFeaturedProducts(): Promise<IProduct[]> {
  try {
    const dbProducts = await prisma.product.findMany({
      where: { isFeatured: true },
      take: 10,
      include: { category: true },
    });

    return dbProducts.map(
      (p: any) =>
        ({
          ...p,
          category: p.category?.name ?? 'Uncategorized',
        } as unknown as IProduct)
    );
  } catch (error) {
    console.error('Error fetching featured products:', error);
    return [];
  }
}

export async function getCategories(): Promise<ICategory[]> {
  try {
    const dbCategories = await prisma.category.findMany({
      orderBy: { name: 'asc' },
    });
    return dbCategories as ICategory[];
  } catch (error) {
    console.error('Error fetching categories:', error);
    return [];
  }
}
