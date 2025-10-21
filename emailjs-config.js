
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

  
  async sendEmail(formData) {
    if (!this.isInitialized) {
      throw new Error("EmailJS not initialized");
    }

    try {
      const templateParams = {
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

  
  showSuccessMessage(form, button) {
    const originalText = button.textContent;
    button.textContent = "Sent Successfully!";
    button.classList.add("bg-green-600");
    button.disabled = true;

    setTimeout(() => {
      form.reset();
      button.textContent = originalText;
      button.classList.remove("bg-green-600");
      button.disabled = false;
      form
        .querySelectorAll(".error-message")
        .forEach((error) => error.remove());
      form.querySelectorAll("input, textarea").forEach((input) => {
        input.classList.remove("border-red-500");
        input.classList.add("border-gray-300");
      });
    }, 3000);
  }

  // Show error message
  showErrorMessage(form, button, errorMessage) {
    const originalText = button.textContent;
    button.textContent = "Error - Try Again";
    button.classList.add("bg-red-500");
    button.disabled = true;

    const errorDiv = document.createElement("div");
    errorDiv.className = "error-message text-red-500 text-sm mt-2 text-center";
    errorDiv.textContent =
      errorMessage || "Failed to send message. Please try again.";
    form.appendChild(errorDiv);

    setTimeout(() => {
      button.textContent = originalText;
      button.classList.remove("bg-red-500");
      button.disabled = false;
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

      submitButton.textContent = "Sending...";
      submitButton.disabled = true;

      try {
        const formData = emailHandler.extractFormData(form);
        const result = await emailHandler.sendEmail(formData);

        if (result.success) {
          emailHandler.showSuccessMessage(form, submitButton);

          const modal = form.closest(".fixed");
          if (modal && modal.classList.contains("hidden") === false) {
            setTimeout(() => {
              modal.classList.add("hidden");
              document.body.classList.remove("overflow-hidden");
            }, 2000);
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
