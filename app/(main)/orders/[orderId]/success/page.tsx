import OrderSuccess from "@/components/orders/OrderSuccess";

interface Props {
  params: Promise<{
    orderId: string;
  }>;
}

export default async function OrderSuccessPage({ params }: Props) {
  const { orderId } = await params;

  return (
    <main>
      <section className="max-w-[1320px] mx-auto px-5 sm:px-8 lg:px-10 pt-36 pb-28">
        <OrderSuccess orderId={orderId} />
      </section>
    </main>
  );
}
