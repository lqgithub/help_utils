const my_dom = document.getElementById("canvas") // 底层dom
const canvas_color = "gray" // 画布颜色
let my_canvas = null // 画布
let food_dom = false; // 食物
let snakes = []; // 蛇
let snakeLength = 0; // 蛇长
let direction = 'right' // 方向默认为right
let level = 1 // 难度等级
let runObject = { // 运行参数
 interval: null, // 时间序列
 level: 1 // 难度
}
let food_position = {
 x: 0,
 y: 0
}

const offsetGrid = { // 网格属性
 width: 10,
 height: 10,
 color: "blue",
 header_color: "black",
 food_color: "green"
}

/**
 * 初始化
 */
function init() {
 if (!my_canvas) {
 createCanvas()
 }
 // createGrid(10, 10, offsetGrid.width, offsetGrid.height, offsetGrid.header_color)
 snakes.push({x:100,y:100})
 createFood()
 document.addEventListener("keydown", handleKeyDown)
 snakeLength = 1
 draw()
 setRunInterval()
}
/**
 * 创建画布
 */
function createCanvas() {
 my_canvas = document.createElement("canvas")
 my_canvas.setAttribute("width", my_dom.offsetWidth)
 my_canvas.setAttribute("height", my_dom.offsetHeight)
 my_dom.appendChild(my_canvas)
}
/**
 * 创建蛇身格子
 * @param {number} x 
 * @param {number} y 
 * @param {number} cellWidth 
 * @param {number} cellHeight 
 * @param {string} fill 
 * @returns
 */
function createGrid(x, y, cellWidth, cellHeight, fill) {
 if (!my_canvas) return
 const ctx = my_canvas.getContext('2d');
 ctx.fillStyle = fill
 ctx.fillRect(x, y, cellWidth, cellHeight);
}

/**
 * 绘制蛇身体
 */
function draw() {
 const ctx = my_canvas.getContext('2d');
 ctx.clearRect(0, 0, my_canvas.width, my_canvas.height);
 // 画布渲染
 ctx.fillStyle = canvas_color
 ctx.fillRect(0, 0, my_canvas.width, my_canvas.height);
 if(food_dom){
 createGrid(food_position.x, food_position.y, offsetGrid.width, offsetGrid.height, offsetGrid.food_color)
 }
 snakes.forEach((item, index) => {
 if (index === 0) {
 createGrid(item.x, item.y, offsetGrid.width, offsetGrid.height, offsetGrid.header_color)
 } else {
 createGrid(item.x, item.y, offsetGrid.width, offsetGrid.height, offsetGrid.color)
 }
 })
}
/**
 * 键盘监听 -- 控制方向
 * @param {object} e 
 */
function handleKeyDown(e) {
 e.preventDefault && e.preventDefault()
 if (e.key === "ArrowRight" && direction !== "left") {
 direction = "right"
 } else if (e.key === "ArrowLeft" && direction !== "right") {
 direction = "left"
 } else if (e.key === "ArrowUp" && direction !== "down") {
 direction = "up"
 } else if (e.key === "ArrowDown" && direction !== "up") {
 direction = "down"
 }
 setSnakeRun()
 setRunInterval()
 console.log('direction===>',direction);
}
/**
 * 设置定时器
 */
function setRunInterval() {
 if (runObject.interval) { // 清除计时器
 clearInterval(runObject.interval)
 runObject.interval = null
 }
 runObject.interval = setInterval(() => { // 设置计时器
 setSnakeRun()
 if (level !== runObject.level) setRunInterval()
 }, 500 / level);
 runObject.level = level
}
/**
 * 计算运行
 */
function setSnakeRun() {
 let header = {
 x: snakes[0].x,
 y: snakes[0].y
 }
 switch (direction) {
 case 'left':
 header.x -= offsetGrid.width
 break;
 case 'right':
 header.x += offsetGrid.width
 break;
 case 'up':
 header.y -= offsetGrid.height
 break;
 case 'down':
 header.y += offsetGrid.height
 break;
 default:
 break;
 }
 // 吃食物
 if (header.x === food_position.x && header.y === food_position.y) {
 snakeLength++
 // 重新生成食物
 createFood()
 } else {
 snakes.pop()
 }
 snakes.unshift(header)
 draw()
 if (snakeDeath()) {
 clearInterval(runObject.interval)
 runObject.interval = null
 return alert('你已经死了')
 }
}
/**
 * 计算死亡
 */
function snakeDeath() {
 let header = snakes[0]
 // 碰壁
 if (header.x < 0 || header.y < 0 || (header.x + offsetGrid.width) > my_canvas.width || (header.y + offsetGrid.height) > my_canvas.height) {
 return true
 }
 // 碰身体
 const death = snakes.slice(1).some(item => item.x === header.x && item.y === header.y)
 if (death) {
 return true
 }
 return false
}
/**
 * 食物生成
 */
function createFood() {
 if (food_dom) {
 const ctx = my_canvas.getContext('2d');
 ctx.clearRect(food_position.x, food_position.y, offsetGrid.width, offsetGrid.height);
 food_dom = false
 }
 // 随机生成
 food_position.x = Math.floor(Math.random() * my_canvas.width / offsetGrid.width) * offsetGrid.width
 food_position.y = Math.floor(Math.random() * my_canvas.height / offsetGrid.height) * offsetGrid.height
 if(snakes.some(snake=>snake.x === food_position.x && snake.y === food_position.y)){
 return createFood()
 }
 food_dom = true
}
init()
console.log(my_dom, my_canvas);