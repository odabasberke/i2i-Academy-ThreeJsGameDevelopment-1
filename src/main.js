import * as THREE from 'three';

// 1. Scene Infrastructure & Setup
const scene = new THREE.Scene();
scene.background = new THREE.Color(0x87CEEB); // Sky Color

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.set(0, 5, 10);
camera.lookAt(0, 0, 0);

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.shadowMap.enabled = true; // Enable shadows
document.getElementById('app').appendChild(renderer.domElement);

// Lighting
const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
scene.add(ambientLight);

const dirLight = new THREE.DirectionalLight(0xffffff, 0.8);
dirLight.position.set(10, 20, 10);
dirLight.castShadow = true;
scene.add(dirLight);

// Ground Plane
const groundGeo = new THREE.PlaneGeometry(30, 100);
const groundMat = new THREE.MeshStandardMaterial({ color: 0x228B22 });
const ground = new THREE.Mesh(groundGeo, groundMat);
ground.rotation.x = -Math.PI / 2;
ground.receiveShadow = true;
scene.add(ground);

// 2. Player Controls & Mesh
const playerGeo = new THREE.BoxGeometry(1, 1, 1);
const playerMat = new THREE.MeshStandardMaterial({ color: 0xff0000 });
const player = new THREE.Mesh(playerGeo, playerMat);
player.position.y = 0.5;
player.castShadow = true;
scene.add(player);

const keys = { ArrowLeft: false, ArrowRight: false, a: false, d: false };
window.addEventListener('keydown', (e) => { if(keys.hasOwnProperty(e.key)) keys[e.key] = true; });
window.addEventListener('keyup', (e) => { if(keys.hasOwnProperty(e.key)) keys[e.key] = false; });

// 3. Game State & Obstacles
let isGameOver = false;
let score = 0;
let obstacles = [];
const speed = 0.15;
const uiScore = document.getElementById('score-display');
const uiGameOver = document.getElementById('game-over');

function spawnObstacle() {
  if (Math.random() > 0.05) return; // Spawn rate
  const obsGeo = new THREE.BoxGeometry(1, 1, 1);
  const obsMat = new THREE.MeshStandardMaterial({ color: 0x333333 });
  const obstacle = new THREE.Mesh(obsGeo, obsMat);
  
  // Random position on X axis, far away on Z axis
  obstacle.position.set((Math.random() - 0.5) * 10, 0.5, -40);
  obstacle.castShadow = true;
  scene.add(obstacle);
  obstacles.push(obstacle);
}

// 4. Restart Logic
function resetGame() {
  isGameOver = false;
  score = 0;
  player.position.x = 0;
  obstacles.forEach(obs => scene.remove(obs));
  obstacles = [];
  uiGameOver.style.display = 'none';
  gameLoop();
}

uiGameOver.addEventListener('click', resetGame);
window.addEventListener('keydown', (e) => {
  if((e.key === 'r' || e.key === 'R') && isGameOver) resetGame();
});

// 5. Game Loop & Collision Detection
function gameLoop() {
  if (isGameOver) return;
  requestAnimationFrame(gameLoop);

  // Player Movement (Horizontal Axis)
  if ((keys.ArrowLeft || keys.a) && player.position.x > -5) player.position.x -= 0.1;
  if ((keys.ArrowRight || keys.d) && player.position.x < 5) player.position.x += 0.1;

  spawnObstacle();

  // Bounding Box for Player
  const playerBox = new THREE.Box3().setFromObject(player);

  for (let i = obstacles.length - 1; i >= 0; i--) {
    let obs = obstacles[i];
    obs.position.z += speed; // Move towards player

    // Collision Check
    const obsBox = new THREE.Box3().setFromObject(obs);
    if (playerBox.intersectsBox(obsBox)) {
      isGameOver = true;
      uiGameOver.style.display = 'block';
    }

    // Clean up obstacles that passed the camera
    if (obs.position.z > camera.position.z + 5) {
      scene.remove(obs);
      obstacles.splice(i, 1);
    }
  }

  // Update Score
  score += 1;
  uiScore.innerText = `Score: ${Math.floor(score / 10)}`;

  renderer.render(scene, camera);
}

// Handle Window Resize
window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});

gameLoop();