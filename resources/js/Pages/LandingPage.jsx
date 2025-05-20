import React, { useEffect } from 'react';
import { Head } from '@inertiajs/react';
import { HeroSection, LandingNavbar, AboutSection, PreviewSection, ServicesSection, FooterSection, AnimationObserver } from '@/Components/LandingPage';
import '@/Components/LandingPage/SectionAnimations.css';


export default function LandingPage({ canLogin }) {
    return (
        <>
            <Head title="Selamat Datang di Aplikasir" />
            <div className="min-h-screen bg-gray-100 text-gray-900">
                <LandingNavbar canLogin={canLogin} />
                <main>
                    <HeroSection />
                    <AboutSection />
                    <PreviewSection />
                    <ServicesSection />
                </main>
                <FooterSection />
                <AnimationObserver />
            </div>
        </>
    );
}