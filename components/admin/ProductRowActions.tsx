"use client";

import { useTransition } from "react";
import { MoreHorizontal, Pencil, Trash2, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { toast } from "sonner";
import { deleteProduct } from "@/actions/product";

interface ProductRowActionsProps {
    id: string;
}

export function ProductRowActions({ id }: ProductRowActionsProps) {
    const router = useRouter();
    const [isPending, startTransition] = useTransition();

    const handleDelete = () => {
        if (confirm("Are you sure you want to delete this product?")) {
            startTransition(async () => {
                try {
                    await deleteProduct(id);
                    toast.success("Product deleted successfully");
                    router.refresh();
                } catch (error) {
                    toast.error("Failed to delete product");
                }
            });
        }
    };

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="h-8 w-8 p-0">
                    <span className="sr-only">Open menu</span>
                    <MoreHorizontal className="h-4 w-4" />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
                <DropdownMenuLabel>Actions</DropdownMenuLabel>
                <DropdownMenuItem onClick={() => navigator.clipboard.writeText(id)}>
                    Copy ID
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                    <Link href={`/product/${id}`} target="_blank" className="flex items-center cursor-pointer">
                        <Eye className="mr-2 h-4 w-4" /> View Live
                    </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                    <Link href={`/admin/products/${id}`} className="flex items-center cursor-pointer">
                        <Pencil className="mr-2 h-4 w-4" /> Edit
                    </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleDelete} className="text-red-600 focus:text-red-600 cursor-pointer">
                    <Trash2 className="mr-2 h-4 w-4" /> Delete
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
