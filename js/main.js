/*==================================================
    SHE ZONE — MAIN JAVASCRIPT
    Shared across all pages
==================================================*/


/*==================================================
    DOM READY
==================================================*/

document.addEventListener("DOMContentLoaded", () => {

    /*==================================================
        INITIALIZE SITE COMPONENTS
    ==================================================*/

    initScrollProgress();
    initHeader();
    initMobileNavigation();
    initActiveNavigation();
    initServicesNavigation();

    initHeroSlideshow()
    initHeroScrollFade()
    initScrollReveal();
    initTrustMetrics();
    initServicesShowcase();
    initBlogCarousel();
    initTestimonialCarousel();
    initFAQ();

    initFooterAccordions();
    initBackToTop();
    initCopyrightYear();

    initInfoModals();
    initGallery();
    initArticleShare();
    initInstructionsButton()

});


/*==================================================
    SCROLL PROGRESS
==================================================*/

function initScrollProgress() {

    const progress =
        document.querySelector(".scroll-progress");

    const progressBar =
        document.querySelector(".scroll-progress-bar");


    // Component doesn't exist on this page
    if (!progress || !progressBar) return;


    let ticking = false;


    function updateProgress() {

        const scrollTop =
            window.scrollY;

        const documentHeight =
            document.documentElement.scrollHeight -
            window.innerHeight;


        if (documentHeight > 0) {

            const percentage =
                (scrollTop / documentHeight) * 100;

            progressBar.style.width =
                `${percentage}%`;

        }


        if (scrollTop > 20) {

            progress.classList.add("active");

        } else {

            progress.classList.remove("active");

        }


        ticking = false;

    }


    window.addEventListener("scroll", () => {

        if (!ticking) {

            window.requestAnimationFrame(
                updateProgress
            );

            ticking = true;

        }

    });


    // Set initial state
    updateProgress();

}


/*==================================================
    HEADER
==================================================*/

function initHeader() {

    const header =
        document.querySelector(".header");


    if (!header) return;


    function updateHeader() {

        if (window.scrollY > 60) {

            header.classList.add("scrolled");

        } else {

            header.classList.remove("scrolled");

        }

    }


    window.addEventListener(
        "scroll",
        updateHeader
    );


    // Initial state
    updateHeader();

}


/*==================================================
    SERVICES NAVIGATION
    Desktop dropdown + mobile accordion
==================================================*/

function initServicesNavigation() {

    const servicesDropdown =
        document.querySelector(
            ".services-dropdown"
        );


    if (!servicesDropdown) return;


    const servicesToggle =
        servicesDropdown.querySelector(
            ".services-toggle"
        );


    const servicesMenu =
        servicesDropdown.querySelector(
            ".services-menu"
        );


    const servicesLink =
        servicesDropdown.querySelector(
            ".services-link"
        );


    const serviceLinks =
        servicesDropdown.querySelectorAll(
            ".services-menu a"
        );


    if (
        !servicesToggle ||
        !servicesMenu
    ) {
        return;
    }


    /*----------------------------------------------
        CURRENT PAGE
    ----------------------------------------------*/

    const currentPage =
        window.location.pathname
            .split("/")
            .pop() || "index.html";


    /*----------------------------------------------
        ACTIVE SERVICE PAGE
    ----------------------------------------------*/

    let servicePageOpen = false;


    serviceLinks.forEach(link => {

        const href =
            link.getAttribute("href");


        if (!href) return;


        const linkPage =
            href
                .split("/")
                .pop();


        if (linkPage === currentPage) {

            servicePageOpen = true;

            link.classList.add("active");

        }

    });


    /*----------------------------------------------
        ACTIVE SERVICES STATE
        Applies to all five nested pages
    ----------------------------------------------*/

    if (servicePageOpen) {

        servicesDropdown.classList.add(
            "service-active"
        );

    }


    /*----------------------------------------------
        ACTIVE SERVICE PAGE
    ----------------------------------------------*/

    if (servicePageOpen && window.innerWidth <= 1150) {

        servicesDropdown.classList.add(
            "open"
        );

        servicesToggle.setAttribute(
            "aria-expanded",
            "true"
        );

    }


    /*----------------------------------------------
        SERVICES TOGGLE
        Mobile accordion / desktop button
    ----------------------------------------------*/

    servicesToggle.addEventListener(
        "click",
        event => {

            event.preventDefault();

            event.stopPropagation();


            const isOpen =
                servicesDropdown.classList.contains(
                    "open"
                );


            servicesDropdown.classList.toggle(
                "open",
                !isOpen
            );


            servicesToggle.setAttribute(
                "aria-expanded",
                String(!isOpen)
            );

        }
    );


    /*----------------------------------------------
        KEEP MENU INTERACTION ISOLATED
    ----------------------------------------------*/

    servicesMenu.addEventListener(
        "click",
        event => {

            event.stopPropagation();

        }
    );


    /*----------------------------------------------
        DESKTOP HOVER
    ----------------------------------------------*/

    servicesDropdown.addEventListener(
        "mouseenter",
        () => {

            if (window.innerWidth > 1150) {

                servicesDropdown.classList.add(
                    "open"
                );

                servicesToggle.setAttribute(
                    "aria-expanded",
                    "true"
                );

            }

        }
    );


    servicesDropdown.addEventListener(
    "mouseleave",
    () => {

        if (window.innerWidth > 1150) {

            servicesDropdown.classList.remove(
                "open"
            );

            servicesToggle.setAttribute(
                "aria-expanded",
                "false"
            );

        }

    }
    );

}


/*==================================================
    MOBILE NAVIGATION
==================================================*/

function initMobileNavigation() {

    const hamburger =
        document.querySelector(
            ".hamburger"
        );


    const nav =
        document.querySelector(
            ".nav"
        );


    const overlay =
        document.querySelector(
            ".menu-overlay"
        );


    if (
        !hamburger ||
        !nav ||
        !overlay
    ) {
        return;
    }


    /*----------------------------------------------
        OPEN MENU
    ----------------------------------------------*/

    function openMenu() {

        hamburger.classList.add(
            "active"
        );

        nav.classList.add(
            "active"
        );

        overlay.classList.add(
            "active"
        );


        hamburger.setAttribute(
            "aria-expanded",
            "true"
        );


        document.body.classList.add(
            "menu-open"
        );


        // Focus first navigation link
        const firstLink =
            nav.querySelector("a");


        if (firstLink) {

            firstLink.focus();

        }

    }


    /*----------------------------------------------
        CLOSE MENU
    ----------------------------------------------*/

    function closeMenu() {

        hamburger.classList.remove(
            "active"
        );

        nav.classList.remove(
            "active"
        );

        overlay.classList.remove(
            "active"
        );


        hamburger.setAttribute(
            "aria-expanded",
            "false"
        );


        document.body.classList.remove(
            "menu-open"
        );


        // Return focus to hamburger
        hamburger.focus();

    }


    /*----------------------------------------------
        HAMBURGER CLICK
    ----------------------------------------------*/

    hamburger.addEventListener(
        "click",
        () => {

            if (
                nav.classList.contains(
                    "active"
                )
            ) {

                closeMenu();

            } else {

                openMenu();

            }

        }
    );


    /*----------------------------------------------
        OVERLAY CLICK
    ----------------------------------------------*/

    overlay.addEventListener(
        "click",
        closeMenu
    );


    /*----------------------------------------------
        NAVIGATION LINK CLICK
    ----------------------------------------------*/

    const navLinks =
        nav.querySelectorAll(
            "a"
        );


    navLinks.forEach(link => {

        link.addEventListener(
            "click",
            closeMenu
        );

    });


    /*----------------------------------------------
        ESCAPE KEY
    ----------------------------------------------*/

    document.addEventListener(
        "keydown",
        event => {

            if (
                event.key === "Escape" &&
                nav.classList.contains(
                    "active"
                )
            ) {

                closeMenu();

            }

        }
    );


    /*----------------------------------------------
        CLOSE ON DESKTOP
    ----------------------------------------------*/

    window.addEventListener(
        "resize",
        () => {

            if (
                window.innerWidth > 1150 &&
                nav.classList.contains(
                    "active"
                )
            ) {

                closeMenu();

            }

        }
    );


    /*----------------------------------------------
        FOCUS TRAP
    ----------------------------------------------*/

    document.addEventListener(
        "keydown",
        event => {

            if (
                !nav.classList.contains(
                    "active"
                )
            ) {
                return;
            }


            if (event.key !== "Tab") {
                return;
            }


            const focusableElements =
                nav.querySelectorAll(
                    "a, button"
                );


            if (
                focusableElements.length === 0
            ) {
                return;
            }


            const first =
                focusableElements[0];


            const last =
                focusableElements[
                    focusableElements.length - 1
                ];


            /* Shift + Tab */

            if (
                event.shiftKey &&
                document.activeElement === first
            ) {

                event.preventDefault();

                last.focus();

            }


            /* Tab */

            else if (
                !event.shiftKey &&
                document.activeElement === last
            ) {

                event.preventDefault();

                first.focus();

            }

        }
    );

}


/*==================================================
    ACTIVE NAVIGATION
==================================================*/

function initActiveNavigation() {

    const pageMap = {

        "index.html": "home",

        "about.html": "about",

        "services.html": "services",

        "membership.html": "membership",

        "blog.html": "blog",

        "gallery.html": "gallery",

        "contact.html": "contact",


        /* Service sub-pages */

        "hair-care.html": "services",

        "hand-foot-nail-care.html": "services",

        "skin-body-care.html": "services",

        "makeup-bridal.html": "services",

        "other-services.html": "services",
 
        "instructions.html": "services" ,

        
        /*blogs*/
        
        "blog-1.html": "blog",

        "blog-2.html": "blog",

        "blog-3.html": "blog",

        "blog-4.html": "blog",

    };


    let currentPage =
        window.location.pathname
            .split("/")
            .pop();


    /*----------------------------------------------
        ROOT URL
    ----------------------------------------------*/

    if (!currentPage) {

        currentPage =
            "index.html";

    }


    const currentNav =
        pageMap[currentPage];


    if (!currentNav) {
        return;
    }


    const navLinks =
        document.querySelectorAll(
            ".nav-links a[data-nav]"
        );


    navLinks.forEach(link => {

        if (
            link.dataset.nav ===
            currentNav
        ) {

            link.classList.add(
                "active"
            );

        }

    });

}


/*==================================================
    SCROLL REVEAL
==================================================*/

function initScrollReveal() {

    const reveals =
        document.querySelectorAll(
            ".reveal"
        );


    if (reveals.length === 0) {
        return;
    }


    function revealOnScroll() {

        const windowHeight =
            window.innerHeight;


        reveals.forEach(section => {

            const revealTop =
                section
                    .getBoundingClientRect()
                    .top;


            const revealPoint =
                150;


            if (
                revealTop <
                windowHeight - revealPoint
            ) {

                section.classList.add(
                    "active"
                );

            }

        });

    }


    window.addEventListener(
        "scroll",
        revealOnScroll
    );


    // Initial check
    revealOnScroll();

}

/* ============================================
   HERO CINEMATIC SLIDESHOW
============================================= */

function initHeroSlideshow() {

    const hero = document.querySelector(".home-hero");
    if (!hero) return;

    const slides = hero.querySelectorAll(".hero-slide");
    if (slides.length < 2) return;

    let current = 0;

    function changeSlide() {

        const next = (current + 1) % slides.length;

        slides[current].classList.remove("is-active");
        slides[next].classList.add("is-active");

        current = next;

    }

    setInterval(changeSlide, 6500);

}

/* ==================================================
   HERO SCROLL FADE
================================================== */

function initHeroScrollFade() {

    const hero = document.querySelector(".home-hero");

    // Guard clause
    if (!hero) return;


    let ticking = false;


    function updateHeroScroll() {

        const scrollY = window.scrollY;

        const heroHeight =
            hero.offsetHeight;

        const heroTop =
            hero.offsetTop;


        const progress = Math.min(
            Math.max(
                (scrollY - heroTop) / heroHeight,
                0
            ),
            1
        );


        const contentOpacity =
            Math.max(
                1 - progress * 1.15,
                0
            );


        hero.style.setProperty(
            "--scroll-content-opacity",
            contentOpacity
        );


        ticking = false;

    }


    function requestHeroScrollUpdate() {

        if (!ticking) {

            window.requestAnimationFrame(
                updateHeroScroll
            );

            ticking = true;

        }

    }


    window.addEventListener(
        "scroll",
        requestHeroScrollUpdate,
        { passive: true }
    );


    updateHeroScroll();

}

/* ============================================
   TRUST METRICS COUNTER
============================================= */

function initTrustMetrics(){

    const section=document.querySelector(".trust-metrics");

    if(!section) return;

    const counters=section.querySelectorAll(".counter");

    if(!counters.length) return;


    const observer=new IntersectionObserver(entries=>{

        entries.forEach(entry=>{

            if(!entry.isIntersecting) return;

            counters.forEach(counter=>animateCounter(counter));

            observer.disconnect();

        });

    },{threshold:.4});

    observer.observe(section);


    function animateCounter(counter){

        const target=Number(counter.dataset.target);

        const duration=1800;

        const start=performance.now();


        function update(now){

            const progress=Math.min((now-start)/duration,1);

            const eased=1-Math.pow(1-progress,3);

            const value=Math.floor(target*eased);

            counter.textContent=value.toLocaleString();

            if(progress<1){
                requestAnimationFrame(update);
            }

        }

        requestAnimationFrame(update);

    }

}

/* ============================================
   SERVICES SHOWCASE
============================================= */

function initServicesShowcase(){

    const showcase=document.querySelector(".services-showcase-list");

    if(!showcase) return;

    const panels=showcase.querySelectorAll(".service-panel");

    if(!panels.length) return;

    const isTouch=window.matchMedia("(hover: none)").matches;

    function activatePanel(panel){

        panels.forEach(item=>item.classList.remove("is-active"));

        panel.classList.add("is-active");

    }

    panels.forEach(panel=>{

        /* Desktop only */

        if(!isTouch){

            panel.addEventListener("mouseenter",()=>{

                activatePanel(panel);

            });

        }

        /* Touch + Mouse Click */

        panel.addEventListener("click",(event)=>{

            if(event.target.closest(".service-panel-cta")) return;

            if(!panel.classList.contains("is-active")){

                event.preventDefault();

                activatePanel(panel);

            }

        });

    });

}

/* ============================================
   BLOG CAROUSEL
============================================= */

function initBlogCarousel(){

    const section=document.querySelector(".blog-preview");

    if(!section) return;

    const slides=section.querySelectorAll(".blog-featured");
    const items=section.querySelectorAll(".blog-sidebar-item");

    if(slides.length!==items.length) return;

    let current=0;

    function showSlide(next){

        slides[current].classList.remove("is-active");
        items[current].classList.remove("is-active");

        slides[next].classList.add("is-active");
        items[next].classList.add("is-active");

        current=next;

    }

    setInterval(()=>{

        const next=(current+1)%slides.length;

        showSlide(next);

    },6000);

}

/*==================================================
    TESTIMONIAL CAROUSEL
==================================================*/

function initTestimonialCarousel() {

    const carousel =
        document.querySelector(
            ".testimonial-carousel"
        );

    const cards =
        document.querySelectorAll(
            ".testimonial-card"
        );

    const prevBtn =
        document.querySelector(
            ".carousel-btn.prev"
        );

    const nextBtn =
        document.querySelector(
            ".carousel-btn.next"
        );


    // No carousel on this page
    if (
        !carousel ||
        cards.length === 0
    ) {

        return;

    }


    let current = 0;

    let autoSlide;


    /*----------------------------------------------
        UPDATE CAROUSEL
    ----------------------------------------------*/

    function updateCarousel() {

        const total = cards.length;

        if (total === 0) return;


        cards.forEach(card => {

            card.classList.remove(
                "active",
                "left",
                "right",
                "hidden"
            );

        });


        const left =
            (current - 1 + total) % total;

        const right =
            (current + 1) % total;


        cards[current]
            .classList.add("active");

        cards[left]
            .classList.add("left");

        cards[right]
            .classList.add("right");


        cards.forEach((card, index) => {

            if (
                index !== current &&
                index !== left &&
                index !== right
            ) {

                card.classList.add("hidden");

            }

        });

    }


    /*----------------------------------------------
        NEXT SLIDE
    ----------------------------------------------*/

    function nextSlide() {

        current++;

        if (current >= cards.length) {

            current = 0;

        }

        updateCarousel();

    }


    /*----------------------------------------------
        PREVIOUS SLIDE
    ----------------------------------------------*/

    function previousSlide() {

        current--;

        if (current < 0) {

            current = cards.length - 1;

        }

        updateCarousel();

    }


    /*----------------------------------------------
        AUTOPLAY
    ----------------------------------------------*/

    function startAutoplay() {

        stopAutoplay();

        autoSlide =
            setInterval(
                nextSlide,
                6000
            );

    }


    function stopAutoplay() {

        clearInterval(autoSlide);

    }


    /*----------------------------------------------
        BUTTONS
    ----------------------------------------------*/

    if (nextBtn) {

        nextBtn.addEventListener(
            "click",
            () => {

                nextSlide();

                startAutoplay();

            }
        );

    }


    if (prevBtn) {

        prevBtn.addEventListener(
            "click",
            () => {

                previousSlide();

                startAutoplay();

            }
        );

    }


    /*----------------------------------------------
        PAUSE ON HOVER
    ----------------------------------------------*/

    carousel.addEventListener(
        "mouseenter",
        stopAutoplay
    );

    carousel.addEventListener(
        "mouseleave",
        startAutoplay
    );


    /*----------------------------------------------
        KEYBOARD SUPPORT
    ----------------------------------------------*/

    document.addEventListener(
        "keydown",
        event => {

            // Don't interfere with typing
            if (
                event.target.matches(
                    "input, textarea, select"
                )
            ) {

                return;

            }


            if (event.key === "ArrowRight") {

                nextSlide();

                startAutoplay();

            }


            if (event.key === "ArrowLeft") {

                previousSlide();

                startAutoplay();

            }

        }
    );


    /*----------------------------------------------
        TOUCH / SWIPE SUPPORT
    ----------------------------------------------*/

    let touchStartX = 0;

    let touchEndX = 0;


    carousel.addEventListener(
        "touchstart",
        event => {

            touchStartX =
                event.changedTouches[0].clientX;

        },
        { passive: true }
    );


    carousel.addEventListener(
        "touchend",
        event => {

            touchEndX =
                event.changedTouches[0].clientX;

            const distance =
                touchStartX - touchEndX;


            if (Math.abs(distance) < 50) {

                return;

            }


            if (distance > 0) {

                nextSlide();

            } else {

                previousSlide();

            }


            startAutoplay();

        },
        { passive: true }
    );

    /*----------------------------------------------
        INITIALIZE
    ----------------------------------------------*/

    updateCarousel();

    startAutoplay();

}


/*==================================================
    FAQ ACCORDION
==================================================*/

function initFAQ() {

    const faqItems =
        document.querySelectorAll(
            ".faq-item"
        );


    if (faqItems.length === 0) return;


    faqItems.forEach(item => {

        const question =
            item.querySelector(
                ".faq-question"
            );


        if (!question) return;


        question.addEventListener(
            "click",
            () => {


                // Close other items
                faqItems.forEach(faq => {

                    if (faq !== item) {

                        faq.classList.remove(
                            "active"
                        );

                    }

                });


                // Toggle clicked item
                item.classList.toggle(
                    "active"
                );

            }
        );

    });

}


/*==================================================
    FOOTER ACCORDIONS
==================================================*/

function initFooterAccordions() {

    const accordions =
        document.querySelectorAll(
            ".footer-accordion"
        );


    if (accordions.length === 0) return;


    function setAccordionState() {

        accordions.forEach(button => {

            if (window.innerWidth > 1150) {

                button.classList.add("active");

                button.setAttribute(
                    "aria-expanded",
                    "true"
                );

            } else {

                button.classList.remove("active");

                button.setAttribute(
                    "aria-expanded",
                    "false"
                );

            }

        });

    }


    /*----------------------------------------------
        INITIAL STATE
    ----------------------------------------------*/

    setAccordionState();


    /*----------------------------------------------
        UPDATE ON RESIZE
    ----------------------------------------------*/

    window.addEventListener(
        "resize",
        setAccordionState
    );


    /*----------------------------------------------
        CLICK TO TOGGLE
    ----------------------------------------------*/

    accordions.forEach(button => {

        button.addEventListener(
            "click",
            () => {

                button.classList.toggle(
                    "active"
                );


                button.setAttribute(
                    "aria-expanded",
                    button.classList.contains(
                        "active"
                    )
                );

            }
        );

    });

}


/*==================================================
    BACK TO TOP
==================================================*/

function initBackToTop() {

    const backToTop =
        document.getElementById(
            "backToTop"
        );


    // Button doesn't exist on this page
    if (!backToTop) return;


    function updateBackToTop() {

        if (window.scrollY > 500) {

            backToTop.classList.add(
                "show"
            );

        } else {

            backToTop.classList.remove(
                "show"
            );

        }

    }


    window.addEventListener(
        "scroll",
        updateBackToTop
    );


    backToTop.addEventListener(
        "click",
        () => {

            window.scrollTo({

                top: 0,

                behavior: "smooth"

            });

        }
    );


    // Initial state
    updateBackToTop();

}


/*==================================================
    COPYRIGHT YEAR
==================================================*/

function initCopyrightYear() {

    const year =
        document.getElementById(
            "copyright-year"
        );


    if (!year) return;


    year.textContent =
        new Date().getFullYear();

}

/* ============================================
CLIENT INFORMATION MODALS - Services Page
============================================= */

function initInfoModals() {

    const infoButtons = document.querySelectorAll(".info-btn");
    const modals = document.querySelectorAll(".info-modal");

    if (!infoButtons.length || !modals.length) {
        return;
    }

    let lastFocusedElement = null;

    /* ============================================
       OPEN MODAL
    ============================================= */

    const openModal = (modal, triggerButton) => {

        // Remember the button that opened the modal
        lastFocusedElement = triggerButton;

        modal.classList.add("active");
        modal.setAttribute("aria-hidden", "false");

        document.body.classList.add("modal-open");

        // Move keyboard focus to the close button
        const closeButton = modal.querySelector(".info-modal-close");

        if (closeButton) {
            closeButton.focus();
        }
    };


    /* ============================================
       CLOSE MODAL
    ============================================= */

    const closeModal = (modal) => {

        // Remove focus from anything inside the modal
        // before setting aria-hidden="true"
        if (modal.contains(document.activeElement)) {
            document.activeElement.blur();
        }

        modal.classList.remove("active");
        modal.setAttribute("aria-hidden", "true");

        document.body.classList.remove("modal-open");

        // Return focus to the button that opened the modal
        if (lastFocusedElement) {
            lastFocusedElement.focus();
            lastFocusedElement = null;
        }
    };


    /* ============================================
       OPEN BUTTONS
    ============================================= */

    infoButtons.forEach((button) => {

        button.addEventListener("click", () => {

            const target = button.dataset.info;

            const modal = document.getElementById(`${target}Modal`);

            if (!modal) {
                return;
            }

            openModal(modal, button);

        });

    });


    /* ============================================
       CLOSE BUTTON + OVERLAY
    ============================================= */

    modals.forEach((modal) => {

        modal.querySelectorAll("[data-close-modal]").forEach((element) => {

            element.addEventListener("click", () => {
                closeModal(modal);
            });

        });

    });


    /* ============================================
       ESCAPE KEY
    ============================================ */

    document.addEventListener("keydown", (event) => {

        if (event.key !== "Escape") {
            return;
        }

        const activeModal = document.querySelector(".info-modal.active");

        if (activeModal) {
            closeModal(activeModal);
        }

    });

}

/* ============================================
   GALLERY
============================================= */

function initGallery() {

    const gallery =
        document.querySelector(".gallery-section");

    const lightbox =
        document.getElementById("galleryLightbox");

    if (!gallery || !lightbox) {
        return;
    }


    /* --------------------------------------------
       ELEMENTS
    --------------------------------------------- */

    const imageButtons =
        gallery.querySelectorAll(
            ".gallery-image-btn"
        );

    const images =
        Array.from(
            gallery.querySelectorAll(
                ".gallery-image-btn img"
            )
        );

    const lightboxImage =
        document.getElementById(
            "galleryLightboxImage"
        );

    const imageWrap =
        lightbox.querySelector(
            ".gallery-lightbox-image-wrap"
        );

    const closeButtons =
        lightbox.querySelectorAll(
            "[data-close-gallery]"
        );

    const previousButton =
        lightbox.querySelector(
            ".gallery-lightbox-prev"
        );

    const nextButton =
        lightbox.querySelector(
            ".gallery-lightbox-next"
        );


    if (!images.length || !lightboxImage) {
        return;
    }


    let currentIndex = 0;


    /* --------------------------------------------
       SHOW IMAGE
    --------------------------------------------- */

    function showImage(index) {

        currentIndex =
            (index + images.length) %
            images.length;

        const image =
            images[currentIndex];

        lightboxImage.src =
            image.src;

        lightboxImage.alt =
            image.alt || "Gallery image";

    }


    /* --------------------------------------------
       OPEN LIGHTBOX
    --------------------------------------------- */

    function openLightbox(index) {

        currentIndex = index;

        showImage(currentIndex);

        lightbox.classList.add("active");

        lightbox.setAttribute(
            "aria-hidden",
            "false"
        );

        document.body.classList.add(
            "modal-open"
        );

    }


    /* --------------------------------------------
       CLOSE LIGHTBOX
    --------------------------------------------- */

    function closeLightbox() {

        lightbox.classList.remove("active");

        lightbox.setAttribute(
            "aria-hidden",
            "true"
        );

        document.body.classList.remove(
            "modal-open"
        );

        lightboxImage.src = "";

        lightboxImage.alt = "";

    }


    /* --------------------------------------------
       IMAGE CLICK
    --------------------------------------------- */

    imageButtons.forEach(
        (button, index) => {

            button.addEventListener(
                "click",
                () => {

                    openLightbox(index);

                }
            );

        }
    );


    /* --------------------------------------------
       PREVIOUS
    --------------------------------------------- */

    if (previousButton) {

        previousButton.addEventListener(
            "click",
            () => {

                showImage(
                    currentIndex - 1
                );

            }
        );

    }


    /* --------------------------------------------
       NEXT
    --------------------------------------------- */

    if (nextButton) {

        nextButton.addEventListener(
            "click",
            () => {

                showImage(
                    currentIndex + 1
                );

            }
        );

    }


    /* --------------------------------------------
       CLOSE BUTTON / OVERLAY
    --------------------------------------------- */

    closeButtons.forEach(
        (button) => {

            button.addEventListener(
                "click",
                closeLightbox
            );

        }
    );


    /* --------------------------------------------
       TOUCH SWIPE
    --------------------------------------------- */

    let touchStartX = 0;
    let touchStartY = 0;

    const SWIPE_THRESHOLD = 60;

    if (imageWrap) {

        imageWrap.addEventListener(
            "touchstart",
            (event) => {

                if (
                    !lightbox.classList.contains(
                        "active"
                    )
                ) {
                    return;
                }

                const touch =
                    event.changedTouches[0];

                touchStartX =
                    touch.clientX;

                touchStartY =
                    touch.clientY;

            },
            { passive: true }
        );


        imageWrap.addEventListener(
            "touchend",
            (event) => {

                if (
                    !lightbox.classList.contains(
                        "active"
                    )
                ) {
                    return;
                }

                const touch =
                    event.changedTouches[0];

                const deltaX =
                    touch.clientX -
                    touchStartX;

                const deltaY =
                    touch.clientY -
                    touchStartY;


                /*
                 * Ignore vertical gestures.
                 */

                if (
                    Math.abs(deltaY) >
                    Math.abs(deltaX)
                ) {
                    return;
                }


                /*
                 * Ignore accidental taps.
                 */

                if (
                    Math.abs(deltaX) <
                    SWIPE_THRESHOLD
                ) {
                    return;
                }


                /*
                 * Horizontal swipe.
                 */

                if (deltaX < 0) {

                    showImage(
                        currentIndex + 1
                    );

                } else {

                    showImage(
                        currentIndex - 1
                    );

                }

            },
            { passive: true }
        );

    }


    /* --------------------------------------------
       KEYBOARD CONTROLS
    --------------------------------------------- */

    document.addEventListener(
        "keydown",
        (event) => {

            if (
                !lightbox.classList.contains(
                    "active"
                )
            ) {
                return;
            }


            if (event.key === "Escape") {

                closeLightbox();

            }


            if (event.key === "ArrowLeft") {

                showImage(
                    currentIndex - 1
                );

            }


            if (event.key === "ArrowRight") {

                showImage(
                    currentIndex + 1
                );

            }

        }
    );

}

/* ============================================
   ARTICLE SHARE BUTTONS
============================================= */

function initArticleShare(){

    const facebookBtn=document.getElementById("facebookShare");
    const whatsappBtn=document.getElementById("whatsappShare");
    const nativeBtn=document.getElementById("nativeShare");

    if(!facebookBtn && !whatsappBtn && !nativeBtn) return;

    const pageUrl=encodeURIComponent(window.location.href);
    const pageTitle=encodeURIComponent(document.title);

    /* ========================================
       FACEBOOK
    ========================================= */

    facebookBtn?.addEventListener("click",()=>{

        window.open(
            `https://www.facebook.com/sharer/sharer.php?u=${pageUrl}`,
            "_blank",
            "noopener,noreferrer"
        );

    });

    /* ========================================
       WHATSAPP
    ========================================= */

    whatsappBtn?.addEventListener("click",()=>{

        const text=`${pageTitle}%0A${pageUrl}`;

        window.open(
            `https://wa.me/?text=${text}`,
            "_blank",
            "noopener,noreferrer"
        );

    });

    /* ========================================
       NATIVE SHARE
    ========================================= */

    nativeBtn?.addEventListener("click",async()=>{

        const shareData={
            title:document.title,
            text:"Read this article from She Zone Beauty Lounge & Spa",
            url:window.location.href
        };

        try{

            if(navigator.share){

                await navigator.share(shareData);

            }else{

                await navigator.clipboard.writeText(window.location.href);

                alert("Article link copied to clipboard");

            }

        }catch(error){

            console.log("Share cancelled:",error);

        }

    });

}

function initInstructionsButton() {
    const button = document.getElementById("instructionsButton");

    if (!button) return;

    button.addEventListener("click", function (event) {
        event.preventDefault();

        const instructionsUrl = this.href;

        // Open the responsive instructions page
        window.open(instructionsUrl, "_blank");

        // Download the PDF
        const pdfLink = document.createElement("a");
        pdfLink.href = "assets/downloads/SZ - Instructions.pdf";
        pdfLink.download = "SZ - Instructions.pdf";

        document.body.appendChild(pdfLink);
        pdfLink.click();
        pdfLink.remove();
    });
}
