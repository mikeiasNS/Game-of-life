var cv = document.getElementById("cv");
var ctx = cv.getContext('2d');

var canvas_width = 600;
var canvas_height = 600;

var number_of_cells_horizontal = 20
var number_of_cells_vertical = 20

var cell_width = canvas_width / number_of_cells_horizontal;
var cell_heigth = canvas_height / number_of_cells_vertical;

var kindAcolor = [0, 0, 255, 255];
var kindBcolor = [255, 0, 0, 255];

var currentColor = kindAcolor;
var selectedKind = 1;

var enviroment = [[]];

var totalKindA = 0;
var totalKindB = 0;
var deaths = 0;
var borns = 0;

var timer;
var playing = false;
var liveSpeed = document.getElementById("live-speed").value;

cv.addEventListener('click', function(event) {
  var point = getMousePos(cv, event);
  var cellLine = Math.floor((point.y / cv.height) * number_of_cells_vertical);
  var cellColumn = Math.floor((point.x / cv.width) * number_of_cells_horizontal);

  var vertices = getVerticesByCell(cellLine, cellColumn);

  enviroment[cellLine][cellColumn].alive = true;
  enviroment[cellLine][cellColumn].kind = selectedKind;

  scanLine(vertices);
  console.log(cellLine, cellColumn);
}, false);

document.getElementById("live-speed").addEventListener("change", function() {
  clearInterval(timer);
  liveSpeed = document.getElementById("live-speed").value;
  timer = window.setInterval(step, liveSpeed);
  document.getElementById("live-button").innerHTML = "Pause";
  playing = true;
})

function step() {
  borns = 0; deaths = 0; totalKindA = 0; totalKindB = 0;

  for (var i = 0; i < number_of_cells_horizontal; i++) {
    for (var j = 0; j < number_of_cells_vertical; j++) {
      enviroment[i][j].interpretsEnviroment(enviroment);

      if(enviroment[i][j].borning) {
        borns++;
      }
      if(enviroment[i][j].dying) {
        deaths++;
      }
    }
  }

  for (var i = 0; i < number_of_cells_horizontal; i++) {
    for (var j = 0; j < number_of_cells_vertical; j++) {
      enviroment[i][j].apply();

      if(enviroment[i][j].alive) {
        if(enviroment[i][j].kind == 1) {
          totalKindA++;
        }
        if(enviroment[i][j].kind == 2) {
          totalKindB++;
        }
      }
    }
  }

  updateCanvas()
}

function live(play) {
  playing = play || playing;
  if (playing) {
    clearInterval(timer);
    document.getElementById("live-button").innerHTML = "Play";
    playing = false;
  } else {
    timer = window.setInterval(step, liveSpeed);
    document.getElementById("live-button").innerHTML = "Pause";
    playing = true;
  }
}

function glider() {
  enviroment[10][10].alive = true;
  enviroment[10][10].kind = 1;

  enviroment[11][11].alive = true;
  enviroment[11][11].kind = 1;

  enviroment[12][11].alive = true;
  enviroment[12][11].kind = 1;

  enviroment[12][10].alive = true;
  enviroment[12][10].kind = 1;

  enviroment[12][9].alive = true;
  enviroment[12][9].kind = 1;

  updateCanvas();
}

function smallExploder() {
  enviroment[10][10].alive = true;
  enviroment[10][10].kind = 1;

  enviroment[10][11].alive = true;
  enviroment[10][11].kind = 1;

  enviroment[11][12].alive = true;
  enviroment[11][12].kind = 1;

  enviroment[12][11].alive = true;
  enviroment[12][11].kind = 1;

  enviroment[12][10].alive = true;
  enviroment[12][10].kind = 1;

  enviroment[12][9].alive = true;
  enviroment[12][9].kind = 1;

  enviroment[11][9].alive = true;
  enviroment[11][9].kind = 1;

  updateCanvas();
}

function tenCellRow() {
  enviroment[10][6].alive = true;
  enviroment[10][6].kind = 1;

  enviroment[10][7].alive = true;
  enviroment[10][7].kind = 1;

  enviroment[10][8].alive = true;
  enviroment[10][8].kind = 1;

  enviroment[10][9].alive = true;
  enviroment[10][9].kind = 1;

  enviroment[10][10].alive = true;
  enviroment[10][10].kind = 1;

  enviroment[10][11].alive = true;
  enviroment[10][11].kind = 1;

  enviroment[10][12].alive = true;
  enviroment[10][12].kind = 1;

  enviroment[10][13].alive = true;
  enviroment[10][13].kind = 1;

  enviroment[10][14].alive = true;
  enviroment[10][14].kind = 1;

  enviroment[10][15].alive = true;
  enviroment[10][15].kind = 1;

  updateCanvas();
}

function updateCanvas() {
  drawGrid();
  updateIndicators();

  for (var i = 0; i < number_of_cells_horizontal; i++) {
    for (var j = 0; j < number_of_cells_vertical; j++) {
      if(enviroment[i][j].alive) {
        var vertices;
        if(enviroment[i][j].kind == 1) {
          vertices = getVerticesByCell(i, j, kindAcolor);
        } else if(enviroment[i][j].kind == 2) {
          vertices = getVerticesByCell(i, j, kindBcolor);
        }
        scanLine(vertices);
      }
    }
  }
}

function updateIndicators() {
  document.getElementById("indicators").innerHTML = "Espécie A: " + totalKindA + "; Espécie B: " + totalKindB + "; Mortes: " + deaths + "; Nascimentos: " + borns;
}

function createEnviroment() {
  for (var i = 0; i < number_of_cells_horizontal; i++) {
    enviroment[i] = [];
    for (var j = 0; j < number_of_cells_vertical; j++) {
      enviroment[i][j] = new Cell();
      enviroment[i][j].init(i, j);
    }
  };

  drawGrid();
}

function selectKindA() {
  document.getElementById('kindA').className = "selected";
  document.getElementById('kindB').className = "button";

  currentColor = kindAcolor;
  selectedKind = 1;
}

function selectKindB() {
  document.getElementById('kindB').className = "selected";
  document.getElementById('kindA').className = "button";

  currentColor = kindBcolor;
  selectedKind = 2;
}

function getVerticesByCell(l, c, color) {
  color = color || currentColor;
  var vertices = [[], [], [], []];

  vertices[0] = [c * cell_width, l * cell_heigth, color];
  vertices[1] = [vertices[0][0] + cell_width, vertices[0][1], color];
  vertices[2] = [vertices[0][0] + cell_width, vertices[0][1] + cell_heigth, color];
  vertices[3] = [vertices[0][0], vertices[0][1] + cell_heigth, color];

  return vertices;
}

function drawGrid(){
  ctx.fillStyle = "#FFFFFF";
  ctx.fillRect(0, 0, cv.width, cv.height);

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
