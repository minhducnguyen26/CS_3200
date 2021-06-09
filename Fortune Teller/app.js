// https://api.jsonbin.io/b/600f5374bca934583e41b04a/2
var answer_list = [];

// DOM query
var button = document.querySelector("#button");

// Event function
button.onclick = function() {
    var alert = document.querySelector(".input_required");
    alert.style.display = "none";

    var bubble_speech = document.querySelector(".bubble_speech");
    bubble_speech.style.display = "none";

    var old_answer = document.querySelectorAll('.bubble_speech div');
    for( var i = 0; div = old_answer[i]; i++) {
        div.parentNode.removeChild(div);
    } 

// DOM manipulation (modify)

    // 1. Query PARENT element
    var history = document.querySelector("#history");

    // 2. Create a new CHILD elememt
    var user_input = document.querySelector("#user_input");
    if (user_input.value != ""){
        var list_item = document.createElement("li");
        list_item.innerHTML = "Your question:   " + user_input.value;
        list_item.style.color = "#000000";
    } else {
        var alert = document.querySelector(".input_required");
        alert.style.display = "block";
    }

    // 3. Append the CHILD element to the PARENT element
    history.appendChild(list_item);

    // 2. Create a new CHILD elememt
    var list_item = document.createElement("li");

    if (user_input.value.toLowerCase().includes("who")) {
        var reply = answer_list[0];   
    }
    else if (user_input.value.toLowerCase().includes("what")) {
        var reply = answer_list[1];   
    }
    else if (user_input.value.toLowerCase().includes("when")) {
        var reply = answer_list[2];   
    }
    else if (user_input.value.toLowerCase().includes("where")) {
        var reply = answer_list[3];   
    }
    else if (user_input.value.toLowerCase().includes("why")) {
        var reply = answer_list[4];   
    }
    else if (user_input.value.toLowerCase().includes("how")) {
        var reply = answer_list[5];   
    }
    else {
        var reply = answer_list[6];
    }

    var randomIndex = Math.floor(Math.random() * reply.answer.length);
    list_item.innerHTML = "Dr. Strange's reply:   " + reply.answer[randomIndex];
    list_item.style.color = reply.color;

    // 3. Append the CHILD element to the PARENT element
    history.appendChild(list_item);

    var list_item = document.createElement("li");
    history.appendChild(list_item);

// Display answer
    var answer = document.createElement("div");
    answer.innerHTML = reply.answer[randomIndex];
    answer.style.color = "#000000";
    answer.style.fontSize = "35px";
    answer.style.position = "absolute";
    answer.style.top = "48%";
    answer.style.left = "22%";

    var bubble_speech = document.querySelector(".bubble_speech");
    bubble_speech.appendChild(answer);
    bubble_speech.style.display = "block";
}

// Clear history if there are too many old questions and answers
button.addEventListener("click", function() {
    var history = document.querySelector("#history");
    var list_length = history.getElementsByTagName("li").length;
    if (list_length > 12) {
        console.log(list_length)
        var list_items = document.querySelectorAll('#history li');
        for( var i = 0; li = list_items[i]; i++) {
           li.parentNode.removeChild(li);
        }   
    }
});

var history_list = document.querySelector("#pop_up_list");

var view_history = document.querySelector("#view_history");
view_history.onclick = function() {
    history_list.style.display = "block";

    var alert = document.querySelector(".input_required");
    alert.style.display = "none";

    var bubble_speech = document.querySelector(".bubble_speech");
    bubble_speech.style.display = "none";
}

// Clear history if there are too many old questions and answers
view_history.addEventListener("click", function() {
    var history = document.querySelector("#history");
    var list_length = history.getElementsByTagName("li").length;
    if (list_length > 12) {
        console.log(list_length)
        var list_items = document.querySelectorAll('#history li');
        for( var i = 0; li = list_items[i]; i++) {
           li.parentNode.removeChild(li);
        }   
    }

    var old_answer = document.querySelectorAll('.bubble_speech div');
        for( var i = 0; div = old_answer[i]; i++) {
            div.parentNode.removeChild(div);
        } 
});

var close_button = document.querySelector(".close")
close_button. onclick = function() {
    history_list.style.display = "none";
}

var modal = history_list
window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}

var user_input = document.querySelector("#user_input");
user_input.onclick = function() {
    var alert = document.querySelector(".input_required");
    alert.style.display = "none";

    var bubble_speech = document.querySelector(".bubble_speech");
    bubble_speech.style.display = "none";
}

// Clear history if there are too many old questions and answers
user_input.addEventListener("click", function() {
    var history = document.querySelector("#history");
    var list_length = history.getElementsByTagName("li").length;
    if (list_length >= 12) {
        var list_items = document.querySelectorAll('#history li');
        for( var i = 0; li = list_items[i]; i++) {
            li.parentNode.removeChild(li);
        }   
    }

    var old_answer = document.querySelectorAll('.bubble_speech div');
        for( var i = 0; div = old_answer[i]; i++) {
            div.parentNode.removeChild(div);
        } 
});

var option1 = document.querySelector("#option1");
var option2 = document.querySelector("#option2");
var option3 = document.querySelector("#option3");
var option4 = document.querySelector("#option4");

var magic1 = document.querySelector(".magic1");
var magic2 = document.querySelector(".magic2");
var magic3 = document.querySelector(".magic3");
var magic4 = document.querySelector(".magic4");

option1.onclick = function() {
    magic2.style.display = "block";
    magic1.style.display = "none";
    magic3.style.display = "none";
    magic4.style.display = "none";
}

option2.onclick = function() {
    magic3.style.display = "block";
    magic1.style.display = "none";
    magic2.style.display = "none";
    magic4.style.display = "none";
}


option3.onclick = function() {
    magic4.style.display = "block";
    magic1.style.display = "none";
    magic2.style.display = "none";
    magic3.style.display = "none";
}

option4.onclick = function() {
    magic1.style.display = "block";
    magic2.style.display = "none";
    magic3.style.display = "none";
    magic4.style.display = "none";
}

// Fetch

fetch("https://api.jsonbin.io/b/600f5374bca934583e41b04a/2").then(
    function(response) {
        // Decode JSON data from the response
        response.json().then( 
            function(data) {
                // save and/or use data
                answer_list = data;
            }
        );
    }
);