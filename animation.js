let c = document.getElementById("mycanvas");
let ctx = c.getContext("2d");
let intervalId = setInterval(draw, 10);
let multi = 0; //multiplier, increases
const full = 2*Math.PI;
const steps = 100;
const angleIncr = full/steps;
const center = c.width/2;

ctx.strokeStyle = 'white';
ctx.lineWidth = 1;
ctx.lineCap = "round";


function draw(){
  ctx.clearRect(0,0, c.width, c.height);
  ctx.lineWidth = 1;
  for(let i = 0; i < steps; i+=1){
    ctx.beginPath();
    let angle = i * angleIncr;
    let x = center + center*Math.cos(angle);
    let y = center + center*Math.sin(angle);
    ctx.moveTo(x, y);
    angle = (f(i) * angleIncr) % steps;
    x = center + center*Math.cos(angle);
    y = center + center*Math.sin(angle);
    ctx.lineTo(x,y);
    ctx.stroke();
    ctx.closePath();
  }
  multi+= .006;
}

function f(i){
  return i * multi;
}

function remap(num, oldMin, oldMax, newMin, newMax){
  return Math.min(newMax, Math.max(newMin, (num-oldMin) * (newMax-newMin) / (oldMax -oldMin) + newMin))
}