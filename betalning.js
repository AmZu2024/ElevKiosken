/* eslint-disable */
//Simulerar betalning vid användning av mellanslag
document.addEventListener("keydown", (event) => {
    const statusDiv = document.getElementById("betalning-status");
    const kvittoVal = document.getElementById("kvitto-val");
    const kvittoResultat = document.getElementById("kvitto-resultat");

    if (event.code === "Space") { 
        if (statusDiv) {
            statusDiv.innerHTML = `
                <div class="BetalningGodkännd">
                    Betalning genomförd, tack för ditt köp!
                </div>`;
        }
        if (kvittoVal) {
            kvittoVal.classList.remove("doljKvitto"); 
        }
    }
    if (event.code === "Escape") { 
        if (statusDiv) {
            statusDiv.innerHTML = `
                <div class="BetalningNekad">
                    Betalning nekad, försök igen!
                </div>`;
        }
        if (kvittoVal) {
            kvittoVal.classList.add("doljKvitto"); 
        }
        if (kvittoResultat) {
            kvittoResultat.innerHTML = ""; 
        }
    }
});


    document.getElementById("visa-kvitto").addEventListener("click", () => {
    const kvittoTyp = document.getElementById("kvitto-typ").value;
    const kvittoResultat = document.getElementById("kvitto-resultat");

    if (kvittoTyp === "email") {
        kvittoResultat.innerHTML = `
            <div class="alert alert-info">
                Ett kvitto har skickats till din e-postadress.
            </div>`;
    } else if (kvittoTyp === "print") {
        kvittoResultat.innerHTML = `
            <div class="alert alert-info">
                Ditt kvitto är redo för utskrift.
            </div>`;
    }
});
/* eslint-enable */