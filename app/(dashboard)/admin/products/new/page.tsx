import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import prisma from "@/lib/prisma";
import ProductForm from "@/components/admin/ProductForm";

export default async function NewProductPage() {
    const session = await auth.api.getSession({
        headers: await headers(),
    });

    if (!session || session.user.role !== "admin") {
        redirect("/");
    }

    const categories = await prisma.category.findMany({
        select: { id: true, name: true }
    });

    return (
        <div className="space-y-8 max-w-4xl mx-auto">
            <div>
                <h1 className="text-3xl font-black tracking-tight">Add Product</h1>
                <p className="text-muted-foreground mt-1">Create a new product listing.</p>
            </div>

            <ProductForm categories={categories} />
        </div>
    );
}
