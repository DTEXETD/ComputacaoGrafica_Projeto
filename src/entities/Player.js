import * as THREE from 'three';

export class Player {
    constructor(scene) {
        this.geometry = new THREE.SphereGeometry(0.5, 32, 16);
        this.material = new THREE.MeshStandardMaterial({ color: 0xffff00 });
        this.mesh = new THREE.Mesh(this.geometry, this.material);
        
        this.mesh.position.y = 0.5;
        this.mesh.castShadow = true;
        
        scene.add(this.mesh);
        this.speed = 5;
    }

    update(delta, inputManager) {
        const moveDistance = this.speed * delta;

        if (inputManager.isPressed('w')) this.mesh.position.z -= moveDistance;
        if (inputManager.isPressed('s')) this.mesh.position.z += moveDistance;
        if (inputManager.isPressed('a')) this.mesh.position.x -= moveDistance;
        if (inputManager.isPressed('d')) this.mesh.position.x += moveDistance;
    }
}
