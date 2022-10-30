// (function () {
//     'use strict';
//     window.addEventListener('load', function () {
//       var canvas = document.getElementById('canvas');
  
//       if (!canvas || !canvas.getContext) {
//         return false;
//       }
  
//       /********************
//         Random Number
//       ********************/
  
//       function rand(min, max) {
//         return Math.floor(Math.random() * (max - min + 1) + min);
//       }
  
//       /********************
//         Var
//       ********************/
  
//       var ctx = canvas.getContext('2d');
//       var X = canvas.width = window.innerWidth;
//       var Y = canvas.height = window.innerHeight;
//       var mouseX = null;
//       var mouseY = null;
//       var dist = 80;
//       var lessThan = Math.sqrt(dist * dist + dist * dist);
//       var mouseDist = 150;
//       var shapeNum;
//       var shapes = [];
//       var ease = 0.3;
//       var friction = 0.9;
//       var lineWidth = 5;
//       X > Y ? shapeNum = X / dist : shapeNum = Y / dist;
  
//       if (X < 768) {
//         lineWidth = 2;
//         dist = 40;
//         lessThan = Math.sqrt(dist * dist + dist * dist);
//         mouseDist = 50;
//         X > Y ? shapeNum = X / dist : shapeNum = Y / dist;
//       }
  
//       /********************
//         Animation
//       ********************/
  
//       window.requestAnimationFrame =
//         window.requestAnimationFrame ||
//         window.mozRequestAnimationFrame ||
//         window.webkitRequestAnimationFrame ||
//         window.msRequestAnimationFrame ||
//         function(cb) {
//           setTimeout(cb, 17);
//         };
  
//       /********************
//         Shape
//       ********************/
      
//       function Shape(ctx, x, y, i) {
//         this.ctx = ctx;
//         this.init(x, y, i);
//       }
      
//       Shape.prototype.init = function(x, y, i) {
//         this.x = x;
//         this.y = y;
//         this.xi = x;
//         this.yi = y;
//         this.i = i;
//         this.r = 1;
//         this.v = {
//           x: 0,
//           y: 0
//         };
//         this.c = rand(0, 360);
//       };
  
//       Shape.prototype.draw = function() {
//         var ctx  = this.ctx;
//         ctx.save();
//         ctx.fillStyle = 'hsl(' + this.c + ', ' + '80%, 60%)';
//         ctx.beginPath();
//         ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2, false);
//         ctx.fill();
//         ctx.restore();
//       };
  
//       Shape.prototype.mouseDist = function() {
//         var x = mouseX - this.x;
//         var y = mouseY - this.y;
//         var d = x * x + y * y;
//         var dist = Math.sqrt(d);
//         if (dist < mouseDist) {
//           this.v.x = +this.v.x;
//           this.v.y = +this.v.y;
//           var colAngle = Math.atan2(mouseY - this.y, mouseX - this.x);
//           this.v.x = -Math.cos(colAngle) * 5;
//           this.v.y = -Math.sin(colAngle) * 5;
//           this.x += this.v.x;
//           this.y += this.v.y;
//         } else if (dist > mouseDist && dist < mouseDist + 10) {
//           this.v.x = 0;
//           this.v.y = 0;
//         } else {
//           this.v.x += (this.xi - this.x) * ease;
//           this.v.y += (this.yi - this.y) * ease;
//           this.v.x *= friction;
//           this.v.y *= friction;
//           this.x += this.v.x;
//           this.y += this.v.y;
//         }
//       };
  
//       Shape.prototype.drawLine = function(i) {
//         var j = i;
//         for (var i = 0; i < shapes.length; i++) {
//           if (j !== i) {
//             var x = this.x - shapes[i].x;
//             var y = this.y - shapes[i].y;
//             var d = x * x + y * y;
//             var dist = Math.floor(Math.sqrt(d));
//             if (dist <= lessThan) {
//               ctx.save();
//               ctx.lineWidth = lineWidth;
//               ctx.strokeStyle = 'hsl(' + this.c + ', ' + '80%, 60%)';
//               ctx.beginPath();
//               ctx.moveTo(this.x, this.y);
//               ctx.lineTo(shapes[i].x, shapes[i].y);
//               ctx.stroke();
//               ctx.restore();
//             }
//           }
//         }
//       };
  
//       Shape.prototype.render = function(i) {
//         this.drawLine(i);
//         if (mouseX !== null) this.mouseDist();
//         this.draw();
//       };
      
//       for (var i = 0; i < shapeNum + 1; i++) {
//         for (var j = 0; j < shapeNum + 1; j++) {
//           if (j * dist - dist > Y) break;
//           var s = new Shape(ctx, i * dist, j * dist, i, j);
//           shapes.push(s);
//         }
//       }
     
//       /********************
//         Render
//       ********************/
      
//       function render() {
//         ctx.clearRect(0, 0, X, Y);
//         for (var i = 0; i < shapes.length; i++) {
//           shapes[i].render(i);
//         }
//         requestAnimationFrame(render);
//       }
  
//       render();
  
//       /********************
//         Event
//       ********************/
      
//       function onResize() {
//         X = canvas.width = window.innerWidth;
//         Y = canvas.height = window.innerHeight;
//         shapes = [];
//         if (X < 768) {
//           lineWidth = 2;
//           dist = 40;
//           lessThan = Math.sqrt(dist * dist + dist * dist);
//           mouseDist = 50;
//           X > Y ? shapeNum = X / dist : shapeNum = Y / dist;
//         } else {
//           lineWidth = 5;
//           dist = 80;
//           lessThan = Math.sqrt(dist * dist + dist * dist);
//           mouseDist = 150;
//           X > Y ? shapeNum = X / dist : shapeNum = Y / dist;
//         }
//         for (var i = 0; i < shapeNum + 1; i++) {
//           for (var j = 0; j < shapeNum + 1; j++) {
//             if (j * dist - dist > Y) break;
//             var s = new Shape(ctx, i * dist, j * dist, i, j);
//             shapes.push(s);
//           }
//         }
//       }
  
//       window.addEventListener('resize', function() {
//         onResize();
//       });
  
//       window.addEventListener('mousemove', function(e) {
//         mouseX = e.clientX;
//         mouseY = e.clientY;
//       }, false);
  
//       canvas.addEventListener('touchmove', function(e) {
//         var touch = e.targetTouches[0];
//         mouseX = touch.pageX;
//         mouseY = touch.pageY;
//       });
  
//     });
//     // Author
//     console.log('File Name / net.js\nCreated Date / July 11, 2020\nAuthor / Toshiya Marukubo\nTwitter / https://twitter.com/toshiyamarukubo');
//   })();

const STAR_COLOR = '#c91660';
const STAR_SIZE = 3;
const STAR_MIN_SCALE = 0.2;
const OVERFLOW_THRESHOLD = 50;
const STAR_COUNT = ( window.innerWidth + window.innerHeight ) / 8;

const canvas = document.querySelector( 'canvas' ),
      context = canvas.getContext( '2d' );

let scale = 1, // device pixel ratio
    width,
    height;

let stars = [];

let pointerX,
    pointerY;

let velocity = { x: 0.01, y: 0.1, tx: 0.01, ty: 0, z: 0.01 };

let touchInput = false;

generate();
resize();
step();

window.onresize = resize;
canvas.onmousemove = onMouseMove;
canvas.ontouchmove = onTouchMove;
canvas.ontouchend = onMouseLeave;
document.onmouseleave = onMouseLeave;

function generate() {

   for( let i = 0; i < STAR_COUNT; i++ ) {
    stars.push({
      x: 0,
      y: 0,
      z: STAR_MIN_SCALE + Math.random() * ( 1 - STAR_MIN_SCALE )
    });
   }

}

function placeStar( star ) {

  star.x = Math.random() * width;
  star.y = Math.random() * height;

}

function recycleStar( star ) {

  let direction = 'z';

  let vx = Math.abs( velocity.x ),
	    vy = Math.abs( velocity.y );

  if( vx > 1 || vy > 1 ) {
    let axis;

    if( vx > vy ) {
      axis = Math.random() < vx / ( vx + vy ) ? 'h' : 'v';
    }
    else {
      axis = Math.random() < vy / ( vx + vy ) ? 'v' : 'h';
    }

    if( axis === 'h' ) {
      direction = velocity.x > 0 ? 'l' : 'r';
    }
    else {
      direction = velocity.y > 0 ? 't' : 'b';
    }
  }
  
  star.z = STAR_MIN_SCALE + Math.random() * ( 1 - STAR_MIN_SCALE );

  if( direction === 'z' ) {
    star.z = 0.1;
    star.x = Math.random() * width;
    star.y = Math.random() * height;
  }
  else if( direction === 'l' ) {
    star.x = -OVERFLOW_THRESHOLD;
    star.y = height * Math.random();
  }
  else if( direction === 'r' ) {
    star.x = width + OVERFLOW_THRESHOLD;
    star.y = height * Math.random();
  }
  else if( direction === 't' ) {
    star.x = width * Math.random();
    star.y = -OVERFLOW_THRESHOLD;
  }
  else if( direction === 'b' ) {
    star.x = width * Math.random();
    star.y = height + OVERFLOW_THRESHOLD;
  }

}

function resize() {

  scale = window.devicePixelRatio || 1;

  width = window.innerWidth * scale;
  height = window.innerHeight * scale;

  canvas.width = width;
  canvas.height = height;

  stars.forEach( placeStar );

}

function step() {

  context.clearRect( 0, 0, width, height );

  update();
  render();

  requestAnimationFrame( step );

}

function update() {

  velocity.tx *= 0.96;
  velocity.ty *= 0.96;

  velocity.x += ( velocity.tx - velocity.x ) * 0.8;
  velocity.y += ( velocity.ty - velocity.y ) * 0.8;

  stars.forEach( ( star ) => {

    star.x += velocity.x * star.z;
    star.y += velocity.y * star.z;

    star.x += ( star.x - width/2 ) * velocity.z * star.z;
    star.y += ( star.y - height/2 ) * velocity.z * star.z;
    star.z += velocity.z;
  
    // recycle when out of bounds
    if( star.x < -OVERFLOW_THRESHOLD || star.x > width + OVERFLOW_THRESHOLD || star.y < -OVERFLOW_THRESHOLD || star.y > height + OVERFLOW_THRESHOLD ) {
      recycleStar( star );
    }

  } );

}

function render() {

  stars.forEach( ( star ) => {

    context.beginPath();
    context.lineCap = 'round';
    context.lineWidth = STAR_SIZE * star.z * scale;
    context.globalAlpha = 0.5 + 0.5*Math.random();
    context.strokeStyle = STAR_COLOR;

    context.beginPath();
    context.moveTo( star.x, star.y );

    var tailX = velocity.x * 2,
        tailY = velocity.y * 2;

    // stroke() wont work on an invisible line
    if( Math.abs( tailX ) < 0.1 ) tailX = 0.5;
    if( Math.abs( tailY ) < 0.1 ) tailY = 0.5;

    context.lineTo( star.x + tailX, star.y + tailY );

    context.stroke();

  } );

}

function movePointer( x, y ) {

  if( typeof pointerX === 'number' && typeof pointerY === 'number' ) {

    let ox = x - pointerX,
        oy = y - pointerY;

    velocity.tx = velocity.tx + ( ox / 8*scale ) * ( touchInput ? 1 : -1 );
    velocity.ty = velocity.ty + ( oy / 8*scale ) * ( touchInput ? 1 : -1 );

  }

  pointerX = x;
  pointerY = y;

}

function onMouseMove( event ) {

  touchInput = false;

  movePointer( event.clientX, event.clientY );

}

function onTouchMove( event ) {

  touchInput = true;

  movePointer( event.touches[0].clientX, event.touches[0].clientY, true );

  event.preventDefault();

}

function onMouseLeave() {

  pointerX = null;
  pointerY = null;

}

