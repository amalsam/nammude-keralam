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

function stadium() { // Malappuram football stadium: striped pitch, a bowl of stands, four floodlights and a ball that never stops
  const g = new THREE.Group();
  const SZ = 0.68;
  const base = new THREE.Mesh(new THREE.CylinderGeometry(13.6, 14, 0.5, 40), mat('#8C93A8')); base.scale.z = SZ; base.position.y = 0.25; g.add(base);
  for (let i = 0; i < 8; i++) { const st = new THREE.Mesh(new THREE.BoxGeometry(2, 0.12, 9), mat(i % 2 ? '#3FA548' : '#57BD4F')); st.position.set(-7 + i * 2, 0.56, 0); g.add(st); }
  const line = mat('#FFFFFF');
  for (const [w, d, x, z] of [[16.2, 0.14, 0, 4.5], [16.2, 0.14, 0, -4.5], [0.14, 9.1, 8, 0], [0.14, 9.1, -8, 0], [0.14, 9.1, 0, 0]]) { const l = new THREE.Mesh(new THREE.BoxGeometry(w, 0.06, d), line); l.position.set(x, 0.64, z); g.add(l); }
  const circle = new THREE.Mesh(new THREE.TorusGeometry(1.5, 0.07, 4, 24), line); circle.rotation.x = Math.PI / 2; circle.position.y = 0.64; g.add(circle);
  for (const s of [-1, 1]) {
    const box = new THREE.Mesh(new THREE.BoxGeometry(0.14, 0.06, 4.4), line); box.position.set(s * 6, 0.64, 0); g.add(box);
    for (const z of [-2.2, 2.2]) { const b = new THREE.Mesh(new THREE.BoxGeometry(2, 0.06, 0.14), line); b.position.set(s * 7, 0.64, z); g.add(b); }
    for (const z of [-1.1, 1.1]) { const post = new THREE.Mesh(new THREE.CylinderGeometry(0.07, 0.07, 1.1, 5), line); post.position.set(s * 8, 1.15, z); g.add(post); }
    const bar = new THREE.Mesh(new THREE.BoxGeometry(0.12, 0.12, 2.3), line); bar.position.set(s * 8, 1.7, 0); g.add(bar);
    const net = new THREE.Mesh(new THREE.BoxGeometry(0.7, 1.1, 2.2), C.net); net.position.set(s * 8.4, 1.15, 0); g.add(net);
  }
  const seat = ['#E0453A', '#FFFFFF', '#F2B233', '#3FA548'];
  for (let k = 0; k < 4; k++) { // the bowl: stepped elliptical rings, open at one end for the gate
    const ring = new THREE.Mesh(new THREE.TorusGeometry(10.4 + k * 1.0, 0.62, 4, 44, Math.PI * 1.78), mat(seat[k]));
    ring.rotation.x = Math.PI / 2; ring.rotation.z = Math.PI * 0.11; ring.scale.set(1, SZ, 1.5); ring.position.y = 1.0 + k * 0.85; g.add(ring);
  }
  const lamps = [];
  for (const [x, z] of [[10.5, 6.4], [10.5, -6.4], [-10.5, 6.4], [-10.5, -6.4]]) {
    const pole = new THREE.Mesh(new THREE.CylinderGeometry(0.16, 0.24, 9, 5), C.gray); pole.position.set(x, 4.5, z); g.add(pole);
    const lamp = new THREE.Mesh(new THREE.BoxGeometry(1.9, 1.2, 0.35), mat('#FFF6C8', { emissive: '#FFE680', emissiveIntensity: 0.9 }));
    lamp.position.set(x, 9.3, z); lamp.rotation.y = Math.atan2(x, z); lamp.rotation.x = 0.35; g.add(lamp); lamps.push(lamp);
  }
  const ball = new THREE.Mesh(new THREE.IcosahedronGeometry(0.42, 0), mat('#FFFFFF')); g.add(ball);
  const flag = new THREE.Mesh(new THREE.BoxGeometry(1.6, 0.9, 0.06), mat('#3FA548')); flag.position.set(13.3, 4.4, 0); g.add(flag);
  const mast = new THREE.Mesh(new THREE.CylinderGeometry(0.08, 0.08, 5, 5), C.white); mast.position.set(12.5, 2.5, 0); g.add(mast);
  g.userData.radius = 14;
  g.userData.update = (time) => {
    const u = time * 0.9; ball.position.set(Math.sin(u) * 7.2, 0.95 + Math.abs(Math.sin(u * 3)) * 1.6, Math.sin(u * 1.7) * 2.6); ball.rotation.set(u * 3, u * 2, 0);
    flag.rotation.y = Math.sin(time * 3) * 0.25; lamps.forEach((l) => { l.material.emissiveIntensity = 0.8 + 0.2 * Math.sin(time * 9); });
  };
  return g;
}

function pyramid() { // a pyramid in Kozhikode: sand, a big stepped pyramid with a gold cap, a small one beside it and a camel doing rounds
  const g = new THREE.Group();
  const sand = new THREE.Mesh(new THREE.CylinderGeometry(11, 11.6, 0.6, 32), mat('#EBCB8B')); sand.position.y = 0.3; g.add(sand);
  const stone = [mat('#D9A85B'), mat('#CC9A4E')];
  const tier = (cx, cz, half, n, h) => { for (let k = 0; k < n; k++) { const w = 2 * half * (1 - k / n); const b = new THREE.Mesh(new THREE.BoxGeometry(w, h, w), stone[k % 2]); b.position.set(cx, 0.6 + h * (k + 0.5), cz); b.rotation.y = 0.5; g.add(b); } return 0.6 + n * h; };
  const top = tier(-1.2, -1, 6, 12, 0.85);
  const cap = new THREE.Mesh(new THREE.ConeGeometry(0.75, 1.1, 4), C.gold); cap.position.set(-1.2, top - 0.3, -1); cap.rotation.y = 0.5 + Math.PI / 4; g.add(cap);
  tier(6.2, 3.6, 2.4, 6, 0.65);
  const door = new THREE.Mesh(new THREE.BoxGeometry(1.1, 1.5, 0.3), mat('#3A2A1A')); door.position.set(1.7, 1.35, 4.3); door.rotation.y = 0.5; g.add(door);
  const palm = coconut(); palm.scale.setScalar(0.45); palm.position.set(-7.5, 0.6, 4.5); g.add(palm);
  const camel = new THREE.Group(), fur = mat('#B9823F');
  const body = new THREE.Mesh(new THREE.BoxGeometry(1.9, 0.9, 0.8), fur); body.position.y = 1.5; camel.add(body);
  const hump = new THREE.Mesh(new THREE.SphereGeometry(0.5, 7, 5), fur); hump.position.set(-0.1, 2.05, 0); camel.add(hump);
  const neck = new THREE.Mesh(new THREE.BoxGeometry(0.35, 1.3, 0.4), fur); neck.position.set(1.05, 2.1, 0); neck.rotation.z = -0.35; camel.add(neck);
  const head = new THREE.Mesh(new THREE.BoxGeometry(0.8, 0.4, 0.45), fur); head.position.set(1.5, 2.75, 0); camel.add(head);
  const legs = [];
  for (const [x, z] of [[-0.7, 0.28], [-0.7, -0.28], [0.7, 0.28], [0.7, -0.28]]) { const p = new THREE.Group(); p.position.set(x, 1.1, z); const l = new THREE.Mesh(new THREE.BoxGeometry(0.22, 1.1, 0.22), fur); l.position.y = -0.55; p.add(l); camel.add(p); legs.push(p); }
  g.add(camel);
  g.userData.radius = 11;
  g.userData.update = (time) => {
    const a = time * 0.25; camel.position.set(Math.cos(a) * 9.2, 0.6, Math.sin(a) * 9.2); camel.rotation.y = -a - Math.PI / 2;
    legs.forEach((l, i) => { l.rotation.z = Math.sin(time * 5 + (i % 3 ? Math.PI : 0)) * 0.45; });
    cap.material.emissiveIntensity = 0.25 + 0.3 * Math.abs(Math.sin(time * 1.5));
  };
  return g;
}

function eiffel() { // the Paris tower in Kollam: four splayed iron legs, arches, three decks, a spire and twinkling lights
  const g = new THREE.Group();
  const iron = mat('#8A6A4B', { roughness: 0.6, metalness: 0.3 }), dark = mat('#5E4630', { roughness: 0.6, metalness: 0.3 });
  const lawn = new THREE.Mesh(new THREE.CylinderGeometry(8.5, 8.9, 0.5, 28), mat('#57BD4F')); lawn.position.y = 0.25; g.add(lawn);
  const plaza = new THREE.Mesh(new THREE.BoxGeometry(11, 0.2, 11), mat('#D8D2C0')); plaza.position.y = 0.55; g.add(plaza);
  const beam = (a, b, t, m = iron) => { // a box from point a to point b
    const d = new THREE.Vector3().subVectors(b, a), L = d.length();
    const x = new THREE.Mesh(new THREE.BoxGeometry(t, L, t), m); x.position.copy(a).addScaledVector(d, 0.5);
    x.quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0), d.normalize()); g.add(x); return x;
  };
  const V = (x, y, z) => new THREE.Vector3(x, y, z);
  const LV = [[4.6, 0.6], [2.5, 6.2], [1.25, 11.6], [0.28, 23]]; // half-width of the tower at each height
  for (const sx of [-1, 1]) for (const sz of [-1, 1]) {
    beam(V(sx * LV[0][0], LV[0][1], sz * LV[0][0]), V(sx * LV[1][0], LV[1][1], sz * LV[1][0]), 1.15);
    beam(V(sx * LV[1][0], LV[1][1], sz * LV[1][0]), V(sx * LV[2][0], LV[2][1], sz * LV[2][0]), 0.8);
    beam(V(sx * LV[2][0], LV[2][1], sz * LV[2][0]), V(sx * LV[3][0], LV[3][1], sz * LV[3][0]), 0.5);
    const foot = new THREE.Mesh(new THREE.BoxGeometry(2, 0.7, 2), mat('#B8B2A0')); foot.position.set(sx * 4.6, 0.75, sz * 4.6); g.add(foot);
  }
  for (let k = 0; k < 9; k++) { // cross-bracing rings up the top section
    const u = (k + 1) / 10, hw = LV[2][0] + (LV[3][0] - LV[2][0]) * u, y = LV[2][1] + (LV[3][1] - LV[2][1]) * u;
    const r = new THREE.Mesh(new THREE.BoxGeometry(hw * 2 + 0.3, 0.14, hw * 2 + 0.3), dark); r.position.y = y; g.add(r);
  }
  for (const [hw, y, t] of [[3.0, 6.2, 0.6], [1.7, 11.6, 0.5], [0.6, 21.6, 0.5]]) { // the three decks
    const d = new THREE.Mesh(new THREE.BoxGeometry(hw * 2, t, hw * 2), dark); d.position.y = y; g.add(d);
    const rail = new THREE.Mesh(new THREE.BoxGeometry(hw * 2 + 0.3, 0.16, hw * 2 + 0.3), iron); rail.position.y = y + t; g.add(rail);
  }
  for (let i = 0; i < 4; i++) { // arches between the legs
    const arch = new THREE.Mesh(new THREE.TorusGeometry(2.7, 0.22, 4, 14, Math.PI), dark);
    arch.position.set(Math.sin(i * Math.PI / 2) * 3.5, 2.9, Math.cos(i * Math.PI / 2) * 3.5); arch.rotation.y = i * Math.PI / 2; arch.scale.y = 1.05; g.add(arch);
  }
  for (const sx of [-1, 1]) for (const sz of [-1, 1]) { // X-bracing on the middle section
    beam(V(sx * 2.5, 6.6, sz * 2.5), V(sx * 1.25, 11.4, -sz * 1.25), 0.16, dark);
  }
  const spire = new THREE.Mesh(new THREE.CylinderGeometry(0.04, 0.2, 3.4, 5), iron); spire.position.y = 24.4; g.add(spire);
  const beacon = new THREE.Mesh(new THREE.SphereGeometry(0.26, 8, 6), mat('#FFE680', { emissive: '#FFD23F', emissiveIntensity: 1 })); beacon.position.y = 26.2; g.add(beacon);
  const lights = [];
  for (let i = 0; i < 22; i++) {
    const u = (i * 0.618) % 1, y = 1.5 + u * 20, hw = y < 6.2 ? 4.6 - (y - 0.6) * 0.375 : y < 11.6 ? 2.5 - (y - 6.2) * 0.231 : 1.25 - (y - 11.6) * 0.085, a = i * 2.4;
    const s = new THREE.Mesh(new THREE.SphereGeometry(0.16, 5, 4), mat('#FFF6C8', { emissive: '#FFE680', emissiveIntensity: 1 }));
    const sx = Math.cos(a) > 0 ? 1 : -1, sz = Math.sin(a) > 0 ? 1 : -1; s.position.set(sx * (hw + 0.35), y, sz * (hw + 0.35)); g.add(s); lights.push(s);
  }
  for (const [x, z] of [[-6.6, 2], [6.4, -2.6], [5.6, 5]]) { const p = coconut(); p.scale.setScalar(0.4); p.position.set(x, 0.5, z); p.rotation.y = x; g.add(p); } // Kollam, not Paris
  g.userData.radius = 9;
  g.userData.update = (time) => { lights.forEach((s, i) => { s.material.emissiveIntensity = Math.sin(time * 6 + i * 1.9) > 0.2 ? 1.2 : 0.1; }); beacon.material.emissiveIntensity = 0.5 + 0.5 * Math.sin(time * 3); };
  return g;
}

function taj() { // Taj Mahal in Kannur: marble plinth, onion dome, four chhatris, four minarets and a long pool with fountains
  const g = new THREE.Group();
  const marble = mat('#FFFFFF', { roughness: 0.5, emissive: '#FFFFFF', emissiveIntensity: 0.3 }), shade = mat('#EFE8D8', { roughness: 0.5, emissive: '#EFE8D8', emissiveIntensity: 0.2 }), arch = mat('#6F6A7A');
  const lawn = new THREE.Mesh(new THREE.CylinderGeometry(12, 12.5, 0.5, 36), mat('#57BD4F')); lawn.scale.z = 0.8; lawn.position.y = 0.25; g.add(lawn);
  const plinth = new THREE.Mesh(new THREE.BoxGeometry(11.5, 1.1, 9), shade); plinth.position.set(0, 1.05, -2.6); g.add(plinth);
  const Z = -2.6, Y = 1.6;
  const hall = new THREE.Mesh(new THREE.CylinderGeometry(3.7, 3.7, 4.6, 8), marble); hall.rotation.y = Math.PI / 8; hall.position.set(0, Y + 2.3, Z); g.add(hall);
  for (let i = 0; i < 4; i++) { // the big arched doorway (iwan) on each face
    const a = i * Math.PI / 2, f = new THREE.Group(); f.position.set(Math.sin(a) * 3.42, Y, Z + Math.cos(a) * 3.42); f.rotation.y = a;
    const fr = new THREE.Mesh(new THREE.BoxGeometry(2.7, 5.2, 0.3), marble); fr.position.y = 2.6; f.add(fr);
    const dr = new THREE.Mesh(new THREE.BoxGeometry(1.5, 2.6, 0.12), arch); dr.position.set(0, 1.3, 0.14); f.add(dr);
    const tp = new THREE.Mesh(new THREE.CylinderGeometry(0.75, 0.75, 0.12, 12, 1, false, 0, Math.PI), arch); tp.rotation.set(Math.PI / 2, 0, 0); tp.rotation.z = Math.PI / 2; tp.position.set(0, 2.6, 0.14); f.add(tp);
    g.add(f);
  }
  const drum = new THREE.Mesh(new THREE.CylinderGeometry(1.9, 2.0, 1.3, 16), marble); drum.position.set(0, Y + 5.2, Z); g.add(drum);
  const onion = (x, y, z, r) => {
    const d = new THREE.Mesh(new THREE.SphereGeometry(r, 16, 12), marble); d.scale.y = 1.12; d.position.set(x, y + r * 0.85, z); g.add(d);
    const tip = new THREE.Mesh(new THREE.ConeGeometry(r * 0.5, r * 0.9, 12), marble); tip.position.set(x, y + r * 2.05, z); g.add(tip);
    const fin = new THREE.Mesh(new THREE.CylinderGeometry(0.03, 0.07, r * 0.9, 5), C.gold); fin.position.set(x, y + r * 2.8, z); g.add(fin);
  };
  onion(0, Y + 5.6, Z, 2.3);
  for (const sx of [-1, 1]) for (const sz of [-1, 1]) { // chhatris round the dome
    const x = sx * 2.5, z = Z + sz * 2.5;
    for (let k = 0; k < 4; k++) { const c = new THREE.Mesh(new THREE.CylinderGeometry(0.06, 0.06, 0.9, 4), marble); c.position.set(x + Math.cos(k * Math.PI / 2 + 0.78) * 0.5, Y + 5.05, z + Math.sin(k * Math.PI / 2 + 0.78) * 0.5); g.add(c); }
    onion(x, Y + 5.35, z, 0.72);
  }
  for (const sx of [-1, 1]) for (const sz of [-1, 1]) { // minarets at the plinth corners
    const x = sx * 5.1, z = Z + sz * 3.9;
    const sh = new THREE.Mesh(new THREE.CylinderGeometry(0.34, 0.5, 8.2, 10), marble); sh.position.set(x, Y + 4.1, z); g.add(sh);
    for (const by of [2.8, 5.5, 8.2]) { const b = new THREE.Mesh(new THREE.CylinderGeometry(0.62, 0.62, 0.2, 10), shade); b.position.set(x, Y + by, z); g.add(b); }
    onion(x, Y + 8.3, z, 0.5);
  }
  const pool = new THREE.Mesh(new THREE.BoxGeometry(2.2, 0.16, 7.4), mat('#3FB6E8', { roughness: 0.25 })); pool.position.set(0, 0.56, 5.6); g.add(pool);
  const rim = new THREE.Mesh(new THREE.BoxGeometry(2.8, 0.1, 8), shade); rim.position.set(0, 0.52, 5.6); g.add(rim);
  const jets = [];
  for (let i = 0; i < 5; i++) { const j = new THREE.Mesh(new THREE.CylinderGeometry(0.05, 0.1, 1, 5), mat('#FFFFFF', { transparent: true, opacity: 0.85 })); j.position.set(0, 1, 2.8 + i * 1.4); g.add(j); jets.push(j); }
  for (const sx of [-1, 1]) for (let i = 0; i < 4; i++) { const t = new THREE.Mesh(new THREE.ConeGeometry(0.45, 2.4, 6), mat('#2F7A3C')); t.position.set(sx * 2.4, 1.7, 2.8 + i * 1.9); g.add(t); }
  g.userData.radius = 11;
  g.userData.update = (time) => { jets.forEach((j, i) => { const h = 0.5 + 0.9 * Math.abs(Math.sin(time * 2 + i * 0.7)); j.scale.y = h; j.position.y = 0.6 + h / 2; }); };
  return g;
}

function mountain() { // a mountain for Alappuzha, the flattest district: snow cap, two side peaks, drifting clouds, a flag on top and a kettuvallam left at the foot
  const g = new THREE.Group();
  const rock = mat('#6E7B62'), rock2 = mat('#5B6953'), snow = mat('#FFFFFF');
  const water = new THREE.Mesh(new THREE.CylinderGeometry(11.5, 12, 0.5, 32), mat('#3FB6E8', { roughness: 0.3 })); water.position.y = 0.25; g.add(water);
  const foot = new THREE.Mesh(new THREE.CylinderGeometry(9, 9.8, 0.7, 9), mat('#57BD4F')); foot.position.y = 0.6; g.add(foot);
  const peak = (x, z, r, h, m, ry) => {
    const c = new THREE.Mesh(new THREE.ConeGeometry(r, h, 7), m); c.position.set(x, 0.9 + h / 2, z); c.rotation.y = ry; g.add(c);
    const k = 0.3, s = new THREE.Mesh(new THREE.ConeGeometry(r * k * 1.06, h * k, 7), snow); s.position.set(x, 0.9 + h * (1 - k / 2) + 0.03, z); s.rotation.y = ry; g.add(s);
    return 0.9 + h;
  };
  const top = peak(0, -0.5, 6.6, 15, rock, 0.3);
  peak(-4.6, 2, 3.8, 8, rock2, 1.1); peak(4.8, 1.2, 3.3, 6.5, rock2, 2.0);
  const pole = new THREE.Mesh(new THREE.CylinderGeometry(0.05, 0.05, 2, 4), C.white); pole.position.set(0, top + 0.8, -0.5); g.add(pole);
  const flag = new THREE.Group(); flag.position.set(0, top + 1.5, -0.5);
  const cloth = new THREE.Mesh(new THREE.BoxGeometry(1.3, 0.7, 0.05), C.red); cloth.position.x = 0.65; flag.add(cloth); g.add(flag);
  const clouds = [];
  for (let i = 0; i < 3; i++) {
    const c = new THREE.Group();
    for (const [x, r] of [[-0.9, 0.8], [0, 1.1], [1, 0.75]]) { const p = new THREE.Mesh(new THREE.IcosahedronGeometry(r, 0), mat('#FFFFFF', { transparent: true, opacity: 0.92 })); p.position.x = x; c.add(p); }
    c.userData = { a: i * 2.1, y: 8.5 + i * 2, r: 6.2 - i * 1.1 }; g.add(c); clouds.push(c);
  }
  const boat = houseboat(); boat.scale.setScalar(0.4); boat.position.set(3, 0.5, 9.3); boat.rotation.y = 0.2; g.add(boat);
  for (const [x, z] of [[-7, 4.5], [7.4, -2.5]]) { const p = coconut(); p.scale.setScalar(0.4); p.position.set(x, 0.9, z); p.rotation.y = z; g.add(p); }
  g.userData.radius = 12;
  g.userData.update = (time) => {
    clouds.forEach((c) => { const a = c.userData.a + time * 0.18; c.position.set(Math.cos(a) * c.userData.r, c.userData.y, Math.sin(a) * c.userData.r - 0.5); });
    flag.rotation.y = Math.sin(time * 3.5) * 0.35; boat.position.y = 0.45 + Math.sin(time * 1.5) * 0.07;
  };
  return g;
}

function sheru() { // Sheru Bhai for Malappuram: a lion boss in a white suit on a gold-trimmed plinth, red carpet, gold chain, sunglasses
  const g = new THREE.Group();
  const suit = mat('#FFFFFF', { roughness: 0.6, emissive: '#FFFFFF', emissiveIntensity: 0.32 }), fur = mat('#E8C98A', { emissive: '#E8C98A', emissiveIntensity: 0.2 }), mane = mat('#FFF3D6', { emissive: '#FFF3D6', emissiveIntensity: 0.28 }), dk = mat('#1A1A1A');
  const lawn = new THREE.Mesh(new THREE.CylinderGeometry(7.5, 7.9, 0.5, 28), mat('#57BD4F')); lawn.position.y = 0.25; g.add(lawn);
  const carpet = new THREE.Mesh(new THREE.BoxGeometry(2.6, 0.08, 6.5), C.red); carpet.position.set(0, 0.55, 4.2); g.add(carpet);
  const pl = new THREE.Mesh(new THREE.CylinderGeometry(3.2, 3.5, 1.6, 8), mat('#F3E7D3')); pl.position.y = 1.3; g.add(pl);
  const trim = new THREE.Mesh(new THREE.CylinderGeometry(3.35, 3.35, 0.25, 8), C.gold); trim.position.y = 2.15; g.add(trim);
  const m = new THREE.Group(); m.position.y = 2.25; m.scale.setScalar(1.35); g.add(m);
  for (const s of [-1, 1]) {
    const leg = new THREE.Mesh(new THREE.BoxGeometry(0.95, 3.2, 1.0), suit); leg.position.set(s * 0.62, 1.6, 0); m.add(leg);
    const shoe = new THREE.Mesh(new THREE.BoxGeometry(1.0, 0.4, 1.6), suit); shoe.position.set(s * 0.62, 0.2, 0.3); m.add(shoe);
    const arm = new THREE.Mesh(new THREE.BoxGeometry(0.8, 3.0, 0.9), suit); arm.position.set(s * 1.75, 4.5, 0.1); arm.rotation.z = s * 0.12; m.add(arm);
    const paw = new THREE.Mesh(new THREE.SphereGeometry(0.48, 7, 6), fur); paw.position.set(s * 1.95, 2.85, 0.15); m.add(paw);
    const lapel = new THREE.Mesh(new THREE.BoxGeometry(0.5, 1.7, 0.1), mat('#E6DFD0')); lapel.position.set(s * 0.45, 5.0, 0.76); lapel.rotation.z = -s * 0.3; m.add(lapel);
    const ear = new THREE.Mesh(new THREE.SphereGeometry(0.42, 6, 5), fur); ear.position.set(s * 1.05, 8.75, 0.1); m.add(ear);
  }
  const torso = new THREE.Mesh(new THREE.BoxGeometry(2.9, 3.0, 1.5), suit); torso.position.y = 4.6; m.add(torso);
  const belt = new THREE.Mesh(new THREE.BoxGeometry(2.95, 0.3, 1.55), mat('#7A4520')); belt.position.y = 3.25; m.add(belt);
  const buckle = new THREE.Mesh(new THREE.BoxGeometry(0.5, 0.4, 0.1), C.gold); buckle.position.set(0, 3.25, 0.8); m.add(buckle);
  const chain = new THREE.Mesh(new THREE.TorusGeometry(0.85, 0.13, 5, 16), C.gold); chain.position.set(0, 5.5, 0.72); chain.rotation.x = 0.35; chain.scale.y = 1.25; m.add(chain);
  const locket = new THREE.Mesh(new THREE.BoxGeometry(0.75, 0.55, 0.12), C.gold); locket.position.set(0, 4.5, 0.85); m.add(locket);
  const head = new THREE.Group(); head.position.y = 7.6; m.add(head);
  for (let i = 0; i < 12; i++) { const a = i / 12 * Math.PI * 2; const t = new THREE.Mesh(new THREE.IcosahedronGeometry(1.0, 0), mane); t.position.set(Math.cos(a) * 1.25, Math.sin(a) * 1.25 - 0.15, -0.35); head.add(t); }
  const back = new THREE.Mesh(new THREE.IcosahedronGeometry(1.75, 1), mane); back.position.set(0, -0.3, -0.7); head.add(back);
  const beard = new THREE.Mesh(new THREE.ConeGeometry(1.2, 2.2, 6), mane); beard.position.set(0, -1.7, 0.35); beard.rotation.x = Math.PI; head.add(beard);
  const face = new THREE.Mesh(new THREE.SphereGeometry(1.1, 10, 8), fur); face.position.z = 0.25; head.add(face);
  const muzzle = new THREE.Mesh(new THREE.SphereGeometry(0.62, 8, 6), mat('#FFF8E8')); muzzle.scale.set(1.15, 0.8, 1); muzzle.position.set(0, -0.35, 1.1); head.add(muzzle);
  const nose = new THREE.Mesh(new THREE.BoxGeometry(0.4, 0.26, 0.2), mat('#6B4A3A')); nose.position.set(0, -0.12, 1.68); head.add(nose);
  for (const s of [-1, 1]) { const lens = new THREE.Mesh(new THREE.CylinderGeometry(0.36, 0.36, 0.1, 10), dk); lens.rotation.x = Math.PI / 2; lens.position.set(s * 0.45, 0.28, 1.2); head.add(lens); }
  const bridge = new THREE.Mesh(new THREE.BoxGeometry(2.1, 0.09, 0.09), C.gold); bridge.position.set(0, 0.35, 1.18); head.add(bridge);
  const tail = new THREE.Group(); tail.position.set(0.3, 3.3, -0.7); m.add(tail);
  const tl = new THREE.Mesh(new THREE.CylinderGeometry(0.1, 0.13, 2.6, 5), fur); tl.position.set(0, -0.5, -1.0); tl.rotation.x = -1.0; tail.add(tl);
  const tuft = new THREE.Mesh(new THREE.IcosahedronGeometry(0.4, 0), mane); tuft.position.set(0, 0.2, -2.15); tail.add(tuft);
  const posts = [];
  for (const s of [-1, 1]) for (const z of [2, 4.6, 7.2]) { const p = new THREE.Mesh(new THREE.CylinderGeometry(0.1, 0.14, 1.3, 6), C.gold); p.position.set(s * 1.7, 1.15, z); g.add(p); const k = new THREE.Mesh(new THREE.SphereGeometry(0.2, 6, 5), C.gold); k.position.set(s * 1.7, 1.9, z); g.add(k); posts.push(k); }
  g.userData.radius = 8;
  g.userData.update = (time) => { head.rotation.y = Math.sin(time * 0.7) * 0.4; head.rotation.z = Math.sin(time * 0.35) * 0.05; tail.rotation.y = Math.sin(time * 2.2) * 0.5; chain.material.emissiveIntensity = 0.2 + 0.4 * Math.abs(Math.sin(time * 2)); };
  return g;
}

function twisttower() { // Malappuram Tower (our own design): a glass tower that twists a quarter turn as it climbs, a sky garden half way and a slowly turning halo
  const g = new THREE.Group();
  const gA = mat('#7FD6C2', { roughness: 0.25, metalness: 0.35 }), gB = mat('#4FB8A4', { roughness: 0.25, metalness: 0.35 });
  const plaza = new THREE.Mesh(new THREE.CylinderGeometry(6, 6.4, 0.5, 6), mat('#D8D2C0')); plaza.position.y = 0.25; g.add(plaza);
  const N = 26, th = 0.95;
  for (let k = 0; k < N; k++) {
    if (k === 13) continue; // sky garden gap
    const w = 4.4 - k * 0.075, f = new THREE.Mesh(new THREE.BoxGeometry(w, th * 0.9, w), k % 2 ? gB : gA);
    f.position.y = 0.5 + th * (k + 0.5); f.rotation.y = (k / N) * Math.PI / 2; g.add(f);
  }
  const core = new THREE.Mesh(new THREE.CylinderGeometry(0.9, 0.9, N * th, 8), C.white); core.position.y = 0.5 + N * th / 2; g.add(core);
  const gy = 0.5 + th * 13.5;
  for (let i = 0; i < 4; i++) { const a = i * Math.PI / 2 + 0.8; const t = new THREE.Mesh(new THREE.IcosahedronGeometry(0.42, 0), C.frond); t.position.set(Math.cos(a) * 1.5, gy - 0.1, Math.sin(a) * 1.5); g.add(t); }
  const top = 0.5 + N * th;
  const mast = new THREE.Mesh(new THREE.CylinderGeometry(0.06, 0.25, 3.2, 6), C.white); mast.position.y = top + 1.6; g.add(mast);
  const halo = new THREE.Mesh(new THREE.TorusGeometry(2.3, 0.14, 5, 28), mat('#FFE680', { emissive: '#FFD23F', emissiveIntensity: 0.9 })); halo.position.y = top + 1.5; g.add(halo);
  const tip = new THREE.Mesh(new THREE.SphereGeometry(0.24, 8, 6), mat('#FF3B30', { emissive: '#FF3B30', emissiveIntensity: 1 })); tip.position.y = top + 3.3; g.add(tip);
  for (const [x, z] of [[-4.6, 1.5], [4.2, 2.6]]) { const p = coconut(); p.scale.setScalar(0.38); p.position.set(x, 0.5, z); p.rotation.y = x; g.add(p); }
  g.userData.radius = 7;
  g.userData.update = (time) => { halo.rotation.x = Math.PI / 2 + Math.sin(time * 0.9) * 0.35; halo.rotation.y = time * 0.8; tip.material.emissiveIntensity = Math.sin(time * 4) > 0 ? 1 : 0.2; };
  return g;
}

export const MODELS = { sheru, twisttower, mountain, taj, eiffel, pyramid, stadium, burj, beach, f1track, coconut, house, houseboat, fishingnet, lighthouse, tower, pin };
export function makeModel(name) { return (MODELS[name] || pin)(); }
