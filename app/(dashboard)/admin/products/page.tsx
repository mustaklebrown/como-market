import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import prisma from "@/lib/prisma";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { ProductRowActions } from "@/components/admin/ProductRowActions";
import Image from "next/image";

export default async function AdminProductsPage() {
    const session = await auth.api.getSession({
        headers: await headers(),
    });

    if (!session || session.user.role !== "admin") {
        redirect("/");
    }

    const products = await prisma.product.findMany({
        orderBy: { createdAt: 'desc' },
        include: { category: true }
    });

    return (
        <div className="space-y-8">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-black tracking-tight">Products</h1>
                    <p className="text-muted-foreground mt-1">Manage your store's inventory.</p>
                </div>
                <Button asChild className="rounded-full font-bold">
                    <Link href="/admin/products/new">
                        <Plus className="mr-2 h-4 w-4" /> Add Product
                    </Link>
                </Button>
            </div>

            <div className="rounded-xl border border-border/50 bg-card overflow-hidden">
                <Table>
                    <TableHeader className="bg-muted/30">
                        <TableRow>
                            <TableHead className="w-[80px]">Image</TableHead>
                            <TableHead>Name</TableHead>
                            <TableHead>Category</TableHead>
                            <TableHead>Price</TableHead>
                            <TableHead>Stock</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {products.length === 0 ? (
                            <TableRow>
                                <TableCell colSpan={7} className="h-24 text-center">
                                    No products found.
                                </TableCell>
                            </TableRow>
                        ) : (
                            products.map((product) => (
                                <TableRow key={product.id} className="hover:bg-muted/30 transition-colors">
                                    <TableCell>
                                        <div className="relative h-12 w-12 rounded-lg overflow-hidden bg-muted border border-border/50">
                                            {product.images[0] && (
                                                <Image
                                                    src={product.images[0]}
                                                    alt={product.name}
                                                    fill
                                                    className="object-cover"
                                                />
                                            )}
                                        </div>
                                    </TableCell>
                                    <TableCell className="font-medium">
                                        {product.name}
                                        {product.isNew && (
                                            <Badge variant="secondary" className="ml-2 text-[10px] h-5">New</Badge>
                                        )}
                                    </TableCell>
                                    <TableCell>
                                        <Badge variant="outline">{product.category?.name || "Uncategorized"}</Badge>
                                    </TableCell>
                                    <TableCell>
                                        {product.discountPrice ? (
                                            <div className="flex flex-col">
                                                <span className="font-bold text-primary">${product.discountPrice}</span>
                                                <span className="text-xs text-muted-foreground line-through">${product.price}</span>
                                            </div>
                                        ) : (
                                            <span className="font-bold">${product.price}</span>
                                        )}
                                    </TableCell>
                                    <TableCell>
                                        {product.stock}
                                    </TableCell>
                                    <TableCell>
                                        {product.stock > 0 ? (
                                            <Badge className="bg-green-500/15 text-green-600 dark:text-green-400 hover:bg-green-500/25 border-green-500/20">In Stock</Badge>
                                        ) : (
                                            <Badge variant="destructive">Out of Stock</Badge>
                                        )}
                                    </TableCell>
                                    <TableCell className="text-right">
                                        <ProductRowActions id={product.id} />
                                    </TableCell>
                                </TableRow>
                            ))
                        )}
                    </TableBody>
                </Table>
            </div>
        </div>
    );
}
