//Hämtar button elementet 
const dropdownButton = document.getElementById('dropdownButton');
//Hämtar ikon elementet
const dropdownIcon = document.getElementById ('dropdownIcon'); 
//Lägger till en listener som triggas varje gång man klickar
dropdownButton.addEventListener('click', function() {
  //  Säkerställer att dropdown menyn uppdateras så som vi tänkt
  //  finns risk annars att ikon ändringen sker innan bootstrap får chansen att updatera aria-expand attribute
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

  //Objekt för produkter i kategorin senaste
const products = {
    //Array med samtliga produkter och dess egenskaper
    senaste: [
        { name: "Coca-Cola", price: "20kr", image: "images/cocacola.png" },
        { name: "Baguette", price: "55kr", image: "images/baguette.jpeg" },
        { name: "Chips", price: "20kr", image: "images/chips.png" },
        { name: "Lokum", price: "35kr", image: "images/lokum.jpeg" },
    ],
    dryck: [ 
        { name: "Nocco", price: "30kr", image: "images/nocco.png" },
        { name: "Coca-Cola", price: "20kr", image: "images/cocacola.png" },
        { name: "Öl", price: "65kr", image: "images/beer.png" },
        { name: "Fanta", price: "20kr", image: "images/fanta.png" },
    ],
    snacks: [
        { name: "Kexchoklad", price: "15kr", image: "images/kexchoklad.png" },
        { name: "Chips", price: "20kr", image: "images/chips.png" },
        { name: "Popcorn", price: "15kr", image: "images/popcorn.jpeg" },
        { name: "Godis", price: "20kr", image: "images/godis.jpeg" },
    ],
    mellanmal: [
        { name: "Wasa Knäcke", price: "10kr", image: "images/wasa.png" },
        { name: "Lokum", price: "35kr", image: "images/lokum.jpeg" },
        { name: "Risifrutti", price: "15kr", image: "images/risifrutti.jpeg" },
        { name: "Baguette", price: "55kr", image: "images/baguette.jpeg" },
    ],
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
                    <button id="addera">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960">
                            <path d="M427-428H168v-106h259v-259h106v259h259v106H533v259H427v-259Z" />
                        </svg>
                    </button>
                    <p>${product.price}</p>
                    <button id="substrahera">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960">
                            <path d="M168-428v-106h624v106H168Z" />
                        </svg>
                    </button>
                </div>
            </div>`;
        container.innerHTML += productElement;
    });
}
//Inväntar att sidan har laddat innan produkterna visas
document.addEventListener("DOMContentLoaded", () => {
    showProducts("senaste", "senaste-container");
    showProducts("dryck", "dryck-container");
    showProducts("snacks", "snacks-container");
    showProducts("mellanmal", "mellanmal-container");
});


