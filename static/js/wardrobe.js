var $ = (id) => {return document.getElementById(id);}

const loader = $("loader");
const main = $("main");

const wardrobeItems = $("wardrobe-items");
const clothingItemTemplate = $("clothing-item");

const searchItemsButton = $("search-items");
const addItemButton = $("add-item");

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

addItemButton.addEventListener("click", () => {
    const itemName = document.getElementById("item-name").value;
    const itemImage = document.getElementById("item-image").files[0];
    const itemType = document.getElementById("item-type").value;
    const itemColor = document.getElementById("item-color").value;
    const itemSize = document.getElementById("item-size").value;
    const itemBrand = document.getElementById("item-brand").value;
    const itemMaterial = document.getElementById("item-material").value;
    const itemNotes = document.getElementById("item-notes").value;
    const itemDate = document.getElementById("purchase-date").value;
    const itemPrice = document.getElementById("item-price").value;

    const formData = new FormData();
    formData.append("name", itemName);
    formData.append("image", itemImage);
    formData.append("type", itemType);
    formData.append("color", itemColor);
    formData.append("size", itemSize);
    formData.append("brand", itemBrand);
    formData.append("material", itemMaterial);
    formData.append("notes", itemNotes);
    formData.append("date", itemDate);
    formData.append("price", itemPrice);

    const xhr = new XMLHttpRequest();
    xhr.open("POST", "/db/wardrobe/add-item", true);
    xhr.send(formData);

    new bootstrap.Modal($("addItemModal"), {}).hide();
});
