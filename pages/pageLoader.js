$(function () {
    $("#authModalContainer").load("authModal.html", function () {
        var $modal = $('#authModal');
        if ($modal.length) {
            $modal.appendTo('body'); // ensure Bootstrap can correctly calculate scrollbar compensation
        }
        // remove the loader container contents to avoid leaving an extra scrollable wrapper
        $("#authModalContainer").empty();
        $.getScript("authModal.js");
    });
});
