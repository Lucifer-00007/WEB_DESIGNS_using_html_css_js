const textArray = ["a developer.", "an innovator.", "and a creator."];
let textIndex = 0;
let charIndex = 0;
const typingSpeed = 100; // Adjust typing speed (milliseconds)

const typedTextElement = document.getElementById("typed-text");

function typeText() {
    if (charIndex < textArray[textIndex].length) {
        typedTextElement.innerHTML += textArray[textIndex].charAt(charIndex);
        charIndex++;
        setTimeout(typeText, typingSpeed);
    } else {
        setTimeout(eraseText, 1000); // Wait for a second before erasing
    }
}

function eraseText() {
    if (charIndex > 0) {
        const currentText = textArray[textIndex].substring(0, charIndex - 1);
        typedTextElement.innerHTML = currentText;
        charIndex--;
        setTimeout(eraseText, typingSpeed / 2);
    } else {
        textIndex = (textIndex + 1) % textArray.length;
        setTimeout(typeText, 500); // Wait for half a second before typing the next text
    }
}

// Start the typing animation
typeText();
