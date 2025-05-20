// IntersectionObserverHandler.js
import { useEffect } from 'react';

/**
 * Fungsi untuk menerapkan Intersection Observer pada seluruh elemen dengan kelas animasi
 * yang akan memicu animasi ketika elemen masuk ke dalam viewport
 */
export function useIntersectionObserver() {
  useEffect(() => {
    // Fungsi callback yang akan dipanggil ketika elemen masuk/keluar viewport
    const handleIntersection = (entries, observer) => {
      entries.forEach(entry => {
        // Jika elemen masuk viewport (terlihat)
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          // Berhenti mengamati elemen setelah animasi dijalankan (optional)
          // observer.unobserve(entry.target);
        } else {
          // Uncomment jika ingin animasi diulang saat element keluar viewport
          // entry.target.classList.remove('is-visible');
        }
      });
    };

    // Opsi untuk Intersection Observer
    const options = {
      root: null, // menggunakan viewport sebagai container
      rootMargin: '0px', // tidak ada margin
      threshold: 0.1 // trigger ketika 10% elemen terlihat
    };

    // Buat instance Intersection Observer
    const observer = new IntersectionObserver(handleIntersection, options);    // Pilih semua elemen dengan kelas animasi
    const animatedElements = document.querySelectorAll(
      '.animate-fade-in, .animate-fade-in-delay-1, .animate-fade-in-delay-2, ' +
      '.animate-fade-in-up, .animate-fade-in-up-delay-1, .animate-fade-in-up-delay-2, ' +
      '.animate-blob, .animate-icon, .animate-icon-delay-1, .animate-icon-delay-2, ' +
      '.animate-icon-delay-3, .animate-icon-delay-4, .animate-icon-delay-5'
    );

    // Periksa elemen yang sudah visible saat load pertama kali
    const checkInitialVisibility = () => {
      const viewportHeight = window.innerHeight;
      
      animatedElements.forEach(el => {
        const rect = el.getBoundingClientRect();
        
        // Jika elemen sudah ada di viewport saat load
        if (rect.top >= 0 && rect.top <= viewportHeight) {
          el.classList.add('is-visible');
        } else {
          // Terapkan observer untuk elemen yang belum terlihat
          observer.observe(el);
        }
      });
    };

    // Jalankan pengecekan visibilitas awal
    checkInitialVisibility();

    // Cleanup saat komponen di-unmount
    return () => {
      animatedElements.forEach(el => {
        observer.unobserve(el);
      });
    };
  }, []); // Empty dependency array ensures this runs once on mount
}

// Komponen hook yang dapat diimpor di mana saja
export default function AnimationObserver() {
  useIntersectionObserver();
  return null; // Komponen ini tidak merender apapun
}
