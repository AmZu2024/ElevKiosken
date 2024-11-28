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




