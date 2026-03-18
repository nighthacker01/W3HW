const canvas = document.getElementById('rippleCanvas');
const ctx = canvas.getContext('2d');

let ripples = [];

// 調整畫布大小
function resize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}

window.addEventListener('resize', resize);
resize();

class Ripple {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.r = 0; // 半徑
        this.opacity = 1;
        this.velocity = 2; // 擴散速度
    }

    draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(0, 122, 255, ${this.opacity})`; // 使用藍色調
        ctx.lineWidth = 2;
        ctx.stroke();
        ctx.closePath();
    }

    update() {
        this.r += this.velocity;
        this.opacity -= 0.02; // 逐漸消失
    }
}

function animate() {
    // 每一幀稍微清除畫面，創造殘影或保持乾淨
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    ripples.forEach((ripple, index) => {
        ripple.update();
        ripple.draw();

        // 刪除透明度為 0 的漣漪
        if (ripple.opacity <= 0) {
            ripples.splice(index, 1);
        }
    });

    requestAnimationFrame(animate);
}

// 點擊事件觸發
window.addEventListener('mousedown', (e) => {
    ripples.push(new Ripple(e.clientX, e.clientY));
});

animate();