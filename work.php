<?php include 'includes/head.php'; ?>
<?php include 'includes/header.php'; ?>

<main class="snap-container">
    <section id="work-intro" class="snap-section flex flex-col justify-center px-10 md:px-20 bg-white">
        <div class="max-w-7xl w-full reveal-up">
            <span class="text-[10px] tracking-[0.5em] uppercase opacity-30 mb-4 block">Portfolio</span>
            <h1 class="text-6xl md:text-9xl font-primary leading-none mb-8">Selected<br>Works</h1>
            <div class="w-32 h-[1px] bg-black opacity-20"></div>
        </div>
    </section>

    <?php
    $videos = [
        ['id' => 'dQw4w9WgXcQ', 'title' => 'The Modern Frame'],
        ['id' => '9bZkp7q19f0', 'title' => 'Visual Poetry'],
        ['id' => 'L_jWHffIx5E', 'title' => 'Cinematic Narrative'],
        ['id' => 'kJQP7kiw5Fk', 'title' => 'Light & Shadow']
    ];

    foreach ($videos as $video): ?>
    <section class="snap-section flex items-center justify-center p-6 md:p-20">
        <div class="relative w-full h-full max-w-7xl max-h-[80vh] bg-black overflow-hidden group rounded-sm shadow-2xl reveal-up">
            <iframe 
                class="w-full h-full opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-[2000ms] element-video"
                src="https://www.youtube.com/embed/<?php echo $video['id']; ?>?autoplay=0&mute=1&controls=0&rel=0&modestbranding=1" 
                title="<?php echo $video['title']; ?>"
                frameborder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowfullscreen
            ></iframe>
            
            <div class="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-100 transition-opacity"></div>
            
            <div class="absolute bottom-10 left-10 md:bottom-16 md:left-16 text-white space-y-4">
                <span class="text-[10px] tracking-[0.5em] uppercase opacity-50 block">Cinematography</span>
                <h2 class="text-3xl md:text-6xl font-primary italic"><?php echo $video['title']; ?></h2>
                <div class="w-12 h-[1px] bg-white/30 group-hover:w-24 transition-all duration-700"></div>
            </div>
        </div>
    </section>
    <?php endforeach; ?>

    <section id="work" class="hidden"><!-- marker --></section>
</main>

<?php include 'includes/footer.php'; ?>
