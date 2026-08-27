import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";

interface AuthLayoutProps {
  children: ReactNode;
}

export default function AuthLayout({ children }: AuthLayoutProps) {
  return (
    <main className="min-h-screen bg-white">
      <div className="grid min-h-screen lg:grid-cols-2">
        {/* =========================================
            LEFT SIDE
        ========================================== */}
        <div className="relative flex min-h-screen flex-col px-5 sm:px-8 lg:px-12 xl:px-16">
          {/* Logo */}
          <div className="pt-5 sm:pt-7">
            <Link href="/" className="inline-flex">
              <Image
                src="/images/logo.png"
                alt="Enhancement"
                width={120}
                height={60}
                priority  
                className="h-auto w-[50px] sm:w-[45px]"
              />
            </Link>
          </div>

          {/* Form */}
          <div className="flex flex-1 items-center justify-center py-12">
            <div className="w-full max-w-[360px] sm:max-w-[400px]">
              {children}
            </div>
          </div>
        </div>

        {/* =========================================
            RIGHT SIDE IMAGE
        ========================================== */}
        <div className="relative hidden min-h-screen overflow-hidden rounded-l-[24px] lg:block">
          <Image
            src="/images/auth-image.png"
            alt="Enhancement service"
            fill
            priority
            sizes="50vw"
            className="object-cover"
          />
        </div>
      </div>
    </main>
  );
}
