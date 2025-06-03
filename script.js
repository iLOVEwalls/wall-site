const canvas = document.getElementById('background');
const ctx = canvas.getContext('2d');

let width, height;
let points = [];
const POINT_COUNT = 50;

function resize() {
    width = window.innerWidth;
    height = window.innerHeight;
    canvas.width = width;
    canvas.height = height;
}

class Point {
    constructor() {
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        this.vx = (Math.random() - 0.5) * 0.5;
        this.vy = (Math.random() - 0.5) * 0.5;
    }

    move() {
        this.x += this.vx;
        this.y += this.vy;
        if (this.x < 0 || this.x > width) this.vx *= -1;
        if (this.y < 0 || this.y > height) this.vy *= -1;
    }
}

function initPoints() {
    points = [];
    for (let i = 0; i < POINT_COUNT; i++) {
        points.push(new Point());
    }
}

function draw() {
    ctx.clearRect(0, 0, width, height);

    // Draw lines between close points
    for (let i = 0; i < POINT_COUNT; i++) {
        for (let j = i + 1; j < POINT_COUNT; j++) {
            let dx = points[i].x - points[j].x;
            let dy = points[i].y - points[j].y;
            let dist = Math.sqrt(dx * dx + dy * dy);
            if (dist < 150) {
                ctx.strokeStyle = `rgba(0,255,153,${1 - dist / 150})`;
                ctx.lineWidth = 1;
                ctx.beginPath();
                ctx.moveTo(points[i].x, points[i].y);
                ctx.lineTo(points[j].x, points[j].y);
                ctx.stroke();
            }
        }
    }

    // Draw points
    for (const p of points) {
        ctx.fillStyle = '#00ff99';
        ctx.beginPath();
        ctx.arc(p.x, p.y, 3, 0, 2 * Math.PI);
        ctx.fill();
        p.move();
    }

    requestAnimationFrame(draw);
}

window.addEventListener('resize', () => {
    resize();
    initPoints();
});

resize();
initPoints();
draw();
