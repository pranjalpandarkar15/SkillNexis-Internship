// ================= GET ELEMENTS =================

const galleryItems = document.querySelectorAll(".gallery-item");

const lightbox = document.getElementById("lightbox");

const lightboxImage = document.getElementById("lightboxImage");

const lightboxTitle = document.getElementById("lightboxTitle");

const lightboxCategory = document.getElementById("lightboxCategory");

const closeBtn = document.getElementById("closeBtn");

const prevBtn = document.getElementById("prevBtn");

const nextBtn = document.getElementById("nextBtn");


// Current image index

let currentIndex = 0;


// ================= OPEN LIGHTBOX =================

function openLightbox(index) {

    currentIndex = index;

    const item = galleryItems[currentIndex];

    const image = item.querySelector("img");

    const title = item.querySelector("h3");

    const category = item.querySelector("p");


    // Change lightbox content

    lightboxImage.src = image.src;

    lightboxImage.alt = image.alt;

    lightboxTitle.textContent = title.textContent;

    lightboxCategory.textContent = category.textContent;


    // Show lightbox

    lightbox.classList.add("active");


    // Prevent background scrolling

    document.body.style.overflow = "hidden";
}


// ================= CLOSE LIGHTBOX =================

function closeLightbox() {

    lightbox.classList.remove("active");

    document.body.style.overflow = "auto";
}


// ================= NEXT IMAGE =================

function showNext() {

    currentIndex++;

    // If last image → first image

    if (currentIndex >= galleryItems.length) {
        currentIndex = 0;
    }

    openLightbox(currentIndex);
}


// ================= PREVIOUS IMAGE =================

function showPrevious() {

    currentIndex--;

    // If first image → last image

    if (currentIndex < 0) {
        currentIndex = galleryItems.length - 1;
    }

    openLightbox(currentIndex);
}


// ================= CLICK ON GALLERY IMAGE =================

galleryItems.forEach((item, index) => {

    item.addEventListener("click", function() {

        openLightbox(index);

    });

});


// ================= BUTTON EVENTS =================

closeBtn.addEventListener("click", closeLightbox);

nextBtn.addEventListener("click", showNext);

prevBtn.addEventListener("click", showPrevious);


// ================= CLOSE WHEN CLICKING BACKGROUND =================

lightbox.addEventListener("click", function(event) {

    if (event.target === lightbox) {

        closeLightbox();

    }

});


// ================= KEYBOARD CONTROLS =================

document.addEventListener("keydown", function(event) {

    // Escape → Close

    if (event.key === "Escape") {

        closeLightbox();

    }


    // Right arrow → Next

    if (event.key === "ArrowRight") {

        showNext();

    }


    // Left arrow → Previous

    if (event.key === "ArrowLeft") {

        showPrevious();

    }

});