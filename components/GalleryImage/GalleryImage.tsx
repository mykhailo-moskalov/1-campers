"use client";

import { isValidUrl } from "@/lib/utils";
import Image from "next/image";
import { useState } from "react";

interface GalleryImageProps {
  src: string;
  alt: string;
  width: number;
  height: number;
  className?: string;
}

const GalleryImage = ({
  src,
  alt,
  width,
  height,
  className,
}: GalleryImageProps) => {
  const [imgSrc, setImgSrc] = useState(
    isValidUrl(src) ? src : "/placeholder.png",
  );

  return (
    <Image
      src={imgSrc}
      alt={alt}
      width={width}
      height={height}
      loading="lazy"
      className={className}
      onError={() => setImgSrc("/placeholder.png")}
    />
  );
};

export default GalleryImage;
