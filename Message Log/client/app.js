var item_input = document.querySelector("#user_input");

var add_button = document.querySelector(".button")
add_button.onclick = function() {
    createNewItem(item_input.value);
};

var inventory = document.querySelector("#inventory");
inventory.onclick = function() {
    var inventory_chest = document.querySelector("#inventory_chest");
    inventory_chest.style.display = "block";

    item_input.value = "";
};

function createNewItem(item) {
    var data = "item_name=" + encodeURIComponent(item);
    
    fetch("http://localhost:8080/items",{
        method:"POST",
        headers:{
            "Content-Type":"application/x-www-form-urlencoded"
        },
        body: data
    }).then(function(response) {
        console.log("This worked! Reload the inventory chest!");
        loadTheItems();
    });
}

function loadTheItems() {
    fetch("http://localhost:8080/items").then(function(response) {
        // Decode JSON data from the response
        response.json().then(function(data) {
            var item_row = document.querySelector(".row")
            item_row.innerHTML = "";

            // save and/or use data
            // data is an array of pies (array of strings)
            items = data;
            console.log('Items loaded from server: ', items);

            data.forEach(function(item) {
                // e.g. insert the item into the DOM.
                var new_column = document.createElement("div");
                new_column.className = "column";

                // choose images to display

                // Bar
                if (item.toLowerCase() == "healing potion") {
                    var img = document.createElement("img");
                    img.className = "items";
                    img.src = "images/healing_potion.png";
                }
                else if (item.toLowerCase() == "mana potion"){
                    var img = document.createElement("img");
                    img.className = "items";
                    img.src = "images/mana_potion.png";
                }
                else if (item.toLowerCase() == "love potion"){
                    var img = document.createElement("img");
                    img.className = "items";
                    img.src = "images/love_potion.png";
                }
                else if (item.toLowerCase() == "power potion"){
                    var img = document.createElement("img");
                    img.className = "items";
                    img.src = "images/power_potion.png";
                    img.style.transform = "scaleX(-1)";
                }
                else if (item.toLowerCase() == "strawberry juice"){
                    var img = document.createElement("img");
                    img.className = "items";
                    img.src = "images/strawberry_juice.png";
                }

                // Hospital
                else if (item.toLowerCase() == "vitamin"){
                    var img = document.createElement("img");
                    img.className = "items";
                    img.src = "images/vitamin.png";
                }
                else if (item.toLowerCase() == "facial mask"){
                    var img = document.createElement("img");
                    img.className = "items";
                    img.src = "images/facial_mask.png";
                }

                // Library
                else if (item.toLowerCase() == "spell for dummies"){
                    var img = document.createElement("img");
                    img.className = "items";
                    img.src = "images/spell_for_dummies.png";
                }
                else if (item.toLowerCase() == "dark magic"){
                    var img = document.createElement("img");
                    img.className = "items";
                    img.src = "images/dark_magic.png";
                }
                else if (item.toLowerCase() == "break the curse"){
                    var img = document.createElement("img");
                    img.className = "items";
                    img.src = "images/break_the_curse.png";
                }

                // Armor Shop
                else if (item.toLowerCase() == "sword"){
                    var img = document.createElement("img");
                    img.className = "items";
                    img.src = "images/sword.png";
                }
                else if (item.toLowerCase() == "helmet"){
                    var img = document.createElement("img");
                    img.className = "items";
                    img.src = "images/helmet.png";
                }
                else if (item.toLowerCase() == "axe"){
                    var img = document.createElement("img");
                    img.className = "items";
                    img.src = "images/axe.png";
                }
                else if (item.toLowerCase() == "armor"){
                    var img = document.createElement("img");
                    img.className = "items";
                    img.src = "images/armor.png";
                }
                else if (item.toLowerCase() == "bow"){
                    var img = document.createElement("img");
                    img.className = "items";
                    img.src = "images/bow.png";
                }
                else if (item.toLowerCase() == "shield"){
                    var img = document.createElement("img");
                    img.className = "items";
                    img.src = "images/shield.png";
                }

                // Restaurant
                else if (item.toLowerCase() == "ramen"){
                    var img = document.createElement("img");
                    img.className = "items";
                    img.src = "images/ramen.png";
                }
                else if (item.toLowerCase() == "mccombo"){
                    var img = document.createElement("img");
                    img.className = "items";
                    img.src = "images/mccombo.png";
                }
                else if (item.toLowerCase() == "fruits"){
                    var img = document.createElement("img");
                    img.className = "items";
                    img.src = "images/fruits.png";
                }
                else if (item.toLowerCase() == "beer"){
                    var img = document.createElement("img");
                    img.className = "items";
                    img.src = "images/beer.png";
                }
                else if (item.toLowerCase() == "coke"){
                    var img = document.createElement("img");
                    img.className = "items";
                    img.src = "images/coke.png";
                }

                // Else
                else {
                    var img = document.createElement("img");
                    img.className = "items";
                    img.src = "images/armor.png";
                }

                new_column.appendChild(img);
                item_row.appendChild(new_column);
            })
        });
    });
}       

loadTheItems();