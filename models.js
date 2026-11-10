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

function sheru() { // Sheru Bhai for Malappuram: a white lion boss in a white suit (gold chain, gold watch, phone in hand) with his cub, on a gold-trimmed plinth with a red carpet, under a rain of banknotes
  const g = new THREE.Group();
  const sm = (color, o = {}) => new THREE.MeshStandardMaterial({ color, roughness: 0.75, ...o });
  const suit = sm('#FFFFFF', { emissive: '#FFFFFF', emissiveIntensity: 0.3 }), shirt = sm('#EFE9DC', { emissive: '#EFE9DC', emissiveIntensity: 0.15 });
  const fur = sm('#EDE3D0', { emissive: '#EDE3D0', emissiveIntensity: 0.18 }), mane = sm('#FAF5EA', { emissive: '#FAF5EA', emissiveIntensity: 0.25 });
  const gold = sm('#FFC93C', { emissive: '#FFB000', emissiveIntensity: 0.3, metalness: 0.6, roughness: 0.35 }), dk = sm('#2A1F1A'), pink = sm('#C98F86');
  const add = (parent, geo, m, x, y, z, sx = 1, sy = 1, sz = 1) => { const o = new THREE.Mesh(geo, m); o.position.set(x, y, z); o.scale.set(sx, sy, sz); parent.add(o); return o; };
  const S = (r) => new THREE.SphereGeometry(r, 16, 12), Cap = (r, l) => new THREE.CapsuleGeometry(r, l, 6, 12);
  add(g, new THREE.CylinderGeometry(8, 8.4, 0.5, 28), mat('#57BD4F'), 0, 0.25, 0);
  add(g, new THREE.BoxGeometry(2.8, 0.08, 6.5), C.red, 0, 0.55, 5.4);
  add(g, new THREE.CylinderGeometry(4.2, 4.5, 1.6, 10), mat('#F3E7D3'), 0, 1.3, 0);
  add(g, new THREE.CylinderGeometry(4.35, 4.35, 0.25, 10), C.gold, 0, 2.15, 0);
  add(g, new THREE.CylinderGeometry(4.05, 4.05, 0.1, 10), mat('#FFFFFF'), 0, 2.3, 0);
  for (const s of [-1, 1]) for (const z of [3.6, 5.6, 7.6]) { add(g, new THREE.CylinderGeometry(0.1, 0.14, 1.3, 6), C.gold, s * 1.8, 1.15, z); add(g, S(0.2), C.gold, s * 1.8, 1.9, z); }

  const lion = (cub) => {
    const m = new THREE.Group();
    // legs, shoes / feet
    for (const s of [-1, 1]) {
      add(m, Cap(0.58, 2.3), suit, s * 0.72, 1.85, 0);
      if (cub) add(m, S(0.55), fur, s * 0.72, 0.32, 0.25, 1, 0.6, 1.3);
      else { add(m, S(0.6), suit, s * 0.72, 0.36, 0.35, 0.95, 0.58, 1.6); add(m, new THREE.BoxGeometry(1.05, 0.12, 1.85), sm('#C9A46A'), s * 0.72, 0.07, 0.35); }
    }
    // jacket: broad shoulders tapering to the waist, then the skirt of the coat
    add(m, new THREE.CylinderGeometry(2.0, 1.5, 3.3, 18), suit, 0, 5.0, 0, 1, 1, 0.62);
    add(m, new THREE.CylinderGeometry(1.5, 1.62, 1.3, 18), suit, 0, 3.05, 0, 1, 1, 0.64);
    add(m, S(1.0), suit, 0, 6.5, 0, 1.95, 0.55, 0.66);
    if (!cub) {
      add(m, new THREE.BoxGeometry(0.9, 2.2, 0.1), shirt, 0, 5.6, 1.12);                         // shirt in the V of the jacket
      for (const s of [-1, 1]) { const l = add(m, new THREE.BoxGeometry(0.62, 2.5, 0.12), suit, s * 0.62, 5.5, 1.2); l.rotation.z = -s * 0.28; l.rotation.y = s * 0.25; }
      for (const y of [4.1, 3.4]) add(m, S(0.13), gold, 0.12, y, 1.06);
      add(m, new THREE.BoxGeometry(0.55, 0.3, 0.1), shirt, 1.05, 5.75, 1.08);                    // pocket square
      for (const s of [-1, 1]) add(m, new THREE.BoxGeometry(0.85, 0.22, 0.1), shirt, s * 1.0, 3.5, 0.98);
      const ch = add(m, new THREE.TorusGeometry(0.95, 0.11, 6, 22), gold, 0, 6.05, 0.95, 1, 1.25, 1); ch.rotation.x = 0.5;
    } else { add(m, new THREE.BoxGeometry(3.1, 0.3, 0.2), shirt, 0, 3.6, 0.95); add(m, new THREE.BoxGeometry(0.45, 0.36, 0.1), gold, 0, 3.6, 1.06); }
    // arms and paws
    const arms = [];
    for (const s of [-1, 1]) {
      const a = new THREE.Group(); a.position.set(s * 2.05, 6.35, 0); a.rotation.z = s * 0.13; m.add(a); arms.push(a);
      add(a, S(0.78), suit, 0, 0, 0); add(a, Cap(0.56, 2.3), suit, 0, -1.6, 0.05);
      add(a, S(0.66), fur, 0, -3.35, 0.15, 1, 1.05, 1);
      if (!cub && s === 1) { const w = add(a, new THREE.TorusGeometry(0.56, 0.13, 6, 16), gold, 0, -2.85, 0.08); w.rotation.x = Math.PI / 2; }
      if (!cub && s === -1) { const ph = add(a, new THREE.BoxGeometry(0.62, 1.15, 0.1), sm('#BFE3FF', { emissive: '#9FD8FF', emissiveIntensity: 0.9 }), 0.05, -3.5, 0.78); ph.rotation.x = -0.5; add(a, new THREE.BoxGeometry(0.7, 1.23, 0.08), dk, 0.05, -3.52, 0.72).rotation.x = -0.5; }
    }
    // tail
    const tail = new THREE.Group(); tail.position.set(0.3, 3.1, -0.9); m.add(tail);
    const tl = add(tail, Cap(0.13, 2.6), fur, 0, -0.7, -1.1); tl.rotation.x = -1.05; add(tail, S(0.42), mane, 0, 0.0, -2.45, 1, 1, 1.3);
    // head
    const head = new THREE.Group(); head.position.set(0, cub ? 8.1 : 8.35, 0.15); m.add(head);
    if (!cub) {
      add(head, S(1.75), mane, 0, 0.0, -0.8, 1.05, 1.1, 0.85);                                   // volume behind the face
      const mane2 = sm('#EFE7D6', { emissive: '#EFE7D6', emissiveIntensity: 0.2 }), UP = new THREE.Vector3(0, 1, 0);
      const lock = (x, y, z, dx, dy, dz, len, w, m2) => { // one tapered strand of mane, pointing along (dx,dy,dz)
        const o = new THREE.Mesh(new THREE.SphereGeometry(1, 10, 8), m2 ? mane2 : mane); o.scale.set(w, len, w * 0.8);
        const d = new THREE.Vector3(dx, dy, dz).normalize(); o.quaternion.setFromUnitVectors(UP, d); o.position.set(x + d.x * len * 0.6, y + d.y * len * 0.6, z + d.z * len * 0.6); head.add(o);
      };
      for (let L = 0; L < 3; L++) { // three layers of strands: they fan out from the face, sweep back and fall with gravity
        const n = 16 + L * 3, r = 0.95 + L * 0.42;
        for (let k = 0; k < n; k++) {
          const a = (k + L * 0.5) / n * Math.PI * 2, cx = Math.cos(a), cy = Math.sin(a), down = cy < 0 ? 1 : 0;
          const upF = Math.max(cy, 0), side = 1 - upF;
          lock(cx * r * 0.95, cy * r * 0.9 + 0.15, -0.05 - L * 0.38, cx * (0.3 + upF * 0.25), -side * 1.0 + upF * 0.05 - 0.2, -upF * 1.1 - 0.2 - L * 0.1, 1.05 + L * 0.22 + side * 0.45 + (k % 3) * 0.12, 0.5 - L * 0.03, (k + L) % 2);
        }
      }
      for (let k = 0; k < 7; k++) { const x = (k - 3) * 0.3; lock(x, 1.05, 0.3, x * 0.4, 0.08, -1, 1.2, 0.46, k % 2); }                     // swept back over the top
      for (let k = 0; k < 9; k++) { const x = (k - 4) * 0.32; lock(x, -1.0, 0.75 - Math.abs(x) * 0.25, x * 0.25, -1, 0.1, 1.35 - Math.abs(x) * 0.25 + (k % 2) * 0.2, 0.46, k % 2); } // chest mane
    }
    add(head, S(1.12), fur, 0, 0, 0.3, 1, 1.05, 1);
    for (const s of [-1, 1]) {
      add(head, S(0.42), fur, s * 0.98, 1.05, 0.15, 1, 1, 0.6); add(head, S(0.24), pink, s * 0.98, 1.05, 0.34, 1, 1, 0.4);
      add(head, S(0.5), mane, s * 0.36, -0.42, 1.16, 1.05, 0.85, 1);                             // whisker pads
      add(head, S(0.22), sm('#FFFFFF'), s * 0.47, 0.3, 1.2, 1.15, 0.8, 0.6); add(head, S(0.13), sm('#B8862B'), s * 0.47, 0.3, 1.31, 1, 1, 0.5); add(head, S(0.065), dk, s * 0.47, 0.3, 1.37);
      const br = add(head, new THREE.BoxGeometry(0.55, 0.1, 0.16), mane, s * 0.47, 0.56, 1.22); br.rotation.z = s * 0.25;
    }
    add(head, S(0.4), mane, 0, -0.82, 1.02, 1, 0.75, 0.9);                                       // chin
    add(head, new THREE.BoxGeometry(0.34, 0.6, 0.5), fur, 0, 0.05, 1.18);                        // bridge of the nose
    add(head, S(0.24), pink, 0, -0.2, 1.56, 1.25, 0.8, 0.75);
    add(head, new THREE.BoxGeometry(0.06, 0.3, 0.06), dk, 0, -0.45, 1.6); add(head, new THREE.BoxGeometry(0.62, 0.06, 0.06), dk, 0, -0.62, 1.52);
    m.userData = { head, tail, arms };
    return m;
  };
  const boss = lion(false); boss.position.set(-0.7, 2.25, 0); boss.scale.setScalar(1.3); g.add(boss);
  const cub = lion(true); cub.position.set(2.7, 2.25, 1.3); cub.scale.setScalar(0.58); cub.rotation.y = -0.7; g.add(cub);
  cub.userData.head.scale.setScalar(1.35);
  // money rain: notes flutter down around him, and the ones that landed are piled up with gold coins
  const noteM = [sm('#3FA548', { side: THREE.DoubleSide, emissive: '#3FA548', emissiveIntensity: 0.25 }), sm('#8FD694', { side: THREE.DoubleSide, emissive: '#8FD694', emissiveIntensity: 0.25 })];
  const noteG = new THREE.BoxGeometry(0.95, 0.03, 0.5), bandG = new THREE.BoxGeometry(0.3, 0.04, 0.52);
  const note = () => { const n = new THREE.Group(); n.add(new THREE.Mesh(noteG, noteM[0])); n.add(new THREE.Mesh(bandG, noteM[1])); return n; };
  const rain = [];
  for (let i = 0; i < 46; i++) {
    const n = note(), a = i * 2.39996, r = 1.6 + ((i * 0.618) % 1) * 5.6;
    n.userData = { x: Math.cos(a) * r - 0.4, z: Math.sin(a) * r + 0.4, off: (i * 0.377) % 1, sp: 0.16 + ((i * 0.271) % 1) * 0.1, ph: i * 1.7 };
    n.scale.setScalar(1.7); g.add(n); rain.push(n);
  }
  for (const [x, z, k] of [[-5.2, 2.6, 6], [4.9, -1.6, 5], [5.4, 3.6, 4], [-4.6, -3.2, 5]]) {
    for (let j = 0; j < k; j++) { const n = note(); n.scale.setScalar(1.5); n.position.set(x + Math.sin(j * 2.3) * 0.25, 0.56 + j * 0.07, z + Math.cos(j * 1.9) * 0.2); n.rotation.y = j * 0.7; g.add(n); }
  }
  for (const [x, z, k] of [[-3.9, 4.4, 7], [-3.2, 4.9, 4], [3.6, 5.2, 6], [6.0, 0.8, 5]]) for (let j = 0; j < k; j++) add(g, new THREE.CylinderGeometry(0.42, 0.42, 0.14, 12), gold, x, 0.6 + j * 0.15, z);
  g.userData.radius = 8.5;
  g.userData.update = (time) => {
    for (const n of rain) { const u = n.userData, f = (time * u.sp + u.off) % 1; n.position.set(u.x + Math.sin(time * 1.6 + u.ph) * 0.7, 17 - f * 16.4, u.z + Math.cos(time * 1.3 + u.ph) * 0.5); n.rotation.set(Math.sin(time * 2.4 + u.ph) * 1.1, time * 1.2 + u.ph, Math.cos(time * 2 + u.ph) * 0.9); }
    boss.userData.head.rotation.y = Math.sin(time * 0.7) * 0.35; boss.userData.tail.rotation.y = Math.sin(time * 2.2) * 0.5;
    cub.userData.head.rotation.x = -0.25 + Math.sin(time * 1.3) * 0.08; cub.userData.tail.rotation.y = Math.sin(time * 5) * 0.7; cub.position.y = 2.25 + Math.abs(Math.sin(time * 3)) * 0.25;
    cub.userData.arms[0].rotation.x = -0.6 + Math.sin(time * 6) * 0.3;
  };
  return g;
}

function bitexco() { // Nithin Tower, modelled on the Bitexco Financial Tower: a lotus-bud glass tower with floor lines, lit lower floors, a side helipad, an annex with its own pad, and a ring road with palms
  const g = new THREE.Group();
  const sm = (color, o = {}) => new THREE.MeshStandardMaterial({ color, roughness: 0.22, metalness: 0.4, ...o });
  const gA = sm('#5FB0D0', { emissive: '#5FB0D0', emissiveIntensity: 0.25 }), gB = sm('#3F8FB5', { emissive: '#3F8FB5', emissiveIntensity: 0.25 });
  const lit = sm('#FFD873', { emissive: '#FFC53D', emissiveIntensity: 0.9 }), steel = mat('#C9D2DE'), line = mat('#DCE6F0'), road = mat('#5A6070'), white = mat('#FFFFFF');
  const add = (geo, m, x, y, z) => { const o = new THREE.Mesh(geo, m); o.position.set(x, y, z); g.add(o); return o; };
  // ground: lawn, ring road with dashes, paved plaza
  add(new THREE.CylinderGeometry(9, 9.4, 0.4, 36), mat('#57BD4F'), 0, 0.2, 0);
  add(new THREE.CylinderGeometry(8.4, 8.4, 0.12, 40), road, 0, 0.44, 0);
  add(new THREE.CylinderGeometry(6.6, 6.6, 0.16, 40), mat('#B9BEC8'), 0, 0.46, 0);
  for (let i = 0; i < 26; i++) { const a = i / 26 * Math.PI * 2; const d = add(new THREE.BoxGeometry(0.75, 0.04, 0.14), white, Math.cos(a) * 7.5, 0.52, Math.sin(a) * 7.5); d.rotation.y = -a + Math.PI / 2; }
  // the tower
  const N = 46, th = 0.58, y0 = 0.55, H = N * th;
  const R = (u) => (2.2 + 0.8 * Math.sin(Math.min(1, u / 0.4) * Math.PI / 2)) * (u < 0.4 ? 1 : 1 - 0.88 * ((u - 0.4) / 0.6) ** 1.6);
  const X = (u) => -1.0 * u * u;
  for (let k = 0; k < N; k++) {
    const u0 = k / N, u1 = (k + 1) / N, m = k < 5 ? lit : (k % 6 === 5 ? gB : gA);
    const f = add(new THREE.CylinderGeometry(R(u1), R(u0), th, 30), m, (X(u0) + X(u1)) / 2, y0 + th * (k + 0.5), 0); f.scale.z = 0.74;
    const l = add(new THREE.CylinderGeometry(R(u1) + 0.03, R(u1) + 0.03, 0.05, 30), k < 5 ? steel : line, X(u1), y0 + th * (k + 1), 0); l.scale.z = 0.74; // floor line
  }
  const tip = add(new THREE.ConeGeometry(R(1), 1.5, 20), gB, X(1) - 0.1, y0 + H + 0.7, 0); tip.scale.z = 0.74; tip.rotation.z = 0.14;
  const seam = (fx, fz, u1, r) => { // a bright seam following the curve of the glass
    const pts = []; for (let k = 0; k <= 24; k++) { const u = k / 24 * u1; pts.push(new THREE.Vector3(X(u) + fx * R(u), y0 + u * H, fz * R(u) * 0.74)); }
    g.add(new THREE.Mesh(new THREE.TubeGeometry(new THREE.CatmullRomCurve3(pts), 48, r, 5), steel));
  };
  seam(0, 1, 1, 0.09); seam(0, -1, 1, 0.09); seam(0.82, 0.57, 1, 0.07); seam(0.82, -0.57, 1, 0.07);
  // helipad on the side
  const uh = 0.68, hy = y0 + uh * H, hx = X(uh) + R(uh) + 1.55;
  const pad = (x, y, r) => {
    add(new THREE.CylinderGeometry(r, r * 0.55, 0.5, 28), steel, x, y - 0.15, 0); add(new THREE.CylinderGeometry(r * 0.9, r * 0.9, 0.06, 28), mat('#8C97A6'), x, y + 0.12, 0);
    const ring = add(new THREE.TorusGeometry(r * 0.6, 0.06, 4, 28), white, x, y + 0.16, 0); ring.rotation.x = Math.PI / 2;
    for (const [w, d, z] of [[0.8, 0.13, 0], [0.13, 0.9, 0.34], [0.13, 0.9, -0.34]]) add(new THREE.BoxGeometry(d * r / 2, 0.05, w * r / 2), white, x, y + 0.17, z * r / 2);
  };
  pad(hx, hy, 2.1); add(new THREE.BoxGeometry(2.4, 0.5, 1.6), steel, hx - 1.7, hy - 0.25, 0);
  const lamps = [];
  for (let i = 0; i < 6; i++) { const a = i / 6 * Math.PI * 2; lamps.push(add(new THREE.SphereGeometry(0.11, 6, 5), mat('#FF3B30', { emissive: '#FF3B30', emissiveIntensity: 1 }), hx + Math.cos(a) * 1.95, hy + 0.16, Math.sin(a) * 1.95)); }
  // low annex with glass walls and its own pad
  const ax = 3.6, az = 2.2;
  for (let k = 0; k < 4; k++) add(new THREE.CylinderGeometry(1.75, 1.75, 0.62, 20), k < 2 ? lit : gB, ax, 0.86 + k * 0.66, az);
  for (let k = 0; k <= 4; k++) add(new THREE.CylinderGeometry(1.8, 1.8, 0.06, 20), steel, ax, 0.54 + k * 0.66, az);
  { const r = 1.5, y = 3.3; add(new THREE.CylinderGeometry(r, r, 0.08, 24), mat('#8C97A6'), ax, y, az); const ring = add(new THREE.TorusGeometry(r * 0.62, 0.05, 4, 24), white, ax, y + 0.05, az); ring.rotation.x = Math.PI / 2;
    for (const [w, d, z] of [[0.6, 0.1, 0], [0.1, 0.7, 0.26], [0.1, 0.7, -0.26]]) add(new THREE.BoxGeometry(d, 0.05, w), white, ax, y + 0.06, az + z); }
  // palms, bushes and small trees round the plaza
  for (const [x, z] of [[-4.6, 2.6], [-3.2, 4.4], [5.4, -0.6], [4.6, -2.8]]) { const p = coconut(); p.scale.setScalar(0.34); p.position.set(x, 0.5, z); p.rotation.y = x * 2; g.add(p); }
  const bush = mat('#3FA548'), bush2 = mat('#2F8A3C');
  for (let i = 0; i < 14; i++) { const a = i * 0.47 + 0.4, r = 4.6 + (i % 3) * 0.55; const b = add(new THREE.IcosahedronGeometry(0.32 + (i % 2) * 0.12, 0), i % 2 ? bush : bush2, Math.cos(a) * r, 0.75, Math.sin(a) * r); if (i % 4 === 0) { b.geometry = new THREE.ConeGeometry(0.4, 1.1, 6); b.position.y = 1.05; } }
  const heli = new THREE.Group();
  const hb = new THREE.Mesh(new THREE.SphereGeometry(0.5, 10, 8), C.red); hb.scale.set(1.5, 0.9, 0.9); heli.add(hb);
  const ht = new THREE.Mesh(new THREE.BoxGeometry(1.4, 0.14, 0.14), C.red); ht.position.set(-1.2, 0.1, 0); heli.add(ht);
  const rotor = new THREE.Mesh(new THREE.BoxGeometry(2.6, 0.04, 0.16), mat('#1A1A1A')); rotor.position.y = 0.55; heli.add(rotor);
  g.add(heli);
  g.userData.radius = 9;
  g.userData.update = (time) => {
    const c = (time * 0.12) % 1, up = c < 0.15 ? 0 : c < 0.5 ? (c - 0.15) / 0.35 : c < 0.65 ? 1 : 1 - (c - 0.65) / 0.35, e = up * up * (3 - 2 * up);
    heli.position.set(hx + e * 2.5, hy + 0.62 + e * 5, e * 3); heli.rotation.y = e * 2.4; rotor.rotation.y = time * 25;
    lamps.forEach((l, i) => { l.material.emissiveIntensity = Math.sin(time * 5 + i) > 0 ? 1 : 0.15; });
    lit.emissiveIntensity = 0.8 + 0.15 * Math.sin(time * 2);
  };
  return g;
}

export const MODELS = { sheru, bitexco, mountain, taj, eiffel, pyramid, stadium, burj, beach, f1track, coconut, house, houseboat, fishingnet, lighthouse, tower, pin };
export function makeModel(name) { return (MODELS[name] || pin)(); }
