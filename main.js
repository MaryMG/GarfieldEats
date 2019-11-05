const images = {
    background : 'images/background.jpeg',
    garfield  : 'images/garfiels.png',
    oddie  : 'images/dog.png',
    lasag  : 'images/lasag.png'
  }

//variables constates 
const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');
let interval;
var key_left  = 37;
var key_up    = 39;
var ciclos=0;
var iteraciones=1;
let frames = 0
let comida = [];
let obstacles = [];


// clases
class Board {
    constructor (){
     this.x = 0;
     this.y = 0;
     this.width = canvas.width;
     this.height = canvas.height;
     this.img = new Image ();
     this.img.src = images.background;
     this.img.onload = () => {
      this.draw();
    };
    }
  
    draw(){
     /*
        this.y ++;
        if (this.y  >  canvas.height) this.y = 0;
          ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
          ctx.drawImage(this.img, this.x, this.y - canvas.height, this.width, this.height);
          interval = setInterval(update, 1000 / 30); */
          this.x --;
         if (this.x < - canvas.width) this.x = 0;
         ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
         ctx.drawImage(this.img, this.x + canvas.width, this.y, this.width, this.height);
     
    }
  
  }

  class Lasagna {
    constructor(y) {
      this.x = canvas.width
      this.y = y;
      this.width = 70
      this.height = 70
      this.img = new Image()
      this.img.src = images.lasag
      this.img.onload = () => {
          this.draw();
      }
    }
    draw() {
      this.x-=7
      ctx.drawImage(this.img, this.x, this.y, this.width, this.height)
    }
  }

  class  Odie{
    constructor(y) {
      this.x = canvas.width
      this.y = y;
      this.width = 140
      this.height = 140
      this.img = new Image()
      this.img.src = images.oddie
      this.img.onload = () => {
          this.draw();
      }
    }
    draw() {
      this.x-=8
      ctx.drawImage(this.img, this.x, this.y, this.width, this.height)
    }
  }




  //instancias
const board = new Board();
const lasagna =  new Lasagna();
const odie =  new Odie();

//funciones

  function drawlasañas() {
      comida.forEach(lasaña => lasaña.draw())
      
  }
  function drawodie(){
      obstacles.forEach(odies => odies.draw())
  }
  
  function generatelasagna() {
    if (frames % 70 === 0) {
      const randomPosition = Math.floor(Math.random() *( canvas.height - 400) ) + 350 
      const lasa = new Lasagna(randomPosition)
      comida.push(lasa)
    }
  }

  function generateodie() {
    if (frames % 100 === 0) {
      const randomPosition = Math.floor(Math.random() *( canvas.height - 400) ) + 350 
      const odi = new Odie(randomPosition)
      obstacles.push(odi)
    }
  }


  window.onload = function() {
      startGame();
      function startGame () {
        interval = setInterval(update, 1000 / 60);
      }
  }

  function update() {
    frames ++
    clearInterval();
    board.draw(); 
    generatelasagna();
    drawlasañas();
    generateodie();
    drawodie();
    
  }




  //listeners
  document.onkeydown = e => {
    switch (e.keyCode) {
      case 37:
        flash.moveLeft()
        return
      case 39:
        flash.moveRight()
        return
    }
  }
  
 


  
  
  
 




