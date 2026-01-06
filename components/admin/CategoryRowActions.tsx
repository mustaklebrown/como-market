"use client";

import { useTransition, useState } from "react";
import { MoreHorizontal, Pencil, Trash2 } from "lucide-react";
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
import { toast } from "sonner";
import { deleteCategory } from "@/actions/category";
import { CategoryDialog } from "./CategoryDialog";

interface CategoryRowActionsProps {
    category: any;
}

export function CategoryRowActions({ category }: CategoryRowActionsProps) {
    const router = useRouter();
    const [isPending, startTransition] = useTransition();
    const [showEditDialog, setShowEditDialog] = useState(false);

    const handleDelete = () => {
        if (confirm("Are you sure you want to delete this category?")) {
            startTransition(async () => {
                try {
                    await deleteCategory(category.id);
                    toast.success("Category deleted successfully");
                    router.refresh();
                } catch (error) {
                    toast.error("Failed to delete category");
                }
            });
        }
    };

    return (
        <>
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="h-8 w-8 p-0">
                        <span className="sr-only">Open menu</span>
                        <MoreHorizontal className="h-4 w-4" />
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                    <DropdownMenuLabel>Actions</DropdownMenuLabel>
                    <DropdownMenuItem onClick={() => navigator.clipboard.writeText(category.id)}>
                        Copy ID
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onSelect={() => setShowEditDialog(true)}>
                        <Pencil className="mr-2 h-4 w-4" /> Edit
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={handleDelete} className="text-red-600 focus:text-red-600 cursor-pointer">
                        <Trash2 className="mr-2 h-4 w-4" /> Delete
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>

            <CategoryDialog
                initialData={category}
                open={showEditDialog}
                onOpenChange={setShowEditDialog}
            />
        </>
    );
}
