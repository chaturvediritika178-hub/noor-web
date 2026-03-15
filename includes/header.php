<header id="main-header" class="fixed top-0 left-0 w-full z-40 px-6 md:px-12 py-8 flex justify-between items-center mix-blend-difference opacity-0">
    <a href="index.php" class="pointer-events-auto">
        <img src="logo.png" alt="Noorjahan Logo" class="w-16 md:w-20 h-auto invert brightness-0">
    </a>
    
    <nav class="hidden md:flex space-x-12 text-[10px] tracking-[0.4em] uppercase text-white font-secondary font-bold">
        <a href="index.php" class="nav-link relative pb-1 hover:opacity-70 transition-opacity">Home</a>
        <a href="work.php" class="nav-link relative pb-1 hover:opacity-70 transition-opacity">Work</a>
        <a href="team.php" class="nav-link relative pb-1 hover:opacity-70 transition-opacity">Team</a>
        <a href="contact.php" class="nav-link relative pb-1 hover:opacity-70 transition-opacity">Contact</a>
    </nav>

    <!-- Mobile Menu Toggle (Simplified) -->
    <div class="md:hidden text-white uppercase text-[10px] tracking-widest font-bold pointer-events-auto cursor-pointer">
        Menu
    </div>
</header>

<!-- Floating Nav Action -->
<div id="floating-nav" class="fixed bottom-10 right-10 z-30 opacity-0 pointer-events-none">
    <div class="flex items-center space-x-4 bg-black text-white px-6 py-3 rounded-full shadow-2xl">
        <span id="floating-text" class="text-[8px] md:text-[10px] tracking-[0.4em] uppercase font-bold">Scroll to Explore</span>
        <div class="w-4 h-6 border border-white/30 rounded-full flex justify-center p-1">
            <div class="w-1 h-1 bg-white rounded-full animate-bounce"></div>
        </div>
    </div>
</div>
