"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

interface ProductGalleryProps {
  name: string;
  images: string[];
}

export default function ProductGallery({ name, images }: ProductGalleryProps) {
  const [selectedImage, setSelectedImage] = useState(images[0] ?? "");

  useEffect(() => {
    setSelectedImage(images[0] ?? "");
  }, [images]);

  if (!selectedImage) {
    return (
      <div className="relative aspect-square rounded-[14px] bg-white overflow-hidden">
        <div className="flex h-full items-center justify-center text-[13px] text-[#8a959d]">
          No product image
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="relative aspect-square rounded-[14px] bg-white overflow-hidden">
        <Image
          src={selectedImage}
          alt={name}
          fill
          priority
          className="object-contain p-8"
        />
      </div>

      <div className="grid grid-cols-4 gap-4 mt-4">
        {images.slice(0, 4).map((image, index) => (
          <button
            key={`${image}-${index}`}
            type="button"
            onClick={() => setSelectedImage(image)}
            className={`relative aspect-square rounded-[10px] bg-white overflow-hidden border ${
              selectedImage === image ? "border-[#1a73e8]" : "border-[#edf0f3]"
            }`}
          >
            <Image
              src={image}
              alt={`${name} ${index + 1}`}
              fill
              className="object-contain p-2"
            />
          </button>
        ))}
      </div>
    </div>
  );
}
