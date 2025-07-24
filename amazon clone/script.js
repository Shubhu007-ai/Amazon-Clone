// This file is currently empty.
// Interactivity, like handling search or adding to cart, can be added here.

document.addEventListener('DOMContentLoaded', () => {

    // --- Sound Effect Handler ---
    let audioContext;
    let clickBuffer;

    async function setupAudio() {
        if (audioContext) return;
        try {
            audioContext = new (window.AudioContext || window.webkitAudioContext)();
            const response = await fetch('click_sound.mp3');
            const arrayBuffer = await response.arrayBuffer();
            clickBuffer = await audioContext.decodeAudioData(arrayBuffer);
        } catch (e) {
            console.error("Failed to initialize or decode audio:", e);
        }
    }

    function playClickSound() {
        if (!audioContext || !clickBuffer) return;
        // Resume context on user gesture
        if (audioContext.state === 'suspended') {
            audioContext.resume();
        }
        const source = audioContext.createBufferSource();
        source.buffer = clickBuffer;
        source.connect(audioContext.destination);
        source.start(0);
    }

    // Initialize audio context on first user interaction
    document.body.addEventListener('click', setupAudio, { once: true });


    // --- Back to Top Functionality ---
    const backToTopButton = document.querySelector('.foot-panel1');
    if (backToTopButton) {
        backToTopButton.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    // --- Search Bar Functionality ---
    const searchIcon = document.querySelector('.search-icon');
    const searchInput = document.querySelector('.search-input');
    if (searchIcon && searchInput) {
        searchIcon.addEventListener('click', () => {
            const searchTerm = searchInput.value.trim();
            if (searchTerm) {
                alert(`Searching for: "${searchTerm}"`);
            } else {
                alert('Please enter a search term.');
            }
        });
    }

    // --- Add to Cart Functionality ---
    const addToCartButtons = document.querySelectorAll('.add-to-cart-btn');
    const cartCountElement = document.getElementById('cart-count');
    let cartCount = 0;

    addToCartButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            e.preventDefault(); // Good practice for buttons inside forms or links
            cartCount++;
            cartCountElement.textContent = cartCount;
            playClickSound();

            // Optional: visual feedback
            cartCountElement.classList.add('added');
            setTimeout(() => {
                cartCountElement.classList.remove('added');
            }, 300);
        });
    });

    // --- Side Navigation Menu ---
    const panelAllBtn = document.getElementById('panel-all-btn');
    const sideNavContainer = document.getElementById('side-nav-container');
    const sideNavCloseBtn = document.getElementById('side-nav-close-btn');
    const sideNavOverlay = document.getElementById('side-nav-overlay');

    const openNav = () => {
        if (sideNavContainer) sideNavContainer.classList.add('open');
        document.body.style.overflow = 'hidden';
    };

    const closeNav = () => {
        if (sideNavContainer) sideNavContainer.classList.remove('open');
        document.body.style.overflow = '';
    };

    if (panelAllBtn) panelAllBtn.addEventListener('click', openNav);
    if (sideNavCloseBtn) sideNavCloseBtn.addEventListener('click', closeNav);
    if (sideNavOverlay) sideNavOverlay.addEventListener('click', closeNav);

});