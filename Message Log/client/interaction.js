var inventory_chest = document.querySelector("#inventory_chest");

var house_1 = document.querySelector("#click_on_house_1");
var dojo = document.querySelector("#dojo");

var house_2 = document.querySelector("#click_on_house_2");
var bar = document.querySelector("#bar");
var bartender = document.querySelector("#bartender");

var house_3 = document.querySelector("#click_on_house_3");
var hospital = document.querySelector("#hospital");
var nurse =  document.querySelector("#nurse");

var house_4 = document.querySelector("#click_on_house_4");
var library = document.querySelector('#library');
var wizard = document.querySelector("#wizard");

var house_5 = document.querySelector("#click_on_house_5");
var armor_shop = document.querySelector("#armor_shop");
var blacksmith = document.querySelector("#blacksmith");

var house_6 = document.querySelector("#click_on_house_6");
var restaurant = document.querySelector("#restaurant");
var cook = document.querySelector("#cook")

house_1.addEventListener("click", function() {
    dojo.style.display = "block";

    bar.style.display = "none";
    bartender.style.display = "none";

    hospital.style.display = "none";
    nurse.style.display = "none";

    library.style.display = "none";
    wizard.style.display = "none";

    armor_shop.style.display = "none";
    blacksmith.style.display = "none";

    restaurant.style.display = "none";
    cook.style.display = "none";

    inventory_chest.style.display = "none";
});

house_2.addEventListener("click", function() {
    bar.style.display = "block";
    bartender.style.display = "block";

    dojo.style.display = "none";

    hospital.style.display = "none";
    nurse.style.display = "none";

    library.style.display = "none";
    wizard.style.display = "none";

    armor_shop.style.display = "none";
    blacksmith.style.display = "none";

    restaurant.style.display = "none";
    cook.style.display = "none";

    inventory_chest.style.display = "none";
});

house_3.addEventListener("click", function() {
    hospital.style.display = "block";
    nurse.style.display = "block";

    dojo.style.display = "none";

    bar.style.display = "none";
    bartender.style.display = "none";

    library.style.display = "none";
    wizard.style.display = "none";

    armor_shop.style.display = "none";
    blacksmith.style.display = "none";

    restaurant.style.display = "none";
    cook.style.display = "none";

    inventory_chest.style.display = "none";
});

house_4.addEventListener("click", function() {
    library.style.display = "block";
    wizard.style.display = "block";

    dojo.style.display = "none";

    bar.style.display = "none";
    bartender.style.display = "none";

    hospital.style.display = "none";
    nurse.style.display = "none";

    armor_shop.style.display = "none";
    blacksmith.style.display = "none";

    restaurant.style.display = "none";
    cook.style.display = "none";

    inventory_chest.style.display = "none";
});

house_5.addEventListener("click", function() {
    armor_shop.style.display = "block";
    blacksmith.style.display = "block";

    dojo.style.display = "none";

    bar.style.display = "none";
    bartender.style.display = "none";

    hospital.style.display = "none";
    nurse.style.display = "none";

    library.style.display = "none";
    wizard.style.display = "none";

    restaurant.style.display = "none";
    cook.style.display = "none";

    inventory_chest.style.display = "none";
});

house_6.addEventListener("click", function() {
    restaurant.style.display = "block";
    cook.style.display = "block";

    dojo.style.display = "none";

    bar.style.display = "none";
    bartender.style.display = "none";

    hospital.style.display = "none";
    nurse.style.display = "none";

    library.style.display = "none";
    wizard.style.display = "none";

    armor_shop.style.display = "none";
    blacksmith.style.display = "none";

    inventory_chest.style.display = "none";
});