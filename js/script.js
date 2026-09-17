/* ============================================
   BrightFuture Institute - Main Script
   ============================================ */

(function () {
    'use strict';

    /* ----------------------------------------
       DOM Elements
       ---------------------------------------- */
    const header = document.getElementById('header');
    const navToggle = document.getElementById('nav-toggle');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav__link');
    const chatToggle = document.getElementById('chat-toggle');
    const chatWindow = document.getElementById('chat-window');
    const chatClose = document.getElementById('chat-close');
    const chatForm = document.getElementById('chat-form');
    const chatInput = document.getElementById('chat-input');
    const chatMessages = document.getElementById('chat-messages');
    const chatBadge = document.getElementById('chat-badge');
    const contactForm = document.getElementById('contact-form');
    const testimonialTrack = document.getElementById('testimonials-track');
    const testimonialPrev = document.getElementById('testimonial-prev');
    const testimonialNext = document.getElementById('testimonial-next');
    const testimonialDots = document.querySelectorAll('.testimonials__dot');
    const statNumbers = document.querySelectorAll('.stat-item__number');

    /* ----------------------------------------
       Mobile Navigation
       ---------------------------------------- */
    let overlay = null;

    function createOverlay() {
        overlay = document.createElement('div');
        overlay.className = 'nav-overlay';
        document.body.appendChild(overlay);
        overlay.addEventListener('click', closeMobileMenu);
    }

    function openMobileMenu() {
        navMenu.classList.add('active');
        navToggle.classList.add('active');
        navToggle.setAttribute('aria-expanded', 'true');
        if (!overlay) createOverlay();
        overlay.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    function closeMobileMenu() {
        navMenu.classList.remove('active');
        navToggle.classList.remove('active');
        navToggle.setAttribute('aria-expanded', 'false');
        if (overlay) overlay.classList.remove('active');
        document.body.style.overflow = '';
    }

    navToggle.addEventListener('click', function () {
        if (navMenu.classList.contains('active')) {
            closeMobileMenu();
        } else {
            openMobileMenu();
        }
    });

    navLinks.forEach(function (link) {
        link.addEventListener('click', closeMobileMenu);
    });

    /* ----------------------------------------
       Sticky Header
       ---------------------------------------- */
    function handleScroll() {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    }

    window.addEventListener('scroll', handleScroll);

    /* ----------------------------------------
       Active Nav Link on Scroll
       ---------------------------------------- */
    const sections = document.querySelectorAll('section[id]');

    function updateActiveLink() {
        var scrollY = window.scrollY + 100;

        sections.forEach(function (section) {
            var sectionTop = section.offsetTop;
            var sectionHeight = section.offsetHeight;
            var sectionId = section.getAttribute('id');

            if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
                navLinks.forEach(function (link) {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === '#' + sectionId) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }

    window.addEventListener('scroll', updateActiveLink);

    /* ----------------------------------------
       Scroll Reveal Animation
       ---------------------------------------- */
    function initScrollReveal() {
        var revealElements = document.querySelectorAll('.scroll-reveal');

        var observer = new IntersectionObserver(function (entries) {
            entries.forEach(function (entry) {
                if (entry.isIntersecting) {
                    entry.target.classList.add('revealed');
                    observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.15,
            rootMargin: '0px 0px -40px 0px'
        });

        revealElements.forEach(function (el) {
            observer.observe(el);
        });
    }

    initScrollReveal();

    /* ----------------------------------------
       Statistics Counter Animation
       ---------------------------------------- */
    var statsAnimated = false;

    function animateCounters() {
        if (statsAnimated) return;

        statNumbers.forEach(function (el) {
            var target = parseInt(el.getAttribute('data-target'), 10);
            var duration = 2000;
            var startTime = null;

            function step(timestamp) {
                if (!startTime) startTime = timestamp;
                var progress = Math.min((timestamp - startTime) / duration, 1);
                var eased = 1 - Math.pow(1 - progress, 3);
                el.textContent = Math.floor(eased * target);

                if (progress < 1) {
                    requestAnimationFrame(step);
                } else {
                    el.textContent = target;
                }
            }

            requestAnimationFrame(step);
        });

        statsAnimated = true;
    }

    var statsSection = document.getElementById('stats');
    if (statsSection) {
        var statsObserver = new IntersectionObserver(function (entries) {
            entries.forEach(function (entry) {
                if (entry.isIntersecting) {
                    animateCounters();
                    statsObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.3 });

        statsObserver.observe(statsSection);
    }

    /* ----------------------------------------
       Testimonial Slider
       ---------------------------------------- */
    var currentSlide = 0;
    var totalSlides = document.querySelectorAll('.testimonial-card').length;
    var autoPlayInterval = null;

    function goToSlide(index) {
        if (index < 0) index = totalSlides - 1;
        if (index >= totalSlides) index = 0;
        currentSlide = index;
        testimonialTrack.style.transform = 'translateX(-' + (currentSlide * 100) + '%)';

        testimonialDots.forEach(function (dot, i) {
            dot.classList.toggle('active', i === currentSlide);
        });
    }

    testimonialPrev.addEventListener('click', function () {
        goToSlide(currentSlide - 1);
        resetAutoPlay();
    });

    testimonialNext.addEventListener('click', function () {
        goToSlide(currentSlide + 1);
        resetAutoPlay();
    });

    testimonialDots.forEach(function (dot) {
        dot.addEventListener('click', function () {
            goToSlide(parseInt(this.getAttribute('data-index'), 10));
            resetAutoPlay();
        });
    });

    function startAutoPlay() {
        autoPlayInterval = setInterval(function () {
            goToSlide(currentSlide + 1);
        }, 5000);
    }

    function resetAutoPlay() {
        clearInterval(autoPlayInterval);
        startAutoPlay();
    }

    startAutoPlay();

    /* ----------------------------------------
       Contact Form Validation
       ---------------------------------------- */
    contactForm.addEventListener('submit', function (e) {
        e.preventDefault();

        var isValid = true;

        var nameInput = document.getElementById('name');
        var emailInput = document.getElementById('email');
        var phoneInput = document.getElementById('phone');
        var messageInput = document.getElementById('message');

        var nameError = document.getElementById('name-error');
        var emailError = document.getElementById('email-error');
        var phoneError = document.getElementById('phone-error');
        var messageError = document.getElementById('message-error');

        // Reset
        [nameError, emailError, phoneError, messageError].forEach(function (el) {
            el.textContent = '';
        });
        [nameInput, emailInput, phoneInput, messageInput].forEach(function (el) {
            el.classList.remove('error');
        });

        // Name
        if (nameInput.value.trim() === '') {
            nameError.textContent = 'Please enter your full name.';
            nameInput.classList.add('error');
            isValid = false;
        } else if (nameInput.value.trim().length < 2) {
            nameError.textContent = 'Name must be at least 2 characters.';
            nameInput.classList.add('error');
            isValid = false;
        }

        // Email
        var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (emailInput.value.trim() === '') {
            emailError.textContent = 'Please enter your email address.';
            emailInput.classList.add('error');
            isValid = false;
        } else if (!emailRegex.test(emailInput.value.trim())) {
            emailError.textContent = 'Please enter a valid email address.';
            emailInput.classList.add('error');
            isValid = false;
        }

        // Phone (optional but validate if filled)
        if (phoneInput.value.trim() !== '') {
            var phoneRegex = /^[\+]?[\d\s\-\(\)]{7,15}$/;
            if (!phoneRegex.test(phoneInput.value.trim())) {
                phoneError.textContent = 'Please enter a valid phone number.';
                phoneInput.classList.add('error');
                isValid = false;
            }
        }

        // Message
        if (messageInput.value.trim() === '') {
            messageError.textContent = 'Please enter your message.';
            messageInput.classList.add('error');
            isValid = false;
        } else if (messageInput.value.trim().length < 10) {
            messageError.textContent = 'Message must be at least 10 characters.';
            messageInput.classList.add('error');
            isValid = false;
        }

        if (isValid) {
            // Show success message
            var successEl = document.getElementById('form-success');
            successEl.classList.add('show');
            contactForm.reset();

            setTimeout(function () {
                successEl.classList.remove('show');
            }, 5000);
        }
    });

    /* ----------------------------------------
       AI Chat Widget
       ---------------------------------------- */
    var isChatOpen = false;

    function openChat() {
        isChatOpen = true;
        chatWindow.classList.add('active');
        chatWindow.setAttribute('aria-hidden', 'false');
        chatToggle.classList.add('active');
        chatBadge.classList.add('hidden');
        chatInput.focus();
        scrollChatToBottom();
    }

    function closeChat() {
        isChatOpen = false;
        chatWindow.classList.remove('active');
        chatWindow.setAttribute('aria-hidden', 'true');
        chatToggle.classList.remove('active');
    }

    function toggleChat() {
        if (isChatOpen) {
            closeChat();
        } else {
            openChat();
        }
    }

    chatToggle.addEventListener('click', toggleChat);
    chatClose.addEventListener('click', closeChat);

    // Escape key closes chat
    document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape' && isChatOpen) {
            closeChat();
            chatToggle.focus();
        }
    });

    /* ----------------------------------------
       AI Chat Messages
       ---------------------------------------- */
    function getcurrentTime() {
        var now = new Date();
        var hours = now.getHours();
        var minutes = now.getMinutes();
        var ampm = hours >= 12 ? 'PM' : 'AM';
        hours = hours % 12;
        hours = hours ? hours : 12;
        minutes = minutes < 10 ? '0' + minutes : minutes;
        return hours + ':' + minutes + ' ' + ampm;
    }

    function addMessage(text, sender) {
        var messageDiv = document.createElement('div');
        messageDiv.className = 'chat-message chat-message--' + sender;

        var avatarIcon = sender === 'ai' ? 'fa-robot' : 'fa-user';
        var avatarHTML = '<div class="chat-message__avatar"><i class="fas ' + avatarIcon + '"></i></div>';

        var contentHTML = '<div class="chat-message__content">' +
            '<p>' + escapeHTML(text) + '</p>' +
            '<span class="chat-message__time">' + getcurrentTime() + '</span>' +
            '</div>';

        messageDiv.innerHTML = avatarHTML + contentHTML;
        chatMessages.appendChild(messageDiv);
        scrollChatToBottom();
    }

    function addTypingIndicator() {
        var typingDiv = document.createElement('div');
        typingDiv.className = 'chat-message chat-message--ai';
        typingDiv.id = 'typing-indicator';

        typingDiv.innerHTML =
            '<div class="chat-message__avatar"><i class="fas fa-robot"></i></div>' +
            '<div class="chat-message__content">' +
            '<div class="typing-indicator"><span></span><span></span><span></span></div>' +
            '</div>';

        chatMessages.appendChild(typingDiv);
        scrollChatToBottom();
    }

    function removeTypingIndicator() {
        var indicator = document.getElementById('typing-indicator');
        if (indicator) indicator.remove();
    }

    function scrollChatToBottom() {
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }

    function escapeHTML(str) {
        var div = document.createElement('div');
        div.appendChild(document.createTextNode(str));
        return div.innerHTML;
    }

    /* ----------------------------------------
       AI Agent Integration — n8n Webhook
       ---------------------------------------- */

    var AI_AGENT_API = 'https://zia124.app.n8n.cloud/webhook/3bfa2ac3-ba46-4248-9923-24d7a4de0726/chat';
    var chatSessionId = crypto.randomUUID();

    async function sendMessageToAI(message) {
        var response = await fetch(AI_AGENT_API + '?action=sendMessage', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                chatInput: message,
                sessionId: chatSessionId
            })
        });

        if (!response.ok) {
            throw new Error('n8n webhook request failed with status: ' + response.status);
        }

        var data = await response.json();
        return data.output || data.text || data.chatOutput || JSON.stringify(data);
    }

    /* ----------------------------------------
       Chat Form Submission
       ---------------------------------------- */
    chatForm.addEventListener('submit', async function (e) {
        e.preventDefault();

        var message = chatInput.value.trim();
        if (!message) return;

        addMessage(message, 'user');
        chatInput.value = '';

        addTypingIndicator();

        try {
            var reply = await sendMessageToAI(message);
            removeTypingIndicator();
            addMessage(reply, 'ai');
        } catch (error) {
            removeTypingIndicator();
            addMessage('Sorry, something went wrong. Please try again later.', 'ai');
        }
    });

    /* ----------------------------------------
       Smooth Scroll for Anchor Links
       ---------------------------------------- */
    document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
        anchor.addEventListener('click', function (e) {
            var targetId = this.getAttribute('href');
            if (targetId === '#') return;

            var target = document.querySelector(targetId);
            if (target) {
                e.preventDefault();
                var headerHeight = header.offsetHeight;
                var targetPosition = target.getBoundingClientRect().top + window.scrollY - headerHeight;

                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

})();
