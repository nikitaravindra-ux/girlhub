"use client";
import { useEffect, useRef } from "react";
import * as THREE from "three";

export default function DiscoBall() {
  const mountRef = useRef(null);

  useEffect(() => {
    const mount = mountRef.current;
    const width = mount.clientWidth;
    const height = mount.clientHeight;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.z = 6;

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(width, height);
    mount.appendChild(renderer.domElement);

    const geometry = new THREE.IcosahedronGeometry(2, 4);
    const material = new THREE.MeshStandardMaterial({
      color: 0xffffff,
      metalness: 1,
      roughness: 0.15,
      flatShading: true,
    });
    const ball = new THREE.Mesh(geometry, material);
    scene.add(ball);

    const colors = [0xff6ec7, 0x63d2ff, 0xffe066, 0xb565ff, 0xff2b4e];
    colors.forEach((c, i) => {
      const light = new THREE.PointLight(c, 4, 20);
      const angle = (i / colors.length) * Math.PI * 2;
      light.position.set(Math.cos(angle) * 5, Math.sin(angle) * 3, 3);
      scene.add(light);
    });
    scene.add(new THREE.AmbientLight(0xffffff, 0.3));

    let frameId;
    const animate = () => {
      ball.rotation.y += 0.006;
      ball.rotation.x += 0.001;
      renderer.render(scene, camera);
      frameId = requestAnimationFrame(animate);
    };
    animate();

    const handleResize = () => {
      const w = mount.clientWidth;
      const h = mount.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener("resize", handleResize);

    return () => {
      cancelAnimationFrame(frameId);
      window.removeEventListener("resize", handleResize);
      mount.removeChild(renderer.domElement);
      geometry.dispose();
      material.dispose();
    };
  }, []);

  return (
    <div className="relative w-full h-[420px] flex items-center justify-center">
      <div ref={mountRef} className="w-[420px] h-[420px]" />
      <h1
        className="absolute text-5xl font-extrabold tracking-wide pointer-events-none"
        style={{
          color: "#ff2b4e",
          textShadow: "0 0 10px rgba(255,255,255,0.8), 0 0 25px rgba(255,110,199,0.6)",
          WebkitTextStroke: "1px #ffffff",
        }}
      >
        girlHub
      </h1>
    </div>
  );
}