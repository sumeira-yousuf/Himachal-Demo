$(document).ready(function () {
  const owl = $(".owl-carousel").owlCarousel({
    items: 1,
    loop: true,
    autoplay: true,
    autoplayTimeout: 5000,
    autoplayHoverPause: false,
    dots: false,
    nav: false,
    animateOut: "fadeOut",
  });

  let formInteractionTimer;
  let isFormBeingUsed = false;

  function pauseSlider() {
    owl.trigger("stop.owl.autoplay");
  }

  function resumeSlider() {
    owl.trigger("play.owl.autoplay");
  }

  function resetFormTimer() {
    clearTimeout(formInteractionTimer);
    pauseSlider();

    formInteractionTimer = setTimeout(function () {
      resumeSlider();
    }, 2000);
  }

  $("#heroContactForm input, #heroContactForm textarea").on(
    "focus click input",
    function () {
      resetFormTimer();
    }
  );

  $("#heroContactForm input, #heroContactForm textarea").on(
    "keydown keyup change",
    function () {
      resetFormTimer();
    }
  );

 
  $("#staticContactForm input, #staticContactForm textarea").on(
    "focus click input keydown keyup change paste",
    function () {
      isFormBeingUsed = true;
      console.log("Form being used - preventing hide");
    }
  );

  $("#staticContactForm input, #staticContactForm textarea").on(
    "blur",
    function () {
      setTimeout(function () {
        if (
          !$(
            "#staticContactForm input:focus, #staticContactForm textarea:focus"
          ).length
        ) {
          isFormBeingUsed = false;
          console.log("Form usage reset");
        }
      }, 3000);
    }
  );

  $("#staticContactForm").on("blur", function () {
    setTimeout(function () {
      if (
        !$("#staticContactForm input:focus, #staticContactForm textarea:focus")
          .length
      ) {
        isFormBeingUsed = false;
        console.log("Form usage reset from form blur");
      }
    }, 2000);
  });

 
  $(".back-to-top").hide();

  
  $(window).scroll(function () {
    const scrollTop = $(this).scrollTop();
    const navbar = $("#navbar");
    const logo = $("#navbar-logo");
    const mobileLogo = $("#navbar-logo-mobile");
    const hamburgerBtn = $("#mobile-menu-btn");
    const heroForm = $("#staticContactForm").parent(); 

   
    heroForm.fadeIn(200);

    if (scrollTop > 100) {
      $(".back-to-top").fadeIn();
      // Add white background and dark text when scrolling
      navbar
        .removeClass("bg-transparent text-white")
        .addClass("bg-white text-gray-900 shadow-md");
      // Change to dark logo for better contrast on white background
      logo.attr("src", "public/logo_dark.png");
      mobileLogo.attr("src", "public/logo_dark.png");
      // Update hamburger button styling for better visibility
      hamburgerBtn
        .removeClass("text-white hover:bg-white hover:bg-opacity-10")
        .addClass("text-gray-900 hover:bg-gray-200");
    } else {
      $(".back-to-top").fadeOut();
      // Remove white background and restore transparent with white text
      navbar
        .removeClass("bg-white text-gray-900 shadow-md")
        .addClass("bg-transparent text-white");
      // Change back to light logo for transparent background
      logo.attr("src", "public/logo_light.png");
      mobileLogo.attr("src", "public/logo_light.png");
      // Restore hamburger button styling for transparent background
      hamburgerBtn
        .removeClass("text-gray-900 hover:bg-gray-200")
        .addClass("text-white hover:bg-white hover:bg-opacity-10");
    }
  });


  $(".back-to-top").click(function () {
    $("html, body").animate({ scrollTop: 0 }, 800);
    return false;
  });


  $("#mobile-menu-btn").click(function () {
    $("#mobile-menu").removeClass("hidden");
  
    $("body").css("overflow", "hidden");
    $("html").css("overflow", "hidden");

    $("#hamburger-icon").addClass("hidden");
    $("#close-icon").removeClass("hidden");
  });

  $("#mobile-menu-close").click(function () {
    closeMobileMenu();
  });

  
  $(".mobile-nav-link").click(function () {
    closeMobileMenu();
  });

 
  $("#mobile-menu").click(function (e) {
    if (e.target === this) {
      closeMobileMenu();
    }
  });

  // Function to close mobile menu
  function closeMobileMenu() {
    $("#mobile-menu").addClass("hidden");
    // Restore scrolling
    $("body").css("overflow", "");
    $("html").css("overflow", "");
    // Switch icons back
    $("#hamburger-icon").removeClass("hidden");
    $("#close-icon").addClass("hidden");
  }


  const modal = $("#contactModal");
  const callbackModal = $("#callbackModal");

  $(".enquire-btn, .contact-btn").click(function (e) {
    e.preventDefault();
    modal.removeClass("hidden");
    $("body").addClass("overflow-hidden");
  });

  $("#closeModal").click(function () {
    modal.addClass("hidden");
    $("body").removeClass("overflow-hidden");
    // Reset form when closing modal
    $("#bookingModalForm")[0]?.reset();
  });

  // Callback modal handlers
  $(".callback-btn").click(function (e) {
    e.preventDefault();
    callbackModal.removeClass("hidden");
    $("body").addClass("overflow-hidden");
  });

  $("#closeCallbackModal").click(function () {
    callbackModal.addClass("hidden");
    $("body").removeClass("overflow-hidden");
   
    $("#callbackModalForm")[0]?.reset();
  });

  
  modal.click(function (e) {
    if (e.target === this) {
      modal.addClass("hidden");
      $("body").removeClass("overflow-hidden");
    }
  });

  callbackModal.click(function (e) {
    if (e.target === this) {
      callbackModal.addClass("hidden");
      $("body").removeClass("overflow-hidden");
    }
  });

 
  $(document).keyup(function (e) {
    if (e.keyCode === 27) {
      
      modal.addClass("hidden");
      callbackModal.addClass("hidden");
      $("body").removeClass("overflow-hidden");
    }
  });

s
  $(".nav-link").click(function (e) {
    e.preventDefault();
    const target = $(this).attr("href");
    if (target.startsWith("#")) {
      const targetElement = $(target);
      if (targetElement.length) {
        $("html, body").animate(
          {
            scrollTop: targetElement.offset().top - 80,
          },
          800
        );
      }
    }
  });

  // Form validation functions
  function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  function validatePhone(phone) {
    const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
    return phoneRegex.test(phone);
  }

  function validateName(name) {
    return name.trim().length >= 2;
  }

  function validateRequired(value) {
    return value.trim().length > 0;
  }

  function showError(input, message) {
    const errorDiv = input.siblings(".error-message");
    if (errorDiv.length === 0) {
      input.after(
        `<div class="error-message text-red-500 text-sm mt-1">${message}</div>`
      );
    } else {
      errorDiv.text(message);
    }
    input.addClass("border-red-500").removeClass("border-gray-300");
  }

  function clearError(input) {
    input.siblings(".error-message").remove();
    input.removeClass("border-red-500").addClass("border-gray-300");
  }

  function validateForm(form) {
    let isValid = true;
    const inputs = form.find("input, textarea");

    inputs.each(function () {
      const input = $(this);
      const value = input.val().trim();
      const type = input.attr("type");
      const placeholder = input.attr("placeholder");

      clearError(input);

      if (input.prop("required") && !validateRequired(value)) {
        showError(input, `${placeholder} is required`);
        isValid = false;
      } else if (value.length > 0) {
        if (type === "email" && !validateEmail(value)) {
          showError(input, "Please enter a valid email address");
          isValid = false;
        } else if (type === "tel" && !validatePhone(value)) {
          showError(input, "Please enter a valid phone number");
          isValid = false;
        } else if (
          placeholder &&
          placeholder.toLowerCase().includes("name") &&
          !validateName(value)
        ) {
          showError(input, "Name must be at least 2 characters long");
          isValid = false;
        }
      }
    });

    return isValid;
  }

  // Form validation on blur
  $("input, textarea").on("blur", function () {
    const input = $(this);
    const value = input.val().trim();
    const type = input.attr("type");
    const placeholder = input.attr("placeholder");

    clearError(input);

    if (value.length > 0) {
      if (type === "email" && !validateEmail(value)) {
        showError(input, "Please enter a valid email address");
      } else if (type === "tel" && !validatePhone(value)) {
        showError(input, "Please enter a valid phone number");
      } else if (
        placeholder &&
        placeholder.toLowerCase().includes("name") &&
        !validateName(value)
      ) {
        showError(input, "Name must be at least 2 characters long");
      }
    }
  });
});
// Add this to your existing main.js file

// Enhanced Contact Form Functionality
$(document).ready(function () {
  // Set minimum date to today
  const dateInput = document.getElementById("travelDate");
  if (dateInput) {
    const today = new Date().toISOString().split("T")[0];
    dateInput.setAttribute("min", today);

    // Calendar icon click handler
    const calendarIcon = document.getElementById("calendarIcon");
    if (calendarIcon) {
      calendarIcon.addEventListener("click", function () {
        dateInput.focus();
        dateInput.showPicker ? dateInput.showPicker() : dateInput.click();
      });
    }

    // Enhanced date input styling and validation
    dateInput.addEventListener("change", function () {
      const selectedDate = new Date(this.value);
      const today = new Date();
      today.setHours(0, 0, 0, 0);

      if (selectedDate < today) {
        alert("Please select a future date for your travel");
        this.value = "";
        return;
      }

      // Add visual feedback
      this.style.borderColor = "#10B981";
      this.style.backgroundColor = "#F0FDF4";

      setTimeout(() => {
        this.style.borderColor = "";
        this.style.backgroundColor = "";
      }, 1000);
    });
  }

  // Auto-focus next field on Enter key
  const formInputs = $(
    "#contactModal input, #contactModal select, #contactModal textarea"
  );
  formInputs.each(function (index) {
    $(this).on("keydown", function (e) {
      if (e.key === "Enter" && this.tagName !== "TEXTAREA") {
        e.preventDefault();
        const nextIndex = index + 1;
        if (nextIndex < formInputs.length) {
          formInputs.eq(nextIndex).focus();
        }
      }
    });
  });
});
// Perfect Clickable Date Picker
function openDatePicker() {
  const dateInput = document.getElementById("travelDate");
  if (dateInput) {
    dateInput.style.pointerEvents = "auto";
    dateInput.focus();
    if (dateInput.showPicker) {
      dateInput.showPicker();
    } else {
      dateInput.click();
    }
    setTimeout(() => {
      dateInput.style.pointerEvents = "none";
    }, 100);
  }
}

$(document).ready(function () {
  const dateInput = document.getElementById("travelDate");
  const dateDisplay = document.getElementById("dateDisplay");

  if (dateInput && dateDisplay) {
  
    const today = new Date().toISOString().split("T")[0];
    dateInput.setAttribute("min", today);

    
    dateInput.addEventListener("change", function () {
      const selectedDate = new Date(this.value);
      const today = new Date();
      today.setHours(0, 0, 0, 0);

      if (selectedDate < today) {
        alert("Please select a future date for your travel");
        this.value = "";
        dateDisplay.textContent = "dd / mm / yyyy";
        dateDisplay.classList.remove("has-date");
        return;
      }

   
      const day = String(selectedDate.getDate()).padStart(2, "0");
      const month = String(selectedDate.getMonth() + 1).padStart(2, "0");
      const year = selectedDate.getFullYear();

      dateDisplay.textContent = `${day} / ${month} / ${year}`;
      dateDisplay.classList.add("has-date");

     
      const container = dateDisplay.closest("div").parentElement;
      container.style.borderColor = "#10B981";
      container.style.backgroundColor = "#F0FDF4";

      setTimeout(() => {
        container.style.borderColor = "";
        container.style.backgroundColor = "";
      }, 1000);
    });

   
    dateInput.addEventListener("input", function () {
      if (!this.value) {
        dateDisplay.textContent = "dd / mm / yyyy";
        dateDisplay.classList.remove("has-date");
      }
    });
  }
});

// Custom Date Picker for Customize Trip Form
function openDatePickerCustom() {
  const dateInput = document.getElementById("travelDateCustom");
  if (dateInput) {
    dateInput.style.pointerEvents = "auto";
    dateInput.focus();
    if (dateInput.showPicker) {
      dateInput.showPicker();
    } else {
      dateInput.click();
    }
    setTimeout(() => {
      dateInput.style.pointerEvents = "none";
    }, 100);
  }
}

$(document).ready(function () {
  const dateInputCustom = document.getElementById("travelDateCustom");
  const dateDisplayCustom = document.getElementById("dateDisplayCustom");

  if (dateInputCustom && dateDisplayCustom) {
    const today = new Date().toISOString().split("T")[0];
    dateInputCustom.setAttribute("min", today);

    dateInputCustom.addEventListener("change", function () {
      const selectedDate = new Date(this.value);
      const today = new Date();
      today.setHours(0, 0, 0, 0);

      if (selectedDate < today) {
        alert("Please select a future date for your travel");
        this.value = "";
        dateDisplayCustom.textContent = "dd / mm / yyyy";
        return;
      }

      const day = String(selectedDate.getDate()).padStart(2, "0");
      const month = String(selectedDate.getMonth() + 1).padStart(2, "0");
      const year = selectedDate.getFullYear();

      dateDisplayCustom.textContent = `${day} / ${month} / ${year}`;
    });

    dateInputCustom.addEventListener("input", function () {
      if (!this.value) {
        dateDisplayCustom.textContent = "dd / mm / yyyy";
      }
    });
  }
});

// Footer Date Picker
function openDatePickerFooter() {
  const dateInput = document.getElementById("travelDateFooter");
  if (dateInput) {
    dateInput.style.pointerEvents = "auto";
    dateInput.focus();
    if (dateInput.showPicker) {
      dateInput.showPicker();
    } else {
      dateInput.click();
    }
    setTimeout(() => {
      dateInput.style.pointerEvents = "none";
    }, 100);
  }
}

$(document).ready(function () {
  const dateInputFooter = document.getElementById("travelDateFooter");
  const dateDisplayFooter = document.getElementById("dateDisplayFooter");

  if (dateInputFooter && dateDisplayFooter) {
    const today = new Date().toISOString().split("T")[0];
    dateInputFooter.setAttribute("min", today);

    dateInputFooter.addEventListener("change", function () {
      const selectedDate = new Date(this.value);
      const today = new Date();
      today.setHours(0, 0, 0, 0);

      if (selectedDate < today) {
        alert("Please select a future date for your travel");
        this.value = "";
        dateDisplayFooter.textContent = "dd / mm / yyyy";
        return;
      }

      const day = String(selectedDate.getDate()).padStart(2, "0");
      const month = String(selectedDate.getMonth() + 1).padStart(2, "0");
      const year = selectedDate.getFullYear();

      dateDisplayFooter.textContent = `${day} / ${month} / ${year}`;
    });

    dateInputFooter.addEventListener("input", function () {
      if (!this.value) {
        dateDisplayFooter.textContent = "dd / mm / yyyy";
      }
    });
  }
});
