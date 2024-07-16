const { Direction } = require('./direction');

class Position {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
}

const up = (pos) => ({ x: pos.x, y: pos.y - 1 });
const down = (pos) => ({ x: pos.x, y: pos.y + 1 });
const left = (pos) => ({ x: pos.x - 1, y: pos.y });
const right = (pos) => ({ x: pos.x + 1, y: pos.y });

const move = (pos, dir) => {
    switch (dir) {
        case Direction.UP:
            return up(pos);
        case Direction.DOWN:
            return down(pos);
        case Direction.LEFT:
            return left(pos);
        case Direction.RIGHT:
            return right(pos);
    }
};

const posEqual = (pos1, pos2) => {
    return pos1.x === pos2.x && pos1.y === pos2.y;
};

const isInside = (pos, width, height) => {
    return pos.x >= 0 && pos.y >= 0 && pos.x < width && pos.y < height;
};

module.exports = { Position, up, down, left, right, move, posEqual, isInside };
