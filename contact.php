<?php include 'includes/head.php'; ?>
<?php include 'includes/header.php'; ?>

<main class="snap-container">
    <section id="contact-intro" class="snap-section flex flex-col justify-center px-10 md:px-20 bg-white">
        <div class="max-w-7xl w-full reveal-up">
            <span class="text-[10px] tracking-[0.5em] uppercase opacity-30 mb-4 block">Connections</span>
            <h1 class="text-6xl md:text-9xl font-primary leading-none mb-8">Begin the<br>Journey</h1>
            <div class="w-32 h-[1px] bg-black opacity-20"></div>
        </div>
    </section>

    <section id="contact" class="snap-section p-6 md:p-20 flex flex-col md:flex-row items-center gap-16 md:gap-32 bg-[#F5F5F5]">
        <div class="w-full md:w-1/3 space-y-16 reveal-up">
            <div class="space-y-4">
                <span class="text-[10px] tracking-[0.5em] uppercase opacity-30 block">Transmission</span>
                <a href="mailto:hello@noorjahan.com" class="text-2xl md:text-4xl font-light hover:opacity-50 transition-opacity">hello@noorjahan.com</a>
            </div>
            <div class="space-y-4">
                <span class="text-[10px] tracking-[0.5em] uppercase opacity-30 block">Studio</span>
                <p class="text-xl md:text-2xl font-light leading-relaxed">
                    Creative Quarter,<br>
                    Cinema Ave, NY 10012
                </p>
            </div>
            <div class="flex space-x-10 pt-8 opacity-40">
                <a href="#" class="text-[10px] tracking-widest uppercase hover:opacity-100 transition-opacity">Instagram</a>
                <a href="#" class="text-[10px] tracking-widest uppercase hover:opacity-100 transition-opacity">Vimeo</a>
            </div>
        </div>

        <div class="w-full md:w-2/3 max-w-2xl reveal-up">
            <form id="contact-form" class="space-y-12">
                <div class="space-y-4">
                    <label class="text-[10px] tracking-widest uppercase font-bold opacity-30">Identity</label>
                    <input type="text" name="name" required class="w-full bg-transparent border-b border-black/10 py-4 focus:outline-none focus:border-black transition-colors font-light text-2xl" placeholder="Your Name">
                </div>
                <div class="space-y-4">
                    <label class="text-[10px] tracking-widest uppercase font-bold opacity-30">Digital Link</label>
                    <input type="email" name="email" required class="w-full bg-transparent border-b border-black/10 py-4 focus:outline-none focus:border-black transition-colors font-light text-2xl" placeholder="your@email.com">
                </div>
                <div class="space-y-4">
                    <label class="text-[10px] tracking-widest uppercase font-bold opacity-30">Inquiry Details</label>
                    <textarea name="message" rows="3" required class="w-full bg-transparent border-b border-black/10 py-4 focus:outline-none focus:border-black transition-colors font-light text-2xl resize-none" placeholder="What story shall we tell?"></textarea>
                </div>
                
                <button type="submit" class="group relative px-16 py-6 bg-black text-white hover:bg-white hover:text-black transition-all duration-500 shadow-2xl">
                    <span class="relative z-10 text-[10px] tracking-[0.6em] uppercase font-bold">
                        Send Transmission
                    </span>
                    <div class="absolute inset-x-0 bottom-0 h-0.5 bg-white scale-x-0 group-hover:scale-x-100 transition-transform"></div>
                </button>
                <div id="form-status" class="mt-8 text-[10px] tracking-widest uppercase opacity-0 transition-opacity"></div>
            </form>
        </div>
    </section>
</main>

<script>
document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('contact-form');
    const status = document.getElementById('form-status');

    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        status.textContent = 'En route...';
        status.style.opacity = '1';

        const formData = new FormData(form);
        const data = Object.fromEntries(formData.entries());

        try {
            const response = await fetch('contact_handler.php', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data)
            });
            const result = await response.json();
            
            if (result.status === 'success') {
                status.textContent = 'Transmission complete.';
                form.reset();
            } else {
                status.textContent = 'Signal interrupted.';
            }
        } catch (error) {
            status.textContent = 'Signal lost.';
        }
        
        setTimeout(() => {
            status.style.opacity = '0';
        }, 4000);
    });
});
</script>

<?php include 'includes/footer.php'; ?>
