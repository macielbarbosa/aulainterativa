// STANDART GLOBAL VARIABLES
let canvas_container, scene, camera, renderer, controls, stats;
let clock = new THREE.Clock();
let SCREEN_WIDTH = $("#canvas-container").width(), SCREEN_HEIGHT = 500;

// CUSTOM GLOBAL VARIABLES
let xFuncText, yFuncText, zFuncText,
	dxu, dyu, dzu, dxv, dyv, dzv,
	uMin, uMax, uRange = uMax - uMin,
	vMin, vMax, vRange = vMax - vMin,
	xFunc, yFunc, zFunc,
	uFixed, vFixed;

let graphMesh,
	uMesh,
	vMesh,
	vLine, nLine, bLine;

init();
animate();

function init() {

	canvas_container = document.getElementById("canvas-container");

	let VIEW_ANGLE = 45, ASPECT = SCREEN_WIDTH / SCREEN_HEIGHT, NEAR = 0.01, FAR = 1000;

	// SCENE
	scene = new THREE.Scene();

	// CAMERA
	camera = new THREE.PerspectiveCamera(VIEW_ANGLE, SCREEN_WIDTH / SCREEN_HEIGHT, NEAR, FAR);
	camera.position.set(20, 20, 30);
	camera.up = new THREE.Vector3(0, 0, 1);
	camera.lookAt(new THREE.Vector3(0, 0, 0));
	scene.add(camera);

	// RENDERER
	renderer = new THREE.WebGLRenderer({ alpha: true });
	renderer.setSize(SCREEN_WIDTH, SCREEN_HEIGHT);
	renderer.setClearColor(0xccccff, 1);
	canvas_container.appendChild(renderer.domElement);

	// CONTROLS
	createControls();

	// SKYBOX/FOG
	scene.fog = new THREE.FogExp2(0x888888, 0.005);

	// AXIS
	let radius = 0.2;
	let length = 30;
	let xLine = function (u0, v0) {
		return new THREE.Vector3(length * v0, radius * Math.cos(2 * Math.PI * u0), radius * Math.sin(2 * Math.PI * u0));
	}
	let yLine = function (u0, v0) {
		return new THREE.Vector3(radius * Math.cos(2 * Math.PI * u0), length * v0, radius * Math.sin(2 * Math.PI * u0));
	}
	let zLine = function (u0, v0) {
		return new THREE.Vector3(radius * Math.cos(2 * Math.PI * u0), radius * Math.sin(2 * Math.PI * u0), length * v0);
	}
	let xgeometry = new THREE.ParametricBufferGeometry(xLine, 10, 10);
	let xmaterial = new THREE.MeshBasicMaterial({ color: 0xff0000, side: THREE.DoubleSide });
	let xAxes = new THREE.Mesh(xgeometry, xmaterial);
	scene.add(xAxes);
	let ygeometry = new THREE.ParametricBufferGeometry(yLine, 10, 10);
	let ymaterial = new THREE.MeshBasicMaterial({ color: 0x00ff00, side: THREE.DoubleSide });
	let yAxes = new THREE.Mesh(ygeometry, ymaterial);
	scene.add(yAxes);
	let zgeometry = new THREE.ParametricBufferGeometry(zLine, 10, 10);
	let zmaterial = new THREE.MeshBasicMaterial({ color: 0x0000ff, side: THREE.DoubleSide });
	let zAxes = new THREE.Mesh(zgeometry, zmaterial);
	scene.add(zAxes);

	// GRID 
	let gridHelper1 = new THREE.GridHelper(200, 200 / 5, 0x000000, 0x969593);
	gridHelper1.position.z = -0.05;
	gridHelper1.rotation.x = Math.PI / 2;
	scene.add(gridHelper1);

	// TEST AREA

	//

	processPage();
}

function processPage() {
	createGraph();

	contantUV();

	triedroFrenet($("#uPos").val() / 100);

	calculateArea();
}

function createGraph() {
	xFuncText = $("#xFuncText").val();
	yFuncText = $("#yFuncText").val();
	zFuncText = $("#zFuncText").val();
	uMin = nerdamer($("#uMin").val()).evaluate().valueOf();
	uMax = nerdamer($("#uMax").val()).evaluate().valueOf();
	vMin = nerdamer($("#vMin").val()).evaluate().valueOf();
	vMax = nerdamer($("#vMax").val()).evaluate().valueOf();
	uFixed = (uMin + uMax) / 2;
	vFixed = (vMin + vMax) / 2;
	uRange = uMax - uMin;
	vRange = vMax - vMin;
	xFunc = nerdamer(xFuncText).buildFunction(["u", "v"]);
	yFunc = nerdamer(yFuncText).buildFunction(["u", "v"]);
	zFunc = nerdamer(zFuncText).buildFunction(["u", "v"]);
	dxu = nerdamer.diff(xFuncText, "u").buildFunction(["u", "v"]);
	dyu = nerdamer.diff(yFuncText, "u").buildFunction(["u", "v"]);
	dzu = nerdamer.diff(zFuncText, "u").buildFunction(["u", "v"]);
	dxv = nerdamer.diff(xFuncText, "v").buildFunction(["u", "v"]);
	dyv = nerdamer.diff(yFuncText, "v").buildFunction(["u", "v"]);
	dzv = nerdamer.diff(zFuncText, "v").buildFunction(["u", "v"]);

	let meshFunction = function (u0, v0) {
		let u = uRange * u0 + uMin;
		let v = vRange * v0 + vMin;
		let x = xFunc(u, v);
		let y = yFunc(u, v);
		let z = zFunc(u, v);
		return new THREE.Vector3(x, y, z);
	}
	let graphGeometry = new THREE.ParametricBufferGeometry(meshFunction, 64, 64);

	if (graphMesh) { scene.remove(graphMesh); }

	let graphTexture = new THREE.TextureLoader().load("../imagens/square.png");
	graphTexture.wrapS = graphTexture.wrapT = THREE.RepeatWrapping;
	graphTexture.repeat.set(32, 32);

	let graphMaterial = new THREE.MeshBasicMaterial({ map: graphTexture, color: 0xe19c24, side: THREE.DoubleSide });

	graphMesh = new THREE.Mesh(graphGeometry, graphMaterial);

	scene.add(graphMesh);
}

function contantUV() {

	if (uMesh) { scene.remove(uMesh); }
	if (vMesh) { scene.remove(vMesh); }
	/////////////
	//U CONSTANTE
	/////////////
	if ($("#showLines").is(":checked")) {
		let uFunction = function () {
			THREE.Curve.call(this);
		}
		uFunction.prototype = Object.create(THREE.Curve.prototype);
		uFunction.prototype.constructor = uFunction;
		uFunction.prototype.getPoint = function (t) {
			let vt = vMin + t * vRange;
			return new THREE.Vector3(xFunc(uFixed, vt), yFunc(uFixed, vt), zFunc(uFixed, vt));
		};
		let uGeometry = new THREE.ParametricGeometries.TubeGeometry(new uFunction(), 64, 0.1, 8, true);
		let uMaterial = new THREE.MeshBasicMaterial({ color: 0x0077c1 });
		uMesh = new THREE.Mesh(uGeometry, uMaterial);
		scene.add(uMesh);
		/////////////
		//V CONSTANTE
		/////////////

		let vFunction = function () {
			THREE.Curve.call(this);
		}
		vFunction.prototype = Object.create(THREE.Curve.prototype);
		vFunction.prototype.constructor = vFunction;
		vFunction.prototype.getPoint = function (t) {
			let ut = uMin + t * uRange;
			return new THREE.Vector3(xFunc(ut, vFixed), yFunc(ut, vFixed), zFunc(ut, vFixed));
		};
		let vGeometry = new THREE.ParametricGeometries.TubeGeometry(new vFunction(), 64, 0.1, 8, true);
		let vMaterial = new THREE.MeshBasicMaterial({ color: 0x7A4875 });
		vMesh = new THREE.Mesh(vGeometry, vMaterial);
		scene.add(vMesh);
	}
}

function triedroFrenet(t) {

	if (vLine) { scene.remove(vLine); }
	if (nLine) { scene.remove(nLine); }
	if (bLine) { scene.remove(bLine); }


	if ($("#showFrenet").is(":checked")) {

		let line3D = function (start, dir) {
			this.start = start;
			this.dir = dir;
			THREE.Curve.call(this);
		}
		line3D.prototype = Object.create(THREE.Curve.prototype);
		line3D.prototype.constructor = line3D;
		line3D.prototype.getPoint = function (t) {
			return new THREE.Vector3(this.start.x + t * this.dir.x,
				this.start.y + t * this.dir.y,
				this.start.z + t * this.dir.z
			);
		}

		let vMaterial = new THREE.MeshBasicMaterial({ color: 0x800517 });
		let nMaterial = new THREE.MeshBasicMaterial({ color: 0x000000 });
		let bMaterial = new THREE.MeshBasicMaterial({ color: 0xE4287C });

		let ut = uMin + t * uRange;
		let pos = new THREE.Vector3(xFunc(ut, vFixed), yFunc(ut, vFixed), zFunc(ut, vFixed));
		let vDir = new THREE.Vector3(dxu(ut, vFixed), dyu(ut, vFixed), dzu(ut, vFixed)).setLength(5);
		let nDir = new THREE.Vector3(dxv(ut, vFixed), dyv(ut, vFixed), dzv(ut, vFixed)).setLength(5);
		let bDir = cross(vDir, nDir).setLength(5);

		let vGeometry = new THREE.ParametricGeometries.TubeGeometry(new line3D(pos, vDir), 64, 0.1, 8, true);
		let nGeometry = new THREE.ParametricGeometries.TubeGeometry(new line3D(pos, nDir), 64, 0.1, 8, true);
		let bGeometry = new THREE.ParametricGeometries.TubeGeometry(new line3D(pos, bDir), 64, 0.1, 8, true);

		vLine = new THREE.Mesh(vGeometry, vMaterial);
		nLine = new THREE.Mesh(nGeometry, nMaterial);
		bLine = new THREE.Mesh(bGeometry, bMaterial);

		scene.add(vLine);
		scene.add(nLine);
		scene.add(bLine);
	}
}

function calculateArea() {
	let dA = function (u0, v0) {
		return norm([dyu(u0, v0) * dzv(u0, v0) - dyv(u0, v0) * dzu(u0, v0),
		dxv(u0, v0) * dzu(u0, v0) - dxu(u0, v0) * dzv(u0, v0),
		dxu(u0, v0) * dyv(u0, v0) - dxv(u0, v0) * dyu(u0, v0)]);
	}
	let np = 25;
	let du = uRange / np;
	let dv = vRange / np;
	let at = 0, ut = 0, vt = 0;

	for (let i = 0; i < np; i++) {
		ut = uMin + i * du;
		for (let j = 0; j < np; j++) {
			vt = vMin + j * dv;
			at += boole2D(dA, ut, ut + du, vt, vt + dv);
		}
	}
	$("#area").text("`A=" + at.toPrecision(10) + "`");
	MathJax.Hub.Queue(["Typeset", MathJax.Hub, document.getElementById("area")]);
}

function norm(v) {
	return Math.sqrt(Math.pow(v[0], 2) + Math.pow(v[1], 2) + Math.pow(v[2], 2));
}

function cross(v1, v2) {
	return new THREE.Vector3(-(v1.z * v2.y) + v1.y * v2.z, v1.z * v2.x - v1.x * v2.z, -(v1.y * v2.x) + v1.x * v2.y);
}

function boole1D(f, uni, a, b) {
	let h = (b - a) / 4;
	return (2 / 45) * h * (7 * f(uni, a) + 32 * f(uni, a + h) + 12 * f(uni, a + 2 * h) + 32 * f(uni, a + 3 * h) + 7 * f(uni, a + 4 * h));
}

function boole2D(f, a, b, c, d) {
	let du = (b - a) / 4;
	let dv = (d - c) / 4;
	return (4 * du * dv * (49 * f(a, c) + 224 * f(a, c + dv) + 84 * f(a, c + 2 * dv) +
		224 * f(a, c + 3 * dv) + 49 * f(a, c + 4 * dv) + 224 * f(a + du, c) +
		1024 * f(a + du, c + dv) + 384 * f(a + du, c + 2 * dv) +
		1024 * f(a + du, c + 3 * dv) + 224 * f(a + du, c + 4 * dv) +
		84 * f(a + 2 * du, c) + 384 * f(a + 2 * du, c + dv) +
		144 * f(a + 2 * du, c + 2 * dv) + 384 * f(a + 2 * du, c + 3 * dv) +
		84 * f(a + 2 * du, c + 4 * dv) + 224 * f(a + 3 * du, c) +
		1024 * f(a + 3 * du, c + dv) + 384 * f(a + 3 * du, c + 2 * dv) +
		1024 * f(a + 3 * du, c + 3 * dv) + 7 * (32 * f(a + 3 * du, c + 4 * dv) +
			7 * f(a + 4 * du, c) + 32 * f(a + 4 * du, c + dv) +
			12 * f(a + 4 * du, c + 2 * dv) + 32 * f(a + 4 * du, c + 3 * dv) +
			7 * f(a + 4 * du, c + 4 * dv)))) / 2025;
}

function cilindro() {
	$("#xFuncText").val("5*cos(u)");
	$("#yFuncText").val("5*sin(u)");
	$("#zFuncText").val("v");
	$("#uMin").val("0");
	$("#uMax").val("2*pi");
	$("#vMin").val("0");
	$("#vMax").val("10");
	processPage();
	resetCamera();
}

function mobius() {
	$("#xFuncText").val("(10+v*cos(1/2*u))*cos(u)");
	$("#yFuncText").val("(10+v*cos(1/2*u))*sin(u)");
	$("#zFuncText").val("v*sin(1/2*u)");
	$("#uMin").val("0");
	$("#uMax").val("2*pi");
	$("#vMin").val("-5");
	$("#vMax").val("5");
	processPage();
	resetCamera();
}

function toro() {
	$("#xFuncText").val("(10+2*cos(v))*cos(u)");
	$("#yFuncText").val("(10+2*cos(v))*sin(u)");
	$("#zFuncText").val("2*sin(v)");
	$("#uMin").val("0");
	$("#uMax").val("2*pi");
	$("#vMin").val("-pi");
	$("#vMax").val("pi");
	processPage();
	resetCamera();
}

function animate() {
	requestAnimationFrame(animate);
	render();
	update();
}

function render() {
	renderer.render(scene, camera);
}

function update() {
	controls.update();
}

function resetCamera() {
	camera.position.set(20, 20, 30);
	camera.up = new THREE.Vector3(0, 0, 1);
	camera.lookAt(new THREE.Vector3(0, 0, 0));
}

function createControls() {
	controls = new THREE.OrbitControls(camera, renderer.domElement);
	controls.enableKeys = false;
	controls.zoomSpeed = 1.5;
}

$(window).on("resize", function () {
	renderer.setSize($("#canvas-container").width(), SCREEN_HEIGHT);
	camera.aspect = $("#canvas-container").width() / SCREEN_HEIGHT;
	camera.updateProjectionMatrix();
	resetCamera();
	createControls();
});

$("#uPos").on("input", function () {
	triedroFrenet(this.value / 100);
});

$("#showLines").on("change", function () {
	contantUV();
});

$("#showFrenet").on("change", function () {
	triedroFrenet($("#uPos").val() / 100);
	if ($("#showFrenet").is(":checked")) {
		$("#uPos").show();
		$("#uOfuPos").show();
	} else {
		$("#uPos").hide();
		$("#uOfuPos").hide();
	}
});