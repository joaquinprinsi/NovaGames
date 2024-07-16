const Direction = {
    UP: 'UP',
    DOWN: 'DOWN',
    LEFT: 'LEFT',
    RIGHT: 'RIGHT'
};

const oppositeDir = (dir) => {
    switch (dir) {
        case Direction.UP:
            return Direction.DOWN;
        case Direction.DOWN:
            return Direction.UP;
        case Direction.LEFT:
            return Direction.RIGHT;
        case Direction.RIGHT:
            return Direction.LEFT;
        default:
            throw new Error(`Unknown direction: ${dir}`);
    }
};

module.exports = { Direction, oppositeDir };
