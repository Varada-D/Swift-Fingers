const typingText = document.querySelector(".typing-text p"),
    inpField = document.querySelector(".wrapper .input-field"),
    tryAgainBtn = document.querySelector(".content button"),
    timeTag = document.querySelector(".time span b"),
    mistakeTag = document.querySelector(".mistake span"),
    wpmTag = document.querySelector(".wpm span"),
    accuracyTag = document.querySelector(".accuracy span");

let totalWords = 0

let timer,
    maxTime = 30,
    timeLeft = maxTime,
    charIndex = wrongWords = isTyping = 0;

function setTimerVal() {
    maxTime = parseInt(document.getElementById('timerVal').value)
    timeLeft = maxTime
    timeTag.innerHTML = '<b>' + maxTime + '</b>'
}

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
    document.getElementById('timerVal').disabled = true
    document.querySelector('.content').children[0].style.display = 'none'
    let characters = typingText.querySelectorAll("span");
    let typedChar = inpField.value.split("")[charIndex];
    if (charIndex < characters.length - 1 && timeLeft > 0) {
        if (!isTyping) {
            timer = setInterval(initTimer, 1000);
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
        let wpm = Math.round(((charIndex - wrongWords) / 5) / (maxTime - timeLeft) * 60);
        wpm = wpm < 0 || !wpm || wpm === Infinity ? 0 : wpm;

        // document.querySelector('.active').scrollIntoView()
        wpmTag.innerText = wpm;
        mistakeTag.innerText = wrongWords;
        let accuracy = ((1 - (wrongWords / totalWords)) * 100)
        accuracyTag.innerText = accuracy.toFixed(0) + "%"
        if (charIndex >= characters.length - 1) {
            clearInterval(timer);
        }
    } else {
        clearInterval(timer);
        inpField.value = "";
        scrollTo(0, 0)
        // document.querySelector('.mistake').style.display = 'block'
        // document.querySelector('.wpm').style.display = 'block'
        // document.querySelector('.accuracy').style.display = 'block'
        // document.querySelector('.reloadBtn').style.display = 'block'
    }
}

function initTimer() {
    if (timeLeft > 0) {
        timeLeft--;
        timeTag.innerText = timeLeft;
        let wpm = Math.round(((charIndex - wrongWords) / 5) / (maxTime - timeLeft) * 60);
        wpmTag.innerText = wpm;
    } else {
        clearInterval(timer);
    }
}


function resetGame() {
    // scrollTo(0,0)
    document.getElementById('timerVal').disabled = false;
    // document.querySelector('.content').children[0].style.display = 'block'
    // document.querySelector('.mistake').style.display = 'none'
    // document.querySelector('.wpm').style.display = 'none'
    // document.querySelector('.accuracy').style.display = 'none'
    // document.querySelector('.reloadBtn').style.display = 'none'
    loadParagraph();
    clearInterval(timer);
    timeLeft = maxTime;
    charIndex = mistakes = isTyping = 0;
    inpField.value = "";
    timeTag.innerText = timeLeft;
    wpmTag.innerText = 0;
    mistakeTag.innerText = 0;
    cpmTag.innerText = 0;
}

scrollTo(0,0)
loadParagraph();
// console.log(screen.width)
// // document.addEventListener("resize", function() {
//     if (screen.width < 570) {
//         // typingText.style.position = 'absolute'
//         typingText.style.marginTop = '-50vh'
//         typingText.style.backgroundColor = 'rgb(0,0,0)'
//     }
// // })
document.querySelector('.time').style.display = 'block'
document.querySelector('.mistake').style.display = 'block'
document.querySelector('.wpm').style.display = 'block'
document.querySelector('.accuracy').style.display = 'block'
document.querySelector('.reloadBtn').style.display = 'block'
// document.querySelector('.mistake').style.display = 'none'
// document.querySelector('.wpm').style.display = 'none'
// document.querySelector('.accuracy').style.display = 'none'
// document.querySelector('.reloadBtn').style.display = 'none'
inpField.addEventListener("input", initTyping);
// inpField.addEventListener("change", document.querySelector('.active').scrollIntoView())
tryAgainBtn.addEventListener("click", resetGame)