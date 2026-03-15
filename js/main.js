document.addEventListener('DOMContentLoaded', () => {
    gsap.registerPlugin(ScrollTrigger);

    const mainHeader = document.querySelector('#main-header');
    const introOverlay = document.querySelector('#intro-overlay');
    const introLogo = document.querySelector('#intro-logo-center');
    const narrativeText = document.querySelector('#narrative-text');
    const floatingNav = document.querySelector('#floating-nav');
    const floatingText = document.querySelector('#floating-text');

    // 1. New Cinematic Intro Sequence
    const runIntro = () => {
        if (!introOverlay) return;

        const tl = gsap.timeline({
            onComplete: () => {
                gsap.to(introOverlay, {
                    opacity: 0,
                    duration: 1.5,
                    ease: "power2.inOut",
                    onComplete: () => {
                        introOverlay.style.display = 'none';
                        document.body.style.overflow = 'auto';
                        gsap.to([mainHeader, floatingNav], { opacity: 1, duration: 1, pointerEvents: 'auto' });
                        sessionStorage.setItem('introSeen', 'true');
                    }
                });
            }
        });

        // Skip intro if seen
        if (sessionStorage.getItem('introSeen') === 'true') {
            tl.progress(1);
            return;
        }

        document.body.style.overflow = 'hidden';

        tl.to(introLogo, { opacity: 1, duration: 1.5, delay: 0.5 })
          .to(introLogo, { opacity: 0, duration: 1, delay: 1 })
          .to(narrativeText, { opacity: 1, duration: 2 })
          .to(narrativeText, { opacity: 0, duration: 1, delay: 1.5 });
    };

    runIntro();

    // 2. Floating Nav Logic & Scroll Detection
    const updateFloatingNav = () => {
        const sections = document.querySelectorAll('.snap-section');
        let currentSection = "";

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            if (window.pageYOffset >= sectionTop - 100) {
                currentSection = section.getAttribute('id');
            }
        });

        if (currentSection === "home") {
            floatingText.innerText = "Scroll to Explore Work";
        } else if (currentSection === "work") {
            floatingText.innerText = "Scroll to See Team";
        } else if (currentSection === "team") {
            floatingText.innerText = "Scroll to Connect";
        } else if (currentSection === "contact") {
            floatingText.innerText = "Back to Top";
        }
    };

    window.addEventListener('scroll', updateFloatingNav);

    // 3. Navigation Underline State
    const navLinks = document.querySelectorAll('.nav-link');
    const currentPath = window.location.pathname.split('/').pop() || 'index.php';

    navLinks.forEach(link => {
        if (link.getAttribute('href') === currentPath) {
            link.classList.add('active');
        }
    });

    // 4. Parallax / Scroll Animations for Sections
    gsap.utils.toArray('.reveal-up').forEach(elem => {
        gsap.from(elem, {
            y: 50,
            opacity: 0,
            duration: 1.2,
            scrollTrigger: {
                trigger: elem,
                start: "top 85%",
                toggleActions: "play none none reverse"
            }
        });
    });

    // 5. Team Section Parallax Image
    gsap.utils.toArray('.team-photo').forEach(photo => {
        gsap.to(photo, {
            yPercent: 10,
            ease: "none",
            scrollTrigger: {
                trigger: photo,
                scrub: true
            }
        });
    });
});
