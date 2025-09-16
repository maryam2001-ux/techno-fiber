// app/products/[productSlug]/[itemSlug]/layout.js
import Script from "next/script";
import { productsList } from "@/data/productsList";

// Helper function to extract title based on data structure
const getProductTitle = (product, fallback = "Product") => {
  if (typeof product.title === "string") return product.title;
  if (typeof product.title === "object") {
    return product.title.en || product.title.ar || fallback;
  }
  return fallback;
};

// Generate breadcrumb items
const generateBreadcrumbItems = (productSlug, itemSlug, productTitle) => [
  {
    "@type": "ListItem",
    position: 1,
    name: "Home",
    item: "https://www.technofiberegypt.com"
  },
  {
    "@type": "ListItem",
    position: 2,
    name: "Products",
    item: "https://www.technofiberegypt.com/products"
  },
  {
    "@type": "ListItem",
    position: 3,
    name: productSlug.charAt(0).toUpperCase() + productSlug.slice(1).replace(/-/g, " "),
    item: `https://www.technofiberegypt.com/products/${productSlug}`
  },
  {
    "@type": "ListItem",
    position: 4,
    name: productTitle,
    item: `https://www.technofiberegypt.com/products/${productSlug}/${itemSlug}`
  }
];

// Metadata (Server Component)
export async function generateMetadata({ params }) {
  const { productSlug, itemSlug } = await params;
  
  const product = productsList[productSlug]?.find((p) => p.slug === itemSlug);

  if (!product) {
    return {
      title: "Product Not Found | TechnoFiber Egypt",
      description: "The product you are looking for does not exist.",
    };
  }

  const title = getProductTitle(product);

  return {
    title: `${title} | TechnoFiber Egypt`,
    description: "Explore this product from TechnoFiber Egypt.",
    openGraph: {
      title: `${title} | TechnoFiber Egypt`,
      description: "Explore this product from TechnoFiber Egypt.",
      url: `https://www.technofiberegypt.com/products/${productSlug}/${itemSlug}`,
      siteName: "TechnoFiber Egypt",
      locale: "en_US",
      type: "website",
    },
    alternates: {
      canonical: `https://www.technofiberegypt.com/products/${productSlug}/${itemSlug}`,
    },
    robots: {
      index: true,
      follow: true,
    },
  };
}

// Layout Component
export default async function ProductLayout({ children, params }) {
  const { productSlug, itemSlug } = await params;
  
  const product = productsList[productSlug]?.find((p) => p.slug === itemSlug);

  if (!product) {
    return <>{children}</>;
  }

  const title = getProductTitle(product);
  const breadcrumbItems = generateBreadcrumbItems(productSlug, itemSlug, title);

  return (
    <>
      {/* Breadcrumb Schema */}
      <Script
        id="breadcrumb-schema"
        type="application/ld+json"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            itemListElement: breadcrumbItems,
          }),
        }}
      />
      {children}
    </>
  );
}
