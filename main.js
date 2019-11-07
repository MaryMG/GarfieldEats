const images = {
    background : 'images/background.jpeg',
    garfield  : 'images/sprite3.png',
    oddie  : 'images/dog.png',
    lasag  : 'images/lasag.png'
  }

//variables constates 
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
let interval;
let frames = 0
let eat = [];
let obstacles = [];
let counter = 0;


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
          this.x --;
         if (this.x < - canvas.width) this.x = 0;
         ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
         ctx.drawImage(this.img, this.x + canvas.width, this.y, this.width, this.height);
     
    }
  
  }

  class Garfield {
    constructor() {
      this.width = 100
      this.height = 100
      this.y =  canvas.height - this.height
      this.x = 0
      this.animate = 0
      this.position = 0
      this.img = new Image()
      this.img.src =images.garfield
      this.img.onload = () => {
        this.draw()
      }
    }
    draw() {
/// restriccion
if (this.y > canvas.height - this.height) {
    this.y = canvas.height - this.height
  } else {
    this.vy++ 
  }


      ctx.drawImage(
        // imagen de fuente
        this.img,
        // posición de x en la imagen (fuente, sx)
        (this.animate * 191) / 2.06,
        // posición de y en la imagen (fuente, sy)
        this.position * 125 ,
        // ancho desde la posición de x (sw)
        191 / 2.06,
        // alto desde la posición de y (sw)
        125,
        // posición de x en canvas (destino, dx)
        this.x,
        // posición de y en canvas (destino, dy)
        this.y,
        // ancho desde la posición de x en canvas (dw)
        this.width,
        // alto desde la posición de y en canvas (dh)
        this.height
      )
    }
      moveUp() {
        this.y -= 30
        }
      moveDown() {
        this.y += 30
        }
      isTouching(obstacle) {
        return (
          this.x < obstacle.x + obstacle.width &&
          this.x + this.width > obstacle.x &&
          this.y < obstacle.y + obstacle.height &&
          this.y + this.height > obstacle.y
        );
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
      
    }
    draw() {
      this.x-=7
      ctx.drawImage(this.img, this.x, this.y, this.width, this.height)
    }
    isTouching(eat) {
        return (
          this.x < eat.x + eat.width &&
          this.x + this.width > eat.x &&
          this.y < eat.y + eat.height &&
          this.y + this.height > eat.y
        );
      }
  }

  class  Odie{
    constructor(y) {
      this.x = canvas.width
      this.y = y;
      this.width = 90
      this.height = 90
      this.img = new Image()
      this.img.src = images.oddie
      
    }
    draw() {
      this.x-=8
      ctx.drawImage(this.img, this.x, this.y, this.width, this.height)
    }
  }




  //instancias
const board = new Board();
const garfield = new Garfield();
const lasagna =  new Lasagna();
const odie =  new Odie();

//funciones

function clearCanvas() {
    ctx.clearRect(0, 0, canvas.width, canvas.height)
  }
  
  function generatelasagna() {
    if (frames % 70 === 0) {
      const randomPosition = Math.floor(Math.random() *( canvas.height - 400) ) + 350 
      const lasa = new Lasagna(randomPosition)
      eat.push(lasa)
    }
  }
    function drawlasañas() {
      eat.forEach(lasaña => lasaña.draw())
      
  }

  function generateodie() {
    if (frames % 100 === 0) {
      const randomPosition = Math.floor(Math.random() *( canvas.height - 400) ) + 350 
      const odi = new Odie(randomPosition)
      obstacles.push(odi)
    }
  }

  function drawodie(){
    obstacles.forEach(odies => odies.draw())
}

function checkCollition() {
    obstacles.forEach((odi) => {
      if (garfield.isTouching(odi)) {
        gameOver();
      }
     
    });
  }

  function gameOver() {
    ctx.font = '50px Courier';
    ctx.fillText('GAME OVER', canvas.width / 2, canvas.height / 2);

    clearInterval(interval);
  } 


  function checkCollitionLasagna(){
      eat.forEach((lasagna, i) => {
          if (lasagna.isTouching(garfield)){
                  eat.splice(i,1)
                  counter++
                  puntos();
                  
                }
      });
  }

  function puntos (){
      if (counter === 3) {
          clearInterval(interval)
          ctx.font = '50px Courier';
          ctx.fillText('WINNER', canvas.width / 2, canvas.height / 2);
      }
  }



 //loop de animacion
   

  function garfieldAnimation() {
    if (frames % 15 === 0) {
      if (garfield.animate === 1) {
        garfield.animate = 0
      } else {
        garfield.animate++
      }
    }
  }

  function startGame () {
    interval = setInterval(update, 1000 / 60);
  }

  window.onload = function() {
      startGame();
      
  }

  function update() {
    frames ++
    clearInterval();
    board.draw(); 
    garfieldAnimation();
    garfield.draw();
    generatelasagna();
    drawlasañas();
    generateodie();
    drawodie();
    garfield.draw();
    checkCollition();
    checkCollitionLasagna();
   
    frames2++
    clearPlayer();
    board2.draw(); 
    nermal.draw()
   // generatelasagna2();
    // drawlasañas2();
     generateodie2();
     drawodie2();
     checkCollition2();
    // checkCollitionLasagna2();
  }

  //listeners
  
  document.onkeydown = e => {
   
    switch (e.keyCode) {     
      case 38:
        e.preventDefault()
        garfield.moveUp()
        return
       case 40:
        e.preventDefault()
        garfield.moveDown()
        return
       case 87:
         nermal.moveUp2()
         return
       case 90:
         nermal.moveDown2()
         return
    }
  }
 
 


  
  
  
 




