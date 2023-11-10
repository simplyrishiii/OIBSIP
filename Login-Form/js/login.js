class Login {
	constructor(form, fields) {
	  this.form = form;
	  this.fields = fields;
	  this.validateonSubmit();
	  this.loadRememberedUser();
	}
  
	validateonSubmit() {
	  let self = this;
  
	  this.form.addEventListener("submit", (e) => {
		e.preventDefault();
		var error = 0;
		self.fields.forEach((field) => {
		  const input = document.querySelector(`[name=${field}]`);
		  if (self.validateFields(input) == false) {
			error++;
		  }
		});
		if (error == 0) {
		  const userToken = "your_generated_token";
		  localStorage.setItem("userToken", userToken);
  
		  // Store the user credentials if "Remember Me" is checked
		  if (document.getElementById("login-check").checked) {
			const username = document.querySelector('[name="username"]').value;
			const password = document.querySelector('[name="password"]').value;
  
			localStorage.setItem("rememberedUser", JSON.stringify({ username, password }));
		  }
  
		  window.location.replace("/dashboard.html");
		}
	  });
	}
  
	loadRememberedUser() {
	  const rememberedUser = localStorage.getItem("rememberedUser");
  
	  if (rememberedUser) {
		const { username, password } = JSON.parse(rememberedUser);
		document.querySelector('[name="username"]').value = username;
		document.querySelector('[name="password"]').value = password;
		document.getElementById("login-check").checked = true;
	  }
	}
  
	validateFields(field) {
	  if (field.value.trim() === "") {
		this.setStatus(
		  field,
		  `${field.previousElementSibling.innerText} cannot be blank`,
		  "error"
		);
		return false;
	  } else {
		if (field.type == "password") {
		  if (field.value.length < 8) {
			this.setStatus(
			  field,
			  `${field.previousElementSibling.innerText} must be at least 8 characters`,
			  "error"
			);
			return false;
		  } else {
			this.setStatus(field, null, "success");
			return true;
		  }
		} else {
		  this.setStatus(field, null, "success");
		  return true;
		}
	  }
	}
  
	setStatus(field, message, status) {
	  const errorMessage = field.parentElement.querySelector(".error-message");
  
	  if (status == "success") {
		if (errorMessage) {
		  errorMessage.innerText = "";
		}
		field.classList.remove("input-error");
	  }
  
	  if (status == "error") {
		errorMessage.innerText = message;
		field.classList.add("input-error");
	  }
	}
  }
  
  // Example Usage:
  const form = document.querySelector(".loginForm");
  if (form) {
	const fields = ["username", "password"];
	const validator = new Login(form, fields);
  }
  