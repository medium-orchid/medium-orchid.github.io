const chars = "▁▂▃▅▆▇▆▅▃▂";

function getChar(i) {
    return chars[i];
}

function mod(x, y) {
    return ((x % y) + y) % y;
}

function randomInt(max) {
    return Math.floor(Math.random() * max);
}

function read(data) {
    return Number(document.getElementById("container").dataset[data]);
}

function zeros(length) {
    const arr = new Array(length);
    for (let i = 0; i < length; i++) arr[i] = 0;
    return arr;
}

function zeros2d(x, y) {
    const arr = new Array(x);
    for (let i = 0; i < x; i++) arr[i] = zeros(y)
    return arr;
}

function frame() {
    document.getElementById("begin").hidden = true;

    const dx = [1, 0, -1, 0];
    const dy = [0, 1, 0, -1];

    const charCount = chars.length;

    const width = read("width");
    const height = read("height");

    const actors = read("actors");
    const actorsPerFrame = read("frame");

    const state = zeros2d(height, width); //y x order, so that inner array is a line
    const antsX = new Array(actors);
    const antsY = new Array(actors);
    const antsD = new Array(actors);

    for (let i = 0; i < actors; i++) {
        antsX[i] = randomInt(width);
        antsY[i] = randomInt(height);
        antsD[i] = randomInt(4);
    }

    let idx = 0;

    const p = new Array(height)
    for (let i = 0; i < height; i++) {
        p[i] = document.getElementById("p" + i)
    }

    return function() {
        for (let i = 0; i < actorsPerFrame; i++) {
            const x = antsX[idx];
            const y = antsY[idx];
            const s = state[y][x];
            const offset = 2 * (s % 2) - 1;
            const d = mod(antsD[idx] + offset, 4);
            antsX[idx] = mod(x + dx[d], width);
            antsY[idx] = mod(y + dy[d], height);
            state[y][x] = (s + 1) % charCount;
            antsD[idx] = d;
            idx = (idx + 1) % actors;
        }
        for (let y = 0; y < height; y++) {
            p[y].innerHTML = state[y].map(getChar).join("");
        }
    }
}