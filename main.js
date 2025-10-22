$(document).ready(function () {
  const owl = $(".owl-carousel").owlCarousel({
    items: 1,
    loop: true,
    autoplay: true,
    autoplayTimeout: 4000,
    autoplayHoverPause: false,
    dots: false,
    nav: false,
    animateOut: "fadeOut",
  });

  let formInteractionTimer;
  let isFormBeingUsed = false; // Track if user is actively using the form

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

  // Track static contact form interactions to prevent hiding during use
  $("#staticContactForm input, #staticContactForm textarea").on(
    "focus click input keydown keyup change paste",
    function () {
      isFormBeingUsed = true;
      console.log("Form being used - preventing hide");
    }
  );

  // Reset form usage flag when user stops interacting (longer timeout)
  $("#staticContactForm input, #staticContactForm textarea").on(
    "blur",
    function () {
      setTimeout(function () {
        // Only reset if no form field is currently focused
        if (
          !$(
            "#staticContactForm input:focus, #staticContactForm textarea:focus"
          ).length
        ) {
          isFormBeingUsed = false;
          console.log("Form usage reset");
        }
      }, 3000); // Wait 3 seconds after blur to allow for continued interaction
    }
  );

  // Also track when form loses focus completely
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

  $("#heroContactForm").on("submit", function (e) {
    e.preventDefault();

    const submitButton = $(this).find('button[type="submit"]');
    const originalText = submitButton.text();

    submitButton.text("SENDING...").prop("disabled", true);

    const formData = {
      name: $(this).find('input[name="name"]').val(),
      email: $(this).find('input[name="email"]').val(),
      phone: $(this).find('input[name="phone"]').val(),
      message: $(this).find('textarea[name="message"]').val(),
    };

    setTimeout(() => {
      submitButton.text(originalText).prop("disabled", false);

      rm;
      this.reset();
    }, 2000);
  });

  // Back to top button functionality
  $(".back-to-top").hide();

  // Show/hide back to top button and navbar styling based on scroll position
  $(window).scroll(function () {
    const scrollTop = $(this).scrollTop();
    const navbar = $("#navbar");
    const logo = $("#navbar-logo");
    const mobileLogo = $("#navbar-logo-mobile");
    const hamburgerBtn = $("#mobile-menu-btn");
    const heroForm = $("#staticContactForm").parent(); // Get the form container

    // Hide hero form when scrolling (only if not being used)
    const isFormFocused =
      $("#staticContactForm input:focus, #staticContactForm textarea:focus")
        .length > 0;
    const shouldKeepFormVisible = isFormBeingUsed || isFormFocused;

    if (scrollTop > 10 && !shouldKeepFormVisible) {
      heroForm.fadeOut(200); // Quick fade out
    } else if (scrollTop <= 10 || shouldKeepFormVisible) {
      heroForm.fadeIn(200); // Fade in when back at top or form is being used
    }

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

  // Smooth scroll to top when button is clicked
  $(".back-to-top").click(function () {
    $("html, body").animate({ scrollTop: 0 }, 800);
    return false;
  });

  // Mobile menu functionality
  $("#mobile-menu-btn").click(function () {
    $("#mobile-menu").removeClass("hidden");
    // Prevent scrolling
    $("body").css("overflow", "hidden");
    $("html").css("overflow", "hidden");
    // Switch icons
    $("#hamburger-icon").addClass("hidden");
    $("#close-icon").removeClass("hidden");
  });

  $("#mobile-menu-close").click(function () {
    closeMobileMenu();
  });

  // Close mobile menu when clicking on nav links
  $(".mobile-nav-link").click(function () {
    closeMobileMenu();
  });

  // Close mobile menu when clicking outside
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

  // Modal functionality
  const modal = $("#contactModal");
  const callbackModal = $("#callbackModal");

  // Contact modal handlers (enquire buttons and contact button)
  $(".enquire-btn, .contact-btn").click(function (e) {
    e.preventDefault();
    modal.removeClass("hidden");
    $("body").addClass("overflow-hidden");
  });

  $("#closeModal").click(function () {
    modal.addClass("hidden");
    $("body").removeClass("overflow-hidden");
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
  });

  // Close modals when clicking outside
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

  // Close modals with Escape key
  $(document).keyup(function (e) {
    if (e.keyCode === 27) {
      // Escape key
      modal.addClass("hidden");
      callbackModal.addClass("hidden");
      $("body").removeClass("overflow-hidden");
    }
  });

  // Smooth scrolling for navigation links
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
