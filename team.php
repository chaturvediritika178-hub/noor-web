<?php include 'includes/head.php'; ?>
<?php include 'includes/header.php'; ?>

<main class="snap-container">
    <section id="team-intro" class="snap-section flex flex-col justify-center px-10 md:px-20 bg-white">
        <div class="max-w-7xl w-full reveal-up">
            <span class="text-[10px] tracking-[0.5em] uppercase opacity-30 mb-4 block">The Visionaries</span>
            <h1 class="text-6xl md:text-9xl font-primary leading-none mb-8">Our<br>Collective</h1>
            <div class="w-32 h-[1px] bg-black opacity-20"></div>
        </div>
    </section>

    <?php
    $members = [
        [
            'name' => "Noorjahan",
            'role' => "Founder & Creative Director",
            'bio' => "With over two decades of experience in visual storytelling, Noorjahan leads the creative vision, ensuring every frame resonates with life.",
            'image' => "https://picsum.photos/seed/n1/1000/1200"
        ],
        [
            'name' => "Julian Vane",
            'role' => "DP & Cinematographer",
            'bio' => "Julian's mastery of light and shadow defines the aesthetic of our collective works. He believes every shot should be a painting.",
            'image' => "https://picsum.photos/seed/n2/1000/1200"
        ]
    ];

    foreach ($members as $index => $member): ?>
    <section class="snap-section team-member-section flex flex-col md:flex-row items-center overflow-hidden">
        <div class="w-full md:w-1/2 h-1/2 md:h-full overflow-hidden bg-gray-200">
            <img src="<?php echo $member['image']; ?>" alt="<?php echo $member['name']; ?>" class="team-photo w-full h-full object-cover grayscale transition-transform duration-[3000ms] hover:scale-110">
        </div>
        <div class="w-full md:w-1/2 h-1/2 md:h-full flex items-center justify-center p-12 md:p-32 bg-[#F5F5F5]">
            <div class="max-w-xl space-y-10 reveal-up">
                <div class="space-y-4">
                    <span class="text-[10px] tracking-[0.5em] uppercase opacity-40 font-bold"><?php echo $member['role']; ?></span>
                    <h2 class="text-5xl md:text-8xl font-primary leading-tight"><?php echo $member['name']; ?></h2>
                </div>
                <p class="text-lg md:text-2xl font-light font-secondary leading-relaxed opacity-70">
                    <?php echo $member['bio']; ?>
                </p>
                <div class="pt-6">
                    <a href="#" class="text-[8px] tracking-[0.5em] uppercase border-b border-black/20 pb-2 hover:border-black transition-colors">Full Profile</a>
                </div>
            </div>
        </div>
    </section>
    <?php endforeach; ?>

    <section id="team" class="hidden"><!-- marker --></section>
</main>

<?php include 'includes/footer.php'; ?>
