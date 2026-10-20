import { cn } from "@/lib/cn";
import Image from "next/image";

export function ParallaxFrame({
  src,
  alt,
  sizes,
  className,
  priority = false,
}: {
  src: string;
  alt: string;
  sizes: string;
  className?: string;
  priority?: boolean;
}) {
  return (
    <div className={cn("relative overflow-hidden bg-paper-2", className)}>
      <div className="view-parallax absolute -top-[22%] h-[144%] w-full">
        <Image
          src={src}
          alt={alt}
          fill
          sizes={sizes}
          priority={priority}
          className="object-cover grayscale"
        />
      </div>
    </div>
  );
}
