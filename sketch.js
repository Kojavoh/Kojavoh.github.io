canvasWidth = 400;
canvasHeight = 400;

ball_Diameter = 20;

ball_x = 200;
ball_y = 200;

leftBound = ball_Diameter/2;
rightBound = canvasWidth - ball_Diameter/2;
upperBound = ball_Diameter/2;
lowerBound = canvasHeight - ball_Diameter/2;

ball_dx = 5;
ball_dy = 0;

tetherLength = 100;
tetherWidth = 5;
tetherHoldDiameter = ball_Diameter + 10;
tetherEngaged = false;

function setup() {
    createCanvas(400, 400);
}

function ball() {
  circle(ball_x, ball_y, ball_Diameter);
}

function draw() {
    background(220);
    ball();
    if(tetherEngaged)
        drawTether();
    updateBallPos();
}

function updateBallPos() {
    if(ball_y < 400)
        ball_dy = ball_dy + 0.1;
    if (ball_x <= leftBound) {
        ball_dx = (Math.abs(ball_dx) - (0.1 * Math.abs(ball_dx)));
        console.log("Ball hit left bound, dX = " + ball_dx);
    }
    else if (ball_x >= rightBound) {
        ball_dx = -(Math.abs(ball_dx + 0.1));
        console.log("Ball hit right bound, dX = " + ball_dx);
    }
    ball_x = ball_x + ball_dx;
    if (ball_y <= upperBound) {
        ball_dy = (Math.abs(ball_dy) - (0.1 * Math.abs(ball_dy)));
        console.log("Ball hit upper bound, dY = " + ball_dy);
    }
    else if (ball_y >= lowerBound) {
        ball_dy = -(Math.abs(ball_dy) - (0.1 * Math.abs(ball_dy)));
        console.log("Ball hit lower bound, dY = " + ball_dy);
        //ball_dy = -ball_dy;
        //ball_dy = ball_dy + 0.1;
    }
    ball_y = ball_y + ball_dy;
    //if(ball_y > 400)
        //ball_dy = ball_dy - 0.1;
    //ball_x = ball_x + ball_dx;
    //ball_y = ball_y + ball_dy;
}

function drawTether() {
    circle(mouseX, mouseY, tetherWidth);
    tetherX = Math.min((ball_x - mouseX), tetherLength * (Math.cos(angle(mouseX, mouseY, ball_x, ball_y)))) + mouseX;
    tetherY = Math.min((ball_y - mouseY), tetherLength * (Math.sin(angle(mouseX, mouseY, ball_x, ball_y)))) + mouseY;
    line(mouseX, mouseY, tetherX, tetherY);

}

function mousePressed() {
    tetherEngaged = true;
}

function mouseReleased() {
    tetherEngaged = false;
}

// This function was sourced from a user named akinuri on
// Stackoverflow
function angle(cx, cy, ex, ey) {
    var dy = ey - cy;
    var dx = ex - cx;
    var theta = Math.atan2(dy, dx); // range (-PI, PI]
    theta *= 180 / Math.PI; // rads to degs, range (-180, 180]
    //if (theta < 0) theta = 360 + theta; // range [0, 360)
    return theta;
  }