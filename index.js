"use strict";

window.onbeforeunload = function () {
  window.scrollTo(0, 0);
};

// MODAL
const modal = document.querySelector(".modal");
const overlay = document.querySelector(".overlay");
const btnCloseModal = document.querySelector(".close-modal");
const btnYesModal = document.querySelector(".modal-yes");
const btnsOpenModal = document.querySelectorAll(".show-modal");

const openModal = function () {
  document.body.classList.add("body-no-scroll");
  modal.classList.remove("hidden");
  overlay.classList.remove("hidden");
};

const closeModal = function () {
  document.body.classList.remove("body-no-scroll");
  modal.classList.add("hidden");
  overlay.classList.add("hidden");
};

window.addEventListener("load", openModal);

btnCloseModal.addEventListener("click", closeModal);

btnYesModal.addEventListener("click", closeModal);

overlay.addEventListener("click", closeModal);
// window.addEventListener("click", closeModal);

document.addEventListener("keydown", function (e) {
  if (e.key === "Escape") {
    if (!modal.classList.contains("hidden")) {
      closeModal();
    }
  }
});

function showModal() {
  // Check if the 'modalShown' flag is set in sessionStorage
  if (!sessionStorage.getItem("modalShown")) {
    // Show your modal here
    openModal();
    // Set the flag to indicate the modal has been shown
    sessionStorage.setItem("modalShown", "true");
  }
}

// Call showModal when the page loads
// document.addEventListener("DOMContentLoaded", showModal);

// SLIDER
//
document.addEventListener("DOMContentLoaded", function () {
  // Slider 1
  initializeSlider(
    ".slider",
    ".slides",
    ".slide",
    ".prev-arrow",
    ".next-arrow"
  );
  // Slider 2
  initializeSlider(
    ".slider2",
    ".slides2",
    ".slide2",
    ".prev-arrow2",
    ".next-arrow2"
  );

  function initializeSlider(
    sliderClass,
    slidesClass,
    slideClass,
    prevArrowClass,
    nextArrowClass
  ) {
    let slideIndex = 0;
    const slides = document.querySelectorAll(slideClass);
    const totalSlides = slides.length;
    let startPos = 0;
    let endPos = 0;
    const slider = document.querySelector(slidesClass);

    document
      .querySelector(prevArrowClass)
      .addEventListener("click", function () {
        moveSlide(-1, slider, totalSlides);
      });

    document
      .querySelector(nextArrowClass)
      .addEventListener("click", function () {
        moveSlide(1, slider, totalSlides);
      });

    slider.addEventListener("touchstart", function (e) {
      startPos = e.touches[0].clientX;
    });

    slider.addEventListener(
      "touchmove",
      function (e) {
        e.preventDefault();
        endPos = e.touches[0].clientX;
      },
      { passive: false }
    );

    slider.addEventListener("touchend", function () {
      if (startPos > endPos + 50) {
        moveSlide(1, slider, totalSlides);
      } else if (startPos < endPos - 50) {
        moveSlide(-1, slider, totalSlides);
      }
    });

    function moveSlide(step, slider, totalSlides) {
      slideIndex = (slideIndex + step + totalSlides) % totalSlides;
      const offset = -slideIndex * 100;
      slider.style.transform = `translateX(${offset}%)`;
    }
  }
});
