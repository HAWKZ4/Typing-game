// 10-11-2022
// array of words
let hardArr = [
  "windows",
  "samsung",
  "keyboard",
  "programming",
  "vegetables",
  "microwaves",
  "headphones",
  "mercedes",
  "microsoft",
  "javascript",
];

let normalArr = [
  "computer",
  "science",
  "python",
  "mysql",
  "million",
  "green",
  "orange",
  "apple",
  "lighter",
  "google",
];
let Easyarr = [
  "for",
  "art",
  "and",
  "can",
  "be",
  "you",
  "in",
  "be",
  "one",
  "ten",
];

let firstTime = true;

// catch all the elements
let dif = document.querySelector(".dif");
let tim = document.querySelector(".tim");
let button = document.querySelector(".button");
let theWord = document.querySelector(".the-word");
let input = document.querySelector(".input");
let expWords = document.querySelector(".exp-words");
let timeLeft = document.querySelector(".time-left span");
let got = document.querySelector(".got");
let from = document.querySelector(".from");
let final = document.querySelector(".final");
let select = document.querySelector("#select");
let easy = document.querySelector("#select #easy");
let normal = document.querySelector("#select #normal");
let Easy = document.querySelector("#select #easy");
let inEasy = document.querySelector(".instruction .easy-difficult");
let inNormal = document.querySelector(".instruction .normal-difficult");
let inHard = document.querySelector(".instruction .hard-difficult");
let tEasy = document.querySelector(".instruction .time-easy");
let tNormal = document.querySelector(".instruction .time-normal");
let tHard = document.querySelector(".instruction .time-hard");
let instruction = document.querySelector(".instruction");

// default level
let level = {
  Easy: 5,
  Normal: 3,
  Hard: 2,
};

// set the default value for diffcult and time
dif.innerHTML = Object.keys(level)[1];
tim.innerHTML = Object.values(level)[1];
inEasy.innerHTML = Object.keys(level)[0];
inNormal.innerHTML = Object.keys(level)[1];
inHard.innerHTML = Object.keys(level)[2];
tEasy.innerHTML = level.Easy + "s";
tNormal.innerHTML = level.Normal + "s";
tHard.innerHTML = level.Hard + "s";

// an array that save the words based on difficulty
let arr = [...normalArr];

// length of the words
let length = arr.length;

// set the time left and the from score
timeLeft.innerHTML = level[select.value] + 3;
from.innerHTML = length;

// select the difficult by user
select.onchange = function () {
  dif.innerHTML = select.value;
  tim.innerHTML = level[select.value];
  timeLeft.innerHTML = level[select.value] + 3;

  if (select.value == "Easy") {
    arr = [...Easyarr];
  } else {
    arr = [...hardArr];
  }
};

// make input don't accept text as copy or cut or drop
input.onpaste = function () {
  return false;
};
input.ondrop = function () {
  return false;
};

// function start the game by click on button
button.onclick = function () {
  button.style.display = "none";
  instruction.style.display = "none";
  input.focus();
  genWords();
};

// genWords
function genWords() {
  theWord.innerHTML = "";
  input.value = "";
  // get random word
  let theWordTaken = arr[Math.floor(Math.random() * arr.length)];
  let theWordTakenIndex = arr.indexOf(theWordTaken);

  // delete the element that taken by index from the array to not reapeat taken
  theWord.innerHTML = theWordTaken;
  arr.splice(theWordTakenIndex, 1);

  // create element based on the length

  for (let i = 0; i < arr.length; i++) {
    let div = document.createElement("div");
    let divText = document.createTextNode(arr[i]);
    div.appendChild(divText);
    expWords.appendChild(div);
  }

  setTimeRunning();
}

function setTimeRunning() {
  if (firstTime) {
    timeLeft.innerHTML = level[select.value] + 3;
    firstTime = false;
  } else {
    timeLeft.innerHTML = level[select.value];
  }
  let time = setInterval(() => {
    timeLeft.innerHTML--;
    if (timeLeft.innerHTML == 0) {
      clearInterval(time);

      if (input.value.toLowerCase() == theWord.innerHTML.toLowerCase()) {
        // increase the score got value ++
        got.innerHTML++;
        expWords.innerHTML = "";
        if (arr.length > 0) {
          genWords();
        } else {
          let win = document.createElement("div");
          let winText = document.createTextNode("Congratulation");
          win.appendChild(winText);
          win.className = "win";
          final.appendChild(win);
          // set item to local storage

          let localStorageContent = window.localStorage.getItem("History");

          let History;
          if (localStorageContent === null) {
            History = [];
          } else {
            History = JSON.parse(localStorageContent);
          }
          let x = new Date();
          let pmAM = x.getHours() <= 12 ? "AM" : "PM";
          let today =
            x.getFullYear() +
            "/" +
            Number(x.getMonth() + 1) +
            "/" +
            x.getDate();
          let time = x.getHours() + ":" + x.getMinutes() + " " + pmAM;
          let score = got.innerHTML;
          let item =
            "Date: " + today + " " + "Time: " + time + " " + "Score: " + score;

          History.push(item);
          localStorage.setItem("History", JSON.stringify(History));
        }
      } else {
        let lose = document.createElement("div");
        let loseText = document.createTextNode("Game Over");
        lose.appendChild(loseText);
        lose.className = "lose";
        final.appendChild(lose);
      }
    }
  }, 1000);
}
