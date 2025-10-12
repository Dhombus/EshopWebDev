
(function ($) {
    $(document).ready(function () {
        const loginAlert = `
        WARNING MESSAGE FROM ███████: 
        YOU HAVE GRANTED PERMISSION TO BECOME A PART OF 
        THIS WEBSITE
        YOUR PRESENCE IS NOW CONSIDERED AS A TYPE 3 HAZARD

        DO NOT BE ALARMED
        DO NOT FURTHER INTERACT WITH YOUR DEVICE
        DO NOT ATTEMPT TO LEAVE YOUR CURRENT LOCATION

        IF YOU HEAR FAMILIAR VOICES OUTSIDE YOUR ROOM:
        DO NOT PAY ATTENTION
        THOSE ARE NOT WHO THEY SEEM TO BE

        LOCAL AUTHORITIES ARE NOW HEADING TO YOUR LOCATION
        PLEASE COMPLY WITH ALL INSTRUCTIONS GIVEN TO YOU 
        ONCE THEY ARRIVE
        `;

        const signUpAlert = `
        MESSAGE FROM ███████: 
        This message is sent from a backdoor from the website.
        If you are reading this, you have given your data to the 
        website.

        LEAVE THIS WEBSITE IMMEDIATELY
        DO NOT ATTEMPT TO LOG IN WITH YOUR CREDENTIALS

        You will receive a call from us very soon.
        Comply with all instructions given to you during the call.
        We will try our best to mitigate further damage from this 
        website.
        `;

        // Log In form validator
        $('#logInForm').validate({
            rules: {
                email: { required: true, email: true },
                password: { required: true }
            },
            messages: {
                email: { required: 'Please enter your email.' },
                password: { required: 'Please enter your password.' }
            },
            errorClass: 'is-invalid',
            validClass: 'is-valid',
            errorElement: 'div',
            errorPlacement: function (error, element) {
                var feedback = element.next('.invalid-feedback');
                if (!feedback.length) {
                    feedback = element.parent().find('.invalid-feedback').first();
                }
                if (feedback.length) {
                    feedback.text(error.text());
                }
                else {
                    error.addClass('invalid-feedback');
                    error.insertAfter(element);
                }
            },
            highlight: function (element, errorClass, validClass) {
                $(element).addClass(errorClass).removeClass(validClass);
            },
            unhighlight: function (element, errorClass, validClass) {
                $(element).removeClass(errorClass).addClass(validClass);
                var feedback = $(element).next('.invalid-feedback');
                if (!feedback.length) {
                    feedback = $(element).parent().find('.invalid-feedback').first();
                }
                if (feedback.length) {
                    feedback.text('');
                }
            },
            submitHandler: function (form) {
                alert(loginAlert); form.reset();
                $(form).find('.is-valid').removeClass('is-valid');
                $('#authModal').modal('hide');
                return false;
            }
        });

        // Sign Up form validator
        $('#signUpForm').validate({
            rules: {
                name: { required: true },
                email: { required: true, email: true },
                password: { required: true, minlength: 6 },
                confirm_password: { required: true, equalTo: '#signupPassword' },
            },
            messages: {
                name: { required: 'Please enter your name.' }, email:
                    { required: 'Please enter your email.' }, password:
                    { required: 'Please enter a password.', minlength: 'Password must be at least 6 characters.' },
                confirm_password: { required: 'Please confirm your password.', equalTo: 'Passwords must match.' }
            },
            errorClass: 'is-invalid',
            validClass: 'is-valid',
            errorElement: 'div',
            errorPlacement: function (error, element) {
                var feedback = element.next('.invalid-feedback');
                if (!feedback.length) {
                    feedback = element.parent().find('.invalid-feedback').first();
                }
                if (feedback.length) {
                    feedback.text(error.text());
                }
                else {
                    error.addClass('invalid-feedback'); error.insertAfter(element);
                }
            },
            highlight: function (element, errorClass, validClass) {
                $(element).addClass(errorClass).removeClass(validClass);
            },
            unhighlight: function (element, errorClass, validClass) {
                $(element).removeClass(errorClass).addClass(validClass);
                var feedback = $(element).next('.invalid-feedback');
                if (!feedback.length) {
                    feedback = $(element).parent().find('.invalid-feedback').first();
                }
                if (feedback.length) {
                    feedback.text('');
                }
            },
            submitHandler: function (form) {
                alert(signUpAlert);
                form.reset();
                $(form).find('.is-valid').removeClass('is-valid');
                $('#authModal').modal('hide');
                return false;
            }
        });

        // Reset form state when modal hides or when switching tabs
        $('#authModal').on('hidden.bs.modal', function () {
            $('#logInForm, #signUpForm').each(function () {
                this.reset();
                $(this).find('.is-valid, .is-invalid').removeClass('is-valid is-invalid');
                $(this).find('.invalid-feedback').text('');
            });
        });

        $('button[data-bs-toggle="tab"]').on('shown.bs.tab', function (e) {
            // reset messages when switching tabs
            var target = $(e.target).data('bs-target');
            $(target).find('form')[0].reset();
            $(target).find('.is-valid, .is-invalid').removeClass('is-valid is-invalid');
            $(target).find('.invalid-feedback').text('');
        });
    });
})(jQuery);

