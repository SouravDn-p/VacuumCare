import Image from "next/image";

import { Pencil, UserRound } from "lucide-react";

interface ProfileHeaderProps {
  name: string;
  email: string;

  image: string | null;

  isFetching?: boolean;

  onEdit: () => void;
}

export default function ProfileHeader({
  name,
  email,
  image,
  isFetching,
  onEdit,
}: ProfileHeaderProps) {
  return (
    <section className="rounded-[16px] border border-[#e7f0fb] bg-white p-5 sm:p-6">
      <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
        {/* User */}
        <div className="flex items-center gap-4">
          <div className="relative flex h-[86px] w-[86px] shrink-0 items-center justify-center overflow-hidden rounded-full border-[5px] border-[#e8eeee] bg-[#f1f6ff]">
            {image ? (
              <Image
                src={image}
                alt={name}
                fill
                sizes="86px"
                className="object-cover"
              />
            ) : (
              <UserRound
                size={34}
                strokeWidth={1.5}
                className="text-[#1a73e8]"
              />
            )}
          </div>

          <div>
            <div className="flex items-center gap-2">
              <h1
                className="text-[28px] font-extrabold leading-[1.15] text-[#1a73e8] sm:text-[32px]"
                style={{
                  fontFamily: "Manrope, sans-serif",
                }}
              >
                {name}
              </h1>

              {isFetching && (
                <span className="h-2 w-2 animate-pulse rounded-full bg-[#1a73e8]" />
              )}
            </div>

            <p className="mt-1 text-[14px] text-[#4f5a61] sm:text-[15px]">
              {email}
            </p>
          </div>
        </div>

        {/* Edit */}
        <button
          type="button"
          onClick={onEdit}
          className="inline-flex h-[44px] items-center justify-center gap-2 self-start rounded-[10px] bg-[#f1f4f5] px-5 text-[14px] font-semibold text-[#1a73e8] transition hover:bg-[#e6eef8] sm:self-auto"
        >
          <Pencil size={17} strokeWidth={1.8} />
          Edit Profile
        </button>
      </div>
    </section>
  );
}
