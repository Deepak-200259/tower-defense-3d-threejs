import * as THREE from "three";
import gsap from "gsap";
import Experience from "../../Experience";

function createCircleTexture() {
    const size = 64;
    const canvas = document.createElement("canvas");
    canvas.width = size;
    canvas.height = size;
    const ctx = canvas.getContext("2d");

    const gradient = ctx.createRadialGradient(
        size / 2, size / 2, size / 8,
        size / 2, size / 2, size / 2
    );
    gradient.addColorStop(0, "rgba(255,255,255,1)");
    gradient.addColorStop(1, "rgba(255,255,255,0)");
    ctx.fillStyle = gradient;
    ctx.beginPath();
    ctx.arc(size / 2, size / 2, size / 2, 0, Math.PI * 2);
    ctx.fill();

    return new THREE.CanvasTexture(canvas);
}

export default class CannonBall {
    constructor() {
        this.experience = new Experience();
        this.scene = this.experience.scene;
        this.resource = this.experience.resources.items.spiked_cannon_ball;
    }

    createBall(position) {
        this.mesh = this.resource.scene.clone()
        this.mesh.scale.set(0.005, 0.005, 0.005)
        this.mesh.position.copy(position)
        this.scene.add(this.mesh);
        this.mesh.traverse((child)=>{
            if(child instanceof THREE.Mesh){
                child.castShadow = true;
                child.material.color = new THREE.Color(0x555555);
            }
        })
        gsap.to(this.material, {
            emissiveIntensity: 4,
            duration: 0.3,
            repeat: -1,
            yoyo: true,
            ease: "sine.inOut"
        });
    }

    createParticles() {
        this.particleCount = 100;
        this.particles = [];

        const geometry = new THREE.BufferGeometry();
        const positions = new Float32Array(this.particleCount * 3);

        for (let i = 0; i < this.particleCount; i++) {
            positions[i * 3 + 0] = 0;
            positions[i * 3 + 1] = -999; // start offscreen
            positions[i * 3 + 2] = 0;
            this.particles.push({
                velocity: new THREE.Vector3(),
                life: 0
            });
        }

        geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
        this.positions = positions;

        this.particleMaterial = new THREE.PointsMaterial({
            size: 0.2,
            map: createCircleTexture(),
            transparent: true,
            color: 0xffaa55,
            depthWrite: false
        });

        this.points = new THREE.Points(geometry, this.particleMaterial);
        this.scene.add(this.points);
    }

    spawnParticle(pos) {
        for (let i = 0; i < this.particleCount; i++) {
            const p = this.particles[i];
            if (p.life <= 0) {
                this.positions[i * 3 + 0] = pos.x;
                this.positions[i * 3 + 1] = pos.y;
                this.positions[i * 3 + 2] = pos.z;

                p.velocity.set(
                    (Math.random() - 0.5) * 0.3,
                    -Math.random() * 0.3 - 0.1,
                    (Math.random() - 0.5) * 0.3
                );
                p.life = 1;
                break;
            }
        }
    }

    launch(start, end, duration = 1.5, height = 5, callback) {
        this.createBall(start);
        this.createParticles();

        this.mesh.position.copy(start);
        // this.mesh.scale.set(1, 1, 1);

        // gsap.fromTo(this.mesh.scale, { x: 0.2, y: 0.2, z: 0.2 }, {
        //     x: 1, y: 1, z: 1,
        //     duration: 0.3,
        //     ease: "back.out(2)"
        // });

        const tempVec = new THREE.Vector3();
        const data = { t: 0 };

        // Kill previous tween if still running
        if (this.tween) this.tween.kill();

        this.tween = gsap.to(data, {
            t: 1,
            duration, // constant travel time
            ease: "none",
            onUpdate: () => {
                const t = data.t;
                tempVec.lerpVectors(start, end, t);
                const parabola = 4 * height * t * (1 - t);
                tempVec.y = THREE.MathUtils.lerp(start.y, end.y, t) + parabola;
                this.mesh.position.copy(tempVec);

                // spawn a few particles per frame
                for (let i = 0; i < 2; i++) this.spawnParticle(tempVec);
            },
            onComplete: () => {
                if (callback) callback();
                this.dispose();
            }
        });
    }


    dispose() {
        // Kill GSAP tweens
        if (this.tween) {
            this.tween.kill();
            this.tween = null;
        }
        gsap.killTweensOf(this.material);

        // Remove ball mesh
        if (this.mesh) {
            if (this.mesh.geometry) this.mesh.geometry.dispose();
            if (this.mesh.material) this.mesh.material.dispose();

            this.scene.remove(this.mesh);
            this.mesh = null;
        }

        // Remove particle system
        if (this.points) {
            if (this.points.geometry) this.points.geometry.dispose();
            if (this.particleMaterial) {
                if (this.particleMaterial.map) this.particleMaterial.map.dispose();
                this.particleMaterial.dispose();
            }

            this.scene.remove(this.points);
            this.points = null;
        }

        // Clear arrays
        this.particles = [];
        this.positions = null;
    }


    update() {
        // Update particle motion
        for (let i = 0; i < this.particleCount; i++) {
            const p = this.particles[i];
            if (p.life > 0) {
                this.positions[i * 3 + 0] += p.velocity.x;
                this.positions[i * 3 + 1] += p.velocity.y;
                this.positions[i * 3 + 2] += p.velocity.z;

                p.velocity.y -= 0.01; // gravity
                p.life -= 0.02;

                if (p.life <= 0) this.positions[i * 3 + 1] = -999;
            }
        }

        this.points.geometry.attributes.position.needsUpdate = true;
    }
}
