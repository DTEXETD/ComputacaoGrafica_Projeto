import * as THREE from 'three';

export class CameraManager {
    constructor(aspectRatio) {
        this.frustumSize = 20;

        // Câmara de Perspetiva
        this.perspectiveCamera = new THREE.PerspectiveCamera(60, aspectRatio, 0.1, 1000);
        this.perspectiveCamera.position.set(0, 15, 10);
        this.perspectiveCamera.lookAt(0, 0, 0);

        // Câmara Ortográfica
        this.orthographicCamera = new THREE.OrthographicCamera(
            (this.frustumSize * aspectRatio) / -2, 
            (this.frustumSize * aspectRatio) / 2,
            this.frustumSize / 2, 
            this.frustumSize / -2,
            0.1, 1000
        );
        this.orthographicCamera.position.set(0, 15, 10);
        this.orthographicCamera.lookAt(0, 0, 0);

        this.activeCamera = this.perspectiveCamera;
    }

    toggleCamera() {
        this.activeCamera = this.activeCamera === this.perspectiveCamera ? this.orthographicCamera : this.perspectiveCamera;
    }

    getActive() {
        return this.activeCamera;
    }

    onResize(width, height) {
        const aspect = width / height;
        
        this.perspectiveCamera.aspect = aspect;
        this.perspectiveCamera.updateProjectionMatrix();

        this.orthographicCamera.left = -this.frustumSize * aspect / 2;
        this.orthographicCamera.right = this.frustumSize * aspect / 2;
        this.orthographicCamera.top = this.frustumSize / 2;
        this.orthographicCamera.bottom = -this.frustumSize / 2;
        this.orthographicCamera.updateProjectionMatrix();
    }
}
