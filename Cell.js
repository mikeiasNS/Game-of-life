function Cell(){
	this.alive = false;
	this.kind = null;
	this.kindACellsNear = 0;
	this.kindBCellsNear = 0;
	this.line = 0;
	this.column = 0;
	this.dying = false;
	this.borning = false;

	this.init = function (line, column) {
		this.line = line;
		this.column = column
	}

	//interpretationFunction
	this.interpretsEnviroment = function(enviroment){
		var totalNearACells = 0;
		var totalNearBCells = 0;

		for (var l = this.line - 1; l <= this.line + 1; l++) {
			for(var c = this.column - 1; c <= this.column + 1; c++) {
				if(l == this.line && c == this.column) {
					continue;
				}
				if(l < 0 || l >= enviroment.length ||
					c < 0 || c >= enviroment[0].length) {
					continue;
				}
				if(enviroment[l][c].alive) {
					if(enviroment[l][c].kind == 1) {
						totalNearACells++;
					} else if(enviroment[l][c].kind == 2) {
						totalNearBCells++;
					}
				}
			}
		}

		this.kindACellsNear = totalNearACells;
		this.kindBCellsNear = totalNearBCells;

		minNeiA = document.getElementById("min-nei-a").value;
		maxNeiA = document.getElementById("max-nei-a").value;
		birthNumberA = document.getElementById("birth-number-a").value;

		minNeiB = document.getElementById("min-nei-b").value;
		maxNeiB = document.getElementById("max-nei-b").value;
		birthNumberB = document.getElementById("birth-number-b").value;

		this.reproductionRules();
		this.deathRules();
	};

	this.reproductionRules = function () {
		if(this.kindACellsNear == birthNumberA && !this.alive) {
			this.kind = 1;
			this.borning = true;
		} else if(this.kindBCellsNear == birthNumberB && !this.alive) {
			this.kind = 2;
			this.borning = true;
		}
	}

	this.deathRules = function() {
		if(this.kind == 1) {
			//Kind A
			if(this.kindACellsNear  < minNeiA || this.kindACellsNear > maxNeiA) {
				this.dying = true;
			}
		} else if(this.kind == 2) {
			//Kind B
			if(this.kindBCellsNear == 2 || this.kindBCellsNear == 3) {
				//Keep same state
				return;
			}

			if(this.kindBCellsNear  < minNeiB || this.kindBCellsNear > maxNeiB) {
				this.dying = true;
			}
		}
	};

	//action function
	this.apply = function() {
		if(this.dying) {
			this.die();
		}
		if(this.borning) {
			this.born();
		}
	}

	this.die = function() {
		this.kind = null;
		this.alive = false;
		this.dying = false;
	}

	this.born = function() {
		this.alive = true;
		this.borning = false;
	}
}
