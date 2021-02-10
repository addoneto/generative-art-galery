const inc = 0.002, // < inc = < frequency
    invAmplitude = 1,
    waveCount = 100;

function setup() {
    createCanvas(windowWidth + 1, windowHeight + 1);
    noiseDetail(2); noFill();

    background(0); stroke(100);
    stroke('rgba(255,255,255,0.4)');

    let yoff = 0;

    for(let i = 0; i < waveCount; i++){
        let xoff = 0;

        beginShape();
        for (let x = 0; x < width; x++) {
            let y = noise(xoff, yoff) * (height / invAmplitude);
            vertex(x, y - (yoff * 20) + 200);
            xoff += inc;
        }
        endShape();

        yoff += 0.1;
    }
}