const canvas = document.getElementById('snailbait-game-canvas')
const context = canvas.getContext('2d')
const background = new Image()
const runnerImage = new Image()

const RUNNER_LEFT = 50
const PLATFORM_HEIGHT = 15
const PLATFORM_STROKE_WIDTH = 2
const PLATFORM_STROKE_STYLE = 'blue'

const TRACK_1_BASELINE = 323
const TRACK_2_BASELINE = 223
const TRACK_3_BASELINE = 123

const platforms = [{
    left: 10,
    width: 230,
    height: PLATFORM_HEIGHT,
    fillStyle: 'rgb(255, 255, 0)',
    opacity: 0.5,
    track: 1,
    pulsate: false
  },
  {
    left: 300,
    width: 230,
    height: PLATFORM_HEIGHT,
    fillStyle: 'rgb(255, 255, 0)',
    opacity: 0.5,
    track: 2,
    pulsate: false
  },
  {
    left: 430,
    width: 230,
    height: PLATFORM_HEIGHT,
    fillStyle: 'rgb(255, 255, 0)',
    opacity: 0.5,
    track: 3,
    pulsate: false
  }
]

const fpsElement = $('#snailbait-fps')

let fps = 0
let lastAnimationFrameTime = 0
let lastFpsUpdateTime = 0

function $(selector) {
  return document.querySelector(selector)
}

function calculatePlatformTop(track) {
  switch (track) {
    case 1:
      return TRACK_1_BASELINE;
    case 2:
      return TRACK_2_BASELINE;
    case 3:
      return TRACK_3_BASELINE;
  }
}

function initImages() {
  background.src = 'images/background.png'
  runnerImage.src = 'images/runner.png'

  background.addEventListener('load', () => startGame())
}

function calculateFps(now) {
  const fps = 1 / (now - lastAnimationFrameTime) * 1000
  if (now - lastFpsUpdateTime > 1000) {
    lastFpsUpdateTime = now
    fpsElement.innerHTML = `${fps.toFixed(0) }fps`
  }
  lastAnimationFrameTime = now
  return fps
}

function startGame(now) {
  fps = calculateFps(now)
  draw(now)
  requestAnimationFrame(startGame)
}

function drawBackground() {
  context.drawImage(background, 0, 0)
}

function drawRunner() {
  context.drawImage(runnerImage, RUNNER_LEFT, 280)
}

function drawPlatform(data) {
  const platformTop = calculatePlatformTop(data.track)
  context.save()
  context.lineWidth = PLATFORM_STROKE_WIDTH
  context.strokeStyle = PLATFORM_STROKE_STYLE
  context.fillStyle = data.fillStyle
  context.globalAlpha = data.opacity

  context.strokeRect(data.left, platformTop, data.width, data.height)
  context.fillRect(data.left, platformTop, data.width, data.height)
  context.restore()
}

function drawPlatforms() {
  platforms.forEach(p => drawPlatform(p))
}

function draw(now) {
  drawBackground()
  drawPlatforms()
  drawRunner()
}

initImages()