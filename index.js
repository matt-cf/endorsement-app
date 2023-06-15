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
const btnEl = document.getElementById("publish-btn")
const containerEl = document.getElementById("container")


onValue(messagesInDB, function(snapshot) {
    let messageArray = Object.values(snapshot.val())
    clearList(containerEl)
    for (let i = 0; i < messageArray.length; i++) {
        let currentMessage = messageArray[i]
        appendContainer(currentMessage)
    }
})

btnEl.addEventListener("click", function(){
    let message = inputEl.value;
    push(messagesInDB, message);
    clearInput(inputEl)
})


function clearInput(variable) {
    variable.value = ""
}

function clearList(variable) {
    variable.innerHTML = "";
}

function appendContainer(currentMessage){
    containerEl.innerHTML += `<div>${currentMessage}</div>`
}