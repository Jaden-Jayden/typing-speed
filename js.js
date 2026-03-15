let difficulty = "easy"
let currentWord = ""
let letterIndex = 0
let wpm = 0
let correctChars = 0
let totalChars = 0
let goodWords = 0
let badWords = 0
let time = 60
let timer


const easy = [
"chat",
"chien",
"pain",
"lait",
"eau",
"sucre",
"table",
"chaise",
"porte",
"mur",
"main",
"pied",
"tête",
"nez",
"yeux",
"bras",
"jambe",
"dos",
"ami",
"amie",
"père",
"mère",
"frère",
"soeur",
"jour",
"nuit",
"matin",
"soir",
"hier",
"demain",
"ici",
"là",
"oui",
"non",
"bien",
"mal",
"vite",
"lent",
"haut",
"bas",
"gros",
"petit",
"beau",
"laid",
"vrai",
"faux",
"bon",
"mauvais",
"chaud",
"froid",
"plein",
"vide",
"dur",
"mou",
"clair",
"sombre",
"neuf",
"vieux"]
const medium = [
"maison",
"voiture",
"ordinateur",
"clavier",
"écran",
"téléphone",
"fenêtre",
"cuisine",
"salon",
"chambre",
"bureau",
"travail",
"école",
"collège",
"université",
"professeur",
"élève",
"étudiant",
"exercice",
"question",
"réponse",
"solution",
"problème",
"histoire",
"géographie",
"science",
"nature",
"animal",
"plante",
"montagne",
"rivière",
"océan",
"forêt",
"prairie",
"désert",
"nuage",
"pluie",
"orage",
"vent",
"soleil",
"étoile",
"planète",
"galaxie",
"univers",
"énergie","force"]
const hard = ["administration","programmation","optimisation","configuration"]


const area = document.getElementById("area")
const wordDisplay = document.getElementById("wordDisplay")
const wpmText = document.getElementById("wpm")
const accuracyText = document.getElementById("accuracy")
const timeText = document.getElementById("time")
const bestText = document.getElementById("best")
const goodText = document.getElementById("good")
const badText = document.getElementById("bad")
const resultBox = document.getElementById("result")
const bestScore = localStorage.getItem("best") || 0
bestText.innerText = bestScore

document.querySelectorAll(".diff").forEach(btn => {

btn.addEventListener("click", function(){
difficulty = this.dataset.level
})})

document.getElementById("start").addEventListener("click", startGame)

function startGame(){

document.getElementById("startclick").style.display="none"
wpm = 0
correctChars = 0
totalChars = 0
goodWords = 0
badWords = 0
time = 60
wpmText.innerText = 0
accuracyText.innerText = 0
timeText.innerText = 60
generateWord()
timer = setInterval(updateTimer,1000)
area.focus()
}

function generateWord(){

let list
if(difficulty==="easy") list=easy
if(difficulty==="medium") list=medium
if(difficulty==="hard") list=hard
let r=Math.floor(Math.random()*list.length)
currentWord = list[r]
letterIndex = 0
displayWord()
}

function displayWord(){

wordDisplay.innerHTML=""
currentWord.split("").forEach(letter => {
let span=document.createElement("span")
span.innerText=letter
wordDisplay.appendChild(span)
})}


area.addEventListener("keydown", function(e){

if(e.key==="Backspace"){
e.preventDefault()
return
}


if(e.key===" "){
e.preventDefault()
nextWord()
return
}

let letters=document.querySelectorAll("#wordDisplay span")
if(letterIndex >= letters.length){
return
}
let expected = letters[letterIndex].innerText
totalChars++
if(e.key === expected){
letters[letterIndex].style.color="lime"
correctChars++
}else{
letters[letterIndex].style.color="red"
}
letterIndex++
})

function nextWord(){
if(letterIndex < currentWord.length){
badWords++
}else{
goodWords++
}
wpm++
wpmText.innerText = wpm
let accuracy = Math.round((correctChars/totalChars)*100)
accuracyText.innerText = accuracy
area.value=""
generateWord()
}

function updateTimer(){

time--
timeText.innerText = time
if(time === 0){
endGame()
}}

function endGame(){

clearInterval(timer)
area.disabled = true
goodText.innerText = goodWords
badText.innerText = badWords
resultBox.style.display = "block"

if(wpm > bestScore){
localStorage.setItem("best", wpm)
bestText.innerText = wpm
}}

document.getElementById("again").addEventListener("click", function(){

location.reload()
})