// STANDART GLOBAL VARIABLES
let canvas_container, scene, camera, renderer, controls;
let clock = new THREE.Clock();
let SCREEN_WIDTH = $("#canvas-container").width(), SCREEN_HEIGHT = 500;

// CUSTOM GLOBAL VARIABLES

let grownRatio = 200;
let planes = [];
let needAtt = true;

let singleGeometry;

let planeTexture = new THREE.TextureLoader().load("../imagens/square.png");
planeTexture.wrapS = planeTexture.wrapT = THREE.RepeatWrapping;
planeTexture.repeat.set(1, 1);
let planeMaterial = new THREE.MeshBasicMaterial({ map: planeTexture, color: 0xe19c24, side: THREE.DoubleSide });;

init();
animate();

function init() {

	canvas_container = document.getElementById("canvas-container");

	let VIEW_ANGLE = 45, ASPECT = SCREEN_WIDTH / SCREEN_HEIGHT, NEAR = 0.01, FAR = 2000;

	// SCENE
	scene = new THREE.Scene();

	// CAMERA
	camera = new THREE.PerspectiveCamera(VIEW_ANGLE, SCREEN_WIDTH / SCREEN_HEIGHT, NEAR, FAR);
	resetCamera();
	scene.add(camera);

	// RENDERER
	renderer = new THREE.WebGLRenderer({ alpha: true });
	renderer.setSize(SCREEN_WIDTH, SCREEN_HEIGHT);
	renderer.setClearColor(0xccccff, 1);
	canvas_container.appendChild(renderer.domElement);

	// CONTROLS
	createControls();

	processPage();
}

function processPage() {
	createGraph();
	calculateArea();
	calculatePerimeter();
	$("#N").text("`n : " + parseInt($("#nIndex").val()) + "`");
	MathJax.Hub.Queue(["Typeset", MathJax.Hub, document.getElementById("N")]);
	MathJax.Hub.Queue(["Typeset", MathJax.Hub, document.getElementById("area")]);
	MathJax.Hub.Queue(["Typeset", MathJax.Hub, document.getElementById("perimeter")]);
}

function createGraph() {
	let maxRecursion = parseInt($("#nIndex").val());

	if (maxRecursion > 10) {
		maxRecursion = 10;
		if (planes.length > 88000) needAtt = false;
	}
	if (maxRecursion < 10) needAtt = true;

	if (needAtt) {
		while (scene.children.length > 0) {
			scene.remove(scene.children[0]);
		}
		planes.splice(0, planes.length);

		singleGeometry = new THREE.Geometry();

		planes[0] = new Plane(0, 0, 1, 0, "up");
		singleGeometry.mergeMesh(planes[0].getMesh());

		planes[0].createChildren(maxRecursion);

		let singleMesh = new THREE.Mesh(singleGeometry, planeMaterial);
		scene.add(singleMesh);
	}
}

function Plane(x, y, sideLength, index, location) {
	this.x = x;
	this.y = y;
	this.sideLength = sideLength;
	this.index = index;
	this.location = location;

	this.getMesh = function () {
		let planeGeometry = new THREE.PlaneGeometry(this.sideLength * grownRatio, this.sideLength * grownRatio);
		let planeMesh = new THREE.Mesh(planeGeometry, planeMaterial);
		planeMesh.translateX(this.x * grownRatio);
		planeMesh.translateY(this.y * grownRatio);
		planeMesh.translateZ(0);
		return planeMesh;
	}

	this.createChildren = function (maxRecursion) {
		if (this.index == maxRecursion) return;
		if (this.location == "right") {
			planes.push(
				new Plane(this.x + this.sideLength * 2 / 3, this.y, this.sideLength / 3, this.index + 1, "right"),
				new Plane(this.x, this.y + this.sideLength * 2 / 3, this.sideLength / 3, this.index + 1, "up"),
				new Plane(this.x, this.y - this.sideLength * 2 / 3, this.sideLength / 3, this.index + 1, "down"),
			);
		} else if (this.location == "up") {
			planes.push(
				new Plane(this.x + this.sideLength * 2 / 3, this.y, this.sideLength / 3, this.index + 1, "right"),
				new Plane(this.x, this.y + this.sideLength * 2 / 3, this.sideLength / 3, this.index + 1, "up"),
				new Plane(this.x - this.sideLength * 2 / 3, this.y, this.sideLength / 3, this.index + 1, "left"),
			);
		} else if (this.location == "left") {
			planes.push(
				new Plane(this.x, this.y + this.sideLength * 2 / 3, this.sideLength / 3, this.index + 1, "up"),
				new Plane(this.x - this.sideLength * 2 / 3, this.y, this.sideLength / 3, this.index + 1, "left"),
				new Plane(this.x, this.y - this.sideLength * 2 / 3, this.sideLength / 3, this.index + 1, "down"),
			);
		} else if (this.location == "down") {
			planes.push(
				new Plane(this.x + this.sideLength * 2 / 3, this.y, this.sideLength / 3, this.index + 1, "right"),
				new Plane(this.x - this.sideLength * 2 / 3, this.y, this.sideLength / 3, this.index + 1, "left"),
				new Plane(this.x, this.y - this.sideLength * 2 / 3, this.sideLength / 3, this.index + 1, "down"),
			);
		}
		let size = planes.length;
		singleGeometry.mergeMesh(planes[size - 3].getMesh());
		singleGeometry.mergeMesh(planes[size - 2].getMesh());
		singleGeometry.mergeMesh(planes[size - 1].getMesh());
		planes[size - 3].createChildren(maxRecursion);
		planes[size - 2].createChildren(maxRecursion);
		planes[size - 1].createChildren(maxRecursion);
	}
}

function calculateArea() {
	let n = parseInt($("#nIndex").val());
	let area = 1 / 2 * Math.pow(3, -n) * (-1 + Math.pow(3, n + 1));
	$("#area").text("`A(" + n + ")=" + area.toPrecision(10) + "cm^2`");
}

function calculatePerimeter() {
	let n = parseInt($("#nIndex").val());
	let perimeter = 4 + 2 * n;
	$("#perimeter").text("`P(" + n + ")=" + perimeter.toPrecision(10) + "cm`");
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
	camera.position.set(0, 0, 550);
	camera.up = new THREE.Vector3(0, 1, 0);
	camera.lookAt(new THREE.Vector3(0, 0, 0));
	camera.updateProjectionMatrix();
}

function createControls() {
	controls = new THREE.OrbitControls(camera, renderer.domElement);
	controls.enableRotate = false;
	controls.enableKeys = false;
	controls.zoomSpeed = 2;
}

$(window).on("resize", function () {
	camera.aspect = $("#canvas-container").width() / SCREEN_HEIGHT;
	camera.updateProjectionMatrix();
	renderer.setSize($("#canvas-container").width(), SCREEN_HEIGHT);
});

$("#nIndex").on("change", function () {
	processPage();
});
