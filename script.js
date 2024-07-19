// Live background
particlesJS.load('particles-js', 'particles.json');

const textField = document.querySelector(".input-section");
const undoButton = document.querySelector(".fa-rotate-left");
const redoButton = document.querySelector(".fa-rotate-right");

let history = [];
let redoStack = [];
let currentContent = textField.value;



// Adding undo and red0 functionality
document.addEventListener('DOMContentLoaded', (event) => {

    function saveHistory() {
        if (history.length === 0 || history[history.length - 1] !== currentContent) {
            history.push(currentContent);
        }
    }

    textField.addEventListener('click', () => {
        currentContent = textField.value;
        saveHistory();
        redoStack = [];
    });

    // Undo button 
    undoButton.addEventListener('click', () => {
        if(history.length > 0){
            redoStack.push(currentContent);
            currentContent = history.pop();
            textField.value = currentContent;
            saveHistory();
        }
    });

    // Redo button 
    redoButton.addEventListener('click', () => {
        if(redoStack.length > 0){
            history.push(currentContent);
            currentContent = redoStack.pop();
            textField.value = currentContent;
            saveHistory();
        }
    });





    // Clear text button 
    document.querySelector(".clear-text").addEventListener('click', () => {
        redoStack.push(currentContent);
        currentContent = "";
        textField.value = currentContent;
        saveHistory();
    });
});




let speech = new SpeechSynthesisUtterance();

let voices = [];

let voiceSelect = document.querySelector("select");






// Different voices drowpdown bar
window.speechSynthesis.onvoiceschanged = () => {
    voices = window.speechSynthesis.getVoices();
    speech.voice = voices[0];

    voices.forEach((voice, i) => {
        voiceSelect.options[i] = new Option(voice.name, i)
    });
}

voiceSelect.addEventListener('change', () => {
    speech.voice = voices[voiceSelect.value];
});





// Convert text to audio button
document.querySelector('.convert-btn').addEventListener('click', () => {
    speech.text = textField.value;
    speak(speech);
});

function speak(speech){
    window.speechSynthesis.speak(speech);
}



// Changing volume
const volumeControl = document.querySelector('.volume-control');
volumeControl.addEventListener('input', () => {
    speech.volume = volumeControl.value;
    document.querySelector(".volume-value").textContent = (volumeControl.value*100) + "%";
})


// Changing speed
const speedControl = document.querySelector('.speed-control');
speedControl.addEventListener("input", () => {
    speech.rate = speedControl.value;
    document.querySelector(".speed-value").textContent = Math.round(speedControl.value*50) + "%";
})



// Changing pitch
const pitchControl = document.querySelector('.pitch-control');
pitchControl.addEventListener("input", () => {
    speech.pitch = pitchControl.value;
    document.querySelector(".pitch-value").textContent = Math.round(pitchControl.value*50) + "%";
})



// Word count
textField.addEventListener('input', () => {
    const text = textField.value.trim();
    const wordCount = text ? text.split(/\s+/).length : 0;
    document.querySelector('.word-count').textContent = "Word count: " + wordCount + " chars";
});