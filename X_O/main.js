let btns = document.querySelectorAll(".row button");
let player = document.getElementById("player");
let winner = document.getElementById("winner");

let isXnext = true;
let res = Array(9).fill(null);

for (let i = 0; i < btns.length; i++) {
  btns[i].addEventListener("click", e => {
    if (e.target.innerText != "X" && e.target.innerText != "0") {
      if (isXnext == true) {
        e.target.innerText = "X";
        isXnext = false;
        res[i] = "x";
        player.textContent = "0";
        // btns[i].style.backgroundColor = "green";
      } else {
        e.target.innerText = "0";
        isXnext = true;
        res[i] = "o";
        player.textContent = "X";
      }
      if (checkWinner(res)) {
        winner.textContent = "the winner is :" + checkWinner(res);
      }
    } else {
      alert("this case already selected");
    }
  });
}
// reset the game
function rejower() {
  res.fill(null);
  for (let btn of btns) {
    isXnext = true;
    btn.style.backgroundColor = "white";
    btn.textContent = ` `;
    winner.textContent = "";
  }
}

function checkWinner(sq) {
  const btn = document.getElementById("reset");
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
      btns[a].style.backgroundColor = color;
      btns[b].style.backgroundColor = color;
      btns[c].style.backgroundColor = color;
      btn.style.display = "initial";
      return sq[a];
    }
  }
  return null;
}
