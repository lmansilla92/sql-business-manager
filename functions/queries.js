// Declares a class of Shape with the constructor taking in a color parameter
class Select{
    constructor() {
        this.color = color;
    };
};

// Uses extends to declare a Circle class from the Shape class in order to inherit color
class Circle extends Shape{
    renderShape() {
        return `<circle cx="50%" cy="50%" r="100" height="100%" width="100%" fill="${this.color}"></circle>`;
    };
};

// Uses extends to declare a Square class from the Shape class in order to inherit color
class Square extends Shape{
    renderShape() {
        return `<rect x="50" height="200" width="200" fill="${this.color}"/>`;
    };
};

// Uses extends to declare a Triangle class from the Shape class in order to inherit color
class Triangle extends Shape{
    renderShape() {
        return `<polygon height="100%" width="100%" points="0,200 300,200 150,0" fill="${this.color}"/>`;
    };
};

// Exports Circle, Square, Triangle classes.
module.exports = {
    Circle,
    Square,
    Triangle
};