let myRank = document.querySelector(".my-rank ");
myRank.innerHTML = 1600;

//Settings
//Letters
const letters = "abcdefghijklmnopqrstuvwxyz";

//Array From Letters
const lettersArray = Array.from(letters);

//Select Letters Container
let lettersCont = document.querySelector(".letters");

//Append Letters To Container
lettersArray.forEach(function (letter) {
  let letterSpan = document.createElement("span");
  letterSpan.className = "letter-box";
  letterSpan.innerHTML = letter.toUpperCase();
  lettersCont.appendChild(letterSpan);
});

//Select My All Inputs Letters
let allInputLetters = document.querySelectorAll(".letters span");

// Object Of Words Frim The JSON File
let words = {
  countries: ["Syria", "Palestine", "Yemen", "Egypt", "Bahrain", "Qatar"],
  movies: ["Prestige", "Inception", "Parasite", "Interstellar", "Coco", "Up"],
  people: ["Hedi", "Zou ", "Cleopatra", "aziz"],
  programming: ["php", "javascript", "go", "scala", "fortran", "r"],
};

//Get Random PropertyName + PropertyValue

let myPropertyes = Object.keys(words);
//Categorie
let randomPropName =
  myPropertyes[Math.floor(Math.random() * myPropertyes.length)];

//Set Category Info
let wordContainer = document.querySelector(".category span");
wordContainer.innerHTML = randomPropName;

//Categorie Word
let randomPropValue =
  words[randomPropName][
    Math.floor(Math.random() * words[randomPropName].length)
  ];

console.log(randomPropValue);

//Generate Input Field
let inputCont = document.querySelector(".letters-guess");
let lettersAndSpace = Array.from(randomPropValue);

generateInputs();

function generateInputs() {
  for (let i = 0; i < randomPropValue.length; i++) {
    let input = document.createElement("span");
    if (lettersAndSpace[i] === " ") {
      input.className = "with-space";
    }
    //Append Letters To The Letters Guess Container
    inputCont.appendChild(input);
  }
}

//

//Select Guess Spans
let MySpans = document.querySelectorAll(".letters-guess span");

//Set Wrong Attempts
let wrongAttempts = 0;

//Select The Draw
let theDraw = document.querySelector(".hangman-draw");

//Hnadle Clicking On Letters

let lettersAndSpaceAndDot = Array.from(randomPropValue.toUpperCase());

document.addEventListener("click", (e) => {
  //Set The Choose Status

  if (e.target.className == "letter-box") {
    //Get Clicked Letter
    let theClickedLetter = e.target.innerHTML.toUpperCase();

    //If The Clicked Letter Exists In The Word => Write It In The First Occurence
    if (lettersAndSpaceAndDot.includes(theClickedLetter) && wrongAttempts < 8) {
      //Set Success Music
      document.querySelector(".yes").play();
      setTimeout(() => {
        document.querySelector(".yes").pause();
        document.querySelector(".yes").currentTime = 0;
      }, 1000);

      let indexOfClickedLetter =
        lettersAndSpaceAndDot.indexOf(theClickedLetter);

      lettersAndSpaceAndDot[indexOfClickedLetter] = ".";

      MySpans[indexOfClickedLetter].innerHTML = theClickedLetter;
      if (!lettersAndSpaceAndDot.includes(theClickedLetter)) {
        e.target.classList.add("clicked");
      }
    } else if (!lettersAndSpaceAndDot.includes(theClickedLetter)) {
      //Edite My Rank
      myRank.innerHTML = parseInt(myRank.innerHTML) - 200;

      //Increment Wrong Attempts
      wrongAttempts++;
      theDraw.classList.add(`wrong-${wrongAttempts}`);
      e.target.classList.add("clicked");
    }

    //endGame() + congrats() Functions To End The Game
    if (wrongAttempts == 8) {
      endGame();

      lettersCont.classList.add("finished");
    } else if (allSpansFilled()) {
      //Create Popup Div
      let div = document.createElement("div");
      div.innerHTML = `Congrats !! Your Rank Is : ${myRank.innerHTML}`;
      div.className = "popup";
      document.body.appendChild(div);
    }
  }
});

//End Game Function
function endGame() {
  //Create Popup Div
  let div = document.createElement("div");
  div.innerHTML = `Game Over ..The Word Is ${randomPropValue}`;
  div.className = "popup bad";
  document.body.appendChild(div);
  //End Fail Sound
  let faliSound = document.querySelector(".no");
  faliSound.play();
  myRank.innerHTML = 0;
}

// allSpansFilled() Fuinction
function allSpansFilled() {
  let test = true;
  MySpans.forEach((span) => {
    if (span.innerHTML == "" && !span.classList.contains("with-space")) {
      test = false;
    }
  });
  return test;
}

//Input Letters From Keybord
document.addEventListener("keydown", function (e) {
  if (wrongAttempts < 8) {
    let myLetter = e.key;
    //Index Of My Letter In  Letters
    let indexLettter = letters.indexOf(myLetter);
    console.log(letters.includes(myLetter));
    if (letters.includes(myLetter)) {
      allInputLetters[indexLettter].click();
    }
  }
});
