// particles.js

const canvas = document.querySelector('canvas.webgl');

// Scene
const scene = new THREE.Scene();

// Camera
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.z = 4; // Consistent with previous version

// Renderer
const renderer = new THREE.WebGLRenderer({
    canvas: canvas,
    alpha: true,
    antialias: true
});
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

// Particles - Distribute particles in a spherical shape
const particlesCount = 15000;
const particlesGeometry = new THREE.BufferGeometry();
const posArray = new Float32Array(particlesCount * 3);
const velArray = new Float32Array(particlesCount * 3); // For subtle movement and interaction

const radius = 3.5; // Adjust this value to change the size of the sphere

for (let i = 0; i < particlesCount; i++) {
    // Generate random points within a sphere
    const u = Math.random();
    const v = Math.random();
    const theta = u * 2 * Math.PI; // Azimuthal angle
    const phi = Math.acos(2 * v - 1); // Polar angle
    const r = radius * Math.cbrt(Math.random()); // Random radius within the sphere

    const x = r * Math.sin(phi) * Math.cos(theta);
    const y = r * Math.sin(phi) * Math.sin(theta);
    const z = r * Math.cos(phi);

    posArray[i * 3 + 0] = x;
    posArray[i * 3 + 1] = y;
    posArray[i * 3 + 2] = z;

    // Initialize velocities for subtle drift
    velArray[i * 3 + 0] = (Math.random() - 0.5) * 0.002; // Smaller initial velocity for subtle drift
    velArray[i * 3 + 1] = (Math.random() - 0.5) * 0.002;
    velArray[i * 3 + 2] = (Math.random() - 0.5) * 0.002;
}

particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));

// Material - Keeping white color for hero section
const particlesMaterial = new THREE.PointsMaterial({
    size: 0.008,
    color: 0xffffff,
    transparent: true,
    opacity: 0.7,
    blending: THREE.AdditiveBlending
});

// Mesh
const particlesMesh = new THREE.Points(particlesGeometry, particlesMaterial);
scene.add(particlesMesh);

// Mouse interaction variables
const mouse = {
    x: 0,
    y: 0,
    radius: 0.5 // Interaction radius around the mouse
};

window.addEventListener('mousemove', (event) => {
    // Normalize mouse coordinates to -1 to +1 range
    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
});

// Animation Loop
const clock = new THREE.Clock();
const dampingFactor = 0.98; // To slow down particle movement over time

const animate = () => {
    requestAnimationFrame(animate);

    const time = clock.getElapsedTime();

    // Apply subtle rotation to the entire particle system
    particlesMesh.rotation.x = time * 0.05; // Slower rotation
    particlesMesh.rotation.y = time * 0.1;  // Slower rotation

    // Update individual particle positions and apply interaction
    for (let i = 0; i < particlesCount; i++) {
        const i3 = i * 3;

        // Get current particle position
        let px = posArray[i3 + 0];
        let py = posArray[i3 + 1];
        let pz = posArray[i3 + 2];

        // Convert mouse coordinates to world coordinates (approximate for 2D interaction on 3D plane)
        // This is a simplified approach. For true 3D interaction, raycasting would be needed.
        // For a subtle effect, treating mouse.x/y as affecting x/y in world space is often sufficient.
        let mouseWorldX = mouse.x * (camera.position.z * Math.tan(camera.fov / 2 * Math.PI / 180) * camera.aspect);
        let mouseWorldY = mouse.y * (camera.position.z * Math.tan(camera.fov / 2 * Math.PI / 180));

        // Calculate distance to mouse for interaction
        const dx = px - mouseWorldX;
        const dy = py - mouseWorldY;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < mouse.radius) {
            const force = (mouse.radius - dist) / mouse.radius; // Stronger force closer to mouse
            velArray[i3 + 0] += dx * force * 0.001; // Apply repulsive force
            velArray[i3 + 1] += dy * force * 0.001;
        }

        // Apply damping to velocities
        velArray[i3 + 0] *= dampingFactor;
        velArray[i3 + 1] *= dampingFactor;
        velArray[i3 + 2] *= dampingFactor;

        // Update position based on velocity
        posArray[i3 + 0] += velArray[i3 + 0];
        posArray[i3 + 1] += velArray[i3 + 1];
        posArray[i3 + 2] += velArray[i3 + 2];

        // Optional: Keep particles within bounds or reset if they drift too far
        // For a spherical distribution, we can check if they are outside the initial radius
        const currentRadiusSq = px * px + py * py + pz * pz;
        if (currentRadiusSq > (radius * 1.2) ** 2) { // If too far, gently pull them back or reset
            const factor = 0.001;
            velArray[i3 + 0] -= px * factor;
            velArray[i3 + 1] -= py * factor;
            velArray[i3 + 2] -= pz * factor;
        }
    }

    particlesGeometry.attributes.position.needsUpdate = true; // Tell Three.js to update positions

    renderer.render(scene, camera);
};

// Handle window resizing
window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});

// Start animation
animate();
