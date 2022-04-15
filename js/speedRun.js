const typingText = document.querySelector(".typing-text p"),
    inpField = document.querySelector(".wrapper .input-field"),
    timeTag = document.querySelector(".time span b"),
    mistakeTag = document.querySelector(".mistake span"),
    wpmTag = document.querySelector(".wpm span"),
    accuracyTag = document.querySelector(".accuracy span");

let totalWords = 0

let timer = 0,
    charIndex = wrongWords = isTyping = 0, charLen = 0;

function loadParagraph() {
    const ranIndex = Math.floor(Math.random() * paragraphs.length);
    typingText.innerHTML = "";
        paragraphs[ranIndex].split(" ").forEach(word => {
        let div = ''
        word.split("").forEach(char => {
            div += `<span class="char">${char}</span>`;
        })
        typingText.innerHTML += `<div class="word">${div}</div>`
        typingText.innerHTML += `<span class="char"> </span>`
    });
    typingText.getElementsByClassName("word")[0].getElementsByClassName("char")[0].classList.add("active");
    document.addEventListener("keydown", () => inpField.focus());
    typingText.addEventListener("click", () => inpField.focus());
}

function initTyping() {
    let characters = typingText.querySelectorAll("span");
    charLen = characters.length;
    let typedChar = inpField.value.split("")[charIndex];
    if (charIndex < characters.length - 1) {
        if (!isTyping) {
            timer = setInterval(initTimer, 100);
            isTyping = true;
        }
        if (typedChar == null) {
            if (charIndex > 0) {
                charIndex--;
                if (characters[charIndex].classList.contains("incorrect")) {
                }
                characters[charIndex].classList.remove("correct", "incorrect");
            }
        } else {
            if (characters[charIndex].innerText == typedChar) {
                characters[charIndex].classList.add("correct");
            } else {
                wrongWords++
                characters[charIndex].classList.add("incorrect");
            }
            charIndex++;
            totalWords++
        }
        characters.forEach(span => span.classList.remove("active"));
        characters[charIndex].classList.add("active");
        let wpm = Math.round(((charIndex - wrongWords) / 5) / (timer) * 60);
        wpm = wpm < 0 || !wpm || wpm === Infinity ? 0 : wpm;
        wpmTag.innerText = wpm;
        mistakeTag.innerText = wrongWords;
        accuracyTag.innerText = ((1 - (wrongWords / totalWords)) * 100).toFixed(0) + "%"
        console.log(characters.length)

    }
    else {
        isTyping = false;
        clearInterval(timer);
        inpField.value = "";
        document.querySelector("li.mistake").style.display = "inline-block"
        document.querySelector("li.accuracy").style.display = "inline-block"
        document.querySelector("li.wpm").style.display = "inline-block"
    }
}

function initTimer() {
    timeTag.innerText = timer.toFixed(1);
    if (charIndex >= charLen - 1) {
        clearInterval(timer);
        document.querySelector("li.mistake").style.display = "inline-block"
        document.querySelector("li.accuracy").style.display = "inline-block"
        document.querySelector("li.wpm").style.display = "inline-block"
    }
    else {
        timer+=0.1;
        let wpm = Math.round(((charIndex - wrongWords) / 5) / (timer) * 60);
        wpmTag.innerText = wpm;
    }
}

loadParagraph();
inpField.addEventListener("input", initTyping);