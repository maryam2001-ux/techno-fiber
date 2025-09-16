// app/products/[productSlug]/layout.js

// ✅ Generate Metadata for SEO
export async function generateMetadata({ params }) {
  const { productSlug } = params;

  // ممكن تعملي Map لو عايزة descriptions مختلفة لكل slug
  const descriptions = {
    grating: "Explore fiberglass gratings – durable, lightweight, and corrosion-resistant. Perfect for industrial and urban projects.",
    handrails: "Browse fiberglass handrails – strong, safe, and maintenance-free solutions for industrial and civil use.",
    kiosks: "Discover fiberglass kiosks – customizable, durable, and ideal for urban environments.",
    "manhole-covers": "Shop fiberglass manhole covers – lightweight, durable, and resistant to rust and theft.",
    tanks: "Explore fiberglass storage tanks – safe, reliable, and suitable for various industries.",
    metro: "Find fiberglass metro components – strong, lightweight, and built for long-lasting infrastructure.",
    playground: "Discover fiberglass playground equipment – safe, fun, and durable for kids.",
  };

  const title = `${productSlug.replace(/-/g, " ")} | TechnoFiber Egypt`;
  const description =
    descriptions[productSlug] ||
    `Explore high-quality fiberglass ${productSlug} products from TechnoFiber Egypt.`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url: `https://www.technofiberegypt.com/products/${productSlug}`,
      siteName: "TechnoFiber",
      images: [
        {
          url: "https://www.technofiberegypt.com/og-image.jpg",
          width: 1200,
          height: 630,
          alt: `${productSlug} | TechnoFiber`,
        },
      ],
      locale: "en_US",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: ["https://www.technofiberegypt.com/og-image.jpg"],
    },
    robots: {
      index: true,
      follow: true,
    },
  };
}

// ✅ Layout Component
export default function ProductSlugLayout({ children }) {
  return <>{children}</>;
}
