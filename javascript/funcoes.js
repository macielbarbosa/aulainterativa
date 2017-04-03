var wx,wy,vx,vy,zx,zy,moduloW,anguloW,moduloV,anguloV,moduloZ,anguloZ,alpha,beta;
var terceiroVetor=false;

//Posicionar o gráfico no centro
function centralizar(){
	document.getElementById("grafico").scrollLeft = 320;
}

//Cálculo com 2 vetores
function calcular2(){
	//Mostrar parágrafo da solução e representacão canônica
	document.getElementById("resposta2").style.display = 'block';
	document.getElementById('vetores').style.display = 'block';
	document.getElementById('multiplos').style.display = 'none';
	document.getElementById('naoMultiplos').style.display = 'none';
	document.getElementById('vetorNulo').style.display = 'none';
	document.getElementById('prova2').style.display = 'none';

	//Armazenar os valores digitados
	var getValor = document.getElementById("entrada2");
	wx = getValor.elements[0].value;
	wy = getValor.elements[1].value;
	vx = getValor.elements[2].value;
	vy = getValor.elements[3].value;
	document.getElementById("wx").innerHTML = wx;
	document.getElementById("wy").innerHTML = wy;
	document.getElementById("vx").innerHTML = vx;
	document.getElementById("vy").innerHTML = vy;

	document.getElementById("wi").innerHTML = wx;
	document.getElementById("wj").innerHTML = wy;
	document.getElementById("vi").innerHTML = vx;
	document.getElementById("vj").innerHTML = vy;
	
	//Definindo a representação canônica
	//canonicos();

	//Dados dos vetores
	moduloW = Math.sqrt(Math.pow(wx,2)+Math.pow(wy,2));
	moduloV = Math.sqrt(Math.pow(vx,2)+Math.pow(vy,2));
	anguloW = Math.atan2(wy,wx);
	anguloV = Math.atan2(vy,vx);
	if(anguloW<0){
		anguloW += 2*Math.PI;
	}
	if(anguloV<0){
		anguloV += 2*Math.PI;
	}

	//Solucão para dois vetores
	prova('doisVetores');

	if(terceiroVetor){
	    if(vetorNulo())
	    	prova('vetorNulo');
		else if(angulosIguais())
			prova('angulosIguais')
		else{
			escalonar();
			prova('combinacaoLinear');
		}
	}

    //Reiniciar o canvas
    resetCanvas("graficoW");
	resetCanvas("graficoV");

	//Desenhar os vetores nos cavas
	desenhar("graficoW", moduloW, anguloW, "red", "seta-vermelha");
	desenhar("graficoV", moduloV, anguloV, "blue", "seta-azul");

	if(terceiroVetor){
		resetCanvas("graficoZ");
		desenhar("graficoZ", moduloZ, anguloZ, "green","seta-verde");
	}
}

function resetCanvas(grafico){
	document.getElementById(grafico).remove();
	var canvasW = document.createElement("CANVAS");
	canvasW.setAttribute("height","756");
	canvasW.setAttribute("width","756");
    canvasW.id = grafico;
    document.getElementById("grafico").appendChild(canvasW);
}
//Cálcular 
function calcular3(){
	terceiroVetor = true;
	document.getElementById("resposta3").style.display = 'block';
	document.getElementById("v3").style.display = 'block';
	document.getElementById("prova3").style.display = 'block';
	
	document.getElementById('videoFloat').style.position = 'absolute';
	document.getElementById('videoFloat').style.top = '520px';
	document.getElementById('videoFloat').style.left = '560px';
	
	var getValor = document.getElementById("entrada3");
	zx = getValor.elements[0].value;
	zy = getValor.elements[1].value;

	moduloZ = Math.sqrt(Math.pow(zx,2)+Math.pow(zy,2));
	anguloZ = Math.atan2(zy,zx);
	if(anguloZ<0){
		anguloZ += 2*Math.PI;
	}

	document.getElementById("zx").innerHTML = zx;
	document.getElementById("zy").innerHTML = zy;

	document.getElementById("zi").innerHTML = zx;
	document.getElementById("zj").innerHTML = zy;

	//canonicos();

	if(vetorNulo())
		prova('vetorNulo');
	else if(angulosIguais())
		prova('angulosIguais');
	else{
		escalonar();
		prova('combinacaoLinear');
	}

	resetCanvas("graficoW");
	resetCanvas("graficoV");
	resetCanvas("graficoZ");

	desenhar("graficoW", moduloW, anguloW, "red","seta-vermelha");
	desenhar("graficoV", moduloV, anguloV, "blue","seta-azul");
	desenhar("graficoZ", moduloZ, anguloZ, "green","seta-verde");
}

function desenhar(grafico,modulo,angulo,cor,corSeta){
	var escala;

	//determinar a escala do grafico
	if(maiorModulo()<=8){
		document.getElementById('plano').src = "imagens/plano8.png";
		escala = 1;
	}
	else if(maiorModulo()>8 && maiorModulo()<=16){
		document.getElementById('plano').src = "imagens/plano16.png";
		escala = 2.05;
	}
	else if(maiorModulo()>16){
		document.getElementById('plano').src = "imagens/plano24.png";
		escala = 3.14;
	}
	
	//Obter o contexto
	var grafico = document.getElementById(grafico);
	var ctx = grafico.getContext("2d");
	
	ctx.beginPath();
	ctx.translate(380,380);
	ctx.rotate(-angulo);
	ctx.translate(1,-2);
	ctx.rect(0, 0, modulo/escala*47-9/escala, 4);
	ctx.fillStyle = cor;
	ctx.fill();

	//Plot da seta
	var seta = document.getElementById(corSeta);
	ctx.translate(modulo/escala*47-9,-3);
    ctx.drawImage(seta, 0, 0, 10, 10);
    ctx.translate(-1*modulo/escala*47+9, 3);

	//Plot dos eixos secundários
	if(angulo!=anguloMedio() && terceiroVetor && !vetorNulo() && !angulosIguais()){
		ctx.beginPath();
		ctx.translate(-1,2);
		ctx.rotate(-Math.PI);
		ctx.rect(0,0,500,1);
		ctx.fillStyle = 'black';
		ctx.fill();

		ctx.beginPath();
		ctx.rotate(Math.PI);
		ctx.rect(0,0,500,1);
		ctx.fill();

		//Plot da combinação linear
		if(angulo>anguloMedio()){
			ctx.beginPath();
			ctx.rotate(angulo-anguloMedio());
			ctx.translate(moduloAnguloMedio()/escala*47, 0);
			ctx.rotate(anguloMedio()-angulo);
			ctx.rect(0, 0, -1*alpha*modulo/escala*47,1);
			ctx.fillStyle = 'black';
			ctx.fill();
		}
		else{
			ctx.beginPath();
			ctx.rotate(angulo-anguloMedio());
			ctx.translate(moduloAnguloMedio()/escala*47, 0);
			ctx.rotate(anguloMedio()-angulo);
			ctx.rect(0, 0, -1*beta*modulo/escala*47,1);
			ctx.fillStyle = 'black';
			ctx.fill();
		}	
	}	
}

//Escalonar matriz dos vetores
function escalonar(){
	var a,b,c,d,e,f;
	var b0 = false;

	if(anguloMedio()==anguloZ){
		if(anguloW>anguloV){	
			a=wx;
			b=wy;
			c=vx;
			d=vy;
			e=zx;
			f=zy;
		}
		else{
			a=vx;
			b=vy;
			c=wx;
			d=wy;
			e=zx;
			f=zy;
		}
	}
	else if(anguloMedio()==anguloV){
		if(anguloW>anguloZ){
			a=wx;
			b=wy;
			c=zx;
			d=zy;
			e=vx;
			f=vy;
		}
		else{
			a=zx;
			b=zy;
			c=wx;
			d=wy;
			e=vx;
			f=vy;
		}
	}
	else{
		if(anguloV>anguloZ){
			a=vx;
			b=vy;
			c=zx;
			d=zy;
			e=wx;
			f=wy;
		}
		else{
			a=zx;
			b=zy;
			c=vx;
			d=vy;
			e=wx;
			f=wy;
		}
	}
	var c0 = [a,b];
	var c1 = [c,d];
	var c2 = [e,f];

	if(a==0){
		//Trocar linhas
		c0 = [b,a];
		c1 = [d,c];
		c2 = [f,e];
		b0 = true;
	}
	else if(b==0)
		b0=true;
	//Primeiro pivor
	c1[0]/=c0[0];
	c2[0]/=c0[0];
	c0[0]/=c0[0];
	if(b0==false){
		//(1,0) = 1
		c1[1]/=c0[1];
		c2[1]/=c0[1];
		c0[1]/=c0[1];
		//Zerar (1,0)
		c0[1]-=c0[0];
		c1[1]-=c1[0];
		c2[1]-=c2[0];
	}	
	//Segundo pivor
	c2[1]/=c1[1];
	c1[1]/=c1[1];

	if(c1[0]!=0){
		c2[0]=c2[0]-(c1[0]*c2[1]);
		c1[0]=c1[0]-(c1[0]*c1[1]);
	}
	alpha = c2[0];
	beta = c2[1]; 
}

/*function canonicos(){
	//Diferenciar vetores nulos
	if (wx==0 && wy==0)
		document.getElementById("wc").innerHTML = "<b id='red'>0</b>";
	else
		document.getElementById("wc").innerHTML = "<span id='wi'></span> <span id='wj'></span>";

	if (vx==0 && vy==0)
		document.getElementById("vc").innerHTML = "<b id='blue'>0</b>";
	else
		document.getElementById("vc").innerHTML = "<span id='vi'></span> <span id='vj'></span>";

	if (zx==0 && zy==0)
		document.getElementById("zc").innerHTML = "<b id='green'>0</b>";
	else
		document.getElementById("zc").innerHTML = "<span id='zi'></span> <span id='zj'></span>";

	//Definir valor da primeira componente
	if (wx==0)
		document.getElementById("wi").innerHTML = "";
	else if (wx==1)
		document.getElementById("wi").innerHTML = "<b id='red'>i</b>";
	else if (wx==-1)
		document.getElementById("wi").innerHTML = "-<b id='red'>i</b>";
	else
		document.getElementById("wi").innerHTML = "<span id='cwx'></span><b id='red'>i</b>";

	if (vx==0)
		document.getElementById("vi").innerHTML = "";
	else if (vx==1)
		document.getElementById("vi").innerHTML = "<b id='blue'>i</b>";
	else if (vx==-1)
		document.getElementById("vi").innerHTML = "-<b id='blue'>i</b>";
	else
		document.getElementById("vi").innerHTML = "<span id='cvx'></span><b id='blue'>i</b>";

	if (zx==0)
		document.getElementById("zi").innerHTML = "";
	else if (zx==1)
		document.getElementById("zi").innerHTML = "<b id='green'>i</b>";
	else if (zx==-1)
		document.getElementById("zi").innerHTML = "-<b id='green'>i</b>";
	else
		document.getElementById("zi").innerHTML = "<span id='czx'></span><b id='green'>i</b>";
	
	//Definir valor da segunda componente
	if (wy==0)
		document.getElementById("wj").innerHTML = "";
	else if (wy==1)
		document.getElementById("wj").innerHTML = "<span id='swy'></span> <b id='red'>j</b>";
	else
		document.getElementById("wj").innerHTML = "<span id='swy'></span> <span id='modwy'></span><b id='red'>j</b>";

	if (vy==0)
		document.getElementById("vj").innerHTML = "";
	else if (vy==1)
		document.getElementById("vj").innerHTML = "<span id='svy'></span> <b id='blue'>j</b>";
	else
		document.getElementById("vj").innerHTML = "<span id='svy'></span> <span id='modvy'></span><b id='blue'>j</b>";

	if (zy==0)
		document.getElementById("zj").innerHTML = "";
	else if (zy==1)
		document.getElementById("zj").innerHTML = "<span id='szy'></span> <b id='green'>j</b>";
	else
		document.getElementById("zj").innerHTML = "<span id='szy'></span> <span id='modzy'></span><b id='green'>j</b>";
	
	//Definir sinal da segunda componente
	if(wy<0)
		document.getElementById("swy").innerHTML = "-";
	if(wy>0 && wx!=0)
		document.getElementById("swy").innerHTML = "+";
	else if (wy>0 && wx==0)
		document.getElementById("swy").innerHTML = "";

	if(vy<0)
		document.getElementById("svy").innerHTML = "-";
	if(vy>0 && vx!=0)
		document.getElementById("svy").innerHTML = "+";
	else if (vy>0 && vx==0)
		document.getElementById("svy").innerHTML = "";

	if(zy<0)
		document.getElementById("szy").innerHTML = "-";
	if(zy>0 && zx!=0)
		document.getElementById("szy").innerHTML = "+";
	else if (zy>0 && zx==0)
		document.getElementById("szy").innerHTML = "";
	
	//Primeira componente
	document.getElementById("cwx").innerHTML = wx;

	document.getElementById("cvx").innerHTML = vx;

	document.getElementById("czx").innerHTML = zx;
	
	//Modulo da segunda componente
	document.getElementById("modwy").innerHTML = Math.abs(wy);

	document.getElementById("modvy").innerHTML = Math.abs(vy);

	document.getElementById("modzy").innerHTML = Math.abs(zy);
}*/

function anguloMedio(){
	if(anguloW>anguloZ && anguloW<anguloV || anguloW<anguloZ && anguloW>anguloV)
		return anguloW;
	else if(anguloV>anguloW && anguloV<anguloZ || anguloV<anguloW && anguloV>anguloZ)
		return anguloV;
	else if(anguloZ>anguloW && anguloZ<anguloV || anguloZ<anguloW && anguloZ>anguloV)
		return anguloZ;
}

function prova(tipo){
	if(tipo == 'doisVetores'){
		if (wx==0 && wy==0 || vx==0 && vy==0){
		document.getElementById("resultado2").innerHTML = "<ins>linearmente dependente</ins> (LD)";
		document.getElementById("justificativa2").innerHTML = "é um conjunto finito de vetores que contém o vetor nulo.";
		document.getElementById('vetorNulo').style.display = 'block';
		}
		else if (anguloW==anguloV){
			document.getElementById('prova2').style.display = 'block';
			var escalarV = moduloW/moduloV;
			var escalarW = moduloV/moduloW;
			document.getElementById("resultado2").innerHTML = "<ins>linearmente dependente</ins> (LD)";
			document.getElementById("justificativa2").innerHTML = "um dos vetores de S é um múltiplo escalar do outro:";
			document.getElementById('multiplos').style.display = 'block';
			if (moduloW>=moduloV)
				document.getElementById("prova2").innerHTML = "<b>w</b> = &lambda;<b>v</b> &there4; &lambda; = " + escalarV.toFixed(1);
			else
				document.getElementById("prova2").innerHTML = "<b>v</b> = &lambda;<b>w</b> &there4; &lambda; = " + escalarW.toFixed(1);
		}
		else if (anguloW==anguloV+Math.PI || anguloV==anguloW+Math.PI){
			document.getElementById('prova2').style.display = 'block';
			var escalarV = -1*moduloW/moduloV;
			var escalarW = -1*moduloV/moduloW;
			document.getElementById("resultado2").innerHTML = "<ins>linearmente dependente</ins> (LD)";
			document.getElementById("justificativa2").innerHTML = "um dos vetores de S é um múltiplo escalar do outro:";
			document.getElementById('multiplos').style.display = 'block';
			if (moduloW>=moduloV)
				document.getElementById("prova2").innerHTML = "<b>w</b> = &lambda;<b>v</b> &there4; &lambda; = " + escalarV.toFixed(1);
			else
				document.getElementById("prova2").innerHTML = "<b>v</b> = &lambda;<b>w</b> &there4; &lambda; = " + escalarW.toFixed(1);
		}
		else{
			document.getElementById('prova2').style.display = 'block';
			document.getElementById("resultado2").innerHTML = "<ins>linearmente independente</ins> (LI)";
			document.getElementById("justificativa2").innerHTML = "nenhum dos dois vetores de S é um múltiplo escalar do outro:";
			document.getElementById('naoMultiplos').style.display = 'block'; 
			if (moduloW>moduloV)
				document.getElementById("prova2").innerHTML = "&#8708; &lambda; &isin; &real;: <b>w</b> = &lambda;<b>v</b>";
			else
				document.getElementById("prova2").innerHTML = "&#8708; &lambda; &isin; &real;: <b>v</b> = &lambda;<b>w</b>";
		}
	}
	else if(tipo == 'vetorNulo'){
		if(wx==0 && wy==0){
		alpha = 0;
		beta = 0;
		document.getElementById('prova3').innerHTML = "<b>w</b> = &alpha;<b>v</b> + &beta;<b>z</b><br/>(" + wx + ", " + wy + ") = &alpha;(" + vx + ", " + vy + ") + &beta;(" + zx + ", " + zy + ")<br/>&alpha; = 0<br/>&beta; = 0";
		}
		else if(vx==0 && vy==0){
			alpha = 0;
			beta = 0;
			document.getElementById('prova3').innerHTML = "<b>v</b> = &alpha;<b>w</b> + &beta;<b>z</b><br/>(" + vx + ", " + vy + ") = &alpha;(" + wx + ", " + wy + ") + &beta;(" + zx + ", " + zy + ")<br/>&alpha; = 0<br/>&beta; = 0";
		}
		else if(zx==0 && zy==0){
			alpha = 0;
			beta = 0;
			document.getElementById('prova3').innerHTML = "<b>z</b> = &alpha;<b>w</b> + &beta;<b>v</b><br/>(" + zx + ", " + zy + ") = &alpha;(" + wx + ", " + wy + ") + &beta;(" + vx + ", " + vy + ")<br/>&alpha; = 0<br/>&beta; = 0";
		}
	}
	else if(tipo == 'angulosIguais'){
		if(anguloW==anguloV){
			if (moduloW>=moduloV){
				alpha = (moduloW/moduloV).toFixed(2);
				beta = 0;
				document.getElementById('prova3').innerHTML = "<b>w</b> = &alpha;<b>v</b> + &beta;<b>z</b><br/>(" + wx + ", " + wy + ") = &alpha;(" + vx + ", " + vy + ") + &beta;(" + zx + ", " + zy + ")<br/>&alpha; = " + alpha + "<br/>&beta; = 0";
			}
			else{
				alpha = (moduloV/moduloW).toFixed(2);
				beta = 0;
				document.getElementById('prova3').innerHTML = "<b>v</b> = &alpha;<b>w</b> + &beta;<b>z</b><br/>(" + vx + ", " + vy + ") = &alpha;(" + wx + ", " + wy + ") + &beta;(" + zx + ", " + zy + ")<br/>&alpha; = " + alpha + "<br/>&beta; = 0";
			}
		}
		else if(anguloW==anguloV+Math.PI){
			if (moduloW>=moduloV){
				alpha = (-1*moduloW/moduloV).toFixed(2);
				beta = 0;
				document.getElementById('prova3').innerHTML = "<b>w</b> = &alpha;<b>v</b> + &beta;<b>z</b><br/>(" + wx + ", " + wy + ") = &alpha;(" + vx + ", " + vy + ") + &beta;(" + zx + ", " + zy + ")<br/>&alpha; = " + alpha + "<br/>&beta; = 0";
			}
			else{
				alpha = (-1*moduloV/moduloW).toFixed(2);
				beta = 0;
				document.getElementById('prova3').innerHTML = "<b>v</b> = &alpha;<b>w</b> + &beta;<b>z</b><br/>(" + vx + ", " + vy + ") = &alpha;(" + wx + ", " + wy + ") + &beta;(" + zx + ", " + zy + ")<br/>&alpha; = " + alpha + "<br/>&beta; = 0";
			}
		}
		
		else if(anguloW==anguloZ){
			if (moduloW>=moduloZ){
				alpha = (moduloW/moduloZ).toFixed(2);
				beta = 0;
				document.getElementById('prova3').innerHTML = "<b>w</b> = &alpha;<b>z</b> + &beta;<b>v</b><br/>(" + wx + ", " + wy + ") = &alpha;(" + zx + ", " + zy + ") + &beta;(" + vx + ", " + vy + ")<br/>&alpha; = " + alpha + "<br/>&beta; = 0";
			}
			else{
				alpha = (moduloZ/moduloW).toFixed(2);
				beta = 0;
				document.getElementById('prova3').innerHTML = "<b>w</b> = &alpha;<b>z</b> + &beta;<b>v</b><br/>(" + wx + ", " + wy + ") = &alpha;(" + zx + ", " + zy + ") + &beta;(" + vx + ", " + vy + ")<br/>&alpha; = " + alpha + "<br/>&beta; = 0";
			}
		}
		else if(anguloW==anguloZ+Math.PI){
			if (moduloW>=moduloZ){
				alpha = (-1*moduloW/moduloZ).toFixed(2);
				beta = 0;
				document.getElementById('prova3').innerHTML = "<b>w</b> = &alpha;<b>z</b> + &beta;<b>v</b><br/>(" + wx + ", " + wy + ") = &alpha;(" + zx + ", " + zy + ") + &beta;(" + vx + ", " + vy + ")<br/>&alpha; = " + alpha + "<br/>&beta; = 0";
			}
			else{
				alpha = (-1*moduloZ/moduloW).toFixed(2);
				beta = 0;
				document.getElementById('prova3').innerHTML = "<b>w</b> = &alpha;<b>z</b> + &beta;<b>v</b><br/>(" + wx + ", " + wy + ") = &alpha;(" + zx + ", " + zy + ") + &beta;(" + vx + ", " + vy + ")<br/>&alpha; = " + alpha + "<br/>&beta; = 0";
			}
		}
		
		else if(anguloV==anguloZ){
			if (moduloV>=moduloZ){
				alpha = (moduloV/moduloZ).toFixed(2);
				beta = 0;
				document.getElementById('prova3').innerHTML = "<b>v</b> = &alpha;<b>v</b> + &beta;<b>z</b><br/>(" + vx + ", " + vy + ") = &alpha;(" + zx + ", " + zy + ") + &beta;(" + wx + ", " + wy + ")<br/>&alpha; = " + alpha + "<br/>&beta; = 0";
			}
			else{
				alpha = (moduloZ/moduloV).toFixed(2);
				beta = 0;
				document.getElementById('prova3').innerHTML = "<b>v</b> = &alpha;<b>v</b> + &beta;<b>z</b><br/>(" + vx + ", " + vy + ") = &alpha;(" + zx + ", " + zy + ") + &beta;(" + wx + ", " + wy + ")<br/>&alpha; = " + alpha + "<br/>&beta; = 0";
			}
		}
		else if(anguloV==anguloZ+Math.PI){
			if (moduloV>=moduloZ){
				alpha = (-1*moduloV/moduloZ).toFixed(2);
				beta = 0;
				document.getElementById('prova3').innerHTML = "<b>v</b> = &alpha;<b>v</b> + &beta;<b>z</b><br/>(" + vx + ", " + vy + ") = &alpha;(" + zx + ", " + zy + ") + &beta;(" + wx + ", " + wy + ")<br/>&alpha; = " + alpha + "<br/>&beta; = 0";
			}
			else{
				alpha = (-1*moduloZ/moduloV).toFixed(2);
				beta = 0;
				document.getElementById('prova3').innerHTML = "<b>v</b> = &alpha;<b>v</b> + &beta;<b>z</b><br/>(" + vx + ", " + vy + ") = &alpha;(" + zx + ", " + zy + ") + &beta;(" + wx + ", " + wy + ")<br/>&alpha; = " + alpha + "<br/>&beta; = 0";
			}
		}
	}
	else if(tipo == 'combinacaoLinear'){
		if(anguloMedio()==anguloZ){
			if(anguloW>anguloV){
				document.getElementById('prova3').innerHTML = "<b>z</b> = &alpha;<b>w</b> + &beta;<b>v</b><br/>(" + zx + ", " + zy + ") = &alpha;(" + wx + ", " + wy + ") + &beta;(" + vx + ", " + vy + ")<br/>&alpha; &cong; " + alpha.toFixed(2) + "<br/>&beta; &cong; " + beta.toFixed(2);
			}
			else{
				document.getElementById('prova3').innerHTML = "<b>z</b> = &alpha;<b>v</b> + &beta;<b>w</b><br/>(" + zx + ", " + zy + ") = &alpha;(" + vx + ", " + vy + ") + &beta;(" + wx + ", " + wy + ")<br/>&alpha; &cong; " + alpha.toFixed(2) + "<br/>&beta; &cong; " + beta.toFixed(2);
			}
		}
		else if(anguloMedio()==anguloV){
			if(anguloW>anguloZ){
				document.getElementById('prova3').innerHTML = "<b>v</b> = &alpha;<b>w</b> + &beta;<b>z</b><br/>(" + vx + ", " + vy + ") = &alpha;(" + wx + ", " + wy + ") + &beta;(" + zx + ", " + zy + ")<br/>&alpha; &cong; " + alpha.toFixed(2) + "<br/>&beta; &cong; " + beta.toFixed(2);
			}
			else{
				document.getElementById('prova3').innerHTML = "<b>v</b> = &alpha;<b>z</b> + &beta;<b>w</b><br/>(" + vx + ", " + vy + ") = &alpha;(" + zx + ", " + zy + ") + &beta;(" + wx + ", " + wy + ")<br/>&alpha; &cong; " + alpha.toFixed(2) + "<br/>&beta; &cong; " + beta.toFixed(2);
			}
		}
		else{
			if(anguloV>anguloZ){
				document.getElementById('prova3').innerHTML = "<b>w</b> = &alpha;<b>v</b> + &beta;<b>z</b><br/>(" + wx + ", " + wy + ") = &alpha;(" + vx + ", " + vy + ") + &beta;(" + zx + ", " + zy + ")<br/>&alpha; &cong; " + alpha.toFixed(2) + "<br/>&beta; &cong; " + beta.toFixed(2);
			}
			else{
				document.getElementById('prova3').innerHTML = "<b>w</b> = &alpha;<b>z</b> + &beta;<b>v</b><br/>(" + wx + ", " + wy + ") = &alpha;(" + zx + ", " + zy + ") + &beta;(" + vx + ", " + vy + ")<br/>&alpha; &cong; " + alpha.toFixed(2) + "<br/>&beta; &cong; " + beta.toFixed(2);
			}
		}
	}
}

function maiorModulo(){
	if(terceiroVetor){
		if(moduloW>=moduloV && moduloW>=moduloZ)
			return moduloW;
		if(moduloV>=moduloW && moduloV>=moduloZ)
			return moduloV;
		if(moduloZ>=moduloW && moduloZ>=moduloV)
			return moduloZ;
	}
	else{
		if(moduloW>=moduloV)
			return moduloW;
		if(moduloV>=moduloW)
			return moduloV;
	}
}

function vetorNulo(){
		return moduloW==0 || moduloV==0 || moduloZ==0;
}

function angulosIguais(){
	return anguloW==anguloV || anguloW==anguloZ || anguloV==anguloZ;
}

function menorAngulo(){
	if(anguloW<anguloMedio())
		return anguloW;
	if(anguloV<anguloMedio())
		return anguloV;
	if(anguloZ<anguloMedio())
		return anguloZ;
}

function moduloMenorAngulo(){
	if(menorAngulo()==anguloW)
		return moduloW;
	if(menorAngulo()==anguloV)
		return moduloV;
	if(menorAngulo()==anguloZ)
		return moduloZ;
}

function moduloAnguloMedio(){
	if(anguloMedio()==anguloW)
		return moduloW;
	if(anguloMedio()==anguloV)
		return moduloV;
	if(anguloMedio()==anguloZ)
		return moduloZ;
}

function exercicio1(){
	if(document.getElementById('a').checked==true && document.getElementById('b').checked==false && document.getElementById('c').checked==true &&document.getElementById('d').checked==false && document.getElementById('e').checked==false)
		document.getElementById('resp1').innerHTML = 'Resposta correta!';
	else
		document.getElementById('resp1').innerHTML = 'Resposta incorreta!';
}