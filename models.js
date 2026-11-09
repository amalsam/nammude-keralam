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

function houseboat() { // kettuvallam: dark wooden hull with raised ends, rounded thatch roof
  const g = new THREE.Group();
  const hull = new THREE.Mesh(new THREE.BoxGeometry(9, 1.2, 3.2), C.wood); hull.position.y = 0.6; g.add(hull);
  for (const s of [-1, 1]) { const tip = new THREE.Mesh(new THREE.ConeGeometry(1.6, 3, 4), C.wood); tip.rotation.z = -s * Math.PI / 2.6; tip.rotation.y = Math.PI / 4; tip.scale.z = 0.7; tip.position.set(s * 5.2, 1.1, 0); g.add(tip); }
  const roof = new THREE.Mesh(new THREE.CylinderGeometry(1.7, 1.7, 7, 10), C.thatch); roof.rotation.z = Math.PI / 2; roof.scale.set(1, 1, 1); roof.position.y = 1.2; g.add(roof);
  for (const x of [-2.4, 0, 2.4]) { const w = new THREE.Mesh(new THREE.BoxGeometry(0.9, 0.8, 3.5), mat('#3A2A1A')); w.position.set(x, 1.9, 0); g.add(w); }
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


function ribbon(curve, w, y, material, n = 240) { // flat strip of width w following a closed curve
  const pos = [], idx = [];
  for (let i = 0; i <= n; i++) {
    const u = i / n, p = curve.getPointAt(u % 1), t = curve.getTangentAt(u % 1);
    const nx = -t.z, nz = t.x;
    pos.push(p.x + nx * w / 2, y, p.z + nz * w / 2, p.x - nx * w / 2, y, p.z - nz * w / 2);
    if (i < n) { const a = i * 2; idx.push(a, a + 1, a + 2, a + 1, a + 3, a + 2); }
  }
  const g = new THREE.BufferGeometry(); g.setAttribute('position', new THREE.Float32BufferAttribute(pos, 3)); g.setIndex(idx); g.computeVertexNormals();
  return new THREE.Mesh(g, material);
}
function f1track() { // F1 circuit with a grandstand and a car that laps it
  const g = new THREE.Group();
  const P = [[-14, -6], [-4, -8.5], [8, -8], [15, -4], [14, 2], [7, 3], [3, 7.5], [-6, 8], [-13, 5], [-16, 0]].map(([x, z]) => new THREE.Vector3(x, 0, z));
  const curve = new THREE.CatmullRomCurve3(P, true, 'centripetal');
  const base = new THREE.Mesh(new THREE.CylinderGeometry(19, 19.5, 0.5, 40), mat('#4FA33A')); base.scale.z = 0.62; base.position.y = 0.25; g.add(base);
  const curb = [];
  for (let i = 0; i < 2; i++) curb.push(mat(i ? '#E0453A' : '#FFFFFF', { side: THREE.DoubleSide }));
  g.add(ribbon(curve, 3.6, 0.55, mat('#FFFFFF', { side: THREE.DoubleSide })));
  g.add(ribbon(curve, 3.0, 0.6, mat('#2B2F3A', { side: THREE.DoubleSide })));
  for (let i = 0; i < 6; i++) { // checkered start line
    const q = new THREE.Mesh(new THREE.BoxGeometry(0.5, 0.05, 0.5), curb[i % 2]);
    const p = curve.getPointAt(0.12), t = curve.getTangentAt(0.12);
    q.position.set(p.x + (-t.z) * (i - 2.5) * 0.5, 0.65, p.z + t.x * (i - 2.5) * 0.5); g.add(q);
  }
  const stand = new THREE.Group();
  for (let k = 0; k < 4; k++) { const b = new THREE.Mesh(new THREE.BoxGeometry(12, 0.9, 1.4), k % 2 ? C.gray : C.white); b.position.set(0, 0.9 + k * 0.9, -k * 1.2); stand.add(b); }
  const roof = new THREE.Mesh(new THREE.BoxGeometry(12.6, 0.3, 5.6), C.red); roof.position.set(0, 5.4, -1.9); stand.add(roof);
  for (const x of [-6, 6]) { const c = new THREE.Mesh(new THREE.BoxGeometry(0.3, 5, 0.3), C.gray); c.position.set(x, 2.9, -4.4); stand.add(c); }
  stand.position.set(-3, 0.5, -12.6); g.add(stand);
  const car = new THREE.Group();
  const body = new THREE.Mesh(new THREE.BoxGeometry(2.6, 0.5, 0.9), C.red); body.position.y = 0.45; car.add(body);
  const wing = new THREE.Mesh(new THREE.BoxGeometry(0.3, 0.5, 1.5), mat('#1A1A1A')); wing.position.set(-1.25, 0.8, 0); car.add(wing);
  const nose = new THREE.Mesh(new THREE.BoxGeometry(0.4, 0.15, 1.6), mat('#1A1A1A')); nose.position.set(1.3, 0.3, 0); car.add(nose);
  for (const [x, z] of [[-0.9, 0.6], [-0.9, -0.6], [0.8, 0.6], [0.8, -0.6]]) { const w = new THREE.Mesh(new THREE.CylinderGeometry(0.32, 0.32, 0.3, 10), mat('#111111')); w.rotation.x = Math.PI / 2; w.position.set(x, 0.32, z); car.add(w); }
  g.add(car);
  g.userData.radius = 14;
  g.userData.update = (time) => {
    const u = (time * 0.07) % 1, p = curve.getPointAt(u), t = curve.getTangentAt(u);
    car.position.set(p.x, 0.6, p.z); car.rotation.y = Math.atan2(-t.z, t.x);
  };
  return g;
}

function beach() { // a sandy beach island in its own little sea: waves, palms, an umbrella and a sign
  const g = new THREE.Group();
  const sea = new THREE.Mesh(new THREE.CylinderGeometry(14, 14.5, 0.6, 40), mat('#3FB6E8', { roughness: 0.35 })); sea.scale.z = 0.72; sea.position.y = 0.3; g.add(sea);
  const sand = new THREE.Mesh(new THREE.CylinderGeometry(8, 9.2, 1.0, 32), mat('#F2D49B')); sand.scale.z = 0.72; sand.position.set(-1, 0.6, 0.8); g.add(sand);
  const foam = [];
  for (let i = 0; i < 3; i++) { const f = new THREE.Mesh(new THREE.TorusGeometry(9.6, 0.2, 4, 40), mat('#FFFFFF', { transparent: true })); f.rotation.x = -Math.PI / 2; f.position.set(-1, 0.65, 0.8); g.add(f); foam.push(f); }
  for (const [x, z, r] of [[3, -2, 0.1], [5, 1.5, -0.15], [-6, -1.5, 0.2]]) { const p = coconut(); p.scale.setScalar(0.5); p.position.set(x, 1.1, z); p.rotation.y = r * 10; g.add(p); }
  const um = new THREE.Group();
  const pole = new THREE.Mesh(new THREE.CylinderGeometry(0.12, 0.12, 4.5, 5), C.white); pole.position.y = 2.25; um.add(pole);
  const cw = mat('#FFFFFF', { side: THREE.DoubleSide }), cr = mat('#E0453A', { side: THREE.DoubleSide });
  for (let i = 0; i < 8; i++) { const seg = new THREE.Mesh(new THREE.ConeGeometry(2.6, 1.1, 8, 1, true, (i / 8) * Math.PI * 2, Math.PI / 4), i % 2 ? cr : cw); seg.position.y = 4.6; um.add(seg); }
  const towel = new THREE.Mesh(new THREE.BoxGeometry(1.4, 0.08, 3), mat('#4C7DF0')); towel.position.set(1.4, 0.05, 0.6); um.add(towel);
  um.position.set(-1.5, 1.1, 2.2); g.add(um);
  const sign = new THREE.Group();
  const post = new THREE.Mesh(new THREE.CylinderGeometry(0.15, 0.15, 3, 5), C.wood); post.position.y = 1.5; sign.add(post);
  const board = new THREE.Mesh(new THREE.BoxGeometry(3.4, 1.3, 0.2), C.wood); board.position.y = 3.2; sign.add(board);
  sign.position.set(-5, 1.1, 3.5); sign.rotation.y = 0.3; g.add(sign);
  // the joke: Wayanad has no sea, so the sea came up the Thamarassery ghat in tanker lorries
  const tanker = (x, z, ry) => {
    const t = new THREE.Group();
    const cab = new THREE.Mesh(new THREE.BoxGeometry(1.6, 1.6, 1.8), mat('#F2B233')); cab.position.set(2.2, 1.2, 0); t.add(cab);
    const win = new THREE.Mesh(new THREE.BoxGeometry(0.1, 0.6, 1.4), C.glass); win.position.set(3.02, 1.5, 0); t.add(win);
    const tank = new THREE.Mesh(new THREE.CylinderGeometry(0.95, 0.95, 3.6, 12), mat('#3FB6E8', { roughness: 0.4 })); tank.rotation.z = Math.PI / 2; tank.position.set(-0.4, 1.4, 0); t.add(tank);
    const band = new THREE.Mesh(new THREE.CylinderGeometry(0.98, 0.98, 0.3, 12), C.white); band.rotation.z = Math.PI / 2; band.position.set(-0.4, 1.4, 0); t.add(band);
    for (const [wx, wz] of [[-1.6, 0.85], [-1.6, -0.85], [2.2, 0.85], [2.2, -0.85]]) { const w = new THREE.Mesh(new THREE.CylinderGeometry(0.42, 0.42, 0.3, 10), mat('#1A1A1A')); w.rotation.x = Math.PI / 2; w.position.set(wx, 0.42, wz); t.add(w); }
    const hose = new THREE.Mesh(new THREE.CylinderGeometry(0.15, 0.15, 3, 6), mat('#2B2F3A')); hose.position.set(-2.4, 0.9, 0); hose.rotation.z = 1.1; t.add(hose);
    t.position.set(x, 0, z); t.rotation.y = ry; t.scale.setScalar(1.1); g.add(t); return t;
  };
  const trucks = [tanker(-12.5, 7.5, -0.4), tanker(12.5, 7, Math.PI + 0.4)];
  const crab = new THREE.Group();
  const cb = new THREE.Mesh(new THREE.SphereGeometry(0.55, 8, 6), C.red); cb.scale.y = 0.55; crab.add(cb);
  for (const s of [-1, 1]) { const cl = new THREE.Mesh(new THREE.SphereGeometry(0.25, 6, 5), C.red); cl.position.set(0.5, 0.15, s * 0.45); crab.add(cl); }
  const bag = new THREE.Mesh(new THREE.BoxGeometry(0.5, 0.45, 0.3), mat('#7A4520')); bag.position.set(-0.55, 0.3, 0); crab.add(bag);
  crab.position.set(1.5, 1.4, 3.8); g.add(crab);
  g.userData.radius = 13;
  g.userData.update = (time) => { crab.position.x = 1.5 + Math.sin(time * 0.8) * 2.2; trucks.forEach((tr, i) => { tr.position.y = Math.abs(Math.sin(time * 6 + i)) * 0.06; }); foam.forEach((f, i) => { const k = (time * 0.3 + i / 3) % 1, s = 1 + 0.38 * k; f.scale.set(s, s * 0.72, 1); f.material.opacity = 1 - k; }); };
  return g;
}

function burj() { // Burj Khalifa in Kollam: Y-plan tower with spiralling setbacks, spire with a blinking light, a fountain pool and a kettuvallam
  const g = new THREE.Group();
  const steel = mat('#C9D6E8', { roughness: 0.3, metalness: 0.2 });
  const pool = new THREE.Mesh(new THREE.CylinderGeometry(7.5, 7.8, 0.5, 28), mat('#3FB6E8', { roughness: 0.3 })); pool.position.y = 0.25; g.add(pool);
  // Real Burj shape: Y-shaped plan (three wings round a hexagonal core); each wing steps back at its own height, so the setbacks spiral up
  const podium = new THREE.Mesh(new THREE.CylinderGeometry(4.2, 4.6, 0.8, 6), C.gray); podium.position.y = 0.9; g.add(podium);
  const glassA = mat('#D7E2EE', { roughness: 0.25, metalness: 0.35 }), glassB = mat('#AFC0D4', { roughness: 0.25, metalness: 0.35 });
  const N = 14, th = 1.7, base = 1.3, H = N * th;
  const core = new THREE.Mesh(new THREE.CylinderGeometry(0.55, 1.15, H + 2.5, 6), glassA); core.position.y = base + (H + 2.5) / 2; g.add(core);
  for (let w = 0; w < 3; w++) {
    const ang = w * Math.PI * 2 / 3;
    for (let k = 0; k < N; k++) {
      const L = 3.4 * (1 - (k + w / 3) / N) ** 1.15; if (L < 0.35) break;
      const seg = new THREE.Mesh(new THREE.BoxGeometry(1.25 - k * 0.04, th * 0.96, L), k % 2 ? glassB : glassA);
      seg.position.set(Math.sin(ang) * (L / 2 + 0.5), base + th * (k + 0.5), Math.cos(ang) * (L / 2 + 0.5)); seg.rotation.y = ang; g.add(seg);
      const nose = new THREE.Mesh(new THREE.CylinderGeometry((1.25 - k * 0.04) / 2, (1.25 - k * 0.04) / 2, th * 0.96, 8), k % 2 ? glassB : glassA); // rounded wing tips
      nose.position.set(Math.sin(ang) * (L + 0.5), base + th * (k + 0.5), Math.cos(ang) * (L + 0.5)); g.add(nose);
    }
  }
  const y = base + H + 2.5;
  const spire = new THREE.Mesh(new THREE.CylinderGeometry(0.05, 0.5, 7, 6), mat('#E8EEF5', { metalness: 0.5, roughness: 0.3 })); spire.position.y = y + 3.5; g.add(spire);
  const beacon = new THREE.Mesh(new THREE.SphereGeometry(0.28, 8, 6), mat('#FF3B30', { emissive: '#FF3B30', emissiveIntensity: 1 })); beacon.position.y = y + 7.1; g.add(beacon);
  const jets = [];
  for (let i = 0; i < 8; i++) { const a = i / 8 * Math.PI * 2; const j = new THREE.Mesh(new THREE.CylinderGeometry(0.1, 0.18, 1, 5), mat('#FFFFFF', { transparent: true, opacity: 0.8 })); j.position.set(Math.cos(a) * 5.6, 1, Math.sin(a) * 5.6); g.add(j); jets.push(j); }
  const boat = houseboat(); boat.scale.setScalar(0.42); boat.position.set(3.6, 0.35, 4.4); boat.rotation.y = 0.5; g.add(boat);
  g.userData.radius = 11;
  g.userData.update = (time) => { beacon.material.emissiveIntensity = 0.3 + 0.7 * (Math.sin(time * 4) > 0 ? 1 : 0); jets.forEach((j, i) => { const h = 1.2 + 1.1 * Math.abs(Math.sin(time * 2.2 + i * 0.8)); j.scale.y = h; j.position.y = 0.5 + h / 2; }); boat.position.y = 0.3 + Math.sin(time * 1.5) * 0.08; };
  return g;
}

export const MODELS = { burj, beach, f1track, coconut, house, houseboat, fishingnet, lighthouse, tower, pin };
export function makeModel(name) { return (MODELS[name] || pin)(); }
