import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import prisma from "@/lib/prisma";
import ProductForm from "@/components/admin/ProductForm";

export default async function EditProductPage({ params }: { params: { productId: string } }) {
    const session = await auth.api.getSession({
        headers: await headers(),
    });

    if (!session || session.user.role !== "admin") {
        redirect("/");
    }

    // Await params if necessary (Next.js 15+ sometimes requires it, but string is usually direct in 14. 
    // Wait, params is an object, but accessing property might need await in future versions.
    // However, for now, let's treat it as standard.
    const { productId } = await Promise.resolve(params);

    const product = await prisma.product.findUnique({
        where: { id: productId },
    });

    if (!product) {
        redirect("/admin/products");
    }

    const categories = await prisma.category.findMany({
        select: { id: true, name: true }
    });

    return (
        <div className="space-y-8 max-w-4xl mx-auto">
            <div>
                <h1 className="text-3xl font-black tracking-tight">Edit Product</h1>
                <p className="text-muted-foreground mt-1">Update existing product details.</p>
            </div>

            <ProductForm categories={categories} initialData={product} />
        </div>
    );
}
