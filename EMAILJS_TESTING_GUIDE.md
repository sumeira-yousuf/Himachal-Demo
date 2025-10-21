# 🧪 EmailJS Testing Guide

## 📋 Step-by-Step Testing Process

### 1. **Initial Setup Check**
Open your browser's Developer Console (F12) and refresh the page. You should see:

```
✅ EmailJS initialized successfully
📧 User ID: YOUR_USER_ID
🔧 Service ID: YOUR_SERVICE_ID
📝 Template ID: YOUR_TEMPLATE_ID
📞 Callback Template ID: YOUR_CALLBACK_TEMPLATE_ID
🚀 Initializing form handlers...
📝 Found forms: 6
📋 Form 1: [form element]
📋 Form 2: [form element]
...
✅ All form handlers initialized
🧪 Test Mode: ON
🔍 Debug Mode: ON
```

**If you see errors:**
- ❌ "EmailJS not loaded" → Check if CDN script is included
- ❌ Missing forms → Check HTML structure

### 2. **Test Mode Testing (Safe Testing)**

With `TEST_MODE: true`, emails are simulated without sending actual emails.

#### **Test Each Form:**

**A. Hero Section Contact Forms (2 forms)**
1. Scroll to hero section
2. Fill out the contact form on the right side
3. Click "START A TRIP REQUEST"
4. **Expected Console Output:**
   ```
   📤 Form submitted: [form element]
   🔍 Form type detection:
     - Is callback form: false
     - Button text: START A TRIP REQUEST
     - Form location: Other
   📧 Sending contact email...
   🔍 Extracting form data from form: [form element]
   📝 Found inputs: 5
   📋 Field: name = John Doe
   📋 Field: email = john@example.com
   📋 Field: phone number = 1234567890
   📋 Field: trip details = Planning a trip to Shimla
   📊 Extracted Form Data: {name: "John Doe", email: "john@example.com", ...}
   📧 Sending Contact Email...
   📋 Form Data: {name: "John Doe", email: "john@example.com", ...}
   📝 Template Params: {from_name: "John Doe", from_email: "john@example.com", ...}
   🧪 TEST MODE: Simulating email send...
   ✅ TEST MODE: Email would be sent successfully
   📊 Email result: {success: true, response: {...}}
   ```

**B. Customize Trip Form**
1. Scroll to "CUSTOMIZE YOUR TRIP" section
2. Fill out the form on the right side
3. Click "LETS START"
4. **Expected:** Similar console output as above

**C. Contact Modal (Enquire Buttons)**
1. Click any "ENQUIRE NOW" button on package cards
2. Fill out the modal form
3. Click "LETS START"
4. **Expected:** Similar console output + modal should close after 2 seconds

**D. Callback Modal**
1. Click any "REQUEST A CALL BACK" button
2. Fill out the callback form
3. Click "REQUEST CALL BACK"
4. **Expected Console Output:**
   ```
   🔍 Form type detection:
     - Is callback form: true
     - Button text: REQUEST CALL BACK
     - Form location: Callback Modal
   📞 Sending callback email...
   🧪 TEST MODE: Simulating callback email send...
   ✅ TEST MODE: Callback email would be sent successfully
   ```

**E. Footer Contact Form**
1. Scroll to footer
2. Fill out the contact form
3. Click "LETS START"
4. **Expected:** Similar console output as contact forms

### 3. **Real Email Testing**

Once test mode works, update your EmailJS credentials:

```javascript
const EMAILJS_CONFIG = {
    USER_ID: 'your_actual_user_id',
    SERVICE_ID: 'your_service_id',
    TEMPLATE_ID: 'your_template_id',
    CALLBACK_TEMPLATE_ID: 'your_callback_template_id',
    TEST_MODE: false, // Change to false
    DEBUG_MODE: true // Keep true for debugging
};
```

### 4. **EmailJS Setup Checklist**

**A. Get EmailJS Credentials:**
1. Go to [EmailJS.com](https://www.emailjs.com/)
2. Sign up/Login
3. Go to Account → API Keys → Copy Public Key (User ID)
4. Go to Email Services → Add Service → Copy Service ID
5. Go to Email Templates → Create Templates → Copy Template IDs

**B. Create Email Templates:**

**Contact Template:**
```
Subject: New Contact Form Submission - {{from_name}}

Name: {{from_name}}
Email: {{from_email}}
Phone: {{phone}}
Trip Details: {{trip_details}}
Date of Travel: {{date_of_travel}}
Trip Duration: {{trip_duration}}
Number of Travelers: {{no_of_travelers}}
Message: {{message}}
```

**Callback Template:**
```
Subject: Callback Request - {{from_name}}

Name: {{from_name}}
Email: {{from_email}}
Phone: {{phone}}
Message: {{message}}
```

### 5. **Troubleshooting**

**Common Issues:**

**A. Forms not submitting:**
- Check console for JavaScript errors
- Verify form elements have correct structure
- Check if EmailJS script is loaded

**B. EmailJS errors:**
- Verify User ID, Service ID, Template IDs are correct
- Check EmailJS account is active
- Verify email service is connected

**C. Form data not extracted:**
- Check input placeholders match expected names
- Verify form structure
- Check console for field mapping logs

**D. Modal not closing:**
- Check if modal has correct classes
- Verify form is inside modal structure

### 6. **Production Setup**

When ready for production:

```javascript
const EMAILJS_CONFIG = {
    USER_ID: 'your_actual_user_id',
    SERVICE_ID: 'your_service_id',
    TEMPLATE_ID: 'your_template_id',
    CALLBACK_TEMPLATE_ID: 'your_callback_template_id',
    TEST_MODE: false, // Disable test mode
    DEBUG_MODE: false // Disable debug mode
};
```

### 7. **Testing Commands**

You can also test programmatically in console:

```javascript
// Test form data extraction
const form = document.querySelector('form');
const formData = emailHandler.extractFormData(form);
console.log(formData);

// Test email sending (if not in test mode)
emailHandler.sendContactEmail({
    name: 'Test User',
    email: 'test@example.com',
    phone: '1234567890',
    tripDetails: 'Test message'
});
```

## 🎯 Success Indicators

✅ **Test Mode Success:**
- Console shows "TEST MODE: Email would be sent successfully"
- Button shows "Sent Successfully!" 
- Form resets after 3 seconds
- Modal closes (if applicable)

✅ **Real Email Success:**
- Console shows "Email sent successfully"
- You receive actual emails
- Button shows "Sent Successfully!"
- Form resets after 3 seconds

## 📞 Support

If you encounter issues:
1. Check browser console for error messages
2. Verify EmailJS account setup
3. Test with TEST_MODE: true first
4. Check network tab for failed requests
