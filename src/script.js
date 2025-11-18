import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

// Main application for cube selection with raycasting
class CubeSelectionApp {
    constructor() {
        this.scene = null;
        this.camera = null;
        this.renderer = null;
        this.controls = null; // OrbitControls
        this.raycaster = null;
        this.mouse = null;
        this.cubes = [];
        this.selectedCube = null;
        
        this.init();
    }

    init() {
        // Create scene
        this.scene = new THREE.Scene();
        this.scene.background = new THREE.Color(0x1a1a2e);
        
        // Setup camera
        this.setupCamera();
        
        // Setup renderer
        this.setupRenderer();
        
        // Setup orbit controls
        this.setupOrbitControls();
        
        // Setup lighting
        this.setupLighting();
        
        // Create cubes grid
        this.createCubesGrid();
        
        // Setup raycasting
        this.setupRaycasting();
        
        // Event listeners
        this.setupEventListeners();
        
        // Start animation loop
        this.animate();
    }

    setupCamera() {
        this.camera = new THREE.PerspectiveCamera(
            75,
            window.innerWidth / window.innerHeight,
            0.1,
            1000
        );
        this.camera.position.set(10, 8, 12);
        this.camera.lookAt(0, 0, 0);
    }

    setupRenderer() {
        this.renderer = new THREE.WebGLRenderer({ antialias: true });
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        this.renderer.shadowMap.enabled = true;
        this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;
        document.body.appendChild(this.renderer.domElement);
    }

    setupOrbitControls() {
        this.controls = new OrbitControls(this.camera, this.renderer.domElement);
        this.controls.enableDamping = true;
        this.controls.dampingFactor = 0.05;
        this.controls.screenSpacePanning = false;
        this.controls.minDistance = 5;
        this.controls.maxDistance = 50;
    }

    setupLighting() {
        // Ambient light
        const ambientLight = new THREE.AmbientLight(0xffffff, 0.4);
        this.scene.add(ambientLight);
        
        // Directional light
        const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
        directionalLight.position.set(10, 15, 10);
        directionalLight.castShadow = true;
        directionalLight.shadow.mapSize.width = 2048;
        directionalLight.shadow.mapSize.height = 2048;
        this.scene.add(directionalLight);
        
        // Point light for better cube visibility
        const pointLight = new THREE.PointLight(0xffffff, 0.5);
        pointLight.position.set(-5, 8, -5);
        this.scene.add(pointLight);
    }

    createCubesGrid() {
        const gridSize = 3; // 3x3 grid = 9 cubes
        const spacing = 2.5;
        
        const cubeGeometry = new THREE.BoxGeometry(1, 1, 1);
        
        for (let x = 0; x < gridSize; x++) {
            for (let z = 0; z < gridSize; z++) {
                // Create unique color for each cube
                const hue = (x * gridSize + z) / (gridSize * gridSize);
                const color = new THREE.Color().setHSL(hue, 0.8, 0.6);
                
                const cubeMaterial = new THREE.MeshPhongMaterial({ 
                    color: color,
                    shininess: 60,
                    specular: 0x222222
                });
                
                const cube = new THREE.Mesh(cubeGeometry, cubeMaterial);
                cube.castShadow = true;
                cube.receiveShadow = true;
                
                // Position cube in grid
                cube.position.x = (x - (gridSize - 1) / 2) * spacing;
                cube.position.y = 0;
                cube.position.z = (z - (gridSize - 1) / 2) * spacing;
                
                // Name the cube
                cube.name = `Cube-${x}-${z}`;
                cube.userData.originalColor = color.clone();
                cube.userData.originalScale = new THREE.Vector3(1, 1, 1);
                
                this.scene.add(cube);
                this.cubes.push(cube);
            }
        }
        
        // Add a ground plane for better visual reference
        const groundGeometry = new THREE.PlaneGeometry(20, 20);
        const groundMaterial = new THREE.MeshPhongMaterial({ 
            color: 0x2c3e50,
            shininess: 30
        });
        const ground = new THREE.Mesh(groundGeometry, groundMaterial);
        ground.rotation.x = -Math.PI / 2;
        ground.position.y = -1;
        ground.receiveShadow = true;
        this.scene.add(ground);
    }

    setupRaycasting() {
        this.raycaster = new THREE.Raycaster();
        this.mouse = new THREE.Vector2();
    }

    setupEventListeners() {
        // Mouse click event
        window.addEventListener('click', (event) => this.onMouseClick(event));
        
        // Window resize event
        window.addEventListener('resize', () => this.onWindowResize());
        
        // Add some keyboard controls for fun
        window.addEventListener('keydown', (event) => this.onKeyDown(event));
    }

    onMouseClick(event) {
        // Calculate mouse position in normalized device coordinates
        this.mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
        this.mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
        
        // Update the raycaster
        this.raycaster.setFromCamera(this.mouse, this.camera);
        
        // Find intersected objects
        const intersects = this.raycaster.intersectObjects(this.cubes);
        
        if (intersects.length > 0) {
            const clickedCube = intersects[0].object;
            this.selectCube(clickedCube);
        }
    }

    selectCube(cube) {
        // Reset previously selected cube
        if (this.selectedCube) {
            this.resetCube(this.selectedCube);
        }
        
        // Select new cube
        this.selectedCube = cube;
        
        // Change color to selection color (gold)
        cube.material.color.set(0xffd700);
        cube.material.emissive.set(0x333300);
        
        // Scale up
        cube.scale.set(1.3, 1.3, 1.3);
        
        // Update UI
        this.updateSelectionInfo(cube.name);
        
        // Log selection to console
        console.log(`Selected: ${cube.name}`);
    }

    resetCube(cube) {
        // Reset color to original
        cube.material.color.copy(cube.userData.originalColor);
        cube.material.emissive.set(0x000000);
        
        // Reset scale
        cube.scale.copy(cube.userData.originalScale);
    }

    updateSelectionInfo(cubeName) {
        const cubeNameElement = document.getElementById('cube-name');
        cubeNameElement.textContent = cubeName;
        cubeNameElement.style.color = '#ffd700';
        cubeNameElement.style.fontWeight = 'bold';
    }

    onKeyDown(event) {
        switch(event.key) {
            case 'Escape':
                // Deselect current cube
                if (this.selectedCube) {
                    this.resetCube(this.selectedCube);
                    this.selectedCube = null;
                    this.updateSelectionInfo('None');
                }
                break;
            case 'r':
            case 'R':
                // Randomly select a cube
                const randomCube = this.cubes[Math.floor(Math.random() * this.cubes.length)];
                this.selectCube(randomCube);
                break;
        }
    }

    onWindowResize() {
        this.camera.aspect = window.innerWidth / window.innerHeight;
        this.camera.updateProjectionMatrix();
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        
        // Update controls aspect ratio
        if (this.controls) {
            this.controls.update();
        }
    }

    animate() {
        requestAnimationFrame(() => this.animate());
        
        // Update controls
        if (this.controls) {
            this.controls.update();
        }
        
        // Gentle rotation animation for visual appeal
        this.cubes.forEach((cube, index) => {
            const time = Date.now() * 0.001;
            cube.rotation.y = Math.sin(time + index * 0.5) * 0.1;
            cube.rotation.x = Math.cos(time + index * 0.3) * 0.05;
        });
        
        this.renderer.render(this.scene, this.camera);
    }
}

// Initialize the application when the page loads
window.addEventListener('DOMContentLoaded', () => {
    new CubeSelectionApp();
});