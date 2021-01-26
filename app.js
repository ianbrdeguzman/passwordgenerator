// HTML DOM elements
const passwordDisplay = document.getElementById('password-display');
const copy = document.getElementById('copy');
const length = document.getElementById('length');
const uppercase = document.getElementById('uppercase');
const lowercase = document.getElementById('lowercase');
const number = document.getElementById('number');
const symbol = document.getElementById('symbol');
const form = document.querySelector('form');

// initialize character arrays
const uppercaseArray = generateArray(65, 90);
const lowercaseArray = generateArray(97, 122);
const numberArray = generateArray(48, 57);
const symbolArray = generateArray(33, 47)
    .concat(generateArray(58, 64))
    .concat(generateArray(91, 96))
    .concat(generateArray(123, 126));

// function to create array
function generateArray(min, max) {
    const array = [];

    for (let i = min; i <= max; i++) {
        const character = String.fromCharCode(i);
        array.push(character);
    }

    return array;
};

const generatePassword = () => {
    const pLength = length.value;
    let generatedPassword = '';
        
    for (let i = 0; i <= pLength; i++) {
        (uppercase.checked) ? generatedPassword += randomUppercase() : '';
        (lowercase.checked) ? generatedPassword += randomLowercase() : '';
        (number.checked) ? generatedPassword += randomNumber() : '';
        (symbol.checked) ? generatedPassword += randomSymbol() : '';
        i = generatedPassword.length;
    }
    //TODO shufflePassword(generatedPassword)
    passwordDisplay.innerHTML = generatedPassword;
};

const randomUppercase = () => {
    return uppercaseArray[Math.floor(Math.random() * uppercaseArray.length)];
};

const randomLowercase = () => {
    return lowercaseArray[Math.floor(Math.random() * lowercaseArray.length)];
};

const randomNumber = () => {
    return numberArray[Math.floor(Math.random() * numberArray.length)];
};

const randomSymbol = () => {
    return symbolArray[Math.floor(Math.random() * symbolArray.length)];
};


// Fisher-Yates (aka Knuth) Shuffle Algorithm
// const shufflePassword = (password) => {
//     for (let i = password.length - 1; i > 0; i--) {
//         const j = Math.floor(Math.random() * (i + 1));
//         const temp = password[i];
//         password[i] = password[j];
//         password[j] = temp;
//     }
//     console.log(password)
//     return password.toString('').split('');
// };

form.addEventListener('submit', (e) => {
    e.preventDefault();
    //TODO check if atleast one checkbox is checked
    generatePassword();
})


copy.addEventListener('click', () => {
    const textarea = document.createElement('textarea');
    const password = passwordDisplay.innerText;

    if (password) {
        textarea.value = password;
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand('copy');
        textarea.remove();
        alert('Copied to clipboard');
    }
})