// app/layout.js أو app/layout.tsx

import { NextIntlClientProvider } from "next-intl";
import { cookies } from "next/headers";
import { locales, defaultLocale } from "../i18n";
import { Roboto_Slab, Oswald } from "next/font/google";
import "./globals.css";

const robotoSlab = Roboto_Slab({ subsets: ["latin"], weight: ["400", "700"] });
const oswald = Oswald({ subsets: ["latin"], weight: ["400", "700"] });

import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";
export async function generateMetadata() {
  const title =
    "TechnoFiber Company | الشركة الرائدة في منتجات فيبر جلاس (FRP)";
  const description =
    "TechnoFiber هي شركة رائدة متخصصة في تصنيع وتسويق منتجات فيبر جلاس (FRP) عالية الجودة والمتنوعة. الشركة تُعد الأولى في سوق الـ Moulded Grating في مصر، وتمتلك خط بولتروجين (Pultrusion Line) كامل لتصنيع مقاطع FRP كبدائل للحديد والألومنيوم.";

  const url = "https://www.technofiberegypt.com"; // ✅ رابطك الحقيقي
  const image = "https://www.technofiberegypt.com/images/og-image.jpg"; // ✅ غير للصورة الحقيقية

  return {
    title,
    description,
    keywords: [
      "TechnoFiber",
      "FRP Egypt",
      "Fiberglass Egypt",
      "فيبر جلاس مصر",
      "Moulded Grating",
      "Pultrusion Profiles",
      "منتجات فيبر جلاس",
      "بدائل الحديد",
      "بدائل الألومنيوم",
      "شركة FRP مصر",
    ],
    authors: [{ name: "TechnoFiber" }],
    publisher: "TechnoFiber",
    metadataBase: new URL(url),
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
    openGraph: {
      title,
      description,
      url,
      siteName: "TechnoFiber",
      locale: "ar_EG",
      type: "website",
      images: [
        {
          url: image,
          width: 1200,
          height: 630,
          alt: "TechnoFiber FRP Products",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [image],
    },
    alternates: {
      canonical: url,
      languages: {
        en: "https://www.technofiberegypt.com/en",
        ar: "https://www.technofiberegypt.com/ar",
      },
    },
    // ✅ favicon والأيقونات
    icons: {
      icon: [
        { url: "/Fiberglass-logo.webp", sizes: "32x32", type: "image/webp" },
        { url: "/Fiberglass-logo.webp", sizes: "16x16", type: "image/webp" },
      ],
      shortcut: "/Fiberglass-logo.webp",
      apple: [
        { url: "/Fiberglass-logo.webp", sizes: "180x180", type: "image/webp" },
      ],
    },
  };
}

export default async function RootLayout({ children }) {
  const cookieStore = await cookies();

  let locale = cookieStore.get("locale")?.value || defaultLocale;

  if (!locales.includes(locale)) {
    locale = defaultLocale;
  }

  let messages;

  try {
    messages = (await import(`../../messages/${locale}.json`)).default;
  } catch (error) {
    messages = (await import(`../../messages/${defaultLocale}.json`)).default;
  }

  return (
    <html
      lang={locale}
      dir={locale === "ar" ? "rtl" : "ltr"}
      className={`${robotoSlab.className} ${oswald.className} h-full`}
    >
      <head>
        {/* ✅ Favicon & Manifest - محدث باستخدام الشعار الجديد */}
        <link rel="icon" href="/Fiberglass-logo.webp" type="image/webp" />
        <link rel="shortcut icon" href="/Fiberglass-logo.webp" type="image/webp" />
        <link rel="apple-touch-icon" sizes="180x180" href="/Fiberglass-logo.webp" />
        <link rel="icon" type="image/webp" sizes="32x32" href="/Fiberglass-logo.webp" />
        <link rel="icon" type="image/webp" sizes="16x16" href="/Fiberglass-logo.webp" />
        <link rel="manifest" href="/site.webmanifest" />

        {/* ✅ Structured Data (Organization + LocalBusiness + Contact Info) */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify([
              {
                "@context": "https://schema.org",
                "@type": "Organization",
                name: "TechnoFiber",
                url: "https://www.technofiber.com",
                logo: "https://www.technofiber.com/Fiberglass-logo.webp",
                sameAs: [
                  "https://www.facebook.com/technofiber",
                  "https://www.linkedin.com/company/technofiber",
                ],
              },
              {
                "@context": "https://schema.org",
                "@type": "LocalBusiness",
                name: "TechnoFiber",
                image: "https://www.technofiber.com/Fiberglass-logo.webp",
                url: "https://www.technofiber.com",
                telephone: "+20-2-123456789", // غيّر برقمك الحقيقي
                email: "info@technofiber.com", // غيّر بإيميلك
                address: {
                  "@type": "PostalAddress",
                  streetAddress: "123 شارع رئيسي",
                  addressLocality: "القاهرة",
                  addressRegion: "القاهرة",
                  postalCode: "11511",
                  addressCountry: "EG",
                },
                openingHours: "Su-Th 09:00-17:00",
                priceRange: "$$",
              },
              {
                "@context": "https://schema.org",
                "@type": "ContactPoint",
                telephone: "+20-2-123456789", // نفس الرقم
                contactType: "customer service",
                areaServed: "EG",
                availableLanguage: ["Arabic", "English"],
              },
            ]),
          }}
        />
      </head>
      <body className="h-full m-0 p-0">
        <NextIntlClientProvider locale={locale} messages={messages}>
          <div className="flex flex-col min-h-screen">
            <Navbar />
            <main className="flex-grow">{children}</main>
            <Footer />
          </div>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}