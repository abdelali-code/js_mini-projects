const images = [
  "./images/icon-paper.svg",
  "./images/icon-scissors.svg",
  "./images/icon-rock.svg"
];
const main = document.getElementById("main");
const names = ["paper", "scissor", "rock"];
const choix = document.getElementsByClassName("icon");

// to dispaly and hide the rules of the game
function shouModal() {
  let modal = document.getElementsByClassName("modal")[0].style;
  modal.display = modal.display == "none" ? "block" : "none";
}

function removeGameChoices() {
  for (let elem of choix) {
    elem.style.display = "none";
  }
}
function showGameChoices() {
  for (let elem of choix) {
    elem.style.display = "inline-block";
  }
}

function createUserContainer(n) {
  main.classList.add("flex");
  let container = document.createElement("div");
  container.setAttribute("id", "user");
  let parent = document.createElement("div");
  parent.classList.add("icon");
  parent.classList.add(names[n]);
  let para = document.createElement("p");
  para.classList.add("para");
  para.textContent = `You picked ${names[n]}`;
  let child = document.createElement("img");
  child.setAttribute("src", images[n]);
  child.setAttribute("alt", names[n]);

  parent.appendChild(child);
  container.appendChild(para);
  container.appendChild(parent);
  main.appendChild(container);
}
// for the random choise
function createRandomContainer(n) {
  let container = document.createElement("div");
  container.setAttribute("id", "random");
  let parent = document.createElement("div");
  parent.classList.add("icon");
  let para = document.createElement("p");
  para.classList.add("para");
  container.appendChild(para);
  container.appendChild(parent);
  main.appendChild(container);
  para.textContent = "the house picked ";
  setTimeout(() => {
    para.textContent += `${names[n]}`;
    let child = document.createElement("img");
    child.setAttribute("src", images[n]);
    child.setAttribute("alt", names[n]);
    parent.classList.add(names[n]);
    parent.appendChild(child);
  }, 2000);
}

for (let i = 0; i < choix.length; i++) {
  choix[i].addEventListener("click", () => {
    let random = generateRandom();
    // remove choices from the screen
    removeGameChoices();
    // display the user choice
    createUserContainer(i);
    // display a random choice
    createRandomContainer(random);
    // get the winner after a delay of 2s
    setTimeout(() => {
      winner(i, random);
    }, 2000);
  });
}

// give user message of win or lose
function displayMsg(msg) {
  let rand = document.getElementById("random");
  let div = document.createElement("div");
  div.setAttribute("id", "msg");
  let btn = document.createElement("button");
  btn.setAttribute("id", "reset");
  btn.setAttribute("onclick", "rejower()");
  btn.textContent = "Rejower";
  btn.classList.add("btn");
  let message = document.createElement("p");
  div.classList.add("dis-msg");
  message.textContent = msg;
  div.appendChild(message);
  div.appendChild(btn);
  main.insertBefore(div, rand);
}

// give us a random number from set of  {1, 2, 3};
function generateRandom() {
  return Math.floor(Math.random() * 3);
}

// get the winner;
function winner(a, b) {
  let res = document.getElementById("res");
  let iniVal = Number(res.textContent);
  if (a == b) {
    displayMsg("Equal");
  } else if ((a == 2 && b == 1) || (a == 1 && b == 0) || (a == 0 && b == 2)) {
    displayMsg("You win");
    res.textContent = iniVal + 1;
  } else {
    displayMsg("You lose");
    res.textContent = iniVal - 1;
  }
}
// reset the game to play again;
function rejower() {
  let user = document.getElementById("user");
  let random = document.getElementById("random");
  let msg = document.getElementById("msg");
  main.removeChild(user);
  main.removeChild(random);
  main.removeChild(msg);
  main.classList.remove("flex");
  showGameChoices();
}
