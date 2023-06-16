// javascript
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js"
import { getDatabase, ref, onValue, push } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js"

const appSettings = {
    databaseURL: "https://endorsement-app-47f17-default-rtdb.asia-southeast1.firebasedatabase.app/"
}

const app = initializeApp(appSettings);
const database = getDatabase(app);
const messagesInDB = ref(database, "messageList")
const inputEl = document.getElementById("userInput")
const fromEl = document.getElementById("from")
const toEl = document.getElementById("to")
const btnEl = document.getElementById("publish-btn")
const containerEl = document.getElementById("container")
const messageEl = document.getElementsByClassName("message")

onValue(messagesInDB, function(snapshot) {
    let messageArray = Object.values(snapshot.val())
    clearList(containerEl)
    for (let i = 0; i < messageArray.length; i++) {
        let currentMessage = messageArray[i]
        appendContainer(currentMessage)
    }
})

btnEl.addEventListener("click", function(){
    const messageObj = {
        from: fromEl.value,
        message: inputEl.value,
        to: toEl.value
    }
    push(messagesInDB, messageObj);
    clearInput(inputEl);
    clearInput(toEl);
    clearInput(fromEl);
})


function appendContainer(currentMessage){
    containerEl.innerHTML += `<div class="message">to ${currentMessage.to} <br> ${currentMessage.message} <br> from ${currentMessage.from}</div>`
}

function clearInput(variable) {
    variable.value = ""
}

function clearList(variable) {
    variable.innerHTML = "";
}