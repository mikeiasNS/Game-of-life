function Cell(){
	this.alive = false;
	this.kind = null;
	this.qtdNearCellsAlive = 0;
	this.line = 0;
	this.column = 0;

	//interpretationFunction
	this.calculateQtdNearCellsAlive = function(context){
		var totalNearCells = 0;

		for (var l = this.line - 1; l < this.line + 1; l++) {
			for(var c = this.column - 1; c < this.ccolumn + 1; c++) {
				if(l == this.line && c == column) {
					continue;
				}
				if(context[l][c].alive) {
					totalNearCells++;
				}
			}
		}

		this.qtdNearCellsAlive = totalNearCells;
	};

	//action function
	this.applyRules = function() {
		if(this.kind == 1) {
			//Especie A
			if(this.qtdNearCellsAlive  < 2 || this.qtdNearCellsAlive > 3) {
				this.alive = false;
			} else if(this.qtdNearCellsAlive == 3) {
				this.alive = true;
			}

		} else if(this.kind == 2) {
			// Especie B

		} else {
			if(this.qtdNearCellsAlive == 3) {
				this.kind = 1;
				this.alive = true;
			}
		}
	};
}