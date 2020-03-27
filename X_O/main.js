let res = [Array(9).fill(null)];
const choices = document.querySelectorAll(".row button");
const player = document.getElementById("player");
const step_back_btn = document.getElementById("back");
const winner = document.getElementById("winner");
let is_win;
let is_x_next = true;

for (let i = 0; i < choices.length; i++) {
  choices[i].addEventListener("click", _ => {
    // show and hide the return button
    if (res.length >= 1) {
      step_back_btn.style.display = "initial";
    }
    // show the which player will player
    player.textContent = !is_x_next ? "X" : "O";
    // copy the content of the last array in the res array;
    const arr = [...res[res.length - 1]];
    // modify the plce where user is clicked;
    if (arr[i] != "x" && arr[i] != "o") {
      if (is_x_next) {
        arr[i] = "x";
        is_x_next = !is_x_next;
      } else {
        arr[i] = "o";
        is_x_next = !is_x_next;
      }
    }
    res.push(arr);
    updateUi();
    is_win = checkWinner(res[res.length - 1]);
    if (is_win) {
      winner.textContent = `the winner is ${is_win}`;
    }
  });
}
// update the html from the data of the res array
function updateUi() {
  for (let i = 0; i < 9; i++) {
    choices[i].textContent = res[res.length - 1][i];
  }
}

// back one step in the game
function back() {
  if (res.length > 1) {
    player.textContent = !is_x_next ? "X" : "O";
    is_x_next = !is_x_next;

    res.pop();
    updateUi();
  }
}

//  to start the game again
function rejower() {
  // free the res to return to initial state
  res = [Array(9).fill(null)];
  for (let i = 0; i < 9; i++) {
    choices[i].textContent = res[res.length - 1][i];
    choices[i].style.backgroundColor = "#fff";
  }
  //
  winner.textContent = "";
  // hide the back button
  step_back_btn.style.display = "none";
}
// check if exist a winner
function checkWinner(sq) {
  let prob = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];

  for (let i = 0; i < prob.length; i++) {
    let [a, b, c] = prob[i];
    if (sq[a] != null && sq[a] === sq[b] && sq[a] === sq[c]) {
      let color = sq[a] === "x" ? "green" : "red";
      choices[a].style.backgroundColor = color;
      choices[b].style.backgroundColor = color;
      choices[c].style.backgroundColor = color;
      return sq[a];
    }
  }
  return null;
}
