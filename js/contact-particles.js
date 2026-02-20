document.addEventListener('DOMContentLoaded', function () {
    // Wait for everything to load
    setTimeout(initContactParticles, 100);
});

function initContactParticles() {
    const canvas = document.querySelector('canvas.webgl-contact');
    if (!canvas) {
        console.error("Contact canvas not found!");
        return;
    }

    // Scene
    const scene = new THREE.Scene();

    // Camera
    const camera = new THREE.PerspectiveCamera(
        75,
        canvas.clientWidth / canvas.clientHeight,
        0.1,
        1000
    );
    camera.position.z = 4;

    // Renderer
    const renderer = new THREE.WebGLRenderer({
        canvas: canvas,
        alpha: true,
        antialias: true
    });
    renderer.setSize(canvas.clientWidth, canvas.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    // Particles
    const particlesCount = 15000;
    const particlesGeometry = new THREE.BufferGeometry();
    const posArray = new Float32Array(particlesCount * 3);
    const velArray = new Float32Array(particlesCount * 3);

    for (let i = 0; i < particlesCount * 3; i++) {
        posArray[i] = (Math.random() - 0.5) * 7;
        velArray[i] = (Math.random() - 0.5) * 0.015;
    }

    particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));

    // Material
    const particlesMaterial = new THREE.PointsMaterial({
        size: 0.008,
        color: 0x87CEEB,
        transparent: true,
        opacity: 0.7,
        blending: THREE.AdditiveBlending
    });

    // Mesh
    const particlesMesh = new THREE.Points(particlesGeometry, particlesMaterial);
    scene.add(particlesMesh);

    // Animation
    function animate() {
        requestAnimationFrame(animate);

        const time = performance.now() * 0.001;
        particlesMesh.rotation.x = time * 0.1;
        particlesMesh.rotation.y = time * 0.2;

        renderer.render(scene, camera);
    }

    // Handle resize
    function onWindowResize() {
        camera.aspect = canvas.clientWidth / canvas.clientHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(canvas.clientWidth, canvas.clientHeight);
    }

    window.addEventListener('resize', onWindowResize);

    // Start animation
    animate();
}