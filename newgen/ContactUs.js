document.addEventListener('DOMContentLoaded', function() {
    const form = document.querySelector('.contact-form');
    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const messageInput = document.getElementById('message');
    const charCountSpan = document.getElementById('charCount');

    form.addEventListener('submit', function(e) {
        const nameValue = nameInput.value.trim();
        const emailValue = emailInput.value.trim();
        
        // Kollar så att namn har mist 2 bokstäver och inga nummer.
        if (!isValidName(nameValue)) {
            e.preventDefault();
            alert('Name must contain at least 2 letters and no numbers.');
            nameInput.focus();
            return;
        }

        // Kolla så att email innehåller 1 = "@"
        if (!isValidEmail(emailValue)) {
            e.preventDefault();
            alert('Email must contain exactly 1 "@" symbol.');
            emailInput.focus();
            return;
        }

        alert('Your info will be helpful to us! Thanks for your feedback. 😁'); //info skickas in och alert visas
        console.log('Form submitted with:', { //loggar in info i console
            name: nameValue,
            email: emailValue,
            message: messageInput.value.trim()
        });
    });

    nameInput.addEventListener('blur', function() {  
        if (this.value.trim() !== '' && !isValidName(this.value.trim())) {
            this.style.borderColor = 'red'; //stylar inputfältet rött om det inte är giltigt
        } else {
            this.style.borderColor = '';
        }
    });

    emailInput.addEventListener('blur', function() { // samma som där uppe, om inte kraven uppfylls så blir boardern röd
        if (this.value.trim() !== '' && !isValidEmail(this.value.trim())) {
            this.style.borderColor = 'red'; 
        } else {
            this.style.borderColor = '';
        }
    });

    messageInput.addEventListener('input', function() {
        charCountSpan.textContent = this.value.length;
    });
});

function isValidName(name) {
    // Måste minst ha 2 bokstäver och inga nummer
    const letterCount = (name.match(/[a-zA-Z]/g) || []).length;
    const hasNumbers = /\d/.test(name);
    
    return letterCount >= 2 && !hasNumbers;
}

function isValidEmail(email) {
    // måste ha exakt 1 "@" symbol
    const atCount = (email.match(/@/g) || []).length;
    
    return atCount === 1;
}


