// DrawTriangle.js (c) 2012 matsuda
function main() {
    // Retrieve <canvas> element
    var canvas = document.getElementById('example');
    if (!canvas) {
        console.log('Failed to retrieve the <canvas> element');
        return false;
    }

    // Get the rendering context for 2DCG
    var ctx = canvas.getContext('2d');
    var v1 = new Vector3([2.25, 2.25, 0]); // X=1, Y=1, Z=0


    // Draw a blue rectangle
    ctx.fillStyle = 'rgba(0, 0, 0, 1.0)'; // Set color to blue
    ctx.fillRect(0, 0, 400, 400);        // Fill a rectangle with the color
    drawVector(v1, "red");
}
function drawVector(v, color)
{
    var canvas = document.getElementById('example');
    var ctx = canvas.getContext('2d');

    // Set drawing properties
    ctx.strokeStyle = color;
    ctx.lineWidth = 2;

    // Start at center (200,200) and draw scaled vector
    ctx.beginPath();
    ctx.moveTo(200, 200);
    ctx.lineTo(200 + v.elements[0]*20, 200 - v.elements[1]*20); // Flip Y-axis
    ctx.stroke();
}

function handleDrawEvent() {
    // Get canvas context
    var canvas = document.getElementById('example');
    var ctx = canvas.getContext('2d');

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Get input values
    var x1 = parseFloat(document.getElementById('xCoord').value);
    var y1 = parseFloat(document.getElementById('yCoord').value);
    var x2 = parseFloat(document.getElementById('xCoord2').value);
    var y2 = parseFloat(document.getElementById('yCoord2').value);

    // Reset Canvas
    ctx.fillStyle = 'rgba(0, 0, 0, 1.0)';
    ctx.fillRect(0, 0, 400, 400);
    // Create vector and draw
    var v1 = new Vector3([x1, y1, 0]);
    var v2 = new Vector3([x2, y2, 0]);
    drawVector(v1, "red");
    drawVector(v2, "blue");
    
}

function handleDrawOperationEvent() {
    const canvas = document.getElementById('example');
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = 'rgba(0, 0, 0, 1.0)';
    ctx.fillRect(0, 0, 400, 400);

    // Read vectors
    const v1 = new Vector3([
        parseFloat(document.getElementById('xCoord').value),
        parseFloat(document.getElementById('yCoord').value),
        0
    ]);

    const v2 = new Vector3([
        parseFloat(document.getElementById('xCoord2').value),
        parseFloat(document.getElementById('yCoord2').value),
        0
    ]);

    // Draw original vectors
    drawVector(v1, "red");
    drawVector(v2, "blue");

    // Handle operations
    const operation = document.getElementById('operationSelector').value;
    const scalar = parseFloat(document.getElementById('scalarInput').value);

    
    switch(operation) {
        case 'add':
            drawVector(new Vector3(v1.elements).add(v2), "green");
            break;

        case 'sub':
            drawVector(new Vector3(v1.elements).sub(v2), "green");
            break;

        case 'mul':
            if (!isNaN(scalar)) {
                drawVector(new Vector3(v1.elements).mul(scalar), "green");
                drawVector(new Vector3(v2.elements).mul(scalar), "green");
            }
            break;
        case 'div':
            if (!isNaN(scalar)) {
                drawVector(new Vector3(v1.elements).div(scalar), "green");
                drawVector(new Vector3(v2.elements).div(scalar), "green");
            }
            break;
            
        case 'magnitude':
            console.log('Magnitudes:',
                `v1: ${v1.magnitude()}`,
                `v2: ${v2.magnitude()}`);
            break;
            
        case 'normalize':
            const normV1 = new Vector3(v1.elements).normalize();
            const normV2 = new Vector3(v2.elements).normalize();
            drawVector(normV1, "green");
            drawVector(normV2, "green");
            break;
            
        case 'angle':
            const angle = angleBetween(v1, v2);
            console.log(`Angle between vectors: ${angle.toFixed(2)}°`);
            break;
            
        case 'area':
            const area = areaTriangle(v1, v2);
            console.log(`Triangle area: ${area.toFixed(2)}`);
            break;

    }
}
function angleBetween(v1, v2) {
    const dotVal = Vector3.dot(v1, v2);
    const mag1 = v1.magnitude();
    const mag2 = v2.magnitude();

    if (mag1 === 0 || mag2 === 0) {
        console.log("Cannot compute angle with zero vector");
        return NaN;
    }

    const cosTheta = dotVal / (mag1 * mag2);
    return Math.acos(cosTheta) * 180 / Math.PI;
}

function areaTriangle(v1, v2) {
    const crossProduct = Vector3.cross(v1, v2);
    return crossProduct.magnitude() / 2;
}

