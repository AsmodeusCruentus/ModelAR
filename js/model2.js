function loadModel2() {
    const container = document.getElementById('container_2');
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(115, container.clientWidth / container.clientHeight, 0.1, 1000);
    camera.position.z = 500; // Closer zoom for this model

    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(container.clientWidth, container.clientHeight);
    container.appendChild(renderer.domElement);

    // Background for this model
    const textureLoader = new THREE.TextureLoader();
    scene.background = textureLoader.load('scenebackground.jpg');

    const light = new THREE.DirectionalLight(0xffffff, 1);
    scene.add(light);

    const loader = new THREE.GLTFLoader();
    loader.load('models/model2.glb', function (gltf) {
        const model = gltf.scene;
        model.position.set(0, 300, 0); // Different position for this model
        model.rotation.set(0, Math.PI / 3, 0); // Different rotation
        model.scale.set(1.2, 1.2, 1.2); // Different scale

        scene.add(model);
        animate();
    });

    const controls = new THREE.OrbitControls(camera, renderer.domElement);
    controls.autoRotate = true;
    controls.autoRotateSpeed = 5;

    function animate() {
        requestAnimationFrame(animate);
        controls.update();
        renderer.render(scene, camera);
    }

    window.addEventListener('resize', function () {
        camera.aspect = container.clientWidth / container.clientHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(container.clientWidth, container.clientHeight);
    });
}

loadModel2();
