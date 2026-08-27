export type Product = {
  id: string;
  slug: string;
  name: string;
  category: string;
  subtitle: string;
  price: number;
  image: string;
  gallery: string[];
  description: string;
  features: string[];
  specifications?: Record<string, string>;
  shippingInfo?: string;
  warranty?: string | null;
  inStock: boolean;
};

export const products: Product[] = [
  {
    id: "1",
    slug: "elite-500-performance",
    name: "Elite 500 Performance",
    category: "Products",
    subtitle: "Quiet-flow technology",
    price: 899,
    image: "/images/products/elite-500.png",
    gallery: [
      "/images/products/elite-500.png",
      "/images/products/elite-500-2.png",
      "/images/products/elite-500-3.png",
      "/images/products/elite-500-4.png",
    ],
    description:
      "Quiet-flow technology, Elite 500 Performance Series redefines architectural cleanliness. Powered by a high-performance dual-stage motor and integrated HEPA filtration, it ensures a pristine environment with whisper-quiet operation and uncompromising suction power.",
    features: [
      "10-Year Comprehensive Warranty",
      "Complimentary Professional Installation",
      "Dual-stage motor delivering consistent power across every inlet.",
      "Advanced acoustic dampening for minimal disruption in the home.",
      "99.9% HEPA filtration capturing microscopic allergens and dust.",
      "Constructed with high-grade alloys and architectural precision.",
    ],
    inStock: true,
  },
  {
    id: "2",
    slug: "titan-hybrid-series",
    name: "Titan Hybrid Series",
    category: "Products",
    subtitle: "HEPA filtration system",
    price: 1249,
    image: "/images/products/titan-hybrid.png",
    gallery: [
      "/images/products/titan-hybrid.png",
      "/images/products/titan-hybrid.png",
    ],
    description:
      "A premium hybrid central vacuum system engineered for powerful filtration, consistent suction, and long-term reliability.",
    features: [
      "Premium HEPA filtration",
      "High performance motor",
      "Professional installation available",
      "Low-noise operation",
    ],
    inStock: true,
  },
  {
    id: "3",
    slug: "modern-wall-inlets",
    name: "Modern Wall Inlets",
    category: "Accessories",
    subtitle: "Set of 5 premium finishes",
    price: 145,
    image: "/images/products/wall-inlets.png",
    gallery: ["/images/products/wall-inlets.png"],
    description:
      "Premium architectural wall inlets designed to integrate naturally with modern interiors.",
    features: ["Premium finish", "Easy installation", "Modern design"],
    inStock: true,
  },
  {
    id: "4",
    slug: "pro-grip-hose-kit",
    name: "Pro-Grip Hose Kit",
    category: "Accessories",
    subtitle: "35ft Crush-proof design",
    price: 299,
    image: "/images/products/hose-kit.png",
    gallery: ["/images/products/hose-kit.png"],
    description:
      "Professional-grade central vacuum hose with a crush-resistant design and premium fittings.",
    features: ["35ft hose", "Crush-resistant", "Premium fittings"],
    inStock: true,
  },
];

export function formatPrice(price: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(price);
}

export function getProductBySlug(slug: string) {
  return products.find((product) => product.slug === slug);
}
