window.addEventListener("load", () => {
    const canvas = document.querySelector("#canvas");
    const ctx = canvas.getContext("2d");
    const colorPicker = document.querySelector("#colorPicker");
    const shapeSelector = document.querySelector("#shapeSelector");
    const lineWidthInput = document.querySelector("#lineWidth");

    canvas.height = 700; 
    canvas.width = 1200; 

    let painting = false;
    let startX, startY;

    function getMousePos(e) {
        const rect = canvas.getBoundingClientRect();
        return {
            x: e.clientX - rect.left,
            y: e.clientY - rect.top
        };
    }

    function startPosition(e) {
        painting = true;
        const pos = getMousePos(e);
        startX = pos.x;
        startY = pos.y;
        if (shapeSelector.value === 'line') {
            draw(e);
        }
    }

    function finishedPosition(e) {
        if (!painting) return;
        painting = false;
        ctx.beginPath();
        const pos = getMousePos(e);
        if (shapeSelector.value !== 'line') {
            drawShape(startX, startY, pos.x, pos.y);
        }
    }

    function draw(e) {
        if (!painting || shapeSelector.value !== 'line') return;

        const pos = getMousePos(e);
        ctx.lineWidth = lineWidthInput.value;
        ctx.lineCap = "round";
        ctx.strokeStyle = colorPicker.value;

        ctx.lineTo(pos.x, pos.y);
        ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(pos.x, pos.y);
    }

    function drawShape(x1, y1, x2, y2) {
        const width = x2 - x1;
        const height = y2 - y1;

        ctx.beginPath();
        ctx.lineWidth = lineWidthInput.value;
        ctx.strokeStyle = colorPicker.value;
        ctx.fillStyle = colorPicker.value;

        if (shapeSelector.value === 'rectangle') {
            ctx.rect(x1, y1, width, height);
            ctx.fill();
        } else if (shapeSelector.value === 'circle') {
            const radius = Math.sqrt(width * width + height * height);
            ctx.arc(x1, y1, radius, 0, Math.PI * 2);
            ctx.fill();
        }

        ctx.stroke();
    }

    canvas.addEventListener('mousedown', startPosition); 
    canvas.addEventListener('mouseup', finishedPosition);
    canvas.addEventListener('mousemove', draw);
});
