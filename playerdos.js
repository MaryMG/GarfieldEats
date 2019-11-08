 const images2 = {
    background : 'images/background.jpeg',
    nermall :'images/nermal.png',
    oddie  : 'images/dog.png',
    lasag  : 'images/lasag.png'
  }

// //variables constates 
 const player = document.getElementById('player');
 const ctx2 = player.getContext('2d');
 let interval2;
 let frames2 = 0;
 let eat2 = [];
 let obstacles2 = [];
 let counter2 = 0;


 // clases
 class Board2 {
     constructor (){
      this.x = 0;
      this.y = 0;
      this.width = player.width;
      this.height = player.height;
      this.img = new Image ();
      this.img.src = images2.background;
      this.img.onload = () => {
       this.draw();
     }
     }
  
    draw(){
           this.x --;
          if (this.x < - player.width) this.x = 0;
          ctx2.drawImage(this.img, this.x, this.y, this.width, this.height);
          ctx2.drawImage(this.img, this.x + player.width, this.y, this.width, this.height);
     
     }
  
  }


   class Nermal {
     constructor() {
       this.width = 100
       this.height = 100
       this.y =  player.height - this.height
       this.x = 0
       this.animate = 0
       this.position = 0
       this.img = new Image()
       this.img.src =images2.nermall
       this.img.onload = () => {
         this.draw()
       }
     }

     draw() {
       ctx2.drawImage(this.img, this.x, this.y, this.width, this.height)
// /// restriccion
     if (this.y > player.height - this.height) {
     this.y = player.height - this.height
    } else {
    this.vy++  
   }

       }

       moveUp2() {
        this.y -= 87
        }
        moveDown2() { 
          this.y += 83
          }
          isTouching(obstacle2) {
            return (
              this.x < obstacle2.x + obstacle2.width &&
              this.x + this.width > obstacle2.x &&
              this.y < obstacle2.y + obstacle2.height &&
              this.y + this.height > obstacle2.y
            );
          }

      }
    
    
      
  
   class Lasagna2 {
     constructor(y) {
       this.x = player.width
       this.y = y;
       this.width = 70
       this.height = 70
       this.img = new Image()
       this.img.src = images2.lasag      
     }
     draw() {
       this.x-=7
       ctx2.drawImage(this.img, this.x, this.y, this.width, this.height)
     }
     isTouching(eat2) {
         return (
           this.x < eat2.x + eat2.width &&
           this.x + this.width > eat2.x &&
           this.y < eat2.y + eat2.height &&
           this.y + this.height > eat2.y
         );
       }
   }

   class  Odie2{
     constructor(y) {
       this.x = player.width
       this.y = y;
       this.width = 90
       this.height = 90
       this.img = new Image()
       this.img.src = images2.oddie
      
     }
     draw() {
       this.x-=8
       ctx2.drawImage(this.img, this.x, this.y, this.width, this.height)
     }
   }




//   //instancias
   const board2 = new Board2();
   const nermal = new Nermal();
   const lasagna2 =  new Lasagna2();
   const odie2 =  new Odie2();

// //funciones

 function clearPlayer() {
     ctx2.clearRect(0, 0, player.width, player.height)
   }
  
   function generatelasagna2() {
     if (frames2 % 60 === 0) {
       const randomPosition = Math.floor(Math.random() *( player.height - 400) ) + 350 
       const lasa2 = new Lasagna2(randomPosition)
       eat2.push(lasa2)
     }
   }
     function drawlasañas2() {
       eat2.forEach(lasaña2 => lasaña2.draw())
      
   }

   function generateodie2() {
     if (frames2 % 50 === 0) {
       const randomPosition = Math.floor(Math.random() *( player.height - 400) ) + 350 
       const odi2 = new Odie2(randomPosition)
       obstacles2.push(odi2)
     }
   }

   function drawodie2(){
     obstacles2.forEach(odies2 => odies2.draw())
 }

 function checkCollition2() {
     obstacles2.forEach((odi2) => {
       if (nermal.isTouching(odi2)) {
         gameOver2();
       }
     
     });
   }

   function gameOver2() {
     ctx2.font = '50px Courier';
     ctx2.fillText('GAME OVER', player.width / 2, player.height / 2);

     clearInterval(interval);
   } 


   function checkCollitionLasagna2(){
       eat2.forEach((lasagna2, i) => {
           if (lasagna2.isTouching(nermal)){
                   eat2.splice(i,1)
                   counter2++
                   puntos2();
                  
                 }
       });
   }

   function puntos2 (){
       if (counter2 === 5) {
           clearInterval(interval)
           ctx2.font = '50px Courier';
           ctx2.fillText('WINNER', player.width / 2, player.height / 2);
       }
   }



   

