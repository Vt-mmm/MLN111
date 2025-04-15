import { useEffect } from 'react';

// Define types for window properties we're adding
declare global {
    interface Window {
        currentSlide: number;
        totalSlides: number;
        changeSlide: (slideNumber: number) => void;
        nextSlide: () => void;
        prevSlide: () => void;
    }
}

function SlideShow() {
    useEffect(() => {
        // Add the slide navigation functions to the window object
        window.currentSlide = 1;
        window.totalSlides = 3;

        window.changeSlide = (slideNumber: number) => {
            // Hide all slides
            const slides = document.querySelectorAll('.slide');
            slides.forEach(slide => {
                slide.classList.add('hidden');
                slide.classList.remove('active');
            });

            // Show the selected slide
            const selectedSlide = document.getElementById(`slide${slideNumber}`);
            if (selectedSlide) {
                selectedSlide.classList.remove('hidden');
                selectedSlide.classList.add('active');
            }

            // Update the dots
            const dots = document.querySelectorAll('[id^="dot"]');
            dots.forEach(dot => {
                dot.classList.remove('bg-blue-600');
                dot.classList.add('bg-gray-300');
            });

            const selectedDot = document.getElementById(`dot${slideNumber}`);
            if (selectedDot) {
                selectedDot.classList.remove('bg-gray-300');
                selectedDot.classList.add('bg-blue-600');
            }

            window.currentSlide = slideNumber;
        };

        window.nextSlide = () => {
            let nextSlide = window.currentSlide + 1;
            if (nextSlide > window.totalSlides) {
                nextSlide = 1;
            }
            window.changeSlide(nextSlide);
        };

        window.prevSlide = () => {
            let prevSlide = window.currentSlide - 1;
            if (prevSlide < 1) {
                prevSlide = window.totalSlides;
            }
            window.changeSlide(prevSlide);
        };

        // Add keyboard navigation
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'ArrowRight') {
                window.nextSlide();
            } else if (e.key === 'ArrowLeft') {
                window.prevSlide();
            }
        };

        document.addEventListener('keydown', handleKeyDown);

        // Auto-advance slides every 5 seconds
        const slideInterval = setInterval(() => {
            window.nextSlide();
        }, 300000);

        // Clean up
        return () => {
            document.removeEventListener('keydown', handleKeyDown);
            clearInterval(slideInterval);
        };
    }, []);

    return null;
}

export default SlideShow;