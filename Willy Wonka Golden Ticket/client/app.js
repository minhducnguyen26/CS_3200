function add_ticket() {
    var add_ticket = document.querySelector(".save_new_ticket");
    add_ticket.onclick = function() {
        var entrant_name = document.querySelector("#entrant_name");
        var entrant_age = document.querySelector("#entrant_age");
        var guest_name    = document.querySelector("#guest_name");
        
        add_new_ticket_to_server(entrant_name.value, entrant_age.value, guest_name.value);

        entrant_name.value = "";
        entrant_age.value  = "";
        guest_name.value    = "";
    }
}

function add_new_ticket_to_server(entrant_name, entrant_age, guest_name) {
    var data = "entrant_name=" + encodeURIComponent(entrant_name);
    data    += "&entrant_age=" + encodeURIComponent(entrant_age);
    data    += "&guest_name="   + encodeURIComponent(guest_name);

    fetch("http://localhost:8080/tickets",{
        method:"POST",
        headers:{
            "Content-Type":"application/x-www-form-urlencoded"
        },
        body: data,
        credentials: "include"
    }).then(function(response) {
        if (response.status == 201) {
            console.log("CREATED one new ticket, now reload the list of tickets");
            list_all_tickets_from_server();
        } else if (response.status == 403){
            alert("The Oompa Loompas have already received your ticket. Please try again tomorrow.");
        }
    });
}

function display_tickets(item) {
    var entrant_name = item.entrant_name;
    var entrant_age  = item.entrant_age;
    var guest_name    = item.guest_name;
    var random_token  = item.random_token;

    var tickets_list = document.querySelector(".tickets_list");

    var ticket = document.createElement("div");
    ticket.classList.add("ticket");

    var ticket_contents = `
    <div class="ticket_content_wrapper">
        <div class="head">
            <div class="info_on_ticket">
                <span class="title">Entrant Name: </span>
                <span class="info">${entrant_name}</span>
            </div>
            <div class="info_on_ticket">
                <span class="title">Entrant Age: </span>
                <span class="info">${entrant_age}</span>
            </div>
            <div class="info_on_ticket">
                <span class="title">Guest Name: </span>
                <span class="info">${guest_name}</span>
            </div>
        </div>
        <div class="tail">
            <div>
                <span class="ticket_status">Admit One</span>
            </div>
        </div>
    </div>`

    ticket.innerHTML = ticket_contents;
    tickets_list.append(ticket);

    var ticket_content_wrapper = ticket.getElementsByClassName("ticket_content_wrapper")[0];
    var head = ticket.getElementsByClassName("head")[0];
    var tail = ticket.getElementsByClassName("tail")[0];
    var ticket_status = ticket.getElementsByClassName("ticket_status")[0]
    
    var day_of_week = new Date().getDay();
    if (random_token == day_of_week) {
        ticket.style.background = "black";
        ticket.className = "ticket winner";
        ticket_content_wrapper.style.background = "yellow";
        head.style.borderRight = "2px solid black";
        tail.style.padding = "80px 0px 30px 11px";
        ticket_status.innerHTML = "WINNER";
    }
}

function list_all_tickets_from_server() {
    add_ticket();

    fetch("http://localhost:8080/tickets", {
        credentials: "include"
    }).then(function(response) {
        // Decode JSON data from the response
        response.json().then(function(data) {
            var tickets_list = document.querySelector(".tickets_list");
            tickets_list.innerHTML = "";

            // save and/or use data
            // data is an array of pies (array of strings)
            MY_TICKETS = data;
            console.log('LIST all tickets from server: ', MY_TICKETS);
            
            data.forEach(function(item) {
                display_tickets(item);
            })
        });
    }); 
}

list_all_tickets_from_server();