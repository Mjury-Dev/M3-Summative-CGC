import * as THREE from './three.module.js';
import { MapControls } from './MapControls.js';
import { GLTFLoader } from './GLTFLoader.js';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
scene.background = new THREE.Color(0x000000);
scene.fog = new THREE.FogExp2(0x000000, 0.02); // Add fog with a color and density

camera.position.set(-10, 5, 50);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap; // Set shadow map type
document.body.appendChild(renderer.domElement);

// Map Controls
const controls = new MapControls(camera, renderer.domElement);
controls.enableDamping = true;

// Textures
const floorTexture = new THREE.TextureLoader().load('assets/textures/tiles.png');
floorTexture.wrapS = THREE.RepeatWrapping;
floorTexture.wrapT = THREE.RepeatWrapping;
floorTexture.repeat.set(1, 4);
const wallTexture = new THREE.TextureLoader().load('assets/textures/poolroomtiles.png');
wallTexture.wrapS = THREE.RepeatWrapping;
wallTexture.wrapT = THREE.RepeatWrapping;
wallTexture.repeat.set(1.5, 1.5);

const wallLightTexture = new THREE.TextureLoader().load('assets/textures/LIGHT.png');
wallLightTexture.wrapS = THREE.RepeatWrapping;
wallLightTexture.wrapT = THREE.RepeatWrapping;
wallLightTexture.repeat.set(0.3, 0.3);

// Load door texture
const doorTexture = new THREE.TextureLoader().load('assets/textures/snakelady.jpg');

// Lights
const dl = new THREE.DirectionalLight(0xffffff, 2); // Increased intensity
dl.position.set(5, 20, 10);
dl.castShadow = true; // Enable shadow casting for the directional light
scene.add(dl);

const al = new THREE.AmbientLight(0xa3a3a3, 1); // Increased intensity
scene.add(al);

const pointLight = new THREE.PointLight(0xffffff, 10.8); // Increased intensity
pointLight.position.set(0, 30, 0);
pointLight.castShadow = true; // Enable shadow casting for the point light
scene.add(pointLight);

// Animate the light intensity
function animateLights() {
    requestAnimationFrame(animateLights);

    // Change the light intensity over time
    const time = performance.now() * 0.0001; // Convert milliseconds to seconds
    const intensity = Math.sin(time) * 0.1 + 0.1; // Example animation function
    pointLight.intensity = intensity;
}
animateLights();

// Water model
// Load water texture
const waterTexture = new THREE.TextureLoader().load('assets/textures/Water_1_M_Normal.png');

// Create water material
const waterMaterial = new THREE.MeshBasicMaterial({ map: waterTexture });

// Create water geometry
const waterGeometry = new THREE.PlaneGeometry(40, 100);

// Create water mesh
const water = new THREE.Mesh(waterGeometry, waterMaterial);
water.rotation.x = -Math.PI / 2; // Rotate to be horizontal
water.position.set(0, -0.5, 0); // Adjust position if necessary
scene.add(water);
water.position.z = 30;

// Floor
const floorGeometry = new THREE.BoxGeometry(10, 1, 100);
const floorMaterial = new THREE.MeshStandardMaterial({ map: floorTexture });
const floor = new THREE.Mesh(floorGeometry, floorMaterial);
floor.receiveShadow = false;
scene.add(floor);

const floorGeometry2 = new THREE.BoxGeometry(10, 1, 100);
const floorMaterial2 = new THREE.MeshStandardMaterial({ map: floorTexture });
const floor2 = new THREE.Mesh(floorGeometry2, floorMaterial2);
floor2.receiveShadow = false;
scene.add(floor2);

floor.position.x = -10.5;
floor.position.y = 0;
floor.position.z = 30;
floor2.position.x = 10.5;
floor2.position.y = 0;
floor2.position.z = 30;

// Walls
const wallGeometry = new THREE.BoxGeometry(1, 20, 170);
const wallGeometry2 = new THREE.BoxGeometry(40, 30, 1);

// Wall 3
const wallGeometry3 = new THREE.BoxGeometry(1, 5, 120); // Bottom half of the wall
const wallGeometry3T = new THREE.BoxGeometry(1, 5, 120); // Top half of the wall

const wallGeometry3side1 = new THREE.BoxGeometry(1, 15, 20); // Wall segment 1
const wallGeometry3side2 = new THREE.BoxGeometry(1, 15, 20); // Wall segment 2
const wallGeometryLight = new THREE.BoxGeometry(1, 15, 120);
const wallGeometryLighttop = new THREE.BoxGeometry(45, 1, 120);

const wallMaterial = new THREE.MeshStandardMaterial({ map: wallTexture });
const wallMaterialLight = new THREE.MeshStandardMaterial({ map: wallLightTexture });

const wall = new THREE.Mesh(wallGeometry, wallMaterial);
wall.castShadow = true; // Enable shadow casting for walls
wall.receiveShadow = true;
const wall2 = new THREE.Mesh(wallGeometry2, wallMaterial);
wall2.castShadow = true;
wall2.receiveShadow = true;

// Wall 3
const wall3 = new THREE.Mesh(wallGeometry3, wallMaterial);
wall3.castShadow = true;
wall3.receiveShadow = true;
const wall3top = new THREE.Mesh(wallGeometry3T, wallMaterial);
wall3top.castShadow = true;
wall3top.receiveShadow = true;
const wall3side1 = new THREE.Mesh(wallGeometry3side1, wallMaterial);
wall3side1.castShadow = true;
wall3side1.receiveShadow = true;
const wall3side2 = new THREE.Mesh(wallGeometry3side2, wallMaterial);
wall3side2.castShadow = true;
wall3side2.receiveShadow = true;
const wall3side3 = new THREE.Mesh(wallGeometry3side1, wallMaterial);
wall3side3.castShadow = true;
wall3side3.receiveShadow = true;
const wall3side4 = new THREE.Mesh(wallGeometry3side1, wallMaterial);
wall3side4.castShadow = true;
wall3side4.receiveShadow = true;
const wall3side5 = new THREE.Mesh(wallGeometry3side2, wallMaterial);
wall3side5.castShadow = true;
wall3side5.receiveShadow = true;

// Top wall left and right
const wallGeometryTop = new THREE.BoxGeometry(25, 1, 120);
const wallTopR = new THREE.Mesh(wallGeometryTop, wallMaterial);
wallTopR.castShadow = true;
wallTopR.receiveShadow = true;
const wallTopL = new THREE.Mesh(wallGeometryTop, wallMaterial);
wallTopL.castShadow = true;
wallTopL.receiveShadow = true;
scene.add(wallTopR);
scene.add(wallTopL);

// Light source side
const walllight = new THREE.Mesh(wallGeometryLight, wallMaterialLight);
walllight.castShadow = true;
walllight.receiveShadow = true;
const walllighttop = new THREE.Mesh(wallGeometryLighttop, wallMaterialLight);
walllighttop.castShadow = true;
walllighttop.receiveShadow = true;

// Back wall
const wallback = new THREE.Mesh(wallGeometry2, wallMaterial);
wallback.castShadow = true;
wallback.receiveShadow = true;
scene.add(wall);
scene.add(wall2); // Front
scene.add(wallback); // Back

// Window side
scene.add(wall3);
scene.add(wall3top);
scene.add(wall3side1);
scene.add(wall3side2);
scene.add(wall3side3);
scene.add(wall3side4);
scene.add(wall3side5);

// Light sources
scene.add(walllight);
scene.add(walllighttop);

// Wall adjustments
wall.position.x = -20.5;
wall.position.y = 9.5;
wall.position.z = 65;
wall2.position.y = 9.5;
wall2.position.z = -20.5;

// Windowed walls
wall3.position.x = 20.5;
wall3.position.y = 2; // Bottom side of the wall
wall3.position.z = 25;

wall3top.position.y = 17;
wall3top.position.z = 25;
wall3top.position.x = 20;

wall3side1.position.y = 10;
wall3side1.position.z = -10;
wall3side1.position.x = 20;

wall3side2.position.y = 10;
wall3side2.position.z = 15;
wall3side2.position.x = 20;

wall3side3.position.y = 10;
wall3side3.position.z = 40;
wall3side3.position.x = 20;

wall3side4.position.y = 10;
wall3side4.position.z = 65;
wall3side4.position.x = 20;

// Full wall
wall3side5.position.y = 10;
wall3side5.position.z = 90;
wall3side5.position.x = 20;

// Wall that functions as light
walllight.position.y = 10;
walllight.position.z = 50;
walllight.position.x = 21;
walllighttop.position.y = 21;
walllighttop.position.z = 40;

// Back wall
wallback.position.y = 9.5;
wallback.position.z = 80.5;

// Top wall
wallTopR.position.y = 20;
wallTopR.position.z = 40;
wallTopR.position.x = 15;

wallTopL.position.y = 20;
wallTopL.position.z = 40;
wallTopL.position.x = -15;

// Door
const doorGeometry = new THREE.CylinderGeometry(5, 5, 20, 32);
const doorMaterial = new THREE.MeshStandardMaterial({ map: doorTexture }); // Apply the door texture
const cylinder = new THREE.Mesh(doorGeometry, doorMaterial);
cylinder.castShadow = true;
cylinder.receiveShadow = true;
scene.add(cylinder);
cylinder.rotation.x = Math.PI / 2;
cylinder.position.x = -10.5;
cylinder.position.y = Math.PI / 0.8;
cylinder.position.z = -29.1;

// Hollow Cylinder (Wall around the Door)
const outerCylinderGeometry = new THREE.CylinderGeometry(5.1, 5.1, 22, 32, 1, true); // True for open-ended
const outerCylinderMaterial = new THREE.MeshStandardMaterial({ map: wallTexture, side: THREE.DoubleSide });
const outerCylinder = new THREE.Mesh(outerCylinderGeometry, outerCylinderMaterial);
outerCylinder.castShadow = true;
outerCylinder.receiveShadow = true;

// Position the outer cylinder
outerCylinder.position.copy(cylinder.position);
outerCylinder.rotation.copy(cylinder.rotation);

scene.add(outerCylinder);

// Particle System
const particleCount = 1000;
const positions = new Float32Array(particleCount * 3);
const velocities = new Float32Array(particleCount * 3);

// Initialize particle positions and velocities
for (let i = 0; i < particleCount; i++) {
    const i3 = i * 3;
    positions[i3] = Math.random() * 40 - 20; // x
    positions[i3 + 1] = Math.random() * 20; // y
    positions[i3 + 2] = Math.random() * 100 - 20; // z

    // Random initial velocities for particles
    velocities[i3] = (Math.random() - 0.5) * 0.1; // x
    velocities[i3 + 1] = (Math.random() - 0.5) * 0.1; // y
    velocities[i3 + 2] = (Math.random() - 0.5) * 0.1; // z
}

// Set up BufferGeometry and attributes
const particleGeometry = new THREE.BufferGeometry();
particleGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));

// Set up particle material
const particleMaterial = new THREE.PointsMaterial({
    color: 0xffffff,
    size: 0.2
});

// Create particle system
const particleSystem = new THREE.Points(particleGeometry, particleMaterial);
scene.add(particleSystem);

// Animation loop to update particle positions
function animateParticles() {
    const positionAttribute = particleGeometry.getAttribute('position');

    for (let i = 0; i < particleCount; i++) {
        const i3 = i * 3;

        // Update particle positions based on velocities
        positionAttribute.array[i3] += velocities[i3] * 0.2;
        positionAttribute.array[i3 + 1] += velocities[i3 + 1] * 1;
        positionAttribute.array[i3 + 2] += velocities[i3 + 2] * 0.4;

        // Reset particles if they go out of bounds
        if (positionAttribute.array[i3] > 20 || positionAttribute.array[i3] < -20 ||
            positionAttribute.array[i3 + 1] > 20 || positionAttribute.array[i3 + 1] < 0 ||
            positionAttribute.array[i3 + 2] > 80 || positionAttribute.array[i3 + 2] < -20) {
            positionAttribute.array[i3] = Math.random() * 40 - 20;
            positionAttribute.array[i3 + 1] = Math.random() * 20;
            positionAttribute.array[i3 + 2] = Math.random() * 100 - 20;
        }
    }

    positionAttribute.needsUpdate = true; // Notify Three.js that positions have been updated
}

// Update the rendering loop to include the dynamic lights
function animate() {
    requestAnimationFrame(animate);
    controls.update();
    animateParticles();
    renderer.render(scene, camera);
    // Optionally, update other dynamic elements or interactions here.
}
animate();
