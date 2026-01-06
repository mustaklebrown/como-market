"use client";

import { useForm, type Resolver } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Separator } from "@/components/ui/separator";
import ImageUpload from "@/components/ui/image-upload";
import { toast } from "sonner";
import { createProduct, updateProduct } from "@/actions/product";

// ... (schema remains same)

const productSchema = z.object({
    name: z.string().min(2, "Name must be at least 2 characters"),
    slug: z.string().min(2, "Slug must be at least 2 characters"),
    description: z.string().min(10, "Description must be at least 10 characters"),
    price: z.coerce.number().int().min(0, "Price must be a positive integer (e.g., cents)"),
    discountPrice: z.coerce.number().int().min(0).optional(),
    stock: z.coerce.number().int().min(0, "Stock must be a positive integer"),
    categoryId: z.string().min(1, "Please select a category"),
    images: z.string().url("Must be a valid URL").array().optional(),
    sku: z.string().optional(),
    features: z.string().optional(), // We will parse this string into an array on submit
    isFeatured: z.boolean().default(false),
    isNew: z.boolean().default(false),
});

type ProductFormValues = z.infer<typeof productSchema>;

interface ProductFormProps {
    categories: { id: string; name: string }[];
    initialData?: any | null; // using any for flexibility with Prisma types for now
}

export default function ProductForm({ categories, initialData }: ProductFormProps) {
    const router = useRouter();
    const [loading, setLoading] = useState(false);

    const title = initialData ? "Edit Product" : "Create Product";
    const description = initialData ? "Edit a product." : "Add a new product";
    const toastMessage = initialData ? "Product updated." : "Product created.";
    const action = initialData ? "Save changes" : "Create";

    const form = useForm<ProductFormValues>({
        resolver: zodResolver(productSchema) as Resolver<ProductFormValues>,
        defaultValues: initialData ? {
            ...initialData,
            price: parseFloat(String(initialData.price)),
            discountPrice: initialData.discountPrice ? parseFloat(String(initialData.discountPrice)) : undefined,
            features: initialData.features?.join('\n') || "",
        } : {
            name: "",
            slug: "",
            description: "",
            price: 0,
            stock: 0,
            categoryId: "",
            images: [],
            isFeatured: false,
            isNew: false,
            features: "",
            sku: "",
        },
    });

    async function onSubmit(data: ProductFormValues) {
        setLoading(true);
        try {
            const formattedData = {
                ...data,
                features: data.features ? data.features.split('\n').filter(line => line.trim() !== '') : [],
            };

            if (initialData) {
                await updateProduct(initialData.id, formattedData);
            } else {
                await createProduct(formattedData);
            }

            toast.success(toastMessage);
            router.push("/admin/products");
            router.refresh();
        } catch (error) {
            console.error(error);
            toast.error("Something went wrong");
        } finally {
            setLoading(false);
        }
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-4">
                        <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Product Name</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Premium Leather Bag" {...field} onChange={(e) => {
                                            field.onChange(e);
                                            // Auto-generate slug
                                            const slug = e.target.value.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
                                            form.setValue('slug', slug);
                                        }} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="slug"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Slug</FormLabel>
                                    <FormControl>
                                        <Input placeholder="premium-leather-bag" {...field} />
                                    </FormControl>
                                    <FormDescription>URL-friendly version of the name.</FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="categoryId"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Category</FormLabel>
                                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                                        <FormControl>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Select a category" />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            {categories.map((cat) => (
                                                <SelectItem key={cat.id} value={cat.id}>{cat.name}</SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="sku"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>SKU (Stock Keeping Unit)</FormLabel>
                                    <FormControl>
                                        <Input placeholder="PRD-001" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="description"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Description</FormLabel>
                                    <FormControl>
                                        <Textarea placeholder="Product details..." className="h-32" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="features"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Features (One per line)</FormLabel>
                                    <FormControl>
                                        <Textarea placeholder="- Feature 1&#10;- Feature 2&#10;- Feature 3" className="h-32" {...field} />
                                    </FormControl>
                                    <FormDescription>Enter each feature on a new line.</FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>

                    <div className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                            <FormField
                                control={form.control}
                                name="price"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Price ($)</FormLabel>
                                        <FormControl>
                                            <Input type="number" placeholder="99" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="discountPrice"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Discount Price ($)</FormLabel>
                                        <FormControl>
                                            <Input type="number" placeholder="79" {...field} onChange={(e) => field.onChange(e.target.value === '' ? undefined : Number(e.target.value))} />
                                        </FormControl>
                                        <FormDescription>Optional.</FormDescription>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>

                        <FormField
                            control={form.control}
                            name="stock"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Stock Quantity</FormLabel>
                                    <FormControl>
                                        <Input type="number" placeholder="100" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <div className="grid grid-cols-2 gap-4 pt-4">
                            <FormField
                                control={form.control}
                                name="isFeatured"
                                render={({ field }) => (
                                    <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                                        <div className="space-y-0.5">
                                            <FormLabel className="text-base">Featured</FormLabel>
                                            <FormDescription>Show on home page</FormDescription>
                                        </div>
                                        <FormControl>
                                            <input
                                                type="checkbox"
                                                checked={field.value}
                                                onChange={field.onChange}
                                                className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                                            />
                                        </FormControl>
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="isNew"
                                render={({ field }) => (
                                    <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                                        <div className="space-y-0.5">
                                            <FormLabel className="text-base">New Updated</FormLabel>
                                            <FormDescription>Mark as new arrival</FormDescription>
                                        </div>
                                        <FormControl>
                                            <input
                                                type="checkbox"
                                                checked={field.value}
                                                onChange={field.onChange}
                                                className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                                            />
                                        </FormControl>
                                    </FormItem>
                                )}
                            />
                        </div>


                        <FormField
                            control={form.control}
                            name="images"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Images</FormLabel>
                                    <FormControl>
                                        <ImageUpload
                                            value={field.value || []}
                                            disabled={loading}
                                            onChange={(newUrls) => field.onChange(newUrls)}
                                            onRemove={(url) => field.onChange((field.value?.filter((current) => current !== url)))}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>
                </div>

                <Separator />

                <div className="flex justify-end gap-4">
                    <Button variant="outline" type="button" onClick={() => router.back()}>Cancel</Button>
                    <Button type="submit" disabled={loading}>
                        {loading ? "Saving..." : action}
                    </Button>
                </div>
            </form>
        </Form>
    );
}
