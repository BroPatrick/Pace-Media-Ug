document.addEventListener('DOMContentLoaded', function () {

    /* =================================
       1. MOBILE NAVIGATION
    ================================= */

    const navToggle = document.querySelector('.nav-toggle');
    const mainNav = document.querySelector('#main-nav');

    if (navToggle && mainNav) {
        navToggle.addEventListener('click', () => {
            const expanded =
                navToggle.getAttribute('aria-expanded') === 'true';

            navToggle.setAttribute('aria-expanded', String(!expanded));
            mainNav.classList.toggle('open');
        });
    }


    /* =================================
       2. SUBSCRIPTION FORM
    ================================= */

    const subscribeForms = document.querySelectorAll('.subscribe-form');

    subscribeForms.forEach(form => {

        form.addEventListener('submit', async event => {

            event.preventDefault();

            const emailInput =
                form.querySelector('input[type="email"]');

            if (!emailInput || !emailInput.value.trim()) {
                if (emailInput) emailInput.focus();
                return;
            }

            const endpoint = form.getAttribute('action');

            if (!endpoint || !endpoint.includes('formsubmit.co')) {
                showMessage(
                    form,
                    'Subscription form is not properly configured.',
                    true
                );
                return;
            }

            const submitButton =
                form.querySelector('[type="submit"]');

            if (submitButton) submitButton.disabled = true;

            try {

                const response = await fetch(endpoint, {
                    method: 'POST',
                    body: new FormData(form),
                    headers: {
                        'Accept': 'application/json'
                    }
                });

                if (!response.ok) {
                    throw new Error('Subscription failed');
                }

                const email = emailInput.value.trim();

                showMessage(
                    form,
                    `Thank you! Your subscription request has been sent for ${email}.`
                );

                emailInput.value = '';

            } catch (error) {

                showMessage(
                    form,
                    'Unable to submit your subscription. Please try again or email pacestudios26@gmail.com.',
                    true
                );

            } finally {

                if (submitButton) submitButton.disabled = false;

            }

        });

    });


    function showMessage(form, text, isError = false) {

        const oldMessage = form.querySelector('.form-message');

        if (oldMessage) oldMessage.remove();

        const message = document.createElement('div');

        message.className = 'form-message';

        if (isError) {
            message.classList.add('error');
        }

        message.textContent = text;

        form.appendChild(message);

        setTimeout(() => message.remove(), 6000);

    }


    /* =================================
       3. FEATURED NEWS SLIDER
    ================================= */

    const slides = Array.from(
        document.querySelectorAll('.featured-slider .slide')
    );

    let current = 0;
    let sliderInterval = null;

    function showSlide(index) {

        slides.forEach((slide, i) => {
            slide.classList.toggle('active', i === index);
        });

    }

    function startSlider() {

        clearInterval(sliderInterval);

        if (slides.length <= 1) return;

        sliderInterval = setInterval(() => {

            current = (current + 1) % slides.length;

            showSlide(current);

        }, 4500);

    }

    if (slides.length) {

        showSlide(0);

        const slider = document.querySelector('.featured-slider');

        startSlider();

        if (slider) {

            slider.addEventListener('mouseenter', () => {
                clearInterval(sliderInterval);
            });

            slider.addEventListener('mouseleave', () => {
                startSlider();
            });

        }

    }


    /* =================================
       4. PACE MEDIA UG NEWS MANAGEMENT
    ================================= */

    const newsCards = document.querySelectorAll('.news-card');

    newsCards.forEach(card => {

        // Prevent creating duplicate Read More sections
        if (card.dataset.articleProcessed === 'true') return;

        const body = card.querySelector('.card-body');

        if (!body) return;

        // Collect all article paragraphs, not just the first one
        const articleParagraphs = Array.from(
            body.querySelectorAll('p:not(.muted)')
        ).filter(paragraph =>
            !paragraph.closest('.full-article') &&
            !paragraph.classList.contains('article-excerpt')
        );

        if (!articleParagraphs.length) return;

        // Preserve the complete original paragraphs
        const fullArticle = document.createElement('div');

        fullArticle.className = 'full-article';

        articleParagraphs.forEach(paragraph => {
            fullArticle.appendChild(paragraph.cloneNode(true));
        });

        // Generate a short preview from the complete article
        const originalText = articleParagraphs
            .map(paragraph => paragraph.textContent.trim())
            .join(' ');

        const words = originalText.split(/\s+/);

        const highlight = words.slice(0, 35).join(' ');

        const excerpt = document.createElement('p');

        excerpt.className = 'article-excerpt';

        excerpt.textContent =
            highlight + (words.length > 35 ? '...' : '');

        // Create Read More section
        const details = document.createElement('details');

        details.className = 'article-details';

        const summary = document.createElement('summary');

        summary.innerHTML =
            'Read More <span aria-hidden="true">＋</span>';

        // Insert preview before removing original paragraphs
        articleParagraphs[0].before(excerpt);

        // Remove original paragraphs after preserving their contents
        articleParagraphs.forEach(paragraph => paragraph.remove());

        details.appendChild(summary);

        details.appendChild(fullArticle);

        excerpt.after(details);

        // Change symbol when article expands
        details.addEventListener('toggle', () => {

            const icon = summary.querySelector('span');

            if (icon) {
                icon.textContent = details.open ? '−' : '＋';
            }

        });

        card.dataset.articleProcessed = 'true';

    });


    /* =================================
       5. NEWS CATEGORY FILTERING
    ================================= */

    const filters = document.querySelectorAll('.news-filter');

    filters.forEach(button => {

        button.addEventListener('click', function () {

            const category =
                (this.dataset.filter || 'all').toLowerCase();

            // Update active category
            filters.forEach(filter => {
                filter.classList.remove('active');
            });

            this.classList.add('active');

            let visible = 0;

            newsCards.forEach(card => {

                const cardCategory =
                    (card.dataset.category || '').toLowerCase();

                const matches =
                    category === 'all' ||
                    cardCategory === category;

                card.hidden = !matches;

                if (matches) visible++;

            });

            // Show message when no articles match
            const emptyMessage =
                document.getElementById('noNewsMessage');

            if (emptyMessage) {
                emptyMessage.hidden = visible > 0;
            }

        });

    });

});
