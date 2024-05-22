// select the start game button
document.querySelector(".control-buttons span").onclick = function () {
  let yourName = prompt("Whats Your Name ?");
  if (yourName == null || yourName == "") {
    document.querySelector(".name span").innerHTML = "Unknown";
  } else {
    document.querySelector(".name span").innerHTML = yourName;
  }
  document.querySelector(".control-buttons").remove();
  let showImage = setTimeout(() => {
    blocks.map((ele) => {
      ele.classList.add("has-match");
    });
    setTimeout(() => {
      clearTimeout(showImage);
      blocks.map((ele) => {
        ele.classList.remove("has-match");
      });
    }, 3000);
  }, 2000);
};

// effect duration
let duration = 1000;
let blocksContainer = document.querySelector(".memory-game-blocks");
let blocks = Array.from(blocksContainer.children);
let orderRange = [...Array(blocks.length).keys()]; // Array.from(Array(blocks.length).keys())
shuffle(orderRange);
blocks.forEach((block, index) => {
  block.style.order = orderRange[index];
  block.addEventListener("click", function () {
    flipBlock(block);
  });
});

// Shuffle Function
function shuffle(array) {
  let current = array.length;
  let temp;
  let random;
  while (current > 0) {
    random = Math.floor(Math.random() * current);
    current--;
    temp = array[current];
    array[current] = array[random];
    array[random] = temp;
  }
  return array;
}

// Flip Block Function
function flipBlock(selectedBlock) {
  selectedBlock.classList.add("is-flipped");
  let allFlippedBlocks = blocks.filter((flippedBlock) =>
    flippedBlock.classList.contains("is-flipped")
  );
  if (allFlippedBlocks.length === 2) {
    stopClicking();
    checkMathedBlocks(allFlippedBlocks[0], allFlippedBlocks[1]);
  }
}

// Stop Clicking Function
function stopClicking() {
  blocksContainer.classList.add("no-clicking");
  setTimeout(() => {
    blocksContainer.classList.remove("no-clicking");
  }, duration);
}

// check Matched Block
let winner = 0;
function checkMathedBlocks(firstBlock, secondBlock) {
  let triesElement = document.querySelector(".tries span");
  if (firstBlock.dataset.animal === secondBlock.dataset.animal) {
    document.querySelector("#success").play();
    firstBlock.classList.remove("is-flipped");
    secondBlock.classList.remove("is-flipped");
    firstBlock.classList.add("has-match");
    secondBlock.classList.add("has-match");
    winner++;
    if (winner == 10) {
      win();
    }
  } else {
    triesElement.innerHTML = parseInt(triesElement.innerHTML) + 1;
    document.querySelector("#fail").play();
    setTimeout(() => {
      firstBlock.classList.remove("is-flipped");
      secondBlock.classList.remove("is-flipped");
    }, duration);
    if (triesElement.innerHTML === "6") {
      blocksContainer.style.cssText = "pointer-events : none";
      finish();
    }
  }
}

// End Game Function
function finish() {
  blocks.map((ele) => {
    ele.classList.add("has-match");
  });
  setTimeout(() => {
    let div = document.createElement("div");
    div.className = "popup";
    let divText = document.createTextNode(`Game Over !`);
    let p = document.createElement("p");
    p.className = "play-Again";
    let txtP = document.createTextNode("Play Again");
    p.appendChild(txtP);
    div.appendChild(divText);
    div.appendChild(p);
    document.body.appendChild(div);
    p.onclick = function () {
      window.location.reload();
    };
  }, 850);
}

// Winner Game Function
function win() {
  let div = document.createElement("div");
  div.className = "winner";
  let p = document.createElement("p");
  p.textContent = "congratulation !";
  let p3 = document.createElement("p");
  p3.className = "play-Again";
  let txtP = document.createTextNode("Play Again");
  p3.appendChild(txtP);
  div.appendChild(p);
  div.appendChild(p3);
  document.body.appendChild(div);
  p3.onclick = function () {
    window.location.reload();
  };
}

console.log("hello world");
console.log("yes");
