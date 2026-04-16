import * as THREE from 'three';

// ====================================================================
// 1. CONFIGURAÇÃO BÁSICA
// ====================================================================
const scene = new THREE.Scene();
scene.background = new THREE.Color(0x111111); // Ambiente escuro para stealth

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
// Preparar renderer para sombras (crucial num jogo stealth)
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;
document.body.appendChild(renderer.domElement);

// ====================================================================
// 2. CÂMARAS (Requisito: Alternar entre Perspetiva e Ortográfica) [cite: 18]
// ====================================================================
const aspect = window.innerWidth / window.innerHeight;
const frustumSize = 20;

// Câmara de Perspetiva (Visão 3D clássica)
const perspectiveCamera = new THREE.PerspectiveCamera(60, aspect, 0.1, 1000);
perspectiveCamera.position.set(0, 15, 10);
perspectiveCamera.lookAt(0, 0, 0);

// Câmara Ortográfica (Estilo isométrico clássico retro)
const orthographicCamera = new THREE.OrthographicCamera(
    (frustumSize * aspect) / -2, (frustumSize * aspect) / 2,
    frustumSize / 2, frustumSize / -2,
    0.1, 1000
);
orthographicCamera.position.set(0, 15, 10);
orthographicCamera.lookAt(0, 0, 0);

let activeCamera = perspectiveCamera;

// ====================================================================
// 3. LUZES (Requisito: Diversos tipos e poder desligar) [cite: 19]
// ====================================================================
const lights = [];

const ambientLight = new THREE.AmbientLight(0x404040, 0.5); // Luz global fraca
scene.add(ambientLight);
lights.push(ambientLight);

const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
directionalLight.position.set(10, 20, 10);
directionalLight.castShadow = true;
scene.add(directionalLight);
lights.push(directionalLight);

const pointLight = new THREE.PointLight(0xffaa00, 2, 10); // Simula uma luz de presença
pointLight.position.set(-5, 2, -5);
scene.add(pointLight);
lights.push(pointLight);

// ====================================================================
// 4. OBJETOS (Requisito: Primitivas básicas) [cite: 16]
// ====================================================================

// Chão (O mapa do labirinto)
const floorGeo = new THREE.PlaneGeometry(30, 30);
const floorMat = new THREE.MeshStandardMaterial({ color: 0x222222 });
const floor = new THREE.Mesh(floorGeo, floorMat);
floor.rotation.x = -Math.PI / 2;
floor.receiveShadow = true;
scene.add(floor);

// Pacman (Jogador)
const pacmanGeo = new THREE.SphereGeometry(0.5, 32, 16);
const pacmanMat = new THREE.MeshStandardMaterial({ color: 0xffff00 });
const pacman = new THREE.Mesh(pacmanGeo, pacmanMat);
pacman.position.y = 0.5;
pacman.castShadow = true;
scene.add(pacman);

// Inimigo (Caixa que representa um "Fantasma" Patrulheiro)
const enemyGeo = new THREE.BoxGeometry(1, 1, 1);
const enemyMat = new THREE.MeshStandardMaterial({ color: 0xff0000 });
const enemy = new THREE.Mesh(enemyGeo, enemyMat);
enemy.position.set(5, 0.5, 5);
enemy.castShadow = true;
scene.add(enemy);

// ====================================================================
// 5. INTERAÇÃO (Requisito: Interação pelo teclado/rato) [cite: 20]
// ====================================================================
const keys = { w: false, a: false, s: false, d: false };

window.addEventListener('keydown', (e) => {
    const key = e.key.toLowerCase();
    if(keys.hasOwnProperty(key)) keys[key] = true;
    
    // Alternar Câmara
    if(key === 'c') {
        activeCamera = activeCamera === perspectiveCamera ? orthographicCamera : perspectiveCamera;
    }
    
    // Desligar/Ligar Luzes individualmente (Exemplo simples)
    if(key === 'l') {
        directionalLight.visible = !directionalLight.visible;
    }
});

window.addEventListener('keyup', (e) => {
    const key = e.key.toLowerCase();
    if(keys.hasOwnProperty(key)) keys[key] = false;
});

// ====================================================================
// 6. ANIMAÇÃO (Requisito: Objetos devem ser animados) [cite: 21]
// ====================================================================
const clock = new THREE.Clock();

function animate() {
    requestAnimationFrame(animate);
    const delta = clock.getDelta();

    // Movimento do Pacman
    const speed = 5 * delta;
    if (keys.w) pacman.position.z -= speed;
    if (keys.s) pacman.position.z += speed;
    if (keys.a) pacman.position.x -= speed;
    if (keys.d) pacman.position.x += speed;

    // Animação simples do inimigo (rotação)
    enemy.rotation.y += 1 * delta;

    renderer.render(scene, activeCamera);
}

animate();

// ====================================================================
// 7. RESPONSIVIDADE
// ====================================================================
window.addEventListener('resize', () => {
    const width = window.innerWidth;
    const height = window.innerHeight;
    renderer.setSize(width, height);
    
    // Atualizar Câmara Perspetiva
    perspectiveCamera.aspect = width / height;
    perspectiveCamera.updateProjectionMatrix();

    // Atualizar Câmara Ortográfica
    const newAspect = width / height;
    orthographicCamera.left = -frustumSize * newAspect / 2;
    orthographicCamera.right = frustumSize * newAspect / 2;
    orthographicCamera.top = frustumSize / 2;
    orthographicCamera.bottom = -frustumSize / 2;
    orthographicCamera.updateProjectionMatrix();
});
