// STANDART GLOBAL VARIABLES
let canvas_container, scene, camera, renderer, controls, stats;
let clock = new THREE.Clock();
let SCREEN_WIDTH = $("#canvas-container").width(), SCREEN_HEIGHT = 500;

// CUSTOM GLOBAL VARIABLES
let xFuncText, yFuncText, zFuncText,
	xFieldFuncText, yFieldFuncText, zFieldFuncText,
	xFunc, yFunc, zFunc,
	xFieldFunc, yFieldFunc, zFieldFunc,
	uMin, uMax, uRange,
	vMin, vMax, vRange,
	dxu, dyu, dzu, dxv, dyv, dzv;

let graphMesh, fieldMesh = [];

init();
animate();

function init() {

	canvas_container = document.getElementById("canvas-container");

	let VIEW_ANGLE = 45, ASPECT = SCREEN_WIDTH / SCREEN_HEIGHT, NEAR = 0.01, FAR = 1000;

	// SCENE
	scene = new THREE.Scene();

	// CAMERA
	camera = new THREE.PerspectiveCamera(VIEW_ANGLE, SCREEN_WIDTH / SCREEN_HEIGHT, NEAR, FAR);
	scene.add(camera);
	camera.position.set(20, 20, 30);
	camera.up = new THREE.Vector3(0, 0, 1);
	camera.lookAt(new THREE.Vector3(0, 0, 0));

	// RENDERER
	renderer = new THREE.WebGLRenderer({ alpha: true });
	renderer.setSize(SCREEN_WIDTH, SCREEN_HEIGHT);
	renderer.setClearColor(0xccccff, 1);
	canvas_container.appendChild(renderer.domElement);

	// CONTROLS
	createControls();

	// SKYBOX/FOG
	scene.fog = new THREE.FogExp2(0x888888, 0.001);

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
	xFuncText = $("#xFuncText").val();
	yFuncText = $("#yFuncText").val();
	zFuncText = $("#zFuncText").val();
	xFieldFuncText = $("#xFieldFuncText").val();
	yFieldFuncText = $("#yFieldFuncText").val();
	zFieldFuncText = $("#zFieldFuncText").val();
	xFunc = nerdamer(xFuncText).buildFunction(["u", "v"]);
	yFunc = nerdamer(yFuncText).buildFunction(["u", "v"]);
	zFunc = nerdamer(zFuncText).buildFunction(["u", "v"]);
	let subs = { x: xFuncText, y: yFuncText, z: zFuncText };
	xFieldFunc = nerdamer(xFieldFuncText, subs).buildFunction(["u", "v"]);
	yFieldFunc = nerdamer(yFieldFuncText, subs).buildFunction(["u", "v"]);
	zFieldFunc = nerdamer(zFieldFuncText, subs).buildFunction(["u", "v"]);
	uMin = nerdamer($("#uMin").val()).evaluate().valueOf();
	uMax = nerdamer($("#uMax").val()).evaluate().valueOf();
	vMin = nerdamer($("#vMin").val()).evaluate().valueOf();
	vMax = nerdamer($("#vMax").val()).evaluate().valueOf();
	uRange = uMax - uMin;
	vRange = vMax - vMin;
	dxu = nerdamer.diff(xFuncText, "u").buildFunction(["u", "v"]);
	dyu = nerdamer.diff(yFuncText, "u").buildFunction(["u", "v"]);
	dzu = nerdamer.diff(zFuncText, "u").buildFunction(["u", "v"]);
	dxv = nerdamer.diff(xFuncText, "v").buildFunction(["u", "v"]);
	dyv = nerdamer.diff(yFuncText, "v").buildFunction(["u", "v"]);
	dzv = nerdamer.diff(zFuncText, "v").buildFunction(["u", "v"]);

	createGraph();

	showField();

	calculateFlow();
}

function createGraph() {
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

function showField() {
	if (fieldMesh[0]) {
		for (let i = 0; i < fieldMesh.length; i++) {
			scene.remove(fieldMesh[i]);
		}
	}
	if ($("#showField").is(":checked")) {
		let np = 10;
		let du = uRange / np;
		let dv = vRange / np;
		let ut, vt;

		for (let i = 0; i < np; i++) {
			ut = uMin + i * du;
			for (let j = 0; j < np; j++) {
				vt = vMin + j * dv;
				let from = new THREE.Vector3(xFunc(ut, vt), yFunc(ut, vt), zFunc(ut, vt));
				let direction = new THREE.Vector3(xFieldFunc(ut, vt), yFieldFunc(ut, vt), zFieldFunc(ut, vt));
				fieldMesh[i * np + j] = new THREE.ArrowHelper(direction.clone().normalize(), from, direction.length(), 0x1E63DB);
				scene.add(fieldMesh[i * np + j]);
			}
		}
	}
}

function calculateFlow() {
	let dFlow = function (u0, v0) {
		return dot(
			[
				dyu(u0, v0) * dzv(u0, v0) - dyv(u0, v0) * dzu(u0, v0),
				dxv(u0, v0) * dzu(u0, v0) - dxu(u0, v0) * dzv(u0, v0),
				dxu(u0, v0) * dyv(u0, v0) - dxv(u0, v0) * dyu(u0, v0)
			],
			[
				xFieldFunc(u0, v0), yFieldFunc(u0, v0), zFieldFunc(u0, v0)
			]
		);
	}
	let np = 25;
	let du = uRange / np;
	let dv = vRange / np;
	let ft = 0, ut, vt;

	for (let i = 0; i < np; i++) {
		ut = uMin + i * du;
		for (let j = 0; j < np; j++) {
			vt = vMin + j * dv;
			ft += boole2D(dFlow, ut, ut + du, vt, vt + dv);
		}
	}
	//if (ft < Math.pow(1, -10)) { ft = 0; }
	$("#area").text("`phi=" + ft.toPrecision(10) + "`");
	MathJax.Hub.Queue(["Typeset", MathJax.Hub, document.getElementById("area")]);
}

function norm(v) {
	return Math.sqrt(Math.pow(v[0], 2) + Math.pow(v[1], 2) + Math.pow(v[2], 2));
}

function dot(v1, v2) {
	return v1[0] * v2[0] + v1[1] * v2[1] + v1[2] * v2[2];
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

$("#showField").on("change", function () {
	showField();
});