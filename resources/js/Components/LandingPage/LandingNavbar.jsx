import React, { useState, useEffect } from 'react';
import { Link } from '@inertiajs/react';
import './SectionAnimations.css';
import './NavbarAnimations.css';

const LandingNavbar = ({ canLogin }) => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [activeSection, setActiveSection] = useState('beranda');
    
    useEffect(() => {
        const handleScroll = () => {
            // Check if page is scrolled past hero section height threshold
            if (window.scrollY > 100) {
                setIsScrolled(true);
            } else {
                setIsScrolled(false);
            }
            
            // Update active section based on scroll position
            const sections = ['beranda', 'tentang', 'layanan', 'kontak'];
            for (const section of sections) {
                const element = document.getElementById(section);
                if (element) {
                    const rect = element.getBoundingClientRect();
                    // If the top of the section is near the top of the viewport (with some buffer)
                    if (rect.top <= 150 && rect.bottom >= 150) {
                        setActiveSection(section);
                        break;
                    }
                }
            }
        };
        
        // Set initial scroll state
        handleScroll();
        
        window.addEventListener('scroll', handleScroll);
        
        // Clean up event listener
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);
      // Close mobile menu when clicking on a nav link
    const handleNavLinkClick = (e) => {
        e.preventDefault();
        const targetId = e.currentTarget.getAttribute('href').substring(1);
        const targetElement = document.getElementById(targetId);
        
        // Smooth scroll to the target section
        if (targetElement) {
            const navbarHeight = 70; // Approximate navbar height
            const targetPosition = targetElement.getBoundingClientRect().top + window.scrollY - navbarHeight;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
            
            setActiveSection(targetId);
        }
        
        // Close the mobile menu
        setIsMobileMenuOpen(false);
    };
      return (
        <nav className={`fixed w-full top-0 left-0 z-50 transition-all duration-300 ${
            isScrolled 
                ? 'bg-white shadow-md' 
                : 'bg-transparent'
        }`}>
            <div className="container mx-auto px-6 py-3 flex justify-between items-center">
                <Link href="/" className="flex items-center">
                    <img src="/images/logo-aplikasir.svg" alt="ApliKasir Logo" className="h-8 w-auto mr-2" />
                    <h2 className="text-2xl font-bold text-blue-600">
                        ApliKasir
                    </h2>
                </Link>
                  {/* Desktop Menu - hidden on mobile/tablet */}
                <div className="hidden md:flex items-center space-x-6">
                    <a 
                        href="#beranda" 
                        className={`nav-link text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-300 ${activeSection === 'beranda' ? 'text-blue-600 active' : ''}`}
                    >
                        Beranda
                    </a>
                    <a 
                        href="#tentang" 
                        className={`nav-link text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-300 ${activeSection === 'tentang' ? 'text-blue-600 active' : ''}`}
                    >
                        Tentang
                    </a>
                    <a 
                        href="#layanan" 
                        className={`nav-link text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-300 ${activeSection === 'layanan' ? 'text-blue-600 active' : ''}`}
                    >
                        Layanan
                    </a>
                    <a 
                        href="#kontak" 
                        className={`nav-link text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-300 ${activeSection === 'kontak' ? 'text-blue-600 active' : ''}`}
                    >
                        Kontak
                    </a>
                </div>
                  {/* Hamburger Menu Button - shown only on mobile/tablet */}
                <button 
                    className="md:hidden flex flex-col justify-center items-center p-2 rounded-md hover:bg-gray-100 focus:outline-none transition-all duration-300"
                    onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                    aria-expanded={isMobileMenuOpen}
                    aria-label="Toggle menu"
                >
                    <span className={`w-6 h-0.5 bg-gray-700 transition-transform duration-300 ease-in-out ${isMobileMenuOpen ? 'bar-top-open' : ''} mb-1.5`}></span>
                    <span className={`w-6 h-0.5 bg-gray-700 transition-opacity duration-300 ease-in-out ${isMobileMenuOpen ? 'bar-middle-open' : ''} mb-1.5`}></span>
                    <span className={`w-6 h-0.5 bg-gray-700 transition-transform duration-300 ease-in-out ${isMobileMenuOpen ? 'bar-bottom-open' : ''}`}></span>
                </button>
            </div>
              {/* Mobile Menu - slide down animation */}
            <div 
                className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${
                    isMobileMenuOpen 
                        ? 'max-h-60 opacity-100 shadow-md mobile-menu-enter' 
                        : 'max-h-0 opacity-0 mobile-menu-exit'
                } ${isScrolled || isMobileMenuOpen ? 'bg-white' : 'bg-white bg-opacity-90 backdrop-blur-sm'}`}
            >
                <div className="container mx-auto px-6 py-2 flex flex-col space-y-2">
                    <a 
                        href="#beranda" 
                        className={`mobile-nav-item text-gray-700 hover:text-blue-600 px-3 py-3 rounded-md text-base font-medium border-b border-gray-100 transition-all duration-300 ${activeSection === 'beranda' ? 'text-blue-600 pl-4 border-l-4 border-l-blue-500' : ''}`}
                        onClick={handleNavLinkClick}
                    >
                        Beranda
                    </a>
                    <a 
                        href="#tentang" 
                        className={`mobile-nav-item text-gray-700 hover:text-blue-600 px-3 py-3 rounded-md text-base font-medium border-b border-gray-100 transition-all duration-300 ${activeSection === 'tentang' ? 'text-blue-600 pl-4 border-l-4 border-l-blue-500' : ''}`}
                        onClick={handleNavLinkClick}
                    >
                        Tentang
                    </a>
                    <a 
                        href="#layanan" 
                        className={`mobile-nav-item text-gray-700 hover:text-blue-600 px-3 py-3 rounded-md text-base font-medium border-b border-gray-100 transition-all duration-300 ${activeSection === 'layanan' ? 'text-blue-600 pl-4 border-l-4 border-l-blue-500' : ''}`}
                        onClick={handleNavLinkClick}
                    >
                        Layanan
                    </a>
                    <a 
                        href="#kontak" 
                        className={`mobile-nav-item text-gray-700 hover:text-blue-600 px-3 py-3 rounded-md text-base font-medium transition-all duration-300 ${activeSection === 'kontak' ? 'text-blue-600 pl-4 border-l-4 border-l-blue-500' : ''}`}
                        onClick={handleNavLinkClick}
                    >
                        Kontak
                    </a>
                </div>
            </div>
        </nav>
    );
};

export default LandingNavbar;
