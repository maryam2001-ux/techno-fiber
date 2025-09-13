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

// Helper function to extract description
const getProductDescription = (product, fallback = "High-quality fiberglass product.") => {
  if (typeof product.description === "string") return product.description;
  if (typeof product.description === "object") {
    return product.description.en || product.description.ar || fallback;
  }
  return fallback;
};

// Helper function to get product image
const getProductImage = (product) => {
  if (Array.isArray(product.img)) return product.img[0];
  return product.img || "/products/default.webp";
};

// Helper function to get all product images for schema
const getProductImages = (product) => {
  if (Array.isArray(product.img)) return product.img;
  return product.img ? [product.img] : ["/products/default.webp"];
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
    name: productSlug.charAt(0).toUpperCase() + productSlug.slice(1).replace(/-/g, ' '),
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
  const description = getProductDescription(product);
  const image = getProductImage(product);

  return {
    title: `${title} | TechnoFiber Egypt`,
    description,
    openGraph: {
      title: `${title} | TechnoFiber Egypt`,
      description,
      url: `https://www.technofiberegypt.com/products/${productSlug}/${itemSlug}`,
      siteName: "TechnoFiber Egypt",
      images: [
        {
          url: `https://www.technofiberegypt.com${image}`,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
      locale: "en_US",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: `${title} | TechnoFiber Egypt`,
      description,
      images: [`https://www.technofiberegypt.com${image}`],
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
  const description = getProductDescription(product);
  const images = getProductImages(product);
  const breadcrumbItems = generateBreadcrumbItems(productSlug, itemSlug, title);

  return (
    <>
      {/* Product Schema */}
      <Script
        id="product-schema"
        type="application/ld+json"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Product",
            name: title,
            image: images.map(img => `https://www.technofiberegypt.com${img}`),
            description: description,
            brand: { 
              "@type": "Brand", 
              name: "TechnoFiber Egypt" 
            },
            manufacturer: { 
              "@type": "Organization", 
              name: "TechnoFiber Egypt",
              url: "https://www.technofiberegypt.com",
              email: "info@technofiberegypt.com"
            },
            offers: {
              "@type": "Offer",
              availability: "https://schema.org/InStock",
              url: `https://www.technofiberegypt.com/products/${productSlug}/${itemSlug}`,
              seller: {
                "@type": "Organization",
                name: "TechnoFiber Egypt",
                url: "https://www.technofiberegypt.com",
                email: "info@technofiberegypt.com"
              }
            },
            category: productSlug.charAt(0).toUpperCase() + productSlug.slice(1).replace(/-/g, ' '),
            additionalProperty: [
              {
                "@type": "PropertyValue",
                name: "Material",
                value: "Fiberglass Reinforced Plastic (FRP)"
              },
              {
                "@type": "PropertyValue",
                name: "Application",
                value: "Industrial & Commercial Use"
              }
            ]
          }),
        }}
      />

      {/* Breadcrumb Schema */}
      <Script
        id="breadcrumb-schema"
        type="application/ld+json"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            itemListElement: breadcrumbItems
          }),
        }}
      />

      {children}
    </>
  );
}
