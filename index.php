<?php include 'includes/head.php'; ?>
<?php include 'includes/header.php'; ?>

<!-- Intro Overlay -->
<div id="intro-overlay">
    <div id="intro-logo-center" class="opacity-0 w-64 md:w-96">
        <img src="logo.png" alt="Noorjahan Logo" class="w-full h-auto">
    </div>
    <div id="narrative-text">
        WHERE CINEMA BECOMES LIFE<br>AND LIFE BECOMES CINEMA
    </div>
</div>

<main class="snap-container">
    <!-- Home Section -->
    <section id="home" class="snap-section flex flex-col items-center justify-center p-10 text-center overflow-hidden">
        <video autoplay muted loop playsinline class="video-bg">
            <source src="intro_video.mp4" type="video/mp4">
        </video>
        
        <div class="z-10 space-y-12 reveal-up">
            <div class="w-full max-w-4xl mx-auto px-4">
                <img src="logo.png" alt="Noorjahan Logo" class="w-full h-auto opacity-90">
            </div>
            <p class="text-xs md:text-sm font-light tracking-[0.8em] uppercase opacity-40">
                Cinematic Excellence in Every Frame
            </p>
        </div>

        <!-- Scroll Down Mouse Animation -->
        <div class="absolute bottom-12 left-1/2 -translate-x-1/2 opacity-30">
            <div class="w-5 h-8 border border-black rounded-full flex justify-center p-1">
                <div class="w-1 h-2 bg-black rounded-full animate-bounce"></div>
            </div>
        </div>
    </section>

    <!-- Brief Philosophy / Transition Section -->
    <section class="snap-section flex items-center justify-center p-10 bg-[#000] text-white">
        <div class="max-w-4xl text-center space-y-8 reveal-up">
            <blockquote class="text-3xl md:text-6xl italic-quote leading-tight">
                "We don't just make films.<br>We capture the essence of being."
            </blockquote>
        </div>
    </section>
</main>

<?php include 'includes/footer.php'; ?>
