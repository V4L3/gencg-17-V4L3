class CirclePattern {
    constructor() {

    }

    draw() {
        this.generatePattern();
        for (var gridY = 1; gridY < gridResolutionY - 1; gridY++) {
            for (var gridX = 1; gridX < gridResolutionX - 1; gridX++) {

                let posX = tileSize * gridX + tileSize / 2;
                let posY = tileSize * gridY + tileSize / 2;
                let randomAngle

                if (gridArray[gridX][gridY][0]) {
                    randomAngle = PI;
                    drawArc(posX, posY, randomAngle)
                }

                if (gridArray[gridX][gridY][1]) {
                    randomAngle = 1.5 * PI;
                    drawArc(posX, posY, randomAngle)
                }

                if (gridArray[gridX][gridY][2]) {
                    randomAngle = HALF_PI;
                    drawArc(posX, posY, randomAngle)
                }

                if (gridArray[gridX][gridY][3]) {
                    randomAngle = 0;
                    drawArc(posX, posY, randomAngle)
                }

            }
        }
    }

    drawArc(centerX, centerY, angle) {

        noFill()
        strokeWeight(2)
        arc(centerX, centerY, tileSize, tileSize, 0 + angle, HALF_PI + angle);
        arc(centerX, centerY, tileSize + (tileSize / 10), tileSize + (tileSize / 10), 0 + angle, HALF_PI + angle);
        arc(centerX, centerY, tileSize + 2 * (tileSize / 10), tileSize + 2 * (tileSize / 10), 0 + angle, HALF_PI + angle);
        arc(centerX, centerY, tileSize - (tileSize / 10), tileSize - (tileSize / 10), 0 + angle, HALF_PI + angle);
        arc(centerX, centerY, tileSize - 2 * (tileSize / 10), tileSize - 2 * (tileSize / 10), 0 + angle, HALF_PI + angle);


    }

    initTiles() {
        for (var x = 0; x < gridResolutionX; x++) {
            gridArray[x] = []; // create nested array
            for (var y = 0; y < gridResolutionY; y++) {
                gridArray[x][y] = [false, false, false, false]
            }
        };
        setSeed();
    }

    setSeed() {
        for (var x = 0; x < 2; x++) {
            let seedX = Math.floor(random(0, gridResolutionX))
            let seedY = Math.floor(random(0, gridResolutionY))
            gridArray[seedX][seedY][Math.floor(random(0, 5))] = true
        }
    }

    generatePattern() {
        for (var gridY = 1; gridY < gridResolutionY - 1; gridY++) {
            for (var gridX = 1; gridX < gridResolutionX - 1; gridX++) {

                if (gridArray[gridX][gridY].includes(true, true)) {
                } else {

                    //Right Tile
                    if (gridArray[gridX + 1][gridY][0]) {
                        if (random(0, 1) < 0.5) {
                            gridArray[gridX][gridY][3] = true
                        }
                        else {
                            gridArray[gridX + 1][gridY][2] = true
                        }
                    }
                    else if (gridArray[gridX + 1][gridY][2]) {
                        if (random(0, 1) < 0.5) {
                            gridArray[gridX][gridY][1] = true
                        }
                        else {
                            gridArray[gridX + 1][gridY][0] = true
                        }

                    }

                    //Left Tile
                    if (gridArray[gridX - 1][gridY][1]) {
                        if (random(0, 1) < 0.5) {
                            gridArray[gridX][gridY][2] = true
                        }
                        else {
                            gridArray[gridX - 1][gridY][3] = true
                        }

                    } else if (gridArray[gridX - 1][gridY][3]) {
                        if (random(0, 1) < 0.5) {
                            gridArray[gridX][gridY][0] = true
                        }
                        else {
                            gridArray[gridX - 1][gridY][1] = true
                        }
                    }

                    //Bottom Tile
                    if (gridArray[gridX][gridY + 1][0]) {
                        if (random(0, 1) < 0.5) {
                            gridArray[gridX][gridY][3] = true
                        }
                        else {
                            gridArray[gridX][gridY + 1][1] = true
                        }
                    } else if (gridArray[gridX][gridY + 1][1]) {
                        if (random(0, 1) < 0.5) {
                            gridArray[gridX][gridY][2] = true
                        }
                        else {
                            gridArray[gridX][gridY + 1][0] = true
                        }
                    }

                    //Top Tile
                    if (gridArray[gridX][gridY - 1][2]) {
                        if (random(0, 1) < 0.5) {
                            gridArray[gridX][gridY][1] = true
                        }
                        else {
                            gridArray[gridX][gridY - 1][3] = true
                        }
                    } else if (gridArray[gridX][gridY - 1][3]) {
                        if (random(0, 1) < 0.5) {
                            gridArray[gridX][gridY][0] = true
                        }
                        else {
                            gridArray[gridX][gridY - 1][2] = true
                        }
                    }
                }
            }
        }
    }
}