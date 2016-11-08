var cv = document.getElementById("cv");
var ctx = cv.getContext('2d');

var canvas_width = 600;
var canvas_height = 600;

var number_of_cells_horizontal = 20
var number_of_cells_vertical = 20

var cell_width = canvas_width / number_of_cells_horizontal;
var cell_heigth = canvas_height / number_of_cells_vertical;

function drawGrid(){
  for (var y = 0; y <= canvas_height; y += cell_heigth) {
    draw_line(0, y, canvas_width, y);
  }

  for (var x = 0; x <= canvas_width; x += cell_width) {
    draw_line(x, 0, x, canvas_height);
  }
}

function draw_line(xb, yb, xe, ye) {
  ctx.moveTo(xb, yb);
  ctx.lineTo(xe, ye);
  ctx.stroke();
}

function getMousePos(canvas, evt) {
  var rect = canvas.getBoundingClientRect();
  return {
    x: evt.clientX - rect.left,
    y: evt.clientY - rect.top
  };
}

cv.addEventListener('click', function(event) {
  var point = getMousePos(cv, event)

  console.log(Math.floor(point.x / cv.width * number_of_cells_horizontal), Math.floor(point.y / cv.height * number_of_cells_vertical));
}, false);

function main() {
  drawGrid();
}

main();


