let difficulty = "easy"

let words = []
let currentWord = ""

let wpm = 0
let correctChars = 0
let totalChars = 0

let goodWords = 0
let badWords = 0

let time = 60
let timer


const easy = ["chat","chien","pain","lait","eau","table","ami","jour"]

const medium = ["maison","voiture","ordinateur","clavier","bureau","travail"]

const hard = ["administration","programmation","optimisation","configuration"]


let area = document.getElementById("area")
let wordDisplay = document.getElementById("wordDisplay")

let wpmText = document.getElementById("wpm")
let accuracyText = document.getElementById("accuracy")
let timeText = document.getElementById("time")

let bestText = document.getElementById("best")

let goodText = document.getElementById("good")
let badText = document.getElementById("bad")

let resultBox = document.getElementById("result")


let bestScore = localStorage.getItem("best") || 0
bestText.innerText = bestScore



document.querySelectorAll(".diff").forEach(btn => {

btn.addEventListener("click", function(){

difficulty = this.dataset.level

})

})



document.getElementById("start").addEventListener("click", startGame)



function startGame(){

document.getElementById("startclick").style.display="none"

wpm=0
correctChars=0
totalChars=0
goodWords=0
badWords=0
time=60

wpmText.innerText=0
accuracyText.innerText=0
timeText.innerText=60

generateWords()

timer=setInterval(tick,1000)

area.focus()

}



function generateWords(){

let list

if(difficulty==="easy") list=easy
if(difficulty==="medium") list=medium
if(difficulty==="hard") list=hard

words=[]

for(let i=0;i<80;i++){

let r=Math.floor(Math.random()*list.length)

words.push(list[r])

}

currentWord=words[0]

showWords()

}



function showWords(){

wordDisplay.innerText=words.join(" ")

}



function tick(){

time--

timeText.innerText=time

if(time<=0){

endGame()

}

}



area.addEventListener("keydown", function(e){

if(e.key===" "){

e.preventDefault()

checkWord()

}

})



function checkWord(){

let typed=area.value.trim()

let correctWord=true

for(let i=0;i<currentWord.length;i++){

if(typed[i]===currentWord[i]){

correctChars++

}else{

correctWord=false

}

}

totalChars+=currentWord.length

if(correctWord){
goodWords++
}else{
badWords++
}

wpm++

wpmText.innerText=wpm

let accuracy=Math.round((correctChars/totalChars)*100)

accuracyText.innerText=accuracy

words.shift()

let newWord=getRandomWord()

words.push(newWord)

currentWord=words[0]

showWords()

area.value=""

}



function getRandomWord(){

let list

if(difficulty==="easy") list=easy
if(difficulty==="medium") list=medium
if(difficulty==="hard") list=hard

return list[Math.floor(Math.random()*list.length)]

}



function endGame(){

clearInterval(timer)

resultBox.style.display="block"

goodText.innerText=goodWords
badText.innerText=badWords

if(wpm>bestScore){

localStorage.setItem("best", wpm)
bestText.innerText=wpm

}

}



document.getElementById("again").addEventListener("click", function(){

location.reload()

})