/* global createCanvas, createGraphics, rect, text, colorMode, keyCode, HSB, background, stroke, line, width, height, fill, mouseX, mouseY, mouseIsPressed, strokeWeight, noStroke, ellipse, image */

let currentHue, currentSaturation, currentBrightness, brushSize, back, backgroundHue, backgroundSaturation, backgroundBrightness, showInstructions, randomMode, randomBackgroundMode;

function setup() {
  createCanvas(800, 600);
  back = createGraphics(800, 600);
  colorMode(HSB, 360, 100, 100);
  back.colorMode(HSB, 360, 100, 100);
  currentHue = 0;
  currentSaturation = 80;
  currentBrightness = 100;
  
  backgroundHue = 0;
  backgroundBrightness = 100;
  backgroundSaturation = 0;
  
  brushSize = 10;
  showInstructions = true;
  randomBackgroundMode = false;
}

function draw() {
  
  background(backgroundHue, backgroundSaturation, backgroundBrightness);
  if (showInstructions) {
    drawInstructions();
  }
  
  drawCursor();
  
  image(back, 0, 0);
  
  if (mouseIsPressed && mouseY > 10) {
    drawLines();
  }
  
  if (randomMode) {
    colorSpectrum();
  }
  
  if (randomBackgroundMode) {
    backgroundColorSpectrum();
  }
  
  drawColorPalette();
}

function drawCursor() {
  fill(currentHue, currentSaturation, currentBrightness);
  stroke(0, 0, 0);
  ellipse(mouseX, mouseY, brushSize, brushSize);
}

function drawInstructions() {
  noStroke();
  fill(0, 0, 0);
  text("Up/Down Arrows: Brightness", 0, 30);
  text("Left/Right Arrows: Saturation", 0, 50);
  text("Scroll: Cursor Size", 0, 70);
  text("Delete: New Painting",0,90);
  text("Toggle Instructions: H",0,110);
  text("Random Mode: R",0,130);
  text("Random Background Mode: B",0,150);
}

function drawColorPalette() {
  for (var i = 0; i < 360 / 5; i++) {
    back.strokeWeight(10);
    back.fill(i * 5, currentSaturation, currentBrightness);
    back.stroke(i * 5, currentSaturation, currentBrightness);
    back.rect(i * (width / (360 / 5)), 0, width / (360 / 5), 10);
    if (mouseIsPressed && !randomMode) {
      if (mouseX > i * (width / (360 / 5)) && mouseX < i * (width / (360 / 5)) + width / (360 / 5) && mouseY > 0 && mouseY < 10) {
          currentHue = i * 5;
      }
    }
  }
}

function drawLines() {
  back.strokeWeight(brushSize);
  back.stroke(currentHue, currentSaturation, currentBrightness);
  back.fill(currentHue, currentSaturation, currentBrightness);
  back.line(width / 2, height / 2, mouseX, mouseY);
}

function keyPressed() {
  //Backspace / Delete
  if (keyCode == 8 || keyCode == 46) {
    background('none');
    back.background('none');
    back.clear();
  }
  
  //Space Bar
  else if (keyCode == 32) {
    backgroundHue = currentHue;
    backgroundSaturation = currentSaturation;
    backgroundBrightness = currentBrightness;
  }
  
  //Up Arrow
  else if (keyCode == 38) {
    if (currentBrightness < 100) {
      currentBrightness++;
    }
  }
  
  //Down Arrow
  else if (keyCode == 40) {
    if (currentBrightness > 0) {
      currentBrightness--;
    }
  }
  
  //Right Arrow
  else if (keyCode == 39) {
    currentSaturation++;
    if(currentSaturation>100) {
      currentSaturation = 100;
    }
  }
  
  //Left Arrow
  else if (keyCode == 37) {
    currentSaturation--;
    if(currentSaturation <0) {
      currentSaturation = 0;
    }
  }
  
  //H Key
  else if (keyCode == 72) {
    showInstructions = !showInstructions;
  }
  
  //R Key
  else if (keyCode == 82) {
    randomMode = !randomMode;
  }
  
  else if (keyCode == 66) {
    if (!randomBackgroundMode) {
      backgroundSaturation = currentSaturation;
    }
    randomBackgroundMode = !randomBackgroundMode;
  }
}

function mouseWheel(event) {
  //When the mouse wheel is scrolled
  if (brushSize - (event.delta / 100) < 100 || brushSize - (event.delta / 100) > 0) {
    brushSize -= event.delta / 100;
  }
}

function colorSpectrum() {
  currentHue += 1;
  
  currentHue %= 360;  
}

function backgroundColorSpectrum() {
  backgroundHue += 1;
  
  backgroundHue %= 360;  
}
