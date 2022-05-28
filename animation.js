let c = document.getElementById("mycanvas");
let ctx = c.getContext("2d");
let intervalId = setInterval(draw, 10);
let multi = -2; //multiplier, increases
let speed = .002;
const full = 2 * Math.PI;
const steps = 500; // the number of lines
const angleIncr = full / steps; // the angle apart for the start of each line
const center = c.width / 2; // we are using the entire canvas for our circle. The center of the canvas is also the radius

speedSlider.addEventListener("input", (e) =>{
  let s = parseFloat(e.target.value);
  let neg = s < 0
  s = Math.pow(s, 2) * 0.0001;
  if(neg) s *= -1
  speed = s;
});

multSlider.addEventListener("input", (e) =>
  multi = parseFloat(document.getElementById("multSlider").value)
);


ctx.lineWidth = 1;
ctx.lineCap = "round";


function draw(){
  console.log(speed + ", " + multi)
  // paint the canvas black
  ctx.clearRect(0,0, c.width, c.height);

  // for each of the evenly spaced points around the circle
  for(let i = 0; i < steps; i+=1){
    ctx.beginPath();

    // move to the x and y coordinates of the starting point
    let angle = i * angleIncr;
    let x = center + center*Math.cos(angle);
    let y = center + center*Math.sin(angle);
    ctx.moveTo(x, y);

    // calculate the x and y coordinates of the end point
    angle = (f(i) % steps) * angleIncr;
    x = center + center*Math.cos(angle);
    y = center + center*Math.sin(angle);

    // set hue based on how far in the process we are. It starts at 0 and ends at (steps-1) / steps (close to 1 for sufficiently high values of steps)
    // also offset the hue based on multi so it rotates over time
    let h =  ((i / steps) + (multi * .1)) % 1;
    ctx.strokeStyle = 'hsl(' + h + 'turn, 100%, 50%)';

    // draw a line from the starting point we set, to the end point we calculated
    ctx.lineTo(x,y);
    ctx.stroke();
    ctx.closePath();
  }

  // increment the multi so the next frame will progress slightly
  multi += speed;
  while(multi > steps) multi -= steps
  document.getElementById("multSlider").value = multi
}

function f(i){
  return i * multi;
}

function remap(num, oldMin, oldMax, newMin, newMax){
  return Math.min(newMax, Math.max(newMin, (num-oldMin) * (newMax-newMin) / (oldMax -oldMin) + newMin));
}
