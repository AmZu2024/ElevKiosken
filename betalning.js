//Simulerar betalning vid användning av mellanslag
document.addEventListener("keydown", (event) => {
    if (event.code === "Space") { 
        const statusDiv = document.getElementById("betalning-status");
        if (statusDiv) {
            statusDiv.innerHTML = `
                <div class="BetalningGodkännd">
                    Betalning genomförd, tack för ditt köp!
                </div>`;
        }
    }
    if (event.code === "Escape") { 
        const statusDiv = document.getElementById("betalning-status");
        if (statusDiv) {
            statusDiv.innerHTML = `
                <div class="BetalningNekad">
                    Betalning nekad, försök igen!
                </div>`;
        }
    }
});

