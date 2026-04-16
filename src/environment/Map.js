import * as THREE from 'three';

export class Map {
    constructor(scene) {
        // Criar o chão principal
        const floorGeo = new THREE.PlaneGeometry(30, 30);
        const floorMat = new THREE.MeshStandardMaterial({ color: 0x222222 });
        this.floor = new THREE.Mesh(floorGeo, floorMat);
        
        this.floor.rotation.x = -Math.PI / 2;
        this.floor.receiveShadow = true;
        
        scene.add(this.floor);

        // Aqui podem futuramente criar uma matriz de 0s e 1s para gerar paredes (caixas)
    }
}
