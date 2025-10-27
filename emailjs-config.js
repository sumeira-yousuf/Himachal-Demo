const EMAILJS_CONFIG = {
  USER_ID: "st7TIIV_ztcXD_aif",
  SERVICE_ID: "service_wzfo9df",
  TEMPLATE_ID: "template_i5xrfto",
};

(function () {
  emailjs.init(EMAILJS_CONFIG.USER_ID);
})();

class EmailJSHandler {
  constructor() {
    this.isInitialized = typeof emailjs !== "undefined";
  }

  async sendEmail(formData, formElement = null) {
    if (!this.isInitialized) {
      throw new Error("EmailJS not initialized");
    }

    try {
     
      let subject = "Himachal Tour Package - Contact Form";
      if (formElement) {
        const formId = formElement.id;
        const formParent = formElement.closest("#contactModal, #callbackModal");

        if (
          formId === "bookingModalForm" ||
          (formParent && formParent.id === "contactModal")
        ) {
          subject = "Himachal Tour Package - Booking Enquiry";
        } else if (
          formId === "callbackModalForm" ||
          (formParent && formParent.id === "callbackModal")
        ) {
          subject = "Himachal Tour Package - Callback Request";
        } else if (formId === "staticContactForm" || formId === "staticContactFormMobile") {
          subject = "Himachal Tour Package - Hero Contact Form";
        } else if (formId === "footerContactForm") {
          subject = "Himachal Tour Package - Footer Contact Form";
        } else if (formId === "customizeTripForm") {
          subject = "Himachal Tour Package - Customise Your Trip";
        }
      }

      const templateParams = {
        title: subject, // Map to 'title' to match EmailJS template variable {{title}}
        from_name: formData.name,
        from_email: formData.email,
        phone: formData.phone || formData.phonenumber,
        trip_details: formData.tripDetails || formData.tripdetails,
        date_of_travel: formData.dateOfTravel || formData.dateoftravel,
        trip_duration: formData.tripDuration || formData.tripduration,
        no_of_travelers: formData.noOfTravelers || formData["no.oftravelers"],
        message:
          formData.message ||
          formData.tripDetails ||
          formData.tripdetails ||
          "Contact form submission",
      };

      const response = await emailjs.send(
        EMAILJS_CONFIG.SERVICE_ID,
        EMAILJS_CONFIG.TEMPLATE_ID,
        templateParams
      );

      return { success: true, response };
    } catch (error) {
      console.error("EmailJS Error:", error);
      return { success: false, error: error.message };
    }
  }

  // Extract form data from form element
  extractFormData(form) {
    const formData = {};
    const inputs = form.querySelectorAll("input, textarea");

    inputs.forEach((input) => {
      const name =
        input.name || input.placeholder.toLowerCase().replace(/\s+/g, "");
      const value = input.value.trim();

      if (value) {
        switch (name) {
          case "name":
            formData.name = value;
            break;
          case "email":
            formData.email = value;
            break;
          case "phone number":
          case "phone":
          case "phonenumber":
            formData.phone = value;
            break;
          case "trip details":
          case "message":
          case "tripdetails":
            formData.tripDetails = value;
            formData.message = value;
            break;
          case "date of travel":
          case "dateoftravel":
            formData.dateOfTravel = value;
            break;
          case "trip duration":
          case "tripduration":
            formData.tripDuration = value;
            break;
          case "no. of travelers":
          case "no.oftravelers":
            formData.noOfTravelers = value;
            break;
          default:
            formData[name] = value;
        }
      }
    });

    return formData;
  }

  showProgressBar(form, button) {
    button.disabled = true;

    // Create unique ID for progress bar
    const progressFillId = "progressFill_" + Date.now();

    // Store original button content
    const originalContent = button.innerHTML;

    // Create progress bar inside button
    button.innerHTML = `
      <div class="flex items-center justify-center">
        <svg class="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
          <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
        <span>Sending...</span>
      </div>
    `;
  }

  showSuccessMessage(form, button) {
    // Update button to show success state
    button.innerHTML = `<span>✓ Sent Successfully!</span>`;
    
    // Clear all error messages
    form.querySelectorAll(".error-message").forEach((error) => error.remove());
    form.querySelectorAll("input, textarea").forEach((input) => {
      input.classList.remove("border-red-500");
      input.classList.add("border-gray-300");
    });

    // Reset form fields
    form.reset();

    // Redirect to success page after 1.5 seconds
    setTimeout(() => {
      window.location.href = "thank-you.html";
    }, 1500);
  }

  // Show error message
  showErrorMessage(form, button, errorMessage) {
    // Update button to show error state
    button.innerHTML = `
      <span>Error - Try Again</span>
    `;
    button.classList.add("bg-red-500");
    button.disabled = false;

    const errorDiv = document.createElement("div");
    errorDiv.className = "error-message text-red-500 text-sm mt-2 text-center";
    errorDiv.textContent =
      errorMessage || "Failed to send message. Please try again.";
    form.appendChild(errorDiv);

    // Reset button after 5 seconds with original content
    setTimeout(() => {
      const originalContent = button.getAttribute("data-original-content") || "SUBMIT";
      button.innerHTML = originalContent;
      button.classList.remove("bg-red-500");
      errorDiv.remove();
    }, 5000);
  }
}

// Initialize EmailJS Handler
const emailHandler = new EmailJSHandler();

// Form submission handlers
document.addEventListener("DOMContentLoaded", function () {
  const contactForms = document.querySelectorAll("form");

  contactForms.forEach((form) => {
    form.addEventListener("submit", async function (e) {
      e.preventDefault();

      const submitButton = form.querySelector('button[type="submit"]');
      const originalText = submitButton.textContent;
      
      // Store original content for error handling
      submitButton.setAttribute("data-original-content", originalText);

      // Show progress indicator inside button
      emailHandler.showProgressBar(form, submitButton);

      try {
        const formData = emailHandler.extractFormData(form);
        const result = await emailHandler.sendEmail(formData, form);

        if (result.success) {
          emailHandler.showSuccessMessage(form, submitButton);

          const modal = form.closest(".fixed");
          if (modal && modal.classList.contains("hidden") === false) {
            setTimeout(() => {
              modal.classList.add("hidden");
              document.body.classList.remove("overflow-hidden");
            }, 1500);
          }
        } else {
          emailHandler.showErrorMessage(form, submitButton, result.error);
        }
      } catch (error) {
        console.error("Form submission error:", error);
        emailHandler.showErrorMessage(form, submitButton);
      }
    });
  });
});
