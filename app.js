// HTML DOM elements
const passwordDisplay = document.getElementById('password-display');
const copy = document.getElementById('copy');
const form = document.querySelector('form');

// function to create characters array
const generateArray = (min, max) => {
    const array = [];

    // loop the numbers and turn into charcode
    for (let i = min; i <= max; i++) {
        const character = String.fromCharCode(i);

        // push each character to array
        array.push(character);
    }

    // return array
    return array;
};

// generate password
const generatePassword = () => {
    const length = document.getElementById('length');
    const uppercase = document.getElementById('uppercase');
    const lowercase = document.getElementById('lowercase');
    const number = document.getElementById('number');
    const symbol = document.getElementById('symbol');

    let initialPassword = '';
    
    // if checkbox is clicked add to initial password
    for (let i = 0; i <= length.value; i++) {
        (uppercase.checked) ? initialPassword += randomUppercase() : '';
        (lowercase.checked) ? initialPassword += randomLowercase() : '';
        (number.checked) ? initialPassword += randomNumber() : '';
        (symbol.checked) ? initialPassword += randomSymbol() : '';

        // change i equal to the number of characters created
        i = initialPassword.length;
    }

    // turn initialPassword to an array and shuffle
    shufflePassword(initialPassword.split(''));
};

// function to get random uppercase from the array
const randomUppercase = () => {
    const uppercaseArray = generateArray(65, 90);

    return uppercaseArray[Math.floor(Math.random() * uppercaseArray.length)];
};

// function to get random lowercase from the array
const randomLowercase = () => {
    const lowercaseArray = generateArray(97, 122);

    return lowercaseArray[Math.floor(Math.random() * lowercaseArray.length)];
};

// function to get random number from the array
const randomNumber = () => {
    const numberArray = generateArray(48, 57);

    return numberArray[Math.floor(Math.random() * numberArray.length)];
};

// function to get random symbol from the array
const randomSymbol = () => {
    const symbolArray = generateArray(33, 47)
    .concat(generateArray(58, 64))
    .concat(generateArray(91, 96))
    .concat(generateArray(123, 126));

    return symbolArray[Math.floor(Math.random() * symbolArray.length)];
};

// Fisher-Yates (aka Knuth) Shuffle Algorithm
const shufflePassword = (password) => {
    for (let i = password.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        const temp = password[i];
        password[i] = password[j];
        password[j] = temp;
    }

    // create a string from shuffled array
    const shuffledPassword = password.join('');

    // display the shuffled string
    passwordDisplay.innerHTML = shuffledPassword;
};

// add event listener to form submit button
form.addEventListener('submit', (e) => {

    // prevent reloading the page
    e.preventDefault();

    const checkboxes = document.querySelectorAll('.checkbox');
    
    // loop over the checkboxes
    for (let i = 0; i < checkboxes.length; i++) {

        // call generatePassword if atlease one checkbox is checked
        if(checkboxes[i].checked) {
            generatePassword();
            break;
        }
    }
})

// add event listener to copy button
copy.addEventListener('click', () => {

    // create new textarea element
    const textarea = document.createElement('textarea');
    const password = passwordDisplay.innerText;

    // if password is not empty execute copy code
    if (password) {

        // assign password value to textarea
        textarea.value = password;

        // append textarea into HTML body
        document.body.appendChild(textarea);

        // select textarea and copu
        textarea.select();
        document.execCommand('copy');

        // remove textarea from HTML body
        textarea.remove();

        // alert
        alert('Copied to clipboard');
    }
})