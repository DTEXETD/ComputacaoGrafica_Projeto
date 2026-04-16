import * as THREE from 'three';

export class Enemy {
    constructor(scene) {
        this.geometry = new THREE.BoxGeometry(1, 1, 1);
        this.material = new THREE.MeshStandardMaterial({ color: 0xff0000 });
        this.mesh = new THREE.Mesh(this.geometry, this.material);
        
        this.mesh.position.set(5, 0.5, 5);
        this.mesh.castShadow = true;
        
        scene.add(this.mesh);
    }

    update(delta) {
        // Animação simples de rotação de "vigilância"
        this.mesh.rotation.y += 1.5 * delta;
    }
}
