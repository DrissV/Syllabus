document.addEventListener("DOMContentLoaded", function () {
    const gallery = document.querySelector(".gallery");
    const prevButton = document.getElementById("prevButton");
    const nextButton = document.getElementById("nextButton");
    const pageSelect = document.getElementById("pageSelect");

    let currentPage = 0;
    const itemsPerPage = 9;
    let imageList = [];
    let totalPages; // Déclarer totalPages en tant que variable globale

    function isMobile() {
        return window.innerWidth <= 768;
    }

    function showPage(page) {
        gallery.innerHTML = "";

        const startIndex = page * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;

        const currentPageItems = imageList.slice(startIndex, endIndex);

        const emptyItemsCount = itemsPerPage - currentPageItems.length;

        currentPageItems.forEach((image) => {
            const { chemin, nom, rarete } = image;

            const galleryItem = document.createElement("div");
            galleryItem.classList.add("gallery-item");

            if (rarete === "x0") {
                galleryItem.classList.add("grayed-out");
            }

            galleryItem.innerHTML = `
                <img src="resources/${chemin}" alt="">
                <div class="description">
                    <p>${nom} (${rarete})</p>
                </div>
            `;

            gallery.appendChild(galleryItem);
        });

        for (let i = 0; i < emptyItemsCount; i++) {
            const emptyGalleryItem = document.createElement("div");
            emptyGalleryItem.classList.add("gallery-item", "empty-item");

            gallery.appendChild(emptyGalleryItem);
        }
    }

    function updateButtons() {
        prevButton.disabled = currentPage === 0;
        nextButton.disabled = currentPage === totalPages - 1;
    }

    function updateSelectOptions() {
        pageSelect.innerHTML = "";

        for (let i = 1; i <= totalPages; i++) {
            const option = document.createElement("option");
            option.value = i;
            option.text = `Page ${i}`;
            pageSelect.appendChild(option);
        }

        pageSelect.value = currentPage + 1;
    }

    prevButton.addEventListener("click", () => {
        if (currentPage > 0) {
            currentPage--;
            showPage(currentPage);
            updateButtons();
            updateSelectOptions();
        }
    });

    nextButton.addEventListener("click", () => {
        if (currentPage < totalPages - 1) {
            currentPage++;
            showPage(currentPage);
            updateButtons();
            updateSelectOptions();
        }
    });

    pageSelect.addEventListener("change", () => {
        currentPage = parseInt(pageSelect.value) - 1;
        showPage(currentPage);
        updateButtons();
    });

    function loadJSON(jsonFileName) {
        fetch(jsonFileName)
            .then(response => response.json())
            .then(data => {
                imageList = data;
                totalPages = Math.ceil(imageList.length / itemsPerPage); // Affecter totalPages ici
                showPage(currentPage);
                updateButtons();
                updateSelectOptions();
            })
            .catch(error => {
                console.error("Erreur lors de la récupération de la liste d'images", error);
            });
    }

    // Charge le fichier JSON par défaut
    loadJSON("catalogue.json");
});
