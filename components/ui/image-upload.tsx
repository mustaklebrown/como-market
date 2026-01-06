"use client";

import { UploadDropzone } from "@/lib/uploadthing";
import { X } from "lucide-react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

interface ImageUploadProps {
    value: string[];
    onChange: (value: string[]) => void;
    onRemove: (value: string) => void;
    disabled?: boolean;
}

export default function ImageUpload({
    value,
    onChange,
    onRemove,
    disabled
}: ImageUploadProps) {
    return (
        <div>
            <div className="mb-4 flex items-center gap-4">
                {value.map((url) => (
                    <div key={url} className="relative w-[200px] h-[200px] rounded-md overflow-hidden">
                        <div className="z-10 absolute top-2 right-2">
                            <Button type="button" onClick={() => onRemove(url)} variant="destructive" size="icon">
                                <X className="h-4 w-4" />
                            </Button>
                        </div>
                        <Image
                            fill
                            className="object-cover"
                            alt="Image"
                            src={url}
                        />
                    </div>
                ))}
            </div>
            <UploadDropzone
                endpoint="imageUploader"
                onClientUploadComplete={(res) => {
                    onChange([...value, ...res.map((r) => r.url)]);
                }}
                onUploadError={(error: Error) => {
                    toast.error(`ERROR! ${error.message}`);
                }}
                disabled={disabled}
            />
        </div>
    );
}
