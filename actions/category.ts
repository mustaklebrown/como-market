'use server';

import db from '@/lib/prisma';
import { revalidatePath } from 'next/cache';

export async function createCategory(data: any) {
  try {
    const { name, slug, description, image } = data;
    await db.category.create({
      data: {
        name,
        slug: `${slug}-${Math.random().toString(36).substring(7)}`,
        description,
        image,
      },
    });

    revalidatePath('/admin/categories');
    return { success: true };
  } catch (error) {
    console.error('[CREATE_CATEGORY]', error);
    throw new Error('Failed to create category');
  }
}

export async function updateCategory(id: string, data: any) {
  try {
    const { name, slug, description, image } = data;
    await db.category.update({
      where: { id },
      data: {
        name,
        slug, // We might not want to re-randomize slug on update, or maybe we do if user changed it. The form handles base slug.
        // If we want uniqueness on update too, we'd need logic. For now, let's trust the input or append if collision (Prisma will throw).
        // Let's just pass slug as is or maybe avoid updating it if not needed?
        // User might want to fix a typo.
        description,
        image,
      },
    });

    revalidatePath('/admin/categories');
    return { success: true };
  } catch (error) {
    console.error('[UPDATE_CATEGORY]', error);
    throw new Error('Failed to update category');
  }
}

export async function deleteCategory(id: string) {
  try {
    await db.category.delete({
      where: { id },
    });

    revalidatePath('/admin/categories');
    return { success: true };
  } catch (error) {
    console.error('[DELETE_CATEGORY]', error);
    throw new Error('Failed to delete category');
  }
}
