import React, { useEffect } from 'react';
import { Head } from '@inertiajs/react';
import { 
    HeroSection, 
    LandingNavbar, 
    AboutSection, 
    PreviewSection, 
    ServicesSection, 
    FooterSection, 
    AnimationObserver,
    StatsSection,
    FAQSection,
    CTASection
} from '@/Components/LandingPage';
import '@/Components/LandingPage/SectionAnimations.css';

export default function LandingPage({ canLogin, availableVersions = [] }) {
    const jsonLd = {
        "@context": "https://schema.org",
        "@type": "SoftwareApplication",
        "name": "ApliKasir",
        "description": "Aplikasi kasir mobile terdepan untuk UMKM dan bisnis retail. Kelola transaksi, inventori, dan laporan dengan mudah.",
        "applicationCategory": "BusinessApplication",
        "operatingSystem": "Android, iOS",
        "offers": {
            "@type": "Offer",
            "price": "0",
            "priceCurrency": "IDR"
        },
        "aggregateRating": {
            "@type": "AggregateRating",
            "ratingValue": "4.8",
            "ratingCount": "2547"
        },
        "author": {
            "@type": "Organization",
            "name": "ApliKasir",
            "url": "https://aplikasir.my.id/",
        }
    };

    return (
        <>
            <Head>
                <title>ApliKasir - Aplikasi Kasir Mobile Terdepan untuk UMKM Indonesia</title>
                <meta name="description" content="Revolusi cara Anda berbisnis dengan ApliKasir! Aplikasi kasir mobile all-in-one untuk UMKM dan retail. Gratis download, mudah digunakan, fitur lengkap untuk manajemen bisnis modern." />
                <meta name="keywords" content="aplikasi kasir, kasir mobile, POS system, UMKM, retail, inventori, laporan penjualan, barcode scanner, Indonesia" />
                <meta name="author" content="ApliKasir" />
                <meta name="robots" content="index, follow" />
                
                {/* Open Graph / Facebook */}
                <meta property="og:type" content="website" />
                <meta property="og:url" content="https://aplikasir.my.id/" />
                <meta property="og:title" content="ApliKasir - Aplikasi Kasir Mobile Terdepan untuk UMKM Indonesia" />
                <meta property="og:description" content="Revolusi cara Anda berbisnis dengan ApliKasir! Aplikasi kasir mobile all-in-one untuk UMKM dan retail." />
                <meta property="og:image" content="/images/og-image.jpg" />
                <meta property="og:site_name" content="ApliKasir" />

                {/* Twitter */}
                <meta property="twitter:card" content="summary_large_image" />
                <meta property="twitter:url" content="https://aplikasir.my.id/" />
                <meta property="twitter:title" content="ApliKasir - Aplikasi Kasir Mobile Terdepan untuk UMKM Indonesia" />
                <meta property="twitter:description" content="Revolusi cara Anda berbisnis dengan ApliKasir! Aplikasi kasir mobile all-in-one untuk UMKM dan retail." />
                <meta property="twitter:image" content="/images/twitter-image.jpg" />

                {/* Favicon */}
                <link rel="icon" type="image/x-icon" href="/favicon.ico" />
                <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
                <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
                <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />

                {/* Canonical URL */}
                <link rel="canonical" href="https://aplikasir.my.id/" />

                {/* JSON-LD Structured Data */}
                <script type="application/ld+json">
                    {JSON.stringify(jsonLd)}
                </script>
            </Head>
              <div className="min-h-screen bg-white text-gray-900 overflow-x-hidden scroll-smooth">
                <LandingNavbar canLogin={canLogin} /><main>
                    <HeroSection availableVersions={availableVersions} />
                    <StatsSection />
                    <AboutSection />
                    <PreviewSection />
                    <ServicesSection />
                    <FAQSection />
                    <CTASection availableVersions={availableVersions} />
                </main>
                <FooterSection />
                <AnimationObserver />
            </div>
        </>
    );
}