import { MetadataRoute } from 'next';
import { getProducts, getCategories } from '@/services/product.service';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://como-market.com';

  // Fetch all products and categories
  const products = await getProducts();
  const categories = await getCategories();

  const productUrls = products.map((product) => ({
    url: `${baseUrl}/product/${product.slug}`,
    lastModified: product.updatedAt ? new Date(product.updatedAt) : new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.7,
  }));

  const categoryUrls = categories.map((category) => ({
    url: `${baseUrl}/collections/${category.slug}`,
    lastModified: category.updatedAt
      ? new Date(category.updatedAt)
      : new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  }));

  const staticUrls = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 1.0,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.5,
    },
    {
      url: `${baseUrl}/collections`,
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/products`,
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 0.9,
    },
  ];

  return [...staticUrls, ...productUrls, ...categoryUrls];
}
