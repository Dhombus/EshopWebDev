// Initialize jQuery validation when DOM is ready
(function ($) {
    $(document).ready(function () {
        // Add a method to validate optional URL fields more strictly if filled
        $.validator.addMethod('validURL', function (value, element) {
            if (!value) return true; // empty is ok
            // basic URL pattern (requires protocol)
            return /^(https?:\/\/)/i.test(value);
        }, 'Please enter a valid URL (including http:// or https://).');

        $('#contactForm').validate({
            rules: {
                name: { required: true },
                email: { required: true, email: true },
                website: { validURL: true },
                message: { required: true }
            },
            messages: {
                name: { required: 'This field is required' },
                email: { required: 'This field is required', email: 'Please enter a valid email address.' },
                message: { required: 'Please enter a comment.' }
            },
            errorClass: 'is-invalid',
            validClass: 'is-valid',
            errorElement: 'div',
            errorPlacement: function (error, element) {
                // If there is an existing Bootstrap .invalid-feedback element, put the message there
                var feedback = element.next('.invalid-feedback');
                if (!feedback.length) {
                    // fallback: look inside parent (when input is wrapped)
                    feedback = element.parent().find('.invalid-feedback').first();
                }
                if (feedback.length) {
                    feedback.text(error.text());
                } else {
                    // no existing container, create one
                    error.addClass('invalid-feedback');
                    error.insertAfter(element);
                }
            },
            highlight: function (element, errorClass, validClass) {
                $(element).addClass(errorClass).removeClass(validClass);
            },
            unhighlight: function (element, errorClass, validClass) {
                $(element).removeClass(errorClass).addClass(validClass);
                // clear any existing feedback text so message doesn't persist
                var feedback = $(element).next('.invalid-feedback');
                if (!feedback.length) feedback = $(element).parent().find('.invalid-feedback').first();
                if (feedback.length) feedback.text('');
            },
            submitHandler: function (form) {
                alert('Message sent.');
                form.reset();
                $(form).find('.is-valid').removeClass('is-valid');
                return false;
            }
        });
    });
})(jQuery);