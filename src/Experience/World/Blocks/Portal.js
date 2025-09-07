import { vertexShader, fragmentShader } from "../../../shaders/PortalShader.js";
import * as THREE from 'three';
import Experience from '../../Experience.js'

export default class Portal {
    constructor(position) {
        this.experience = new Experience();
        this.scene = this.experience.scene;
        this.position = position;


        this.params = {
            uTime: 0,
            uColorStart: new THREE.Color("#f5b82b"),
            uColorEnd: new THREE.Color("#bb0000"),
        };

        this.group = new THREE.Group();
        this.scene.add(this.group);

        this.init();
    }

    async init() {
        // Portal shader
        this.portalMaterial = new THREE.ShaderMaterial({
            uniforms: {
                uTime: { value: 0 },
                uColorStart: { value: this.params.uColorStart },
                uColorEnd: { value: this.params.uColorEnd },
            },
            vertexShader: vertexShader,
            fragmentShader: fragmentShader,
        });
        const portalHeight = 2
        const portalLight = new THREE.Mesh(
            new THREE.CylinderGeometry(1, 1, portalHeight, 32),
            this.portalMaterial
        );
        const portalCover = new THREE.Mesh(
            new THREE.CylinderGeometry(1.02, 1.02, portalHeight + 0.1, 64, 32, true),
            new THREE.MeshStandardMaterial({
                color: 0xffffff
            }
        )
        )
        portalLight.rotation.x = Math.PI / 2
        portalCover.rotation.x = Math.PI / 2
        portalLight.position.copy(this.position)
        portalCover.position.copy(this.position)
        portalLight.position.y = 0.5;
        portalCover.position.y = 0.5;
        portalCover.position.z -= 0.05;
        this.group.add(portalLight, portalCover);
    }

    update() {
        const elapsed = this.experience.time.elapsed * 0.002;
        if (this.portalMaterial) {
            this.portalMaterial.uniforms.uTime.value = elapsed;
        }
    }
}
