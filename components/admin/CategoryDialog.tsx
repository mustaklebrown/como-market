"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import CategoryForm from "@/components/admin/CategoryForm";

interface CategoryDialogProps {
    initialData?: any;
    children?: React.ReactNode;
    open?: boolean;
    onOpenChange?: (open: boolean) => void;
}

export function CategoryDialog({ initialData, children, open, onOpenChange }: CategoryDialogProps) {
    const [internalOpen, setInternalOpen] = useState(false);

    const isControlled = open !== undefined && onOpenChange !== undefined;
    const finalOpen = isControlled ? open : internalOpen;
    const finalSetOpen = isControlled ? onOpenChange : setInternalOpen;

    const title = initialData ? "Edit Category" : "Add Category";
    const description = initialData ? "Update category details." : "Create a new product category.";

    return (
        <Dialog open={finalOpen} onOpenChange={finalSetOpen}>
            {!isControlled && (
                <DialogTrigger asChild>
                    {children || (
                        <Button className="rounded-full font-bold" suppressHydrationWarning>
                            <Plus className="mr-2 h-4 w-4" /> Add Category
                        </Button>
                    )}
                </DialogTrigger>
            )}
            <DialogContent className="sm:max-w-md">
                <DialogHeader className="items-center text-center">
                    <DialogTitle>{title}</DialogTitle>
                    <DialogDescription>
                        {description}
                    </DialogDescription>
                </DialogHeader>
                <CategoryForm onClose={() => finalSetOpen?.(false)} initialData={initialData} />
            </DialogContent>
        </Dialog>
    );
}
