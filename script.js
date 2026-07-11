// Navigasi Responisif (Mobile Menu Toggle)
document.addEventListener('DOMContentLoaded', () => {
    const mobileMenuBtn = document.getElementById('mobile-menu');
    const navLinks = document.querySelector('.nav-links');

    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            
            // Animasi tombol hamburger sederhana
            const bars = mobileMenuBtn.querySelectorAll('.bar');
            bars.forEach(bar => bar.classList.toggle('change'));
        });
    }

    // Efek transisi halus saat halaman berpindah (Optional / Log check)
    console.log("STUDIO WEBKILAT Architecture - Premium Core Engine Loaded Successfully. Production Ready.");
});
