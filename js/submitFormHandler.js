import config from '../config.json' assert {type: "json"};
(
    function() {
    // get all data in form and return object
    function getFormData(form) {
      var elements = form.elements;
      var honeypot;
  
      var fields = Object.keys(elements).filter(function(k) {
        if (elements[k].name === "honeypot") {
          honeypot = elements[k].value;
          return false;
        }
        return true;
      }).map(function(k) {
        if(elements[k].name !== undefined) {
          return elements[k].name;
        // special case for Edge's html collection
        }else if(elements[k].length > 0){
          return elements[k].item(0).name;
        }
      }).filter(function(item, pos, self) {
        return self.indexOf(item) == pos && item;
      });
  
      var formData = {};
      fields.forEach(function(name){
        var element = elements[name];
        
        // singular form elements just have one value
        formData[name] = element.value;
  
        // when our element has multiple items, get their values
        if (element.length) {
          var data = [];
          for (var i = 0; i < element.length; i++) {
            var item = element.item(i);
            if (item.checked || item.selected) {
              data.push(item.value);
            }
          }
          formData[name] = data.join(', ');
        }
      });
  
      // add form-specific values into the data
      formData.formDataNameOrder = JSON.stringify(fields);
      formData.formGoogleSheetName = form.dataset.sheet || "responses"; // default sheet name
      formData.formGoogleSendEmail
        = form.dataset.email || ""; // no email by default
  
      return {data: formData, honeypot: honeypot};
    }
  
    
    function handleFormSubmit(event) {  // handles form submit without any jquery
      event.preventDefault();           // we are submitting via xhr below
      var form = event.target;
      var formData = getFormData(form);
      var data = formData.data;
  
      // If a honeypot field is filled, assume it was done so by a spam bot.
      if (formData.honeypot) {
        return false;
      }
  
      toggleSubmitButton(form);

      var url = config['contact-me-service-url'];
      var xhr = new XMLHttpRequest();
      xhr.open('POST', url);
      // xhr.withCredentials = true;
      xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
      xhr.onreadystatechange = function() {
          if (xhr.readyState === 4 && xhr.status === 200) {
            form.reset();
            var thankYouMessage = form.querySelector("#thankyou-message");
            toggleSubmitButton(form);
            thankYouMessage.style.display = "block";
            setTxbOnChangeHandler(form, thankYouMessage);
          }
      };
      // url encode form data for sending as post data
      var encoded = Object.keys(data).map(function(k) {
          return encodeURIComponent(k) + "=" + encodeURIComponent(data[k]);
      }).join('&');
      xhr.send(encoded);
    }
    
    function loaded() {
      // bind to the submit event of our form
      var form = document.querySelector("#frmContactMe");
      form.addEventListener("submit", handleFormSubmit, false);
    };
    document.addEventListener("DOMContentLoaded", loaded, false);
  
    function toggleSubmitButton(form) {
      var submitButton = form.querySelector("#btnSubmit");
      if(!submitButton.disabled){
        submitButton.disabled = true;
        submitButton.innerText = "Enviando E-mail..."
      }else{
        submitButton.disabled = false;
        submitButton.innerText = "Enviar Email"
      }
    }

    const setTxbOnChangeHandler = (form, lblThankYouMessage) => {
      const addOnChangeListener = (element) => {
        element.addEventListener(
          'change', 
          () => lblThankYouMessage.style.display = "none"
        );
      }
      Array.from(form.querySelectorAll(".txb")).map((element) => {
        addOnChangeListener(element);
        element.removeEventListener('change', addOnChangeListener);
      })
    }

  })();