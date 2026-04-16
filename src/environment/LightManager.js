import * as THREE from 'three';

export class LightManager {
    constructor(scene) {
        this.ambientLight = new THREE.AmbientLight(0x404040, 0.4);
        scene.add(this.ambientLight);

        this.mainLight = new THREE.DirectionalLight(0xffffff, 1);
        this.mainLight.position.set(10, 20, 10);
        this.mainLight.castShadow = true;
        scene.add(this.mainLight);

        this.pointLight = new THREE.PointLight(0x00ffcc, 1, 15);
        this.pointLight.position.set(-5, 2, -5);
        scene.add(this.pointLight);
    }

    toggleMainLight() {
        this.mainLight.visible = !this.mainLight.visible;
    }
}