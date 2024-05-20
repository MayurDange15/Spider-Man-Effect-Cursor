let banner = document.querySelector('.banner');
let canvas = document.getElementById('dotsCanvas');

canvas.width = canvas.offsetWidth;
canvas.height = canvas.offsetHeight;
let ctx = canvas.getContext("2d");

let dots = [];
let arraycolors = ['#24A19C', '#6EBFB5', '#FFC7C7', '#FF5F40', '#FF8F8F', '#EEF296', '#9ADE7B', '#508D69']
for (let index = 0; index < 150; index++){
    dots.push({
        x: Math.floor(Math.random() * canvas.width),
        y: Math.floor(Math.random() * canvas.height),
        size: Math.random() * 3 + 4,
        color:arraycolors[Math.floor(Math.random() * 8)]
    });
}
const drawDots = () => {
    dots.forEach(dot => {
        ctx.fillStyle = dot.color;
        ctx.beginPath();
        // ctx.arc(dot.x, dot.y, dot.size, 0, Math.PI*2);
        ctx.moveTo(dot.x, dot.y - dot.size / 2); // Move to the top point of the star
        for (let i = 0; i < 5; i++) {
            ctx.lineTo(
                Math.cos((18 + i * 72) / 180 * Math.PI) * dot.size + dot.x,
                -Math.sin((18 + i * 72) / 180 * Math.PI) * dot.size + dot.y
            );
            ctx.lineTo(
                Math.cos((54 + i * 72) / 180 * Math.PI) * dot.size / 2 + dot.x,
                -Math.sin((54 + i * 72) / 180 * Math.PI) * dot.size / 2 + dot.y
            );
        }
        ctx.closePath();
        ctx.fill();

    })
}
drawDots();
banner.addEventListener("mousemove", (event) => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawDots();
    let mouse = {
        x: event.pageX - banner.getBoundingClientRect().left,
        y: event.pageY - banner.getBoundingClientRect().top
    }
    dots.forEach(dot => {
        let distance = Math.sqrt((mouse.x - dot.x) ** 2 + (mouse.y - dot.y) ** 2);
        if(distance < 200) {
            ctx.strokeStyle = dot.color;
            ctx.lineWidth = 1/2;
            ctx.beginPath();
            ctx.moveTo(dot.x, dot.y);
            ctx.lineTo(mouse.x, mouse.y);
            ctx.stroke();
        }
    })
})
banner.addEventListener("mouseout", (event) => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawDots();
})