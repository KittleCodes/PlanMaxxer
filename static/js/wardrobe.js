var $ = (id) => {return document.getElementById(id);}

const loader = $("loader");
const main = $("main");

const wardrobeItems = $("wardrobe-items");
const clothingItemTemplate = $("clothing-item");

function Get(yourUrl){
    var Httpreq = new XMLHttpRequest();
    Httpreq.open("GET",yourUrl,false);
    Httpreq.send(null);
    return Httpreq.responseText;          
}

data = JSON.parse(Get("/db/wardrobe/items"));
data.forEach(item => {
    const clothingItem = clothingItemTemplate.cloneNode(true);
    clothingItem.style = "";
    clothingItem.querySelector("#item-name").innerText = item[1];
    clothingItem.querySelector("#item-image").src = "/static/clothing-images/" + item[0] + ".png";
    clothingItem.querySelector("#item-notes").innerText = item[9];
    clothingItem.querySelector("#item-details").innerText = "Bought on " + item[7] + " for $" + item[8];
    wardrobeItems.appendChild(clothingItem);
});

loader.style = "display: none;";
main.style = "padding: 2%;";