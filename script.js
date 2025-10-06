const carousels = document.querySelectorAll(".carousel-container");

carousels.forEach(carousel => {
  const mainImage = carousel.querySelector(".main-image");
  const thumbs = carousel.querySelectorAll(".thumb");

  thumbs.forEach(t => {
    t.addEventListener("click", () => {
      thumbs.forEach(img => img.classList.remove("active"));
      t.classList.add("active");
      mainImage.style.opacity = 0;
      setTimeout(() => {
        mainImage.src = t.src;
        mainImage.style.opacity = 1;
      }, 200);
    });
  });
});





// Fade-in observer
const faders = document.querySelectorAll(".fade-in");
const appearOptions = { threshold: 0.2, rootMargin: "0px 0px -50px 0px" };
const appearOnScroll = new IntersectionObserver((entries, observer) => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    entry.target.classList.add("show");
    observer.unobserve(entry.target);
  });
}, appearOptions);
faders.forEach(fader => appearOnScroll.observe(fader));

// Lightbox
const galleryImages = document.querySelectorAll(".gallery-grid img");
const lightbox = document.getElementById("lightbox");
const lightboxImg = document.querySelector(".lightbox-img");
const closeBtn = document.querySelector("#lightbox .close");
const nextBtn = document.querySelector("#lightbox .next");
const prevBtn = document.querySelector("#lightbox .prev");

let currentIndex = 0;

galleryImages.forEach((img, index) => {
  img.addEventListener("click", () => {
    currentIndex = index;
    lightbox.style.display = "flex";
    lightboxImg.src = img.src;
  });
});

closeBtn.addEventListener("click", () => {
  lightbox.style.display = "none";
});

nextBtn.addEventListener("click", () => {
  currentIndex = (currentIndex + 1) % galleryImages.length;
  lightboxImg.src = galleryImages[currentIndex].src;
});

prevBtn.addEventListener("click", () => {
  currentIndex = (currentIndex - 1 + galleryImages.length) % galleryImages.length;
  lightboxImg.src = galleryImages[currentIndex].src;
});

lightbox.addEventListener("click", e => {
  if (e.target === lightbox) lightbox.style.display = "none";
});
