let btn = document.querySelector("#btn");
let content = document.querySelector("#content");
let voice = document.querySelector("#voice");

function speak(text) {
    let text_speak = new SpeechSynthesisUtterance(text);
    text_speak.rate = 1;
    text_speak.pitch = 1;
    text_speak.volume = 1;
    text_speak.lang = "en-GB";
    window.speechSynthesis.speak(text_speak);
}

function GreetMe() {
    let day = new Date();
    let hours = day.getHours();
    if (hours >= 0 && hours < 12) {
        speak("Good Morning, Sir or Madam");
    } else if (hours >= 12 && hours < 16) {
        speak("Good Afternoon, Sir or Madam");
    } else {
        speak("Good Evening,Sir/ma'am");
    }
}

window.addEventListener('load', () => {
    GreetMe();
});

let SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
let recognition = new SpeechRecognition();

recognition.onresult = (event) => {
    let currentIndex = event.resultIndex;
    let transcript = event.results[currentIndex][0].transcript;
    content.innerText = transcript;
    takeCommand(transcript.toLowerCase());
};

btn.addEventListener("click", () => {
    recognition.start();
    btn.style.display = "none";
    voice.style.display = "block";
});

function takeCommand(message) {
    btn.style.display = "flex";
    voice.style.display = "none";

    if (message.includes("hello") || message.includes("hey") || message.includes("hello sara")) {
        speak("Hello, Sir/ma'am. What can I do for you?");
    } 
    else if (message.includes("who are you")) {
        speak("I am Sophisticated AI-Powered Responsive Assistant, a Virtual Assistant designed by Shaikh. But you can call me SARA.");
    } 
        else if (message.includes("what are you")) {
        speak("I am SARA an AI.");
    } 
    else if (message.includes("open youtube")) {
        speak("Opening YouTube");
        window.open("https://www.youtube.com/", "_blank");
    } 
    else if (message.includes("open google")) {
        speak("Opening Google");
        window.open("https://www.google.com/", "_blank");
    } 
    else if (message.includes("open instagram")) {
        speak("Opening Instagram");
        window.open("https://www.instagram.com/", "_blank");
    } 
    else if (message.includes("open calculator")) {
        speak("Opening calculator");
        window.open("calculator://");
    } 
    else if (message.includes("open whatsapp")) {
        speak("Opening WhatsApp");
        window.open("whatsapp://");
    } 
    else if (message.includes("time")) {
        let date = new Date().toLocaleTimeString(undefined, { hour: 'numeric', minute: 'numeric' });
        speak(`The time is ${date}`);
    } 
    else if (message.includes("date")) {
        let date = new Date().toLocaleDateString(undefined, { day: 'numeric', month: 'short' });
        speak(`Today's date is ${date}`);
    } 
    else if (message.includes("weather")) {
        let city = message.split("in")[1]?.trim(); // Extract city if mentioned

        if (city) {
            speak(`Searching for weather in ${city}`);
            window.open(`https://www.google.com/search?q=weather+in+${city}`, "_blank");
        } 
        else {
            speak("Checking the weather for your current location.");
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition((position) => {
                    const lat = position.coords.latitude;
                    const lon = position.coords.longitude;
                    window.open(`https://www.google.com/search?q=weather+at+${lat},${lon}`, "_blank");
                }, () => {
                    speak("Unable to access your location. Please try again.");
                });
            } 
            else {
                speak("Geolocation is not supported by your browser.");
            }
        }
    } 
    else {
        let finalText = "This is what I found on the internet regarding " + message.replace("sara", "");
        speak(finalText);
        window.open(`https://www.google.com/search?q=${message}`, "_blank");
    }
}
