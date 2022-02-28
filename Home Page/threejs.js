import * as THREE from 'https://cdn.skypack.dev/pin/three@v0.138.0-zvVD8VzksUZ5anXAslX5/mode=imports/optimized/three.js';

function threeProgram() {
    let display = $("#mainDisplay");
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(70, 1, .1, 1000);
    const renderer = new THREE.WebGLRenderer();
    

    let rows = 5;
    let cols = 5;
    let gap = 3.5;
    let startingX = 0 - (cols - 1 * gap) - cols;
    let startingY = 0 - (rows - 1 * gap) - rows;

    function getPreferredSize() {
        return Math.min(display.width(), display.height());
    }

    renderer.setSize(getPreferredSize(), getPreferredSize());
    renderer.setPixelRatio(window.devicePixelRatio);

    display.append(renderer.domElement);

    let cubes = [];
    let colors = [0xFF0000, 0x00FF00, 0x0000FF];
    const boxGeometry = new THREE.BoxGeometry(1, 1, 1);
    const material = new THREE.MeshPhongMaterial({color: 0x00FF00});
    const light = new THREE.DirectionalLight(0xFFFFFF, 1);
    light.position.set(0, 0, 9);
    scene.add(light);

    for (let i = 0; i < rows * cols; i++) {
        const material = new THREE.MeshPhongMaterial({color: colors[i % colors.length]});
        console.log(material);
        let cube = new THREE.Mesh(boxGeometry, material);
        cube.position.set(startingX + (i % cols * gap), startingY + (~~(i / rows) * gap), 0);
        scene.add(cube);
        cubes.push(cube);
    }

    camera.position.z = 15;
    // cubes[0].position.set(2, 2, 0);
    // cubes[1].position.set(-2, -2, 0);
    // cubes[2].position.set(2, -2, 0);
    // cubes[3].position.set(-2, 2, 0);


    function animate() {
        window.requestAnimationFrame(animate);
        renderer.setSize(getPreferredSize(), getPreferredSize());
        renderer.render(scene, camera);
        cubes.forEach(cube => { 
            cube.rotation.z += 0.01;
            cube.rotation.x += 0.01;
         });
    }

    animate();
}

window.addEventListener('load', threeProgram);



