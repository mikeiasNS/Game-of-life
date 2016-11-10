function sortNumber(a,b) {
    return a[0] - b[0];
}

function scanLine(vertices){

	var dados = ctx.getImageData(0, 0, cv.width, cv.height);

	var maiorY = vertices[0][1];
	var menorY = vertices[0][1];
	for(var i = 1; i < vertices.length; i++){
		if(vertices[i][1] > maiorY){
			maiorY = vertices[i][1];
		}
		if(vertices[i][1] < menorY){
			menorY = vertices[i][1];
		}
	}
	//inicio do poligono, até fim do poligono no eixo y 
	for(var i = menorY; i < maiorY; i++){
		var intersecoes = [];
		//percorre os vertices para calcular os t`s p.s.: t = ponto de intersecao
		for(var j = 0; j < vertices.length; j++){
			// achar o y0, yf, x0 e xf da aresta
			var y0j = true;
			var y0a, yfa, ta, x0a, xfa;
			if(j == vertices.length-1){
				// compare com o primeiro
				if(vertices[j][1] > vertices[0][1]){
					y0a = vertices[0][1];
					yfa = vertices[j][1];
					x0a = vertices[0][0];
					xfa = vertices[j][0];
				} else{
					y0j = false;
					yfa = vertices[0][1];
					y0a = vertices[j][1];
					xfa = vertices[0][0];
					x0a = vertices[j][0];
				}
			}else{
				// compare com o proximo
				if(vertices[j][1] > vertices[j + 1][1]){
					y0a = vertices[j + 1][1];
					yfa = vertices[j][1];
					x0a = vertices[j + 1][0];
					xfa = vertices[j][0];
				} else{
					y0j = false;
					yfa = vertices[j + 1][1];
					y0a = vertices[j][1];
					xfa = vertices[j + 1][0];
					x0a = vertices[j][0];
				}
			}

			ta = (i - y0a)/(yfa - y0a);

			var xDaIntersecao;
			if(ta >= 0 && ta < 1){
				xDaIntersecao = x0a + ta * (xfa - x0a);

				var cor1;
				var cor2;
				var corFinal;
				if(!y0j){
					cor1 = [(1 - ta) * vertices[j][2][0], (1 - ta) * vertices[j][2][1], (1 - ta) * vertices[j][2][2]];
					if(j == vertices.length - 1){
						cor2 = [ta * vertices[0][2][0], ta * vertices[0][2][1], ta * vertices[0][2][2]];
					} else{
						cor2 = [ta * vertices[j + 1][2][0], ta * vertices[j + 1][2][1], ta * vertices[j + 1][2][2]];
					}

					corFinal = [cor1[0] + cor2[0], cor1[1] + cor2[1], cor1[2] + cor2[2], 255];
				} else{
					cor1 = [ta * vertices[j][2][0], ta * vertices[j][2][1], ta * vertices[j][2][2]];
					if(j == vertices.length - 1){
						cor2 = [(1 - ta) * vertices[0][2][0], (1 - ta) * vertices[0][2][1], (1 - ta) * vertices[0][2][2]];
					} else{
						cor2 = [(1 - ta) * vertices[j + 1][2][0], (1 - ta) * vertices[j + 1][2][1], (1 - ta) * vertices[j + 1][2][2]];
					}

					corFinal = [cor1[0] + cor2[0], cor1[1] + cor2[1], cor1[2] + cor2[2], 255];
				}

				intersecoes.push([xDaIntersecao, ta, corFinal]);
			}
		}
		intersecoes.sort(sortNumber);
		// pinta a linha
		for (var k = 0; k < intersecoes.length - 1; k+=2) {

			for(var x = intersecoes[k][0]; x <= intersecoes[k + 1][0]; x++){
				var t = (x - intersecoes[k][0]) / (intersecoes[k + 1][0] - intersecoes[k][0]);
				var r = intersecoes[k][2][0];
				var g = intersecoes[k][2][1];
				var b = intersecoes[k][2][2];
				var r2 = intersecoes[k + 1][2][0];
				var g2 = intersecoes[k + 1][2][1];
				var b2 = intersecoes[k + 1][2][2];
				
				var cor1 = [(1 - t) * r, (1 - t) * g, (1 - t) * b];
				var cor2 = [t * r2, t * g2, t * b2];

				var corFinal = [cor1[0] + cor2[0], cor1[1] + cor2[1], cor1[2] + cor2[2], 255];

				setPixel2(dados.data, x, i, corFinal);
			}
		}
	}
	ctx.putImageData(dados, 0, 0);
}

function setPixel2(mat, x, y, cor){
	index = 4*Math.round(x) + 4*cv.width*Math.round(y);
	mat[index + 0] = cor[0];
	mat[index + 1] = cor[1];
	mat[index + 2] = cor[2];
	mat[index + 3] = 255;
}