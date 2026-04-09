// *** Global Variables ***
const gameBoxNode = document.querySelector("#game-box");

const ballNode = document.createElement("div"); // the ball node is created
ballNode.id = "ball"; // we assign an id to the node, just for styles
gameBoxNode.append(ballNode); // we add the node to the game box

const paddleNode = document.createElement("div"); // the paddle node is created
paddleNode.id = "paddle"; // we assign an id to the node, just for styles
gameBoxNode.append(paddleNode); // we add the node to the game box

// JS Context
const ball = {
  x: 30,
  y: 30,
  width: 20,
  height: 20,
  speed: 3,
  isMovingRight: true,
  isMovingDown: true,
};

const paddle = {
  x: 200,
  y: 550,
  width: 100,
  height: 20
}

// *** Game Functions ***
function gameLoop() {
  // console.log("interval running")

  ballMovement()
  ballWallCollisionCheck()
  ballPaddleCollisionCheck()
}

function ballMovement() {
  if (ball.isMovingRight === true) {
    ball.x += ball.speed;
    ballNode.style.left = `${ball.x}px`;
  } else {
    ball.x -= ball.speed;
    ballNode.style.left = `${ball.x}px`;
  }
  
  if (ball.isMovingDown === true) {
    ball.y += ball.speed;
    ballNode.style.top = `${ball.y}px`;
  } else {
    ball.y -= ball.speed;
    ballNode.style.top = `${ball.y}px`;
  }
}

function ballWallCollisionCheck() {
  if ((ball.x + ball.width) > gameBoxNode.offsetWidth) {
    ball.isMovingRight = false;
  }

  if ((ball.y + ball.height) > gameBoxNode.offsetHeight) {
    // ball.isMovingDown = false
    //1. stop the interval
    clearInterval(gameIntervalId)
    //2. show something to the user
    alert("Game over! Get better!")
  }

  if (ball.x < 0) {
    ball.isMovingRight = true
  }

  if (ball.y < 0) {
    ball.isMovingDown = true
  }
}

function ballPaddleCollisionCheck() {
  if (
    ((ball.y + ball.height) > paddle.y) && 
    ((ball.x + ball.width) > paddle.x) && 
    (ball.x < (paddle.x + paddle.width))
  ) {
    ball.isMovingDown = false
  }
}


// *** Game Loop Interval ***
const gameIntervalId = setInterval(gameLoop, 1000 / 60); // 60fps



// *** Event Listeners ***
document.addEventListener("keydown", (event) => {
  if (event.key === "d") {
    console.log("moving the paddle right")
    paddle.x += 20
    paddleNode.style.left = `${paddle.x}px`
  } else if (event.key === "a") {
    console.log("moving the paddle left")
    paddle.x -= 20
    paddleNode.style.left = `${paddle.x}px`
  }
})
