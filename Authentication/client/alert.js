var success_message  = document.querySelector("#success_message");
var fail_message     = document.querySelector("#fail_message");
var warning_message  = document.querySelector("#warning_message");
var bad_emai_message = document.querySelector("#bad_email_message");
var close_success_message  = document.querySelector("#close_success_message");
var close_fail_message     = document.querySelector("#close_fail_message");
var close_warning_message  = document.querySelector("#close_warning_message");
var close_bad_email_message = document.querySelector("#close_bad_email_message");
let timer;

function show_alert_box(message, time) {
    message.classList.remove("hide");
    message.classList.add("show");

    if (message.classList.contains("hidden")) {
        message.classList.remove("hidden");
    }
    timer = setTimeout(function() {
        hide_alert_box(success_message);
        hide_alert_box(fail_message);
        hide_alert_box(warning_message);
        hide_alert_box(bad_email_message);
    }, time)
}

function hide_alert_box(message) {
    message.classList.remove("show");
    message.classList.add("hide");
}

close_success_message.onclick = function() {
    hide_alert_box(success_message);
    clearTimeout(timer);
}

close_fail_message.onclick = function() {
    hide_alert_box(fail_message);
    clearTimeout(timer);
}

close_warning_message.onclick = function() {
    hide_alert_box(warning_message);
    clearTimeout(timer);
}

close_bad_email_message.onclick = function() {
    hide_alert_box(bad_email_message);
    clearTimeout(timer);
}