import type { Metadata } from "next";

import ScheduleDetailsClient from "@/components/schedule/ScheduleDetailsClient";

export const metadata: Metadata = {
  title: "Service Schedule",
};

interface Props {
  params: Promise<{
    id: string;
  }>;
}

export default async function ServiceSchedulePage({ params }: Props) {
  const { id } = await params;

  return (
    <main className="min-h-screen bg-white">
      <section className="mx-auto max-w-[1320px] px-5 pt-28 pb-32 sm:px-8 lg:px-10">
        <ScheduleDetailsClient requestId={id} />
      </section>
    </main>
  );
}
