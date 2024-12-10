/* eslint-disable */
//Hämtar button elementet 
const dropdownButton = document.getElementById('dropdown-button');
//Hämtar ikon elementet
const dropdownIcon = document.getElementById ('dropdown-icon'); 

  //  Säkerställer att dropdown menyn uppdateras så som vi tänkt
  //  finns risk annars att ikon ändringen sker innan bootstrap får chansen att updatera aria-expand attribute
  if (dropdownButton && dropdownIcon)
  {
    //Lägger till en listener som triggas varje gång man klickar
    dropdownButton.addEventListener('click',function(){
    setTimeout(() => {
      //Kollar aria-expanded value, är dropdown meny öppen så är den true
      if (dropdownButton.getAttribute('aria-expanded') === 'true') {
        //När dropdown är öppen så försvinner burger ikonen och ersäts av ett kryss
        dropdownIcon.classList.remove('bi-list');
        dropdownIcon.classList.add('bi-x');
      } else {
        //När droppdown menyn är stängd ser vi burger ikonen
        dropdownIcon.classList.remove('bi-x');
        dropdownIcon.classList.add('bi-list');
      }
    }, 0); 
  });
}
  //Objekt för produkter i kategorin senaste
const products = {
    //Array med samtliga produkter och dess egenskaper
    senaste: [
        { name: "Coca-Cola", price: "20kr", image: "images/cocacola.png", id: "cola" },
        { name: "Baguette", price: "55kr", image: "images/baguette.jpeg", id: "baguette" },
        { name: "Chips", price: "20kr", image: "images/chips.png", id: "chips" },
        { name: "Lokum", price: "35kr", image: "images/lokum.jpeg", id: "lokum" }
    ],
    dryck: [ 
        { name: "Nocco", price: "30kr", image: "images/nocco.png", id: "nocco" },
        { name: "Coca-Cola", price: "20kr", image: "images/cocacola.png", id: "cola" },
        { name: "Öl", price: "65kr", image: "images/beer.png", id: "beer" },
        { name: "Fanta", price: "20kr", image: "images/fanta.png", id: "fanta" }
    ],
    snacks: [
        { name: "Kexchoklad", price: "15kr", image: "images/kexchoklad.png", id: "kex" },
        { name: "Chips", price: "20kr", image: "images/chips.png", id: "chips" },
        { name: "Popcorn", price: "15kr", image: "images/popcorn.jpeg", id: "popcorn" },
        { name: "Godis", price: "20kr", image: "images/godis.jpeg", id: "candy" }
    ],
    mellanmal: [
        { name: "Wasa Knäcke", price: "10kr", image: "images/wasa.png", id: "wasa" },
        { name: "Lokum", price: "35kr", image: "images/lokum.jpeg", id: "lokum" },
        { name: "Risifrutti", price: "15kr", image: "images/risifrutti.jpeg", id: "risifrutti" },
        { name: "Baguette", price: "55kr", image: "images/baguette.jpeg", id: "baguette" }
    ]
};

//Funktion för att skriva ut samtliga produkter i htmlen
function showProducts(category, containerId) {
    const container = document.getElementById(containerId);
    //Loopar igenom objektet och hämtar egenskaperna samt lägger till de i html strukturen
    products[category].forEach((product) => {
        const productElement = `
    <div class="produkt d-flex flex-column">
        <div class="d-flex justify-content-center flex-grow-1 flex-column">
            <img src="${product.image}" alt="${product.name}">
        </div>
        <h4>${product.name}</h4>
        <div class="d-flex justify-content-between">
            <!-- Knapp för att lägga till -->
            <button class="addera" id="addera-${product.id}" onclick="addProduct('${category}', '${product.id}')">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960">
                    <path d="M427-428H168v-106h259v-259h106v259h259v106H533v259H427v-259Z" />
                </svg>
            </button>

            <!-- Visar priset -->
            <p>${product.price}</p>
            
            <!-- Knapp för att minska -->
            <button class="substrahera" id="substrahera-${product.id}" onclick="removeProduct('${category}', '${product.id}')">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960">
                    <path d="M168-428v-106h624v106H168Z" />
                </svg>
            </button>
            
            <!-- Knapp för att ta bort -->
            <button class="ta-bort" id="ta-bort-${product.id}" onclick="removeProductFromCart('${product.id}')">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960">
                    <path d="M480-400q-20 0-30-15t-10-35V-600q0-20 10-35t30-15q20 0 30 15t10 35v150q0 20-10 35t-30 15Zm0 320q-92 0-173-47t-126-126q-47-81-47-173t47-173q47-81 126-126t173-47q92 0 173 47t126 126q47 81 47 173t-47 173q-47 81-126 126t-173 47Z" />
                </svg>
            </button>
        </div>
    </div>
`;

        container.innerHTML += productElement;
    });
}

let cart = JSON.parse(sessionStorage.getItem("cart")) || [];

function addProduct(category,productID)
{
    const produkt = products[category].find(p=>p.id === productID);
    if(produkt)
    { 
       let existingProduct = cart.find(p => p.id === produkt.id);
       if(existingProduct)
       { existingProduct.quantity +=1; }
       else
       {
        produkt.quantity = 1;
        cart.push(produkt);
        existingProduct = produkt;
       }
       sessionStorage.setItem("cart", JSON.stringify(cart)); 
    }
       
}

function removeProduct(category,productID)
{
    const product = products[category].find(p=>p.id === productID);

    if(product)
    { 
       let existingProduct = cart.find(p => p.id === product.id);
       if(existingProduct)
       {
        
        if(existingProduct.quantity>=1)
        {
            existingProduct.quantity -=1;
        }
        else if(existingProduct.quantity =0)
        {
            existingProduct.quantity;
            cart = cart.filter(p => p.id !== product.id);
        }
       }
       else
       {
        product.quantity = 0;
        cart.push(product);
        existingProduct = product;
       }
       sessionStorage.setItem("cart", JSON.stringify(cart)); 
       displayCart();
    }
     console.log(cart)  
}

function calculateTotalCartPrice() {
    let totalCartPrice = 0;

    cart.forEach(product => {
        const productTotal = product.quantity * parseInt(product.price, 10); 
        totalCartPrice += productTotal;
    });
    return totalCartPrice;
}

document.addEventListener("DOMContentLoaded", function () {
    displayCart();
});

function displayCart() {
    const cartItemsContainer = document.getElementById("varukorg-items");    
    cartItemsContainer.innerHTML = "";

    const filteredCart = cart.filter(item => item.quantity > 0);

    filteredCart.forEach(item => {
        const totalPrice = parseInt(item.price, 10) * item.quantity;

        const row = document.createElement("tr");
        row.innerHTML = `
            <td>${item.name}</td>
            <td>${item.price} </td>
            <td>${item.quantity}</td>
            <td>${totalPrice} kr</td>
            <td>
               <button class="btn btn-sm btn-primary" onclick="increaseQuantity('${item.id}')">+</button>
               <button class="btn btn-sm btn-danger" onclick="decreaseQuantity('${item.id}')">-</button>
               <button class="btn btn-sm btn-warning" onclick="removeProductFromCart('${item.id}')">Ta bort</button>

            </td>
        `;
        cartItemsContainer.appendChild(row);
    });

    document.getElementById("totalsumma").innerText = `Totalt pris: ${calculateTotal()} kr`;
}

function calculateTotal() {
    const cart = JSON.parse(sessionStorage.getItem("cart")) || [];
    return cart.reduce((sum, item) => sum + parseInt(item.price, 10) * item.quantity, 0);
}

//Inväntar att sidan har laddat innan produkterna visas
document.addEventListener("DOMContentLoaded", () => {
    showProducts("senaste", "senaste-container");
    showProducts("dryck", "dryck-container");
    showProducts("snacks", "snacks-container");
    showProducts("mellanmal", "mellanmal-container");
});
/* eslint-enable */

// Funktion för att visa varukorgen
function displayCart() {
    const cartItemsContainer = document.getElementById("varukorg-items");    
    cartItemsContainer.innerHTML = "";

    const cart = JSON.parse(sessionStorage.getItem("cart")) || [];

    cart.forEach(item => {
        const totalPrice = parseInt(item.price, 10) * item.quantity;

        const row = document.createElement("tr");
        row.innerHTML = `
            <td>${item.name}</td>
            <td>${item.price}</td>
            <td>${item.quantity}</td>
            <td>${totalPrice} kr</td>
            <td>
                <button class="btn btn-sm btn-primary" onclick="increaseQuantity('${item.id}')">+</button>
                <button class="btn btn-sm btn-danger" onclick="decreaseQuantity('${item.id}')">-</button>
                <button class="btn btn-sm btn-warning" onclick="removeProductFromCart('${item.id}')">Ta bort</button>
            </td>
        `;
        cartItemsContainer.appendChild(row);
    });

    document.getElementById("totalsumma").innerText = `Totalt pris: ${calculateTotal()} kr`;
}

// Funktion för att ta bort en produkt helt från varukorgen
function removeProductFromCart(productID) {
    console.log("Produkt-ID som tas bort:", productID);
    
    // Hämta den senaste varukorgen från sessionStorage
    let cart = JSON.parse(sessionStorage.getItem("cart")) || [];

    // Logga varukorgen före borttagningen
    console.log("Före borttagning:", cart);
    
    // Hitta index för produkten i varukorgen
    const productIndex = cart.findIndex(product => product.id === productID);

    // Ta bort produkten om den finns i varukorgen
    if (productIndex !== -1) {
        cart.splice(productIndex, 1); // Ta bort produkten från cart
    }

    // Logga varukorgen efter borttagningen
    console.log("Efter borttagning:", cart);

    // Uppdatera sessionStorage med den nya kundkorgen
    sessionStorage.setItem("cart", JSON.stringify(cart));

    // Uppdatera varukorgsvisningen
    displayCart();
}

// Funktion för att minska antalet av en produkt i varukorgen
function decreaseQuantity(productID) {
    let cart = JSON.parse(sessionStorage.getItem("cart")) || [];
    let existingProduct = cart.find(p => p.id === productID);

    if (existingProduct) {
        if (existingProduct.quantity > 1) {
            existingProduct.quantity -= 1;
        } else {
            cart = cart.filter(p => p.id !== productID); // Ta bort produkten om kvantiteten når 0
        }
    }

    sessionStorage.setItem("cart", JSON.stringify(cart)); 
    displayCart();
}

// Funktion för att öka antalet av en produkt i varukorgen
function increaseQuantity(productID) {
    let cart = JSON.parse(sessionStorage.getItem("cart")) || [];
    let existingProduct = cart.find(p => p.id === productID);

    if (existingProduct) {
        existingProduct.quantity += 1;
    }

    sessionStorage.setItem("cart", JSON.stringify(cart)); 
    displayCart();
}

// Funktion för att räkna ut totalsumman
function calculateTotal() {
    const cart = JSON.parse(sessionStorage.getItem("cart")) || [];
    return cart.reduce((sum, item) => sum + parseInt(item.price, 10) * item.quantity, 0);
}

document.addEventListener("DOMContentLoaded", function () {
    displayCart();
});



