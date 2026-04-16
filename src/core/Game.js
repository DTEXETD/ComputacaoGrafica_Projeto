import * as THREE from 'three';
import { InputManager } from './InputManager.js';
import { CameraManager } from './CameraManager.js';
import { LightManager } from '../environment/LightManager.js';
import { Map } from '../environment/Map.js';
import { Player } from '../entities/Player.js';
import { Enemy } from '../entities/Enemy.js';

export class Game {
    constructor() {
        this.scene = new THREE.Scene();
        this.scene.background = new THREE.Color(0x111111);

        this.renderer = new THREE.WebGLRenderer({ antialias: true });
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        this.renderer.shadowMap.enabled = true;
        this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;
        document.body.appendChild(this.renderer.domElement);

        this.clock = new THREE.Clock();

        // Inicializar Gestores
        this.inputManager = new InputManager();
        this.cameraManager = new CameraManager(window.innerWidth / window.innerHeight);
        this.lightManager = new LightManager(this.scene);

        // Inicializar Ambiente e Entidades
        this.map = new Map(this.scene);
        this.player = new Player(this.scene);
        this.enemy = new Enemy(this.scene);

        // Eventos da janela
        window.addEventListener('resize', this.onWindowResize.bind(this));
    }

    update() {
        const delta = this.clock.getDelta();

        // Verificar teclas de sistema (Alternar câmara e luzes)
        if (this.inputManager.consumeKey('c')) {
            this.cameraManager.toggleCamera();
        }
        if (this.inputManager.consumeKey('l')) {
            this.lightManager.toggleMainLight();
        }

        // Atualizar entidades
        this.player.update(delta, this.inputManager);
        this.enemy.update(delta);

        // Renderizar
        this.renderer.render(this.scene, this.cameraManager.getActive());
    }

    onWindowResize() {
        this.cameraManager.onResize(window.innerWidth, window.innerHeight);
        this.renderer.setSize(window.innerWidth, window.innerHeight);
    }

    start() {
        this.renderer.setAnimationLoop(() => this.update());
    }
}
