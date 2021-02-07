const inc = 0.015, scl = 10, pMaxSpeed = 4; 
let cols, rows, zoff = 0, particles = [], flowField;

function setup(){
    createCanvas(800, 800);
    cols = floor(width / scl);
    rows = floor(height / scl);

    flowField = new Array(cols * rows);

    for(let i = 0; i < 5000; i++){
        particles.push(new Particle());
    }

    background(color('#161314')); 
}

function draw() {
    // background(color('#161314'), 0.01); 

    let yoff = 0;
    for(let y = 0; y < rows; y++){

        let xoff = 0;
        for(let x = 0; x < cols; x++){
            let i = x + y * cols;
            let a = noise(xoff, yoff, zoff) * TWO_PI * 4;
            let v = p5.Vector.fromAngle(a);
            v.setMag(0.4);

            flowField[i] = v;

            xoff += inc;

            // strokeWeight(1);
            // stroke(0);
            // push();
            // translate(x * scl, y * scl);
            // rotate(v.heading());
            // line(0, 0, scl, 0);
            // pop();
        }
        yoff += inc;
    }

    zoff += 0.002;

    for(particle of particles){
        particle.follow(flowField);
        particle.update();
        particle.edges();
        particle.show();
    }
}

class Particle {
    constructor(){
        this.pos = createVector(random(width),random(height));
        this.vel = createVector(0,0);
        this.acc = createVector(0,0);

        let r = 255 - random(200);
        let g = 255 - random(200);
        let b = 255 - random(20);

        this.color = color(r, g, b, 10);
        // this.color = color(144, 106, 84, 10);

        this.prevPos = this.pos;
    }   

    follow(field){
        let x = floor(this.pos.x / scl);
        let y = floor(this.pos.y / scl);
        let i = x + y * cols;
        let force = field[i];

        this.acc.add(force);
    }
    
    update() {
        this.vel.add(this.acc);
        this.vel.limit(pMaxSpeed);
        this.pos.add(this.vel);

        this.acc.set(0, 0);
    }

    show() {
        strokeWeight(3);
        stroke(this.color);
        // point(this.pos.x, this.pos.y);
        line(this.pos.x, this.pos.y, this.prevPos.x, this.prevPos.y);
        this.updatePrev();
    }

    updatePrev() {
        this.prevPos.x = this.pos.x;
        this.prevPos.y = this.pos.y;
    }

    edges() {
        if(this.pos.x > width){
            this.pos.x = 0; this.updatePrev();
        } else if(this.pos.x < 0){
            this.pos.x = width; this.updatePrev();
        } 

        if(this.pos.y > height){
            this.pos.y = 0; this.updatePrev();
        }else if(this.pos.y < 0) {
            this.pos.y = height; this.updatePrev();
        }
    }
}