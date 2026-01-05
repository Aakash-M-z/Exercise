// Wait for page to load
window.addEventListener('DOMContentLoaded', () => {
    const loadingScreen = document.getElementById('loading-screen');
    const homeScreen = document.getElementById('home-screen');
    const loadingVideo = document.getElementById('loading-video');
    const backgroundVideo = document.getElementById('background-video');
    
    // Simulate loading progress and transition to home screen
    const transitionToHomeScreen = () => {
        setTimeout(() => {
            loadingScreen.style.opacity = '0';
            setTimeout(() => {
                loadingScreen.style.display = 'none';
                homeScreen.classList.remove('hidden');
                
                // Ensure background video plays
                if (backgroundVideo) {
                    backgroundVideo.play().catch(err => {
                        console.log('Video autoplay prevented:', err);
                    });
                }
                
                // Ensure button is visible
                const enterButtonContainer = document.querySelector('.enter-button-container');
                if (enterButtonContainer) {
                    enterButtonContainer.style.display = 'flex';
                    enterButtonContainer.style.visibility = 'visible';
                    enterButtonContainer.style.opacity = '1';
                }
            }, 500);
        }, 2000); // Show loading screen for 2 seconds
    };
    
    // Start transition
    transitionToHomeScreen();
    
    // Ensure videos play
    if (loadingVideo) {
        loadingVideo.play().catch(err => {
            console.log('Loading video autoplay prevented:', err);
        });
    }
    
    // Add red flicker effect periodically
    setInterval(() => {
        const overlays = document.querySelectorAll('.red-overlay');
        overlays.forEach(overlay => {
            overlay.style.opacity = '0.9';
            setTimeout(() => {
                overlay.style.opacity = '0.6';
            }, 100);
        });
    }, 3000);
    
    // Add glitch effect to video occasionally
    setInterval(() => {
        if (backgroundVideo) {
            backgroundVideo.style.filter = 'brightness(0.5) contrast(1.5) saturate(1.5) hue-rotate(0deg)';
            setTimeout(() => {
                backgroundVideo.style.filter = 'brightness(0.5) contrast(1.3) saturate(1.2)';
            }, 200);
        }
    }, 5000);
    
    // Initialize cursor glow effect
    const cursorGlow = document.getElementById('cursor-glow');
    const loadingCursorGlow = document.getElementById('loading-cursor-glow');
    
    // Initialize neon cursor
    const neonCursor = document.getElementById('neon-cursor');
    let mouseX = 0;
    let mouseY = 0;
    let cursorX = 0;
    let cursorY = 0;
    
    // Smooth cursor follow animation
    const animateCursor = () => {
        const dx = mouseX - cursorX;
        const dy = mouseY - cursorY;
        cursorX += dx * 0.1;
        cursorY += dy * 0.1;
        
        if (neonCursor) {
            neonCursor.style.left = cursorX + 'px';
            neonCursor.style.top = cursorY + 'px';
        }
        
        requestAnimationFrame(animateCursor);
    };
    animateCursor();
    
    // Initialize background images
    const backgroundImage = document.getElementById('background-image');
    const loadingBackgroundImage = document.getElementById('loading-background-image');
    
    // Function to check if mouse is near center and show/hide background image
    const checkCenterAndShowImage = (x, y) => {
        // Calculate center of the window
        const centerX = window.innerWidth / 2;
        const centerY = window.innerHeight / 2;
        
        // Calculate distance from center (you can adjust the radius - currently 200px)
        const radius = 200;
        const distanceX = Math.abs(x - centerX);
        const distanceY = Math.abs(y - centerY);
        const distance = Math.sqrt(distanceX * distanceX + distanceY * distanceY);
        
        // Check if mouse is within the center radius
        const isNearCenter = distance <= radius;
        
        if (isNearCenter) {
            // Show background image when mouse is in center
            if (backgroundImage) {
                backgroundImage.classList.add('visible');
            }
            if (loadingBackgroundImage) {
                loadingBackgroundImage.classList.add('visible');
            }
            
            // Make video semi-transparent so image shows through
            if (backgroundVideo) {
                backgroundVideo.classList.add('image-visible');
            }
            if (loadingVideo) {
                loadingVideo.parentElement.classList.add('image-visible');
            }
        } else {
            // Hide background image when mouse is away from center
            if (backgroundImage) {
                backgroundImage.classList.remove('visible');
            }
            if (loadingBackgroundImage) {
                loadingBackgroundImage.classList.remove('visible');
            }
            if (backgroundVideo) {
                backgroundVideo.classList.remove('image-visible');
            }
            if (loadingVideo) {
                loadingVideo.parentElement.classList.remove('image-visible');
            }
        }
    };
    
    // Track mouse movement for cursor glow, neon cursor, and background image
    document.addEventListener('mousemove', (e) => {
        const x = e.clientX;
        const y = e.clientY;
        
        // Update mouse position for smooth neon cursor follow
        mouseX = x;
        mouseY = y;
        
        // Update glow position for home screen
        if (cursorGlow) {
            cursorGlow.style.left = x + 'px';
            cursorGlow.style.top = y + 'px';
            cursorGlow.classList.add('active');
        }
        
        // Update glow position for loading screen
        if (loadingCursorGlow) {
            loadingCursorGlow.style.left = x + 'px';
            loadingCursorGlow.style.top = y + 'px';
            loadingCursorGlow.classList.add('active');
        }
        
        // Check if mouse is in center and show/hide background image accordingly
        checkCenterAndShowImage(x, y);
    });
    
    // Hide glow, neon cursor, and background image when mouse leaves window
    document.addEventListener('mouseleave', () => {
        if (cursorGlow) cursorGlow.classList.remove('active');
        if (loadingCursorGlow) loadingCursorGlow.classList.remove('active');
        if (neonCursor) neonCursor.style.opacity = '0';
        if (backgroundImage) backgroundImage.classList.remove('visible');
        if (loadingBackgroundImage) loadingBackgroundImage.classList.remove('visible');
        if (backgroundVideo) backgroundVideo.classList.remove('image-visible');
        if (loadingVideo) loadingVideo.parentElement.classList.remove('image-visible');
    });
    
    // Show neon cursor when mouse enters window
    document.addEventListener('mouseenter', () => {
        if (neonCursor) neonCursor.style.opacity = '1';
    });
    
    // Handle window resize to recalculate center
    window.addEventListener('resize', () => {
        // Re-check center position on resize
        const lastEvent = window.lastMouseEvent;
        if (lastEvent) {
            checkCenterAndShowImage(lastEvent.clientX, lastEvent.clientY);
        }
    });
    
    // Store last mouse event for resize handling
    document.addEventListener('mousemove', (e) => {
        window.lastMouseEvent = e;
    });
    
    // Show glow when mouse enters window
    document.addEventListener('mouseenter', () => {
        if (cursorGlow) cursorGlow.classList.add('active');
        if (loadingCursorGlow) loadingCursorGlow.classList.add('active');
    });
    
    // Press Enter to Continue button functionality
    const enterButton = document.getElementById('enter-button');
    
    // Handle Enter key press
    const handleEnterPress = (e) => {
        if (e.key === 'Enter' || e.keyCode === 13) {
            // Only work when home screen is visible
            if (!homeScreen.classList.contains('hidden')) {
                // Add visual feedback
                if (enterButton) {
                    enterButton.classList.add('pressed');
                    setTimeout(() => {
                        enterButton.classList.remove('pressed');
                    }, 200);
                }
                
                // You can add your continue action here
                // For example: navigate to another page, show content, etc.
                console.log('Enter pressed - Continue action triggered');
                
                // Example: You could trigger an animation or navigation
                // window.location.href = 'next-page.html';
            }
        }
    };
    
    // Listen for Enter key press
    document.addEventListener('keydown', handleEnterPress);
    
    // Also handle button click
    if (enterButton) {
        enterButton.addEventListener('click', () => {
            enterButton.classList.add('pressed');
            setTimeout(() => {
                enterButton.classList.remove('pressed');
            }, 200);
            console.log('Button clicked - Continue action triggered');
        });
    }
});

