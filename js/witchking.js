function loadModel1() {
    const container = document.getElementById('container_1');

    // Scene
    const scene = new THREE.Scene();

    // Camera
    const camera = new THREE.PerspectiveCamera(115, container.clientWidth / container.clientHeight, 0.1, 1000);
    camera.position.z = 650; // Start at the maximum zoom distance 

    // Renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(container.clientWidth, container.clientHeight);
    container.appendChild(renderer.domElement);

    // Light
    const light = new THREE.DirectionalLight(0xffffff, 1);
    scene.add(light);

    // GLTFLoader 
    const loader = new THREE.GLTFLoader();
    loader.load('models/witchking.glb', function (gltf) { // test mode = raspberrypi4box.glb
        const model = gltf.scene;

        // GENTLEMEN! WE HAZ ACQUIRED ZEH AXIS CONTROL!
        // Rotate 90 degrees around X-axis -- in my case, this has it start facing the camera
        // importing the model into Blender or something similar to rotate it, doesn't seem to matter at all...
        // model.rotation.x = Math.PI / 1.9; 
        model.position.y = 400; // Move it up a bit
        model.scale.set(0.8, 0.8, 0.8); // Scale it up a bit
        model.rotation.x = Math.PI / 2; // Rotate it 90 degrees around the x-axis

        model.traverse((child) => {
            if (child.isMesh) {
                child.material = new THREE.MeshStandardMaterial({ 
                    color: 0x222222, // dökk grár allegedly
                    metalness: 0.9,
                    roughness: 0.1
                });
            }
        });

        scene.add(model);
        animate();
    }, undefined, function (error) {
        console.error(error);
    });

    // Load background texture for this specific model
    const textureLoader = new THREE.TextureLoader();
    const backgroundTexture = textureLoader.load('scenebackground.jpg'); // Load image
    scene.background = backgroundTexture;

    // OrbitControls
    const controls = new THREE.OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true; // an animation loop is required when either damping or auto-rotation are enabled
    controls.dampingFactor = 0.25;
    // controls.minPolarAngle = Math.PI / 2; // set this to make sure that camera won't tilt on the x-axis
    // controls.maxPolarAngle = Math.PI / 2; // set this to make sure that camera won't tilt on the x-axis
    controls.maxAzimuthAngle = Infinity; // Allow infinite horizontal rotation
    controls.minAzimuthAngle = -Infinity; // Allow infinite horizontal rotation
    controls.screenSpacePanning = false;
    controls.minDistance = 1;
    controls.maxDistance = 1000;
    controls.autoRotate = true;
    controls.autoRotateSpeed = 3.5;

    // Animation loop
    function animate() {
        requestAnimationFrame(animate);
        controls.update(); // only required if controls.enableDamping = true, or if controls.autoRotate = true
        light.position.copy(camera.position); // Light follows the camera
        renderer.render(scene, camera);
    }

    // Handle window resize
    window.addEventListener('resize', function () {
        camera.aspect = container.clientWidth / container.clientHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(container.clientWidth, container.clientHeight);
    });
}

// Load Model 1
loadModel1();
