<!DOCTYPE html>
<html lang="pt-br">
<head>
	<meta charset='UTF-8'/>
	<title>Rotação de vetores</title>
	<script src = "javascript/rotacao.js"></script>
	<link rel="stylesheet" type="text/css" href="css/estilo.css">
	<meta name="viewport" content="width=device-width, initial-scale=1">
	<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css">
	<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.2.0/jquery.min.js"></script>
	<script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js"></script>
	<script src="https://cdn.geogebra.org/apps/deployggb.js"></script>
	<script type="text/javascript">
		var parameters = {"id":"e5gJqcTX","width":700,"height":600,"showToolBar":false,"borderColor":null,"showMenuBar":false,"showAlgebraInput":false,"showResetIcon":true,"enableLabelDrags":false,"enableShiftDragZoom":true,"enableRightClick":false,"capturingThreshold":null,"showToolBarHelp":false,"errorDialogsActive":false,"useBrowserForJS":false,"ggbBase64":"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"};
		var applet = new GGBApplet(parameters, '5.0');
		applet.setHTML5Codebase('https://app.geogebra.org/5.0/web3d/');
		window.onload = function() {
			applet.inject('applet_container','preferHTML5');
		}
		function plotV(){
			ggb = document.ggbApplet;
			dados = document.getElementById('dados');
			coordenadas = dados.elements[0].value;
			ggb.evalCommand('α = 0°');
			ggb.evalCommand('β = 0°');
			ggb.evalCommand('γ = 0°');
			ggb.setVisible('cX',false);
			ggb.setVisible('cY',false);
			ggb.setVisible('cZ',false);
			ggb.setVisible("v'",false);
			ggb.evalCommand('Pz = ('+ coordenadas +')');
			var x = ggb.getXcoord('Pz');
			var y = ggb.getYcoord('Pz');
			var z = ggb.getZcoord('Pz');
			var moduloV = Math.sqrt(Math.pow(x,2)+Math.pow(y,2)+Math.pow(z,2));
			document.getElementById('v').innerHTML = '<b>v</b> = ('+x+', '+y+', '+z+')</br>Módulo = '+moduloV.toFixed(2);
			ggb.setCoordSystem(-moduloV,moduloV,-moduloV,moduloV,-moduloV,moduloV,false);
			ggb.evalCommand('v = Pz');
			ggb.setVisible('v',true);
		}
		function rotacionar(){
			nz = dados.elements[3].value;
			ny = dados.elements[5].value;
			nx = dados.elements[8].value;
			rotZ = document.getElementById('rotZ').checked;
			rotY = document.getElementById('rotY').checked;
			rotX = document.getElementById('rotX').checked;
			plotV();
			if(rotZ){
				rotacionarZ();
				/*while(ggb.isAnimationRunning()){
					if(ggb.getValue('tz')==nz)
						ggb.stopAnimation();
					console.log(ggb.getValue('tz'));
				}*/
				atualizarComponentes();
			}
			if(rotY) {
				if(rotZ){
					setTimeout(ggb.stopAnimation(), 1000);
					setTimeout(atualizarComponentes, 2000);
				}
				else
					rotacionarY();
					setTimeout(atualizarComponentes,1000);
			}
			if(rotX){
				if(rotZ && rotY){
					setTimeout(rotacionarX, 2000);
					setTimeout(atualizarComponentes,3000);
					
				}
				else if(rotY || rotZ){
					setTimeout(rotacionarX, 1000);
					setTimeout(atualizarComponentes,2000);
				}
				else{
					rotacionarX();
					setTimeout(atualizarComponentes,1000);
				}
			}
		}
		function rotacionarZ(){
			rotacaoNegativa('z');
			ggb.evalCommand("v' = Qz");
			ggb.evalCommand('tz = 0');
			ggb.evalCommand('nz = '+nz);
			if(checados()==1)
				ggb.setVisible('cZ',true);
			ggb.setVisible("v'",true);
			ggb.setAnimating('tx',false);
			ggb.setAnimating('ty',false);
			ggb.setAnimating('tz',true);
			ggb.startAnimation();
		}
		function rotacionarY() {
			rotacaoNegativa('y');
			if(rotZ)
				ggb.evalCommand("Py = Qz");
			else
				ggb.evalCommand("Py = ("+coordenadas+")");
			ggb.evalCommand("v' = Qy");
			ggb.evalCommand('ty = 0');
			ggb.evalCommand('ny = '+ny);
			if(checados()==1)
				ggb.setVisible('cY',true);
			ggb.setVisible("v'",true);
			ggb.setAnimating('tx',false);
			ggb.setAnimating('ty',true);
			ggb.setAnimating('tz',false);
			ggb.startAnimation();
		}
		function rotacionarX() {
			rotacaoNegativa('x');
			if(!rotZ && !rotY)
				ggb.evalCommand("Px = ("+coordenadas+")");
			else if(rotY)
				ggb.evalCommand("Px = Qy");
			else
				ggb.evalCommand("Px = Qz");
			ggb.evalCommand("v' = Qx");
			ggb.evalCommand('tx = 0');
			ggb.evalCommand('nx = '+nx);
			if(checados()==1)
				ggb.setVisible('cX',true);
			ggb.setVisible("v'",true);
			ggb.setAnimating('tx',true);
			ggb.setAnimating('ty',false);
			ggb.setAnimating('tz',false);
			ggb.startAnimation();
		}
		function checados(){
			var checados=0;
			if(rotZ)
				checados++;
			if(rotY)
				checados++;
			if(rotX)
				checados++;
			return checados;
		}
		function rotacaoNegativa(eixo){
			if(eixo=='z'){
				if(nz<0){	
					ggb.evalCommand('Qz=Rotate[Pz,(-tz)°,zAxis]');
					ggb.evalCommand('α=Angle[Qz,Cz,Pz,zAxis]');
					ggb.evalCommand('Mz=Rotate[Pz,(-α)/2,zAxis]');
					nz = Math.abs(nz);
				}
				else{
					ggb.evalCommand('Qz=Rotate[Pz,tz°,zAxis]');
					ggb.evalCommand('α=Angle[Pz,Cz,Qz,zAxis]');
					ggb.evalCommand('Mz=Rotate[Pz,α/2,zAxis]');
				}
			}
			else if(eixo=='y')
				if(ny<0){	
					ggb.evalCommand('Qy=Rotate[Py,(-ty)°,yAxis]');
					ggb.evalCommand('β=Angle[Qy,Cy,Py,yAxis]');
					ggb.evalCommand('My=Rotate[Py,(-β)/2,yAxis]');
					ny = Math.abs(ny);
				}
				else{
					ggb.evalCommand('Qy=Rotate[Py,ty°,yAxis]');
					ggb.evalCommand('β=Angle[Py,Cy,Qy,yAxis]');
					ggb.evalCommand('My=Rotate[Py,β/2,yAxis]');
				}
			else{
				if(nx<0){	
					ggb.evalCommand('Qx=Rotate[Px,(-tx)°,xAxis]');
					ggb.evalCommand('γ=Angle[Qx,Cx,Px,xAxis]');
					ggb.evalCommand('Mx=Rotate[Px,(-γ)/2,xAxis]');
					nx = Math.abs(nx);
				}
				else{
					ggb.evalCommand('Qx=Rotate[Px,tx°,xAxis]');
					ggb.evalCommand('γ=Angle[Px,Cx,Qx,xAxis]');
					ggb.evalCommand('Mx=Rotate[Px,γ/2,xAxis]');
				}
			}
		}
		function atualizarComponentes(){
			var x = ggb.getXcoord("v'");
			var y = ggb.getYcoord("v'");
			var z = ggb.getZcoord("v'");
			var modulo = Math.sqrt(Math.pow(x,2)+Math.pow(y,2)+Math.pow(z,2));
			if(Math.abs(Math.round(x)-x)<0.005)
				x = Math.round(x);
			else
				x = x.toFixed(2);
			if(Math.abs(Math.round(y)-y)<0.005)
				y = Math.round(y);
			else
				y = y.toFixed(2);
			if(Math.abs(Math.round(z)-z)<0.005)
				z = Math.round(z);
			else
				z = z.toFixed(2);
			document.getElementById("v'").innerHTML = "<b>v</b>' = ("+x+", "+y+", "+z+")</br>Módulo = "+modulo.toFixed(2);
		}
	</script>
	<style type="text/css">
		p.vetor{
			font-size: 15pt;
			text-align: center;
		}
	</style>
</head>
<body>
	<header>
		<nav class="navbar navbar-default">
			<div class="container-fluid">
				<!-- Brand and toggle get grouped for better mobile display -->
				<div class="navbar-header">
					<button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1" aria-expanded="false">
						<span class="sr-only">Toggle navigation</span>
						<span class="icon-bar"></span>
						<span class="icon-bar"></span>
						<span class="icon-bar"></span>
					</button>
					<a class="navbar-brand" id="logo" href="index.html">Aula Interativa</a>
				</div>

				<!-- Collect the nav links, forms, and other content for toggling -->
				<div class="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
					<ul class="nav navbar-nav">
						<li><a href="index.html">INÍCIO<span class="sr-only">(current)</span></a></li>
						<li class="dropdown">
							<a href="#" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">ÁLGEBRA LINEAR<span class="caret"></span></a>
							<ul class="dropdown-menu">
								<li><a href="independencia.html">Independência Linear</a></li>
								<li class="active"><a href="rotacao.html">Rotação de vetor em torno dos eixos</a></li>
								<!--li role="separator" class="divider"></li-->
							</ul>
						</li>
						<li class="dropdown">
							<a href="#" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">CÁLCULO<span class="caret"></span></a>
							<ul class="dropdown-menu">
								<li><a href="#">Em breve</a></li>
							</ul>
						</li>
					</ul>
					<form class="navbar-form navbar-left">
						<div class="form-group">
							<input type="text" class="form-control" placeholder="Pesquisa">
						</div>
						<button type="submit" class="btn btn-default">Buscar</button>
					</form>
					<ul class="nav navbar-nav navbar-right">
						<li><a href="#">CONTATO</a></li>
						<li><a href="#">SOBRE</a></li>
					</ul>
				</div><!-- /.navbar-collapse -->
			</div><!-- /.container-fluid -->
		</nav>
		<div class="container">
			<h1>Rotação de vetores em torno dos eixos</h1>
		</div>
	</header>
	<div class="container">
		<div class="row">
			<div class="col-sm-6">
				<br><p>Seja <b>v</b> &isin; &real;&sup2;:</p>
				<form id="dados">
					<b>v</b> = ( 
					<input type="text" name="vetor" size="9" placeholder="   x  ,  y  ,  z"/>
					)&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
					<button type="button" onclick="plotV()">Plotar</button>
					<br/><br/>
					Rotação em torno dos eixos em graus:
					<br/><br/>
					<input type="checkbox" id="rotZ" checked/>
					Eixo z:
					<input type="text" name="nz" size="1"/>
					<br/><br/>
					<input type="checkbox" id="rotY"/>
					Eixo y: 
					<input type="text" name="ny" size="1"/>
					&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
					<button type="button" onclick="rotacionar()">Rotacionar</button>
					<br/><br/>
					<input type="checkbox" id="rotX"/>
					Eixo x: 
					<input type="text" name="nx" size="1"/>
					<br/><br/>
				</form>
				<div class="row">
					<div class="col-sm-6">
						<p class="vetor" id="v"></p>
					</div>
					<div class="col-sm-6">
						<p class="vetor" id="v'"></p>
					</div>
				</div>
			</div>
			<div class="col-sm-6">
				<div id="applet_container"></div>
			</div>
		</div>
	</div>
</body>
</html>
