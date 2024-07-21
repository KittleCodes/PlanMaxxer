const colors = JSON.parse(Get("/db/wardrobe/search/color"));
const colorInput = document.getElementById('search-color');
const colorDropdown = document.getElementById('color-dropdown');

colorInput.addEventListener('input', function() {
    const query = this.value.toLowerCase();
    colorDropdown.innerHTML = '';
    
    if (query.length >= 2) {
        const filteredColors = colors
            .flat()
            .filter(color => color.toLowerCase().includes(query));
        
        filteredColors.forEach(color => {
            const div = document.createElement('div');
            div.textContent = color;
            div.addEventListener('click', function() {
                colorInput.value = color;
                colorDropdown.innerHTML = '';
            });
            colorDropdown.appendChild(div);
        });
        colorDropdown.classList.add('show');
    } else {
        colorDropdown.classList.remove('show');
    }
});

const sizes = JSON.parse(Get("/db/wardrobe/search/size"));
const sizeInput = document.getElementById('search-size');
const sizeDropdown = document.getElementById('size-dropdown');

sizeInput.addEventListener('input', function() {
    const query = this.value.toLowerCase();
    sizeDropdown.innerHTML = '';
    
    if (query.length >= 2) {
        const filteredSizes = sizes
            .flat()
            .filter(size => size.toLowerCase().includes(query));
        
        filteredSizes.forEach(size => {
            const div = document.createElement('div');
            div.textContent = size;
            div.addEventListener('click', function() {
                sizeInput.value = size;
                sizeDropdown.innerHTML = '';
            });
            sizeDropdown.appendChild(div);
        });
        sizeDropdown.classList.add('show');
    } else {
        sizeDropdown.classList.remove('show');
    }
});

const brands = JSON.parse(Get("/db/wardrobe/search/brand"));
const brandInput = document.getElementById('search-brand');
const brandDropdown = document.getElementById('brand-dropdown');

brandInput.addEventListener('input', function() {
    const query = this.value.toLowerCase();
    brandDropdown.innerHTML = '';
    
    if (query.length >= 2) {
        const filteredBrands = brands
            .flat()
            .filter(brand => brand.toLowerCase().includes(query));
        
        filteredBrands.forEach(brand => {
            const div = document.createElement('div');
            div.textContent = brand;
            div.addEventListener('click', function() {
                brandInput.value = brand;
                brandDropdown.innerHTML = '';
            });
            brandDropdown.appendChild(div);
        });
        brandDropdown.classList.add('show');
    } else {
        brandDropdown.classList.remove('show');
    }
});

const types = JSON.parse(Get("/db/wardrobe/search/clothing_type"));
const typeInput = document.getElementById('search-type');
const typeDropdown = document.getElementById('type-dropdown');

typeInput.addEventListener('input', function() {
    const query = this.value.toLowerCase();
    typeDropdown.innerHTML = '';
    
    if (query.length >= 2) {
        const filteredTypes = types
            .flat()
            .filter(type => type.toLowerCase().includes(query));
        
        filteredTypes.forEach(type => {
            const div = document.createElement('div');
            div.textContent = type;
            div.addEventListener('click', function() {
                typeInput.value = type;
                typeDropdown.innerHTML = '';
            });
            typeDropdown.appendChild(div);
        });
        typeDropdown.classList.add('show');
    } else {
        typeDropdown.classList.remove('show');
    }
});

const materials = JSON.parse(Get("/db/wardrobe/search/material"));
const materialInput = document.getElementById('search-material');
const materialDropdown = document.getElementById('material-dropdown');

materialInput.addEventListener('input', function() {
    const query = this.value.toLowerCase();
    materialDropdown.innerHTML = '';
    
    if (query.length >= 2) {
        const filteredMaterials = materials
            .flat()
            .filter(material => material.toLowerCase().includes(query));
        
        filteredMaterials.forEach(material => {
            const div = document.createElement('div');
            div.textContent = material;
            div.addEventListener('click', function() {
                materialInput.value = type;
                materialDropdown.innerHTML = '';
            });
            materialDropdown.appendChild(div);
        });
        materialDropdown.classList.add('show');
    } else {
        materialDropdown.classList.remove('show');
    }
});

document.addEventListener('click', function(event) {
    if (!colorInput.contains(event.target) && !colorDropdown.contains(event.target)) {
        colorDropdown.classList.remove('show');
    }
});

$("search-item").addEventListener("click", () => {
    const name = $("search-name").value;
    const color = colorInput.value;
    const size = sizeInput.value;
    const brand = brandInput.value;
    const type = typeInput.value;
    const material = materialInput.value;
    const notes = $("search-notes").value;
    const date = $("search-purchase-date").value;
    const price = $("search-price").value;

    const params = new URLSearchParams({
        name: name,
        color: color,
        size: size,
        brand: brand,
        type: type,
        material: material,
        notes: notes,
        date: date,
        price: price
    }).toString();

    const xhr = new XMLHttpRequest();
    xhr.open("GET", `/db/wardrobe/search?${params}`, true);
    xhr.send();

    xhr.onreadystatechange = function() {
        if (xhr.readyState == 4 && xhr.status == 200) {
            const data = JSON.parse(xhr.responseText);
            console.log(data);
            wardrobeItems.innerHTML = '';
            data.forEach(item => {
                const clothingItem = clothingItemTemplate.cloneNode(true);
                clothingItem.style = "";
                clothingItem.querySelector("#item-name").innerText = item[1];
                clothingItem.querySelector("#item-image").src = "/static/clothing-images/" + item[0] + ".png";
                clothingItem.querySelector("#item-notes").innerText = item[9];
                clothingItem.querySelector("#item-details").innerText = "Bought on " + item[7] + " for $" + item[8];
                wardrobeItems.appendChild(clothingItem);
            });
        }
    };
});