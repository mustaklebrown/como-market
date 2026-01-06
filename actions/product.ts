'use server';

import db from '@/lib/prisma';
import { revalidatePath } from 'next/cache';

export async function createProduct(data: any) {
  try {
    const { features, ...rest } = data;

    await db.product.create({
      data: {
        ...rest,
        features: features || [],
        slug: `${data.slug}-${Math.random().toString(36).substring(7)}`, // Ensure unique slug
      },
    });

    revalidatePath('/admin/products');
    return { success: true };
  } catch (error) {
    console.error('Error creating product:', error);
    throw new Error('Failed to create product');
  }
}

export async function updateProduct(id: string, data: any) {
  try {
    const { features, ...rest } = data;

    await db.product.update({
      where: { id },
      data: {
        ...rest,
        features: features || [],
      },
    });

    revalidatePath('/admin/products');
    revalidatePath(`/admin/products/${id}`);
    return { success: true };
  } catch (error) {
    console.error('[UPDATE_PRODUCT]', error);
    throw new Error('Failed to update product');
  }
}

export async function deleteProduct(id: string) {
  try {
    await db.product.delete({
      where: { id },
    });

    revalidatePath('/admin/products');
    return { success: true };
  } catch (error) {
    console.error('[DELETE_PRODUCT]', error);
    throw new Error('Failed to delete product');
  }
}
