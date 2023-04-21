'use strict'
function draw() {
    const canvas = document.getElementById('canvas');
    const ctx = canvas.getContext("2d");

    canvas.height = 480;
    canvas.width = 640;

    ctx.strokeStyle = '#B70A02'; // меняем цвет рамки
			ctx.strokeRect(15, 15, 266, 266);
			ctx.strokeRect(18, 18, 260, 260);
			ctx.fillStyle = '#AF5200'; // меняем цвет клеток
			ctx.fillRect(20, 20, 256, 256);
			for (i = 0; i < 8; i += 2)
				for (j = 0; j < 8; j += 2) {
					ctx.clearRect(20 + i * 32, 20 + j * 32, 32, 32);
					ctx.clearRect(20 + (i + 1) * 32, 20 + (j + 1) * 32, 32, 32);
				}
            }