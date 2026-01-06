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
import Image from "next/image";
import { CategoryDialog } from "@/components/admin/CategoryDialog";
import { CategoryRowActions } from "@/components/admin/CategoryRowActions";

export default async function AdminCategoriesPage() {
    const session = await auth.api.getSession({
        headers: await headers(),
    });

    if (!session || session.user.role !== "admin") {
        redirect("/");
    }

    const categories = await prisma.category.findMany({
        orderBy: { name: 'asc' },
        include: { _count: { select: { products: true } } }
    });

    return (
        <div className="space-y-8">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-black tracking-tight">Categories</h1>
                    <p className="text-muted-foreground mt-1">Organize your products.</p>
                </div>
                <CategoryDialog />
            </div>

            <div className="rounded-xl border border-border/50 bg-card overflow-hidden">
                <Table>
                    <TableHeader className="bg-muted/30">
                        <TableRow>
                            <TableHead className="w-[80px]">Image</TableHead>
                            <TableHead>Name</TableHead>
                            <TableHead>Slug</TableHead>
                            <TableHead>Products</TableHead>
                            <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {categories.map((category) => (
                            <TableRow key={category.id} className="hover:bg-muted/30 transition-colors">
                                <TableCell>
                                    <div className="relative h-10 w-10 rounded-md overflow-hidden bg-muted border border-border/50">
                                        {category.image && (
                                            <Image
                                                src={category.image}
                                                alt={category.name}
                                                fill
                                                className="object-cover"
                                            />
                                        )}
                                    </div>
                                </TableCell>
                                <TableCell className="font-medium">{category.name}</TableCell>
                                <TableCell className="text-muted-foreground">{category.slug}</TableCell>
                                <TableCell>{category._count.products}</TableCell>
                                <TableCell className="text-right">
                                    <CategoryRowActions category={category} />
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
        </div>
    );
}
