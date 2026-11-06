// Low-poly models built from primitives. Each returns a THREE.Group standing on y = 0, about 6–14 units tall.
import * as THREE from 'three';

const mat = (color, opts = {}) => new THREE.MeshStandardMaterial({ color, flatShading: true, roughness: 0.85, ...opts });
const C = {
  trunk: mat('#8A5A34'), frond: mat('#2E9E3E'), nut: mat('#6B4A22'), wall: mat('#F3E7D3'), roof: mat('#C2492E'),
  wood: mat('#7A4520'), thatch: mat('#C9A15A'), white: mat('#FFFFFF'), red: mat('#E0453A'), net: mat('#D8D2C0', { transparent: true, opacity: 0.6, side: THREE.DoubleSide }),
  glass: mat('#9FD8FF'), gray: mat('#9AA3BF'), gold: mat('#FFD23F', { emissive: '#FFB000', emissiveIntensity: 0.2 }),
};

function coconut() {
  const g = new THREE.Group();
  const trunk = new THREE.Mesh(new THREE.CylinderGeometry(0.45, 0.8, 12, 6), C.trunk);
  trunk.position.set(-0.7, 6, 0); trunk.rotation.z = 0.12; g.add(trunk);
  const top = new THREE.Vector3(-1.45, 12, 0);
  for (let i = 0; i < 8; i++) {
    const pivot = new THREE.Group(); pivot.position.copy(top);
    pivot.rotation.y = (i / 8) * Math.PI * 2;
    const leaf = new THREE.Mesh(new THREE.BoxGeometry(7, 0.25, 1.5), C.frond);
    leaf.position.x = 3.3; leaf.rotation.z = -0.38;
    pivot.add(leaf); g.add(pivot);
  }
  for (let i = 0; i < 3; i++) { const n = new THREE.Mesh(new THREE.IcosahedronGeometry(0.55, 0), C.nut); n.position.set(top.x + Math.cos(i * 2.1) * 0.7, top.y - 0.7, Math.sin(i * 2.1) * 0.7); g.add(n); }
  return g;
}

function house() {
  const g = new THREE.Group();
  const w = new THREE.Mesh(new THREE.BoxGeometry(7, 4, 6), C.wall); w.position.y = 2; g.add(w);
  const r = new THREE.Mesh(new THREE.ConeGeometry(6.2, 3.6, 4), C.roof); r.position.y = 5.8; r.rotation.y = Math.PI / 4; r.scale.set(1.15, 1, 1); g.add(r);
  const d = new THREE.Mesh(new THREE.BoxGeometry(1.4, 2.4, 0.2), C.wood); d.position.set(0, 1.2, 3.05); g.add(d);
  return g;
}

function houseboat() {
  const g = new THREE.Group();
  const hull = new THREE.Mesh(new THREE.BoxGeometry(12, 1.4, 3.6), C.wood); hull.position.y = 0.7; g.add(hull);
  const roof = new THREE.Mesh(new THREE.CylinderGeometry(2.1, 2.1, 9, 8, 1, false, 0, Math.PI), C.thatch); roof.rotation.z = Math.PI / 2; roof.rotation.y = Math.PI / 2; roof.rotation.x = Math.PI / 2; roof.position.y = 1.4; g.add(roof);
  return g;
}

function fishingnet() {
  const g = new THREE.Group();
  const base = new THREE.Mesh(new THREE.BoxGeometry(3, 1, 3), C.wood); base.position.y = 0.5; g.add(base);
  const mast = new THREE.Mesh(new THREE.CylinderGeometry(0.2, 0.25, 12, 5), C.wood); mast.position.set(0, 5, 0); mast.rotation.z = -0.7; g.add(mast);
  const net = new THREE.Mesh(new THREE.ConeGeometry(4, 2.5, 4, 1, true), C.net); net.position.set(7, 7, 0); net.rotation.x = Math.PI; g.add(net);
  for (const s of [-1, 1]) { const arm = new THREE.Mesh(new THREE.CylinderGeometry(0.12, 0.12, 8, 4), C.wood); arm.position.set(7, 8.3, s * 1.8); arm.rotation.x = s * 0.4; g.add(arm); }
  return g;
}

function lighthouse() {
  const g = new THREE.Group();
  for (let i = 0; i < 5; i++) { const s = new THREE.Mesh(new THREE.CylinderGeometry(1.6 - i * 0.15, 1.75 - i * 0.15, 2.4, 10), i % 2 ? C.red : C.white); s.position.y = 1.2 + i * 2.4; g.add(s); }
  const lamp = new THREE.Mesh(new THREE.CylinderGeometry(1.0, 1.0, 1.4, 8), C.glass); lamp.position.y = 12.7; g.add(lamp);
  const cap = new THREE.Mesh(new THREE.ConeGeometry(1.3, 1.4, 8), C.red); cap.position.y = 14.1; g.add(cap);
  return g;
}

function tower() { // generic building
  const g = new THREE.Group();
  const b = new THREE.Mesh(new THREE.BoxGeometry(5, 12, 5), C.gray); b.position.y = 6; g.add(b);
  for (let i = 0; i < 5; i++) { const w = new THREE.Mesh(new THREE.BoxGeometry(5.1, 0.5, 5.1), C.glass); w.position.y = 2 + i * 2.2; g.add(w); }
  return g;
}

function pin() { // fallback for anything we don't have a model for yet
  const g = new THREE.Group();
  const p = new THREE.Mesh(new THREE.ConeGeometry(1.4, 5, 8), C.gold); p.position.y = 2.5; p.rotation.x = Math.PI; g.add(p);
  const h = new THREE.Mesh(new THREE.SphereGeometry(2.2, 10, 8), C.gold); h.position.y = 6; g.add(h);
  return g;
}

export const MODELS = { coconut, house, houseboat, fishingnet, lighthouse, tower, pin };
export function makeModel(name) { return (MODELS[name] || pin)(); }
