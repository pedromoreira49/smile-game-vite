import '../style.css'
import Enemy from './enemy.js'
import Smile from './smile.js'
import Food from './food.js'
import Message from './message.js'
import { keyPress, key } from './keyboard.js'

let context;
let canvas;
const frames = 60;

const totalEnemies = 10;

let enemies = Array.from({length: totalEnemies})
let food = new Food(300, 200, 13, 0, 'orange')
let message = new Message('darkblue', 0)
const smile = new Smile(300, 100, 20, 6, 'green');

let gameOver = false
let animation
let limits

const init = () => {
    console.log('Game started')
    canvas = document.querySelector('canvas')
    canvas.width = 600
    canvas.height = 400
    context = canvas.getContext('2d')

    limits = {
        width: canvas.width, 
        height: canvas.height
    }

    enemies = enemies.map(
        i => new Enemy(
            Math.random() * canvas.width,
            Math.random() * canvas.height,
            10, 5, 
            "#" + ("00000" + Math.floor(Math.random() * Math.pow(16, 6)).toString(16)).slice(-6)
        )
    )

    keyPress(window)
    loop()
}

const loop = () => {
    setTimeout(() => {
        context.reset()

        smile.moveSmile(limits, key)
        smile.drawSmile(context)

        food.drawFood(context)

        enemies.forEach(e => {
            e.moveEnemy(limits, 0)
            e.drawCircle(context)
            gameOver = !gameOver ? e.colision(smile) : true
        })

        if(food.colision(smile)){
            smile.size++
            message.score++
            console.log(`SCORE: ${message.score}`)
            food.x = Math.floor(Math.random() * ((limits.width - 30) -30 + 1)) + 30
            food.y = Math.floor(Math.random() * ((limits.height - 30) - 30 + 1)) + 30
        }

        if(gameOver){
            message.text = 'GAMEOVER! SCORE:'
            message.color = 'red'
            message.printMessage(context, limits)
            console.error('GAMEOVER')
            cancelAnimationFrame(animation)
        } else {
            message.printMessage(context, limits)
            animation = requestAnimationFrame(loop)
        }
    }, 1000/frames)
}

export { init }