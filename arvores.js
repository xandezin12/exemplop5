// This sketch explores the use of recursion in generative art
// It was built to accompany a short tutorial article found at
// https://medium.com/@pasquini/lets-build-a-recursive-tree-with-p5js-8d6d2017e0cb
// Program licensed under CC BY-SA 3.0

let maxLevel = 7; // number of levels of recursion. more than 10 will throw
                  // an error because the palette is not large enough

let split = 4;    // number of divisions at the end of each branch

let level = 0;    // global variable to track what is being drawn

// color palettes can be used to set the color of different levels
let palette = ["#602020", "#803030", "#C06030", "#F09060", "#60C060", "#60F060", "#60B060", "#60E060", "#60C060", "#60D060"];

function setup() {
  createCanvas(600, 400);
}

function draw() {
  background("#D0E0F0");

  fill("#40F040");
  noStroke();
  rect(0, 300, width, height);

  translate(300, 350); // starts the trunk in the right location
  rotate(PI);          // points the tree to the sky!

  drawBranch();

  noLoop(); // keeps the computer cool. repeated drawing of the same
            // tree doesn't have much value unless it is animated
}

function drawBranch() {
  let angle = 1*random(0.8,1.2);                    // the split angle with some randomness
  let len = 120/ (1.3 * level + 1)*random(0.6,1.4); // branch length with randomness
  let thick = 12 / (2 * level + 1);                 // the thickness of the branch

  stroke(palette[level]);
  strokeWeight(thick);

  push(); // PUSH to a new drawing state. 
  if (level != 0) rotate(-0.5 * (split - 1) * angle); // see comment below
  
  line(0, 0, 0, len);                                 // the only actual "drawing" code

  translate(0, len);                                  // move to the end of the branch 

  if (level < maxLevel - 1) {                         // quit when we reach base state

    level++;                            // increase the level 
    for (let i = 0; i < split; i++) {   // draw more branches! 
      drawBranch();
      rotate(angle);
    }
    level--;                                          // once all sub-branches are done
                                                      // return to the lower level to finish
  }
  pop(); // POP back to the previous drawing state. 
}

function mousePressed() {
  loop(); // once randomness is added, this will re-build the tree
          // each time the mouse is pressed. 
}
