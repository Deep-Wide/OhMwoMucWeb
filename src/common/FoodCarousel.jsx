import { useEffect } from 'react';
import example1 from "/public/example/food/pig.png";
import example2 from "/public/example/food/default.png";
import example3 from "/public/example/food/food.jpeg";

const FoodCarousel = () => {

    useEffect(() => {
        const carousels = document.querySelectorAll('[data-carousel="slide"]');

        carousels.forEach(function (carousel) {
            let carouselItems = carousel.querySelectorAll('[data-carousel-item]');
            let indicators = carousel.querySelectorAll('[data-carousel-slide-to]');
            let prevButton = carousel.querySelector('[data-carousel-prev]');
            let nextButton = carousel.querySelector('[data-carousel-next]');
            let activeIndex = 0;

            // Show the first item initially
            carouselItems[activeIndex].classList.remove('hidden');
            indicators[activeIndex].setAttribute('aria-current', 'true');

            function showSlide(index) {
                // Hide all items and reset indicators
                carouselItems.forEach(item => item.classList.add('hidden'));
                indicators.forEach(indicator => indicator.setAttribute('aria-current', 'false'));

                // Show the selected item
                carouselItems[index].classList.remove('hidden');
                indicators[index].setAttribute('aria-current', 'true');
            }

            // Next button functionality
            if (nextButton) {
                nextButton.addEventListener('click', function () {
                    activeIndex = (activeIndex + 1) % carouselItems.length;
                    showSlide(activeIndex);
                });
            }

            // Previous button functionality
            if (prevButton) {
                prevButton.addEventListener('click', function () {
                    activeIndex = (activeIndex - 1 + carouselItems.length) % carouselItems.length;
                    showSlide(activeIndex);
                });
            }

            // Indicator button functionality
            indicators.forEach(function (indicator, index) {
                indicator.addEventListener('click', function () {
                    activeIndex = index;
                    showSlide(activeIndex);
                });
            });
        });
    }, []); // 빈 배열을 전달하여 한 번만 실행되도록 설정

    return (
        <div id="default-carousel" className="relative w-full" data-carousel="slide">
            <div className="relative h-56 overflow-hidden rounded-lg md:h-96">
                <div className="hidden duration-700 ease-in-out" data-carousel-item>
                    <img src={example1}
                         className="absolute block w-full -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2"
                         alt="..."/>
                </div>
                <div className="hidden duration-700 ease-in-out" data-carousel-item>
                    <img src={example2}
                         className="absolute block w-full -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2"
                         alt="..."/>
                </div>
                <div className="hidden duration-700 ease-in-out" data-carousel-item>
                    <img src={example1}
                         className="absolute block w-full -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2"
                         alt="..."/>
                </div>
                <div className="hidden duration-700 ease-in-out" data-carousel-item>
                    <img src={example2}
                         className="absolute block w-full -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2"
                         alt="..."/>
                </div>
                <div className="hidden duration-700 ease-in-out" data-carousel-item>
                    <img src={example3}
                         className="absolute block w-full -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2"
                         alt="..."/>
                </div>
            </div>

            {/* Slider indicators */}
            <div className="absolute z-40 flex -translate-x-1/2 bottom-5 left-1/2 space-x-3 rtl:space-x-reverse">
                <button type="button" className="w-3 h-3 rounded-full bg-white" aria-current="true" aria-label="Slide 1" data-carousel-slide-to="0"></button>
                <button type="button" className="w-3 h-3 rounded-full bg-white" aria-current="false" aria-label="Slide 2" data-carousel-slide-to="1"></button>
                <button type="button" className="w-3 h-3 rounded-full bg-white" aria-current="false" aria-label="Slide 3" data-carousel-slide-to="2"></button>
                <button type="button" className="w-3 h-3 rounded-full bg-white" aria-current="false" aria-label="Slide 4" data-carousel-slide-to="3"></button>
                <button type="button" className="w-3 h-3 rounded-full bg-white" aria-current="false" aria-label="Slide 5" data-carousel-slide-to="4"></button>
            </div>

            {/* Slider controls */}
            <button type="button" className="absolute top-0 start-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none" data-carousel-prev>
                <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/30 dark:bg-gray-800/30 group-hover:bg-white/50 dark:group-hover:bg-gray-800/60 group-focus:ring-4 group-focus:ring-white dark:group-focus:ring-gray-800/70 group-focus:outline-none">
                    <svg className="w-4 h-4 text-white dark:text-gray-800 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 1 1 5l4 4"/>
                    </svg>
                    <span className="sr-only">Previous</span>
                </span>
            </button>

            <button type="button" className="absolute top-0 end-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none" data-carousel-next>
                <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/30 dark:bg-gray-800/30 group-hover:bg-white/50 dark:group-hover:bg-gray-800/60 group-focus:ring-4 group-focus:ring-white dark:group-focus:ring-gray-800/70 group-focus:outline-none">
                    <svg className="w-4 h-4 text-white dark:text-gray-800 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 9 4-4-4-4"/>
                    </svg>
                    <span className="sr-only">Next</span>
                </span>
            </button>
        </div>
    );
};

export default FoodCarousel;