// Функция отрисовки изображения
function drawImage(img) {
    let message = "Это не изображение";
    let grayScale = false;

    if (img.length === undefined || img[0].length === undefined) {
        alert(message);
        throw message;
    } else if (img[0][0].length === undefined) {
        grayScale = true;
    }

    let imgHeight = img.length;
    let imgWidth = img[0].length;

    let body = document.querySelector('body');
    let canvas = document.createElement('canvas');
    canvas.height = imgHeight * 4;
    canvas.width = imgWidth * 4;
    document.body.append(canvas);

    let ctx = canvas.getContext('2d');

    for (let i = 0; i < imgHeight; i++) {
        for (let j = 0; j < imgWidth; j++) {
            if (grayScale) {
                ctx.fillStyle = `rgb(${img[i][j]}, ${img[i][j]}, ${img[i][j]})`;
                ctx.fillRect(j * 4, i * 4, 4, 4);
            } else {
                ctx.fillStyle = `rgb(${img[i][j][0]}, ${img[i][j][1]}, ${img[i][j][2]})`;
                ctx.fillRect(j * 4, i * 4, 4, 4);
            }
        }
    }
}