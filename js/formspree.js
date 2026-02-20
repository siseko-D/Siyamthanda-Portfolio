// Contact form handling with Formspree
document.addEventListener('DOMContentLoaded', function () {
    const contactForm = document.getElementById('contact-form');
    const formSuccess = document.getElementById('form-success');
    const formError = document.getElementById('form-error');

    if (contactForm) {
        // Handle form submission
        contactForm.addEventListener('submit', async function (e) {
            e.preventDefault();

            // Reset messages
            formSuccess.classList.add('hidden');
            formError.classList.add('hidden');

            // Validate form
            let isValid = true;

            // Name validation
            const nameInput = document.getElementById('name');
            const nameError = document.getElementById('name-error');
            if (!nameInput.value.trim()) {
                nameError.classList.remove('hidden');
                isValid = false;
            } else {
                nameError.classList.add('hidden');
            }

            // Email validation
            const emailInput = document.getElementById('email');
            const emailError = document.getElementById('email-error');
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailInput.value.trim() || !emailRegex.test(emailInput.value)) {
                emailError.classList.remove('hidden');
                isValid = false;
            } else {
                emailError.classList.add('hidden');
            }

            // Subject validation
            const subjectInput = document.getElementById('subject');
            const subjectError = document.getElementById('subject-error');
            if (!subjectInput.value.trim()) {
                subjectError.classList.remove('hidden');
                isValid = false;
            } else {
                subjectError.classList.add('hidden');
            }

            // Message validation
            const messageInput = document.getElementById('message');
            const messageError = document.getElementById('message-error');
            if (!messageInput.value.trim()) {
                messageError.classList.remove('hidden');
                isValid = false;
            } else {
                messageError.classList.add('hidden');
            }

            if (!isValid) return;

            const submitButton = contactForm.querySelector('button[type="submit"]');
            const originalText = submitButton.innerHTML;

            // Show loading state
            submitButton.innerHTML = '<span>Sending...</span>';
            submitButton.disabled = true;

            try {
                // Use Formspree's AJAX submission
                const formData = new FormData(contactForm);

                const response = await fetch(contactForm.action, {
                    method: 'POST',
                    body: formData,
                    headers: {
                        'Accept': 'application/json'
                    }
                });

                if (response.ok) {
                    // Success message
                    formSuccess.classList.remove('hidden');
                    contactForm.reset();

                    // Hide success message after 5 seconds
                    setTimeout(() => {
                        formSuccess.classList.add('hidden');
                    }, 5000);
                } else {
                    // Error message
                    formError.classList.remove('hidden');
                }
            } catch (error) {
                // Error message
                formError.classList.remove('hidden');
            } finally {
                // Reset button
                submitButton.innerHTML = originalText;
                submitButton.disabled = false;
            }
        });
    }

    // Email tooltip functionality
    const emailTooltip = document.querySelector('.email-tooltip');
    if (emailTooltip) {
        emailTooltip.addEventListener('click', function () {
            const email = 'dlakavusiseko@gmail.com';
            navigator.clipboard.writeText(email).then(() => {
                const originalText = this.querySelector('p').textContent;
                this.querySelector('p').textContent = 'Copied to clipboard!';

                setTimeout(() => {
                    this.querySelector('p').textContent = originalText;
                }, 2000);
            }).catch(err => {
                console.error('Failed to copy: ', err);
            });
        });
    }
});