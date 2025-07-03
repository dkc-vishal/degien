
"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import { X, Edit3 } from "lucide-react"; // Added Edit3 icon
import React from "react";
export interface IssueImage {
  id: string;
  url: string;
  file: File;
  name: string;
}

export interface Issue {
  id: string;
  description: string;
  images: IssueImage[];
  status?: string;
  priority?: string;
  createdDate?: string;
}
interface ImagePreviewProps {
  image: IssueImage;
  onRemove: (imageId: string) => void;
  onOpenImageEditor?: () => void; // Optional: To be passed if editing is enabled
}

export default function ImagePreview({ image, onRemove, onOpenImageEditor }: ImagePreviewProps) {
  return (
    <div className="relative group w-24 h-24 rounded-md overflow-hidden border shadow-sm cursor-pointer" onClick={onOpenImageEditor}>
      <Image
        src={image.url} 
        alt={image.name || "Uploaded image"}
        width={96}
        height={96}
        className="object-cover w-full h-full"
        data-ai-hint="issue image"
      />
      <div className="absolute top-1 right-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex flex-col gap-1">
        <Button
            variant="destructive"
            size="icon"
            className="h-6 w-6"
            onClick={(e) => { e.stopPropagation(); onRemove(image.id); }}
            aria-label="Remove image"
        >
            <X size={16} />
        </Button>
        {onOpenImageEditor && (
            <Button
                variant="secondary"
                size="icon"
                className="h-6 w-6"
                onClick={(e) => { e.stopPropagation(); onOpenImageEditor(); }}
                aria-label="Edit image"
            >
                <Edit3 size={14} />
            </Button>
        )}
      </div>
    </div>
  );
}
