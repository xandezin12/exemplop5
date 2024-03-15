
// It was built to accompany a short tutorial article found at
// https://medium.com/@pasquini/lets-build-a-recursive-tree-with-p5js-8d6d2017e0cb
// Program licensed under CC BY-SA 3.0

let maxLevel = 6; // number of levels of recursion. more than 10 will throw
                  // an error because the palette is not large enough

let split = 4;    // number of divisions at the end of each branch

let level = 0;    // global variable to track what is being drawn

let seedValue = 10;
let sway =0;

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
  
  randomSeed(seedValue);
  
  sway = 10*cos(0.02*frameCount)*sin(0.1*frameCount);

  translate(300, 350); // starts the trunk in the right location
  rotate(PI+random(-0.1,0.1)+0.02*sway);          // points the tree to the sky!

  drawBranch();
 }

function drawBranch() {
  let angle = .9*random(0.8,1.2);                    // the split angle with some randomness
  let len = 140/ (2 * level + 1)*random(0.7,1.5); // branch length with randomness
  let thick = 12 / (2 * level + 1);                 // the thickness of the branch

  push(); // PUSH to a new drawing state. 
  if (level != 0) rotate(-0.5 * (split - 1) * angle); // see comment below
  
  if (level==0){         // trunk
    noFill();
    stroke(palette[level]);
    strokeWeight(1.5*thick);
    curveTightness(.6);
    for(let ii = 0; ii<5; ii++)
    curve(random(-2*len,2*len), 0, random(-15,15), 0, 0, len, len, 2*len);
    
  } else if(level<4){                // limbs, branches, twigs
    noFill();
    stroke(palette[level]);
    strokeWeight(thick);
    curveTightness(.3);
    curve(random(-len,len), -random(len), 0, 0, 0, len, len, 2*len);
    
  } else {                           // leaves
    fill(palette[level]);
    stroke(palette[level-1]);
    strokeWeight(0.5);
    curveTightness(.05);
    curve(-len, -len, 0, 0, 0, len, -len, 2*len);
  }
  translate(0, len);                                  // move to the end of the branch 

  if (level < maxLevel - 1) {                         // quit when we reach base state

    level++;                            // increase the level 
    for (let i = 0; i < split; i++) {   // draw more branches! 
      drawBranch();
      rotate(angle+0.02*level*sway*i);
    }
    level--;                                          // once all sub-branches are done
                                                      // return to the lower level to finish
  }
  pop(); // POP back to the previous drawing state. 
}

function mousePressed() {
  seedValue = int(random(10000));
  console.log("Current Seed value: "+seedValue);
}


/*****  if(level!=0) rotate(-0.5*(split-1)*angle); 

This line of code runs for each branch that is drawn except for the first branch
which is the trunk. It creates a symetrical splitting of the branches 
*/