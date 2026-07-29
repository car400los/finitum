"use client";

import gsap from "gsap";
import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";

export function PageTransition({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = containerRef.current;
    if (!element) return;

    const tl = gsap.timeline({ defaults: { ease: "power2.out" } });
    tl.set(element, {
      opacity: 0.96,
      y: 8,
      scale: 0.995,
      willChange: "transform, opacity",
    });
    tl.to(element, {
      opacity: 1,
      y: 0,
      scale: 1,
      duration: 0.5,
      delay: 0.02,
    });

    return () => {
      tl.kill();
    };
  }, [pathname]);

  return (
    <div key={pathname} ref={containerRef} className="min-h-screen w-full">
      {children}
    </div>
  );
}
