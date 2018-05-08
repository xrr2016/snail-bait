const canvas = document.getElementById('snailbait-game-canvas')
const context = canvas.getContext('2d')
const background = new Image()
const runnerImage = new Image()

function initImages() {
  background.src = 'images/background.png'
  runnerImage.src = 'images/runner.png'

  background.addEventListener('load', () => startGame())
}

function startGame() {
  draw()
}

function draw() {
  drawBackground()
  drawRunner()
}

function drawBackground() {
  context.drawImage(background, 0, 0)
}

function drawRunner() {
  context.drawImage(runnerImage, 50, 280)
}

initImages()