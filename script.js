const firePixelsArray = [];
const fireWidth = 40;
const fireHeight = 40;
const container = document.querySelector("#fireCanvas");
const fireColorsPalette = [{"r":7,"g":7,"b":7},{"r":31,"g":7,"b":7},{"r":47,"g":15,"b":7},{"r":71,"g":15,"b":7},{"r":87,"g":23,"b":7},{"r":103,"g":31,"b":7},{"r":119,"g":31,"b":7},{"r":143,"g":39,"b":7},{"r":159,"g":47,"b":7},{"r":175,"g":63,"b":7},{"r":191,"g":71,"b":7},{"r":199,"g":71,"b":7},{"r":223,"g":79,"b":7},{"r":223,"g":87,"b":7},{"r":223,"g":87,"b":7},{"r":215,"g":95,"b":7},{"r":215,"g":95,"b":7},{"r":215,"g":103,"b":15},{"r":207,"g":111,"b":15},{"r":207,"g":119,"b":15},{"r":207,"g":127,"b":15},{"r":207,"g":135,"b":23},{"r":199,"g":135,"b":23},{"r":199,"g":143,"b":23},{"r":199,"g":151,"b":31},{"r":191,"g":159,"b":31},{"r":191,"g":159,"b":31},{"r":191,"g":167,"b":39},{"r":191,"g":167,"b":39},{"r":191,"g":175,"b":47},{"r":183,"g":175,"b":47},{"r":183,"g":183,"b":47},{"r":183,"g":183,"b":55},{"r":207,"g":207,"b":111},{"r":223,"g":223,"b":159},{"r":239,"g":239,"b":199},{"r":255,"g":255,"b":255}]
let intervalIntensity = 2;
let side = 1;
function increaseIntensity(){
    intervalIntensity = intervalIntensity - 1 >= 2 ? intervalIntensity - 1 : 2;
}
function decreaseIntensity(){
    intervalIntensity = intervalIntensity + 1;
}
function setSide(sideValue){
    side = sideValue;
}

function start(){

    createFireDataStruture();
    createFireSource();
    renderFire();

    setInterval(calculatorFirePropagation, 5);
}

function createFireDataStruture(){
    const numberOfPixels = fireWidth * fireHeight;
    for(let i = 0; i < numberOfPixels;i++){
        firePixelsArray[i] = 0;
    }
}

function calculatorFirePropagation(){
    for(let column = 0;column < fireWidth;column++){
        for(let row = 0;row < fireHeight;row++){
            const pixelIndex = column + (fireWidth*row);
            updateFireIntensityPerPixel(pixelIndex);
        }
    }

    renderFire();
}

function updateFireIntensityPerPixel(currentPixelIndex){
    const belowPixelIndex = currentPixelIndex + fireWidth;
    if(belowPixelIndex < fireWidth * fireHeight){
        const decay = Math.floor(Math.random() * intervalIntensity);
        if(side == 1){
            updateIndex = currentPixelIndex - decay;
        }else if(side == 2){
            updateIndex = currentPixelIndex + decay;
        }else{
            updateIndex = currentPixelIndex;
        }
        firePixelsArray[updateIndex] = 
            firePixelsArray[belowPixelIndex] - decay >= 0 ?firePixelsArray[belowPixelIndex] - decay : 0;
    }
}

function renderFire(){
    let html = "<table>";

    for (let row = 0;row < fireHeight;row++){
        html += "<tr>";
        for(let column = 0;column < fireWidth;column++){
            const pixelIndex = column + (fireWidth * row);
            const fireIntesity = firePixelsArray[pixelIndex];
            const color = fireColorsPalette[fireIntesity];
            html += `<td class="pixel" style="background-color:rgb(${color.r},${color.g},${color.b})">`;
            // html += `<div class="pixel-index">${pixelIndex}</div>`;
            // html += fireIntesity;
            html += "</td>";
        }
        html += "</tr>";
    }

    html += "</table>";

    container.innerHTML = html;
}

function createFireSource(){
    for(let column = 0;column <= fireWidth;column++){
        const overflowPixelIndex = fireWidth * fireHeight;
        const pixelIndex = (overflowPixelIndex - fireWidth) + column;

        firePixelsArray[pixelIndex] = 36;
    }
}
start();