var splide = new Splide('.splide', {
    type: 'loop',
    perPage: 3,
    focus: 'center',
    lazyLoad: 'nearby',
    arrowPath: 'M8.60389 12.1394L1.1047 19.6386C0.128388 20.6149 0.128388 22.1978 1.1047 23.1741C2.08101 24.1504 3.66392 24.1504 4.64023 23.1741L13.945 13.8693C14.9213 12.893 14.9213 11.3101 13.945 10.3338C13.8197 10.2085 13.6844 10.0993 13.5417 10.0061L4.2678 0.732233C3.29149 -0.244078 1.70858 -0.244078 0.732269 0.732233C-0.244041 1.70854 -0.244041 3.29146 0.732269 4.26777L8.60389 12.1394Z',
    pagination: true, breakpoints: {
        768: {
            perPage: 1,
        },
    },
});

splide.mount();


document.addEventListener('DOMContentLoaded', () => {
    const searchWrapper = document.querySelector('.header__search-wrapper');
    const searchInput = document.querySelector('.header__search');
    const searchButton = document.querySelector('.header__button--search');
    const socials = document.querySelector('.header__socials');
    const footer = document.querySelector('footer');
    const redBar = document.querySelector('.header__scroll-bar');
    const sections = document.querySelectorAll('.section');
    const headerScrollText = document.querySelector('.header__scroll-text');

    let currentSectionIndex = null;

    const toggleSearch = () => {
        searchWrapper.classList.toggle('active');
        searchInput.focus();
    };

    const closeSearchOnClick = (event) => {
        if (!searchWrapper.contains(event.target)) {
            searchWrapper.classList.remove('active');
        }
    };

    const adjustSocialPosition = () => {
        const footerTop = footer.getBoundingClientRect().top;
        const viewportHeight = window.innerHeight;
        const socialsHeight = socials.offsetHeight;

        socials.style.transform =
            footerTop < viewportHeight
                ? `translateY(${footerTop - viewportHeight + socialsHeight - 20}px)`
                : 'translateY(0)';
    };

    const updateScrollBar = () => {
        const scrollTop = window.scrollY;
        const pageHeight = document.documentElement.scrollHeight - window.innerHeight;
        const progress = scrollTop / pageHeight;

        const maxHeight = 45 * window.innerHeight / 100;
        redBar.style.height = `${maxHeight * progress}px`;
    };

    const updateVisibleSection = () => {
        sections.forEach((section, index) => {
            const rect = section.getBoundingClientRect();
            if (rect.top <= window.innerHeight * 0.5 && rect.bottom >= window.innerHeight * 0.5) {
                if (currentSectionIndex !== index) {
                    currentSectionIndex = index;
                    headerScrollText.textContent = String(index + 1).padStart(2, '0');
                }
            }
        });
    };

    searchButton.addEventListener('click', toggleSearch);
    document.addEventListener('click', closeSearchOnClick);
    document.addEventListener('scroll', () => {
        adjustSocialPosition();
        updateScrollBar();
        updateVisibleSection();
    });

    // Initial calls
    adjustSocialPosition();
    updateScrollBar();
    updateVisibleSection();
});
