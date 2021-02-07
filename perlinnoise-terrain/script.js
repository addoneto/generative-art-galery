const inc = 0.05, scl = 3;

const colors = {
    ocean: {
        downTreshold: 70,
        color: { r: 0, g: 83, b: 164 },
        nContribnDiv: -1.5, // noise contribution divisor
    },
    beach: {
        downTreshold: 80,
        color: { r: 209, g: 189, b: 111 },
        nContribnDiv: 2,
    },
    grass: {
        downTreshold: 165,
        color: { r: 53, g: 103, b: 22 },
        nContribnDiv: 3.5,
    },
    stone: {
        downTreshold: 210,
        color: { r: 85, g: 85, b: 85 },
        nContribnDiv: 4,
    },
    snow: {
        downTreshold: 255,
        color: { r: 235, g: 235, b: 235 },
        nContribnDiv: 2,
    },
}

function setup() {
    createCanvas(windowWidth, windowHeight);
    noiseDetail(3);
}

function draw() {
    let yoff = 0;
    for (let y = 0; y < floor(height / scl); y++) {
        let xoff = 0;
        for (let x = 0; x < floor(width / scl); x++) {
            let r = noise(xoff, yoff) * 255;

            let finalColor;
            for (let biomeKey in colors) {

                let biome = colors[biomeKey];
                if(r <= biome.downTreshold){
                    let noiseContribution = floor(r / biome.nContribnDiv);
                    let fr = biome.color.r - noiseContribution;
                    let fg = biome.color.g - noiseContribution;
                    let fb = biome.color.b - noiseContribution;
                    finalColor = color(fr, fg, fb);
                    break;
                }
            }

            fill(finalColor); noStroke();
            rect(x * scl, y * scl, scl, scl)

            xoff += inc;
        }
        yoff += inc;
    }

    noLoop();
}