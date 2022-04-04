const typingText = document.querySelector(".typing-text p"),
    inpField = document.querySelector(".wrapper .input-field"),
    timeTag = document.querySelector(".time span b"),
    mistakeTag = document.querySelector(".mistake span"),
    wpmTag = document.querySelector(".wpm span"),
    accuracyTag = document.querySelector(".accuracy span");

let correctWords = 0, totalWords = 0

let timer,
    maxTime = 60,
    timeLeft = maxTime,
    charIndex = wrongWords = isTyping = 0;

let index = 0
    // wordList = [], 
    var wordTyped = ""

function loadParagraph() {
    const ranIndex = Math.floor(Math.random() * paragraphs.length);
    typingText.innerHTML = "";
    // var wordList = 
    paragraphs[ranIndex].split(" ").forEach(word => {
        // wordList += word
        let div = ''
        word.split("").forEach(char => {
            div += `<span class="char">${char}</span>`;
        })
        typingText.innerHTML += `<div class="word">${div}</div>`
        typingText.innerHTML += `<span class="char"> </span>`
    });
    let characters = typingText.querySelectorAll("span");
    document.addEventListener("keydown", () => inpField.focus());
    typingText.addEventListener("click", () => inpField.focus());
}


function initTyping() {
    let characters = typingText.querySelectorAll("span");
    let words = typingText.querySelectorAll("div");
    // console.log(words[0])
    // console.log(wordList)
    let typedChar = inpField.value.split("")[charIndex];
    // console.log(inpField.value)
    wordTyped = inpField.value.split(" ");
    var object = new Map(Object.entries(wordTyped));
    console.log(object.get(String(index)));
    if (charIndex < characters.length - 1 && timeLeft > 0) {
        if (!isTyping) {
            timer = setInterval(initTimer, 1000);
            isTyping = true;
        }
        if (typedChar == " ") {
            console.log('spacebar')
            if (words[index].innerText == wordTyped[index]) {
                words[index].classList.add("correct")
                console.log(words[index])
            }
            else {
                words[index].classList.add("incorrect")
                console.log(words[index])
            }
            index++
            inpField.value = ""
        }
        else if (typedChar == null || typedChar == 08) {
            if (charIndex > 0) {
                charIndex--;
            }
        }
        // else {
            // wordTyped += inpField.value
            // console.log(wordTyped)
        // }
    }
    else {
        if (characters[charIndex].innerText != typedChar) {
            wrongWords++
        }
        charIndex++;
        totalWords++
    }
    let wpm = Math.round(((charIndex) / 5) / (maxTime - timeLeft) * 60);
    wpm = wpm < 0 || !wpm || wpm === Infinity ? 0 : wpm;
    wpmTag.innerText = wpm;
    mistakeTag.innerText = wrongWords;
    let accuracy = ((1 - (wrongWords / totalWords)) * 100)
    accuracyTag.innerText = accuracy.toFixed(0) + "%"
    if (charIndex >= characters.length - 1) {
        clearInterval(timer);
    }
    else {
        clearInterval(timer);
        // inpField.value = "";
        mistakeTag.parentElement.style.display = "none"
        accuracyTag.parentElement.style.display = "none"
        mistakeTag.parentElement.style.display = "inline-block"
        accuracyTag.parentElement.style.display = "inline-block"
    }
}

function initTimer() {
    if (timeLeft > 0) {
        timeLeft--;
        timeTag.innerText = timeLeft;
        let wpm = Math.round(((charIndex) / 5) / (maxTime - timeLeft) * 60);
        wpmTag.innerText = wpm;
    } else {
        clearInterval(timer);
    }
}

function resetGame() {
    loadParagraph();
    clearInterval(timer);
    timeLeft = maxTime;
    charIndex = wrongWords = isTyping = 0;
    inpField.value = "";
    timeTag.innerText = timeLeft;
    wpmTag.innerText = 0;
    mistakeTag.innerText = 0;
    accuracyTag.innerText = 0;
}

mistakeTag.parentElement.style.display = "none"
accuracyTag.parentElement.style.display = "none"
loadParagraph();
inpField.addEventListener("input", initTyping);