"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

import { useRouter } from "next/navigation";
import { useState } from "react";
import ImageUpload from "@/components/ui/image-upload";
import { toast } from "sonner";
import { createCategory, updateCategory } from "@/actions/category";

const categorySchema = z.object({
    name: z.string().min(2, "Name must be at least 2 characters"),
    slug: z.string().min(2, "Slug must be at least 2 characters"),
    description: z.string().optional(),
    imageUrl: z.string().url("Must be a valid URL").optional().or(z.literal("")),
});

type CategoryFormValues = z.infer<typeof categorySchema>;

interface CategoryFormProps {
    onClose: () => void;
    initialData?: any | null;
}

export default function CategoryForm({ onClose, initialData }: CategoryFormProps) {
    const router = useRouter();
    const [loading, setLoading] = useState(false);

    const title = initialData ? "Edit Category" : "Create Category";
    const toastMessage = initialData ? "Category updated." : "Category created.";
    const action = initialData ? "Save changes" : "Create Category";

    const form = useForm<CategoryFormValues>({
        resolver: zodResolver(categorySchema),
        defaultValues: initialData ? {
            ...initialData,
            imageUrl: initialData.image || "",
        } : {
            name: "",
            slug: "",
            description: "",
            imageUrl: "",
        },
    });

    async function onSubmit(data: CategoryFormValues) {
        setLoading(true);
        try {
            const formattedData = {
                ...data,
                image: data.imageUrl, // Map imageUrl to image
            };
            // Remove imageUrl from formattedData if strict, or let Prisma ignore it? 
            // Better to match what createCategory expects. The createCategory takes 'data: any' but Prisma needs correct fields.
            // Let's ensure we send 'image' which Prisma likely has (based on earlier context, schema had 'image').

            if (initialData) {
                await updateCategory(initialData.id, formattedData);
            } else {
                await createCategory(formattedData);
            }
            toast.success(toastMessage);
            router.refresh();
            onClose();
        } catch (error) {
            console.error(error);
            toast.error("Something went wrong");
        } finally {
            setLoading(false);
        }
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Category Name</FormLabel>
                            <FormControl>
                                <Input placeholder="Accessories" {...field} onChange={(e) => {
                                    field.onChange(e);
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
                                <Input placeholder="accessories" {...field} />
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
                                <Textarea placeholder="Category details..." {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />


                <FormField
                    control={form.control}
                    name="imageUrl"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Image</FormLabel>
                            <FormControl>
                                <ImageUpload
                                    value={field.value ? [field.value] : []}
                                    disabled={loading}
                                    onChange={(newUrls) => field.onChange(newUrls[0] || "")}
                                    onRemove={() => field.onChange("")}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <div className="flex justify-end gap-2 pt-4">
                    <Button variant="outline" type="button" onClick={onClose}>Cancel</Button>
                    <Button type="submit" disabled={loading}>
                        {loading ? "Saving..." : action}
                    </Button>
                </div>
            </form>
        </Form>
    );
}
