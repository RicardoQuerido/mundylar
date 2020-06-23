function submit() {
	const name = document.getElementById("inputName");
	const company = document.getElementById("inputCompany");
	const website = document.getElementById("inputWebsite");
	const phone = document.getElementById("inputPhone");
	const email = document.getElementById("inputEmail");
	const message = document.getElementById("inputMessage");

	fields = [name, company, website, phone, email, message];

	disableFields(fields, true);

	if (validateFields(name.value, phone.value, email.value, message.value)) {
		sendEmail(fields);
	} else {
		disableFields(fields, false);
	}
}

function disableFields(fields, boolean) {
	fields.forEach(field => {
		field.readOnly = boolean;
	})
}

function clearFields(fields) {
	fields.forEach(field => {
		field.value = "";
	})
}

function removeError(label) {
	const labelElement = document.getElementById(`label${label}`);
	while(labelElement.childNodes.length >= 2) {
		labelElement.removeChild(labelElement.lastChild);
	}
}

function appendError(field, errorType) {
	const error_node = document.createElement("span");
	error_node.className = "error";

	switch(errorType) {
		case "missing":
			error_node.appendChild(document.createTextNode(`${field} field is required!`));
			break;
		case "invalid":
			error_node.appendChild(document.createTextNode(`Invalid ${field} format!`));
			break;
		default:
			error_node.appendChild(document.createTextNode(`Something is wrong with ${field} field!`));
			break;
	}
	
	document.getElementById(`label${field}`).appendChild(error_node);
}

function validateFields(name, phone, email, message) {
	let status = true;
	const email_regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
	const phone_regex = /^\d{9}$/;

	if (name === "") {
		removeError("Name");
		appendError("Name", "missing");
		status = false;
	}

	if (phone === "") {
		removeError("Phone");
		appendError("Phone", "missing");
		status = false;
	}

	else if (!phone_regex.test(phone)) {
		removeError("Phone");
		appendError("Phone", "invalid");
		status = false;
	}

	if (email === "") {
		removeError("Email");
		appendError("Email", "missing");
		status = false;
	}

	else if (!email_regex.test(email.toLowerCase())) {
		removeError("Email");
		appendError("Email", "invalid");
		status = false;
	}

	if (message === "") {
		removeError("Message");
		appendError("Message", "missing");
		status = false;
	}

	return status;
}

function sendEmail(fields) {

	const buttonSubmit = document.getElementById("inputSubmit");
	buttonSubmit.value = "submiting information..."
	buttonSubmit.disabled = true;

	emailBody = `<html><h3>New form submition [${new Date().toString()}]</h3>`
	fields.forEach(field => {
		emailBody += `<p>${field.name}: ${field.value}</p>`
	})
	emailBody += '</html>'

	Email.send({
		Host: "smtp.gmail.com",
		Username : "mundylarwebsite@gmail.com",
		Password : "vedphefypoijjekt",
		To : 'mundylar@hotmail.com',
		From : "mundylarwebsite@gmail.com",
		Subject : fields[0].value,
		Body : emailBody,
	})
	.then(function(message){
		alert("Your information was submited successfully!");
		buttonSubmit.value = "send"
		buttonSubmit.disabled = false;
		clearFields(fields);
		disableFields(fields, false);
	});
}