// നമ്മുടെ കേരളം — a 3D Kerala built from Instagram comments. Data: data/world.json (updated after every episode).
import * as THREE from 'three';
import { OrbitControls } from './vendor/OrbitControls.js';
import { makeModel } from './models.js';

// ---------- projection: lon/lat → scene units (stylised, not survey-grade) ----------
const K = 100, LON0 = 76.2, LAT0 = 10.5;
const P = (lon, lat) => new THREE.Vector2((lon - LON0) * K, -(lat - LAT0) * K);

// approximate state outline: coast north→south, then the eastern border south→north
const KERALA = [
  [74.86, 12.79], [74.98, 12.5], [75.08, 12.25], [75.2, 12.05], [75.37, 11.87], [75.49, 11.75], [75.58, 11.55], [75.77, 11.25],
  [75.87, 11.05], [75.92, 10.8], [76.04, 10.55], [76.13, 10.25], [76.24, 9.97], [76.3, 9.7], [76.32, 9.49], [76.42, 9.15],
  [76.59, 8.89], [76.7, 8.72], [76.88, 8.53], [77.05, 8.33], [77.15, 8.21],
  [77.22, 8.32], [77.27, 8.5], [77.18, 8.72], [77.15, 9.0], [77.25, 9.25], [77.2, 9.5], [77.3, 9.8], [77.32, 10.0], [77.25, 10.2],
  [77.1, 10.38], [76.88, 10.55], [76.82, 10.82], [76.75, 11.05], [76.6, 11.3], [76.42, 11.55], [76.25, 11.75], [76.05, 11.95],
  [75.85, 12.02], [75.6, 12.2], [75.4, 12.42], [75.2, 12.65], [74.98, 12.8],
];
// all 14 districts (label placed near the district HQ, nudged inland so it sits on land)
const DISTRICTS = [
  ['കാസർഗോഡ്', 75.12, 12.45], ['കണ്ണൂർ', 75.5, 11.9], ['വയനാട്', 76.08, 11.65], ['കോഴിക്കോട്', 75.85, 11.3],
  ['മലപ്പുറം', 76.1, 11.02], ['പാലക്കാട്', 76.62, 10.8], ['തൃശൂർ', 76.3, 10.5], ['എറണാകുളം', 76.4, 10.05],
  ['ഇടുക്കി', 76.95, 9.85], ['കോട്ടയം', 76.62, 9.6], ['ആലപ്പുഴ', 76.47, 9.3], ['പത്തനംതിട്ട', 76.85, 9.25],
  ['കൊല്ലം', 76.75, 8.95], ['തിരുവനന്തപുരം', 77.0, 8.55],
];

const canvas = document.getElementById('scene');
const renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
renderer.shadowMap.enabled = true;
const scene = new THREE.Scene();
scene.background = new THREE.Color('#0B1230');
scene.fog = new THREE.Fog('#0B1230', 700, 1500);
const camera = new THREE.PerspectiveCamera(40, 1, 1, 4000);
const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true; controls.maxPolarAngle = Math.PI * 0.46; controls.minDistance = 12; controls.maxDistance = 1100; controls.zoomSpeed = 1.2;

scene.add(new THREE.HemisphereLight('#CFE6FF', '#203018', 1.1));
const sun = new THREE.DirectionalLight('#FFF1D6', 1.6);
sun.position.set(-200, 400, 150); sun.castShadow = true; sun.shadow.mapSize.set(2048, 2048);
Object.assign(sun.shadow.camera, { left: -350, right: 350, top: 350, bottom: -350, far: 1200 });
scene.add(sun);

// sea
const sea = new THREE.Mesh(new THREE.CircleGeometry(1400, 48), new THREE.MeshStandardMaterial({ color: '#1D5F99', roughness: 0.4, metalness: 0.1 }));
sea.rotation.x = -Math.PI / 2; sea.position.y = -0.5; sea.receiveShadow = true; scene.add(sea);

// land
const shape = new THREE.Shape(KERALA.map(([lo, la]) => P(lo, la)));
const landGeo = new THREE.ExtrudeGeometry(shape, { depth: 4, bevelEnabled: true, bevelThickness: 1, bevelSize: 1.5, bevelSegments: 1 });
landGeo.rotateX(Math.PI / 2); landGeo.translate(0, 4, 0);
const land = new THREE.Mesh(landGeo, [new THREE.MeshStandardMaterial({ color: '#6CC24A', flatShading: true }), new THREE.MeshStandardMaterial({ color: '#B58A57', flatShading: true })]);
land.receiveShadow = true; scene.add(land);

// Western Ghats: hills just inside the eastern border
const hillMat = new THREE.MeshStandardMaterial({ color: '#2F7A3C', flatShading: true });
const east = KERALA.slice(21);
const rand = (i) => { const x = Math.sin(i * 12.9898) * 43758.5453; return x - Math.floor(x); };
east.forEach(([lo, la], i) => {
  for (let j = 0; j < 3; j++) {
    const v = P(lo - 0.06 - j * 0.07 - rand(i * 3 + j) * 0.05, la + (rand(i + j * 7) - 0.5) * 0.1);
    const h = 10 + rand(i * 5 + j) * 18 - j * 4;
    const hill = new THREE.Mesh(new THREE.ConeGeometry(7 + rand(i + j) * 6, h, 6), hillMat);
    hill.position.set(v.x, 4 + h / 2, v.y); hill.castShadow = true; scene.add(hill);
  }
});

const LABELS = [];
let HOME_D = 600;
// text sprites (Malayalam needs the font loaded first)
function label(text, { size = 34, color = '#FFFFFF', bg = 'rgba(11,18,48,0.75)', scale = 0.16 } = {}) {
  const c = document.createElement('canvas'), x = c.getContext('2d');
  x.font = `700 ${size}px Manjari, sans-serif`;
  const w = Math.ceil(x.measureText(text).width) + 28, h = size + 22;
  c.width = w; c.height = h;
  x.font = `700 ${size}px Manjari, sans-serif`;
  x.fillStyle = bg; x.beginPath(); x.roundRect(0, 0, w, h, h / 2); x.fill();
  x.fillStyle = color; x.textBaseline = 'middle'; x.fillText(text, 14, h / 2 + 2);
  const tex = new THREE.CanvasTexture(c); tex.colorSpace = THREE.SRGBColorSpace;
  const s = new THREE.Sprite(new THREE.SpriteMaterial({ map: tex, depthTest: false, transparent: true }));
  s.scale.set(w * scale, h * scale, 1); s.renderOrder = 10;
  s.userData.base = s.scale.clone(); LABELS.push(s);
  return s;
}


// ---------- room to grow: models are small (≈ a few km), and builds in the same town spread out ----------
const MODEL_SCALE = 0.7;
const SPACING = 9;                                    // min distance between two builds (scene units ≈ km)
const KPOLY = KERALA.map(([lo, la]) => P(lo, la));
function onLand(v) {                                  // point-in-polygon, with a small margin from the coast
  let inside = false;
  for (let i = 0, j = KPOLY.length - 1; i < KPOLY.length; j = i++) {
    const a = KPOLY[i], b = KPOLY[j];
    if ((a.y > v.y) !== (b.y > v.y) && v.x < ((b.x - a.x) * (v.y - a.y)) / (b.y - a.y) + a.x) inside = !inside;
  }
  return inside;
}
const placed = [];
function freeSpot(v) {                                // golden-angle spiral out from the requested spot until it's free
  for (let k = 0; k < 400; k++) {
    const r = k ? 5.5 * Math.sqrt(k) : 0, a = k * 2.39996;
    const c = new THREE.Vector2(v.x + r * Math.cos(a), v.y + r * Math.sin(a));
    if ((k === 0 || onLand(c)) && placed.every((p) => p.distanceTo(c) >= SPACING)) { placed.push(c); return c; }
  }
  placed.push(v); return v;
}

// ---------- the world from data/world.json ----------
const items = [];
const $ = (id) => document.getElementById(id);

function showCard(it) {
  $('cardDay').textContent = `Day ${it.day}`;
  $('cardName').textContent = it.name;
  $('cardPlace').textContent = it.place || '';
  $('cardFact').textContent = it.fact || '';
  const a = $('cardBy'); a.textContent = '@' + it.by; a.href = `https://www.instagram.com/${it.by}/`;
  $('card').classList.remove('hidden');
}
$('cardClose').onclick = () => $('card').classList.add('hidden');
$('sheetToggle').onclick = () => { $('sheet').classList.toggle('open'); $('sheetArrow').textContent = $('sheet').classList.contains('open') ? '▾' : '▴'; };

let fly = null;
function flyTo(obj) {
  const target = obj.position.clone();
  const from = { p: camera.position.clone(), t: controls.target.clone() };
  const toT = target.clone().add(new THREE.Vector3(0, 4, -8)), toP = target.clone().add(new THREE.Vector3(24, 36, 50));
  fly = { from, toT, toP, t0: performance.now(), dur: 1200 };
}

async function build() {
  await document.fonts.load('700 30px Manjari');
  const pinMat = new THREE.MeshStandardMaterial({ color: '#FFFFFF', emissive: '#FFD23F', emissiveIntensity: 0.4 });
  DISTRICTS.forEach(([n, lo, la]) => {
    const v = P(lo, la);
    const dot = new THREE.Mesh(new THREE.CylinderGeometry(1.6, 1.6, 1.2, 16), pinMat); dot.position.set(v.x, 5.6, v.y); scene.add(dot);
    const s = label(n, { size: 36, color: '#FFFFFF', bg: 'rgba(11,18,48,0.7)', scale: 0.22 });
    s.center.set(0.5, 0); s.position.set(v.x, 7, v.y); scene.add(s);
  });

  const world = await (await fetch('data/world.json', { cache: 'no-store' })).json();
  const list = world.items.slice().sort((a, b) => b.day - a.day || b.id - a.id);
  const maxDay = Math.max(1, ...world.items.map((i) => i.day));
  $('day').textContent = `Day ${maxDay}`;
  $('count').textContent = `നിർമ്മിതികൾ ${world.items.length}`;

  for (const it of world.items) {
    const g = makeModel(it.model);
    const v = freeSpot(P(it.lon, it.lat));
    g.position.set(v.x, 5, v.y);
    g.scale.setScalar(MODEL_SCALE);
    g.traverse((m) => { if (m.isMesh) { m.castShadow = true; m.userData.item = it; } });
    g.userData.item = it;
    scene.add(g);
    const tag = label('@' + it.by, { size: 28, color: '#0B1230', bg: '#FFD23F', scale: 0.18 });
    const top = new THREE.Box3().setFromObject(g).max.y;
    tag.center.set(0.5, 0); tag.userData.tag = true; tag.position.set(v.x, top + 2, v.y); scene.add(tag);
    items.push({ it, g, tag });
  }
  // the newest build gets a pulsing ring
  const newest = items.find((x) => x.it.id === list[0]?.id);
  if (newest) {
    const ring = new THREE.Mesh(new THREE.RingGeometry(5, 6.3, 40), new THREE.MeshBasicMaterial({ color: '#FFD23F', transparent: true, opacity: 0.8, side: THREE.DoubleSide }));
    ring.rotation.x = -Math.PI / 2; ring.position.copy(newest.g.position).setY(5.2); scene.add(ring); newest.ring = ring; newest.tag.userData.keep = true;
  }

  $('list').innerHTML = '';
  for (const it of list) {
    const li = document.createElement('li');
    li.innerHTML = `<span class="d">Day ${it.day}</span><span><div class="n"></div><div class="p"></div></span>`;
    li.querySelector('.n').textContent = it.name; li.querySelector('.p').textContent = `${it.place || ''} · @${it.by}`;
    li.onclick = () => { $('sheet').classList.remove('open'); $('sheetArrow').textContent = '▴'; const x = items.find((y) => y.it === it); flyTo(x.g); showCard(it); };
    $('list').appendChild(li);
  }
    $('loading').classList.add('done');
}

// tap to open an item's card
const ray = new THREE.Raycaster(), ndc = new THREE.Vector2();
let down = null;
canvas.addEventListener('pointerdown', (e) => { down = [e.clientX, e.clientY]; });
canvas.addEventListener('pointerup', (e) => {
  if (!down || Math.hypot(e.clientX - down[0], e.clientY - down[1]) > 6) return;
  ndc.set((e.clientX / innerWidth) * 2 - 1, -(e.clientY / innerHeight) * 2 + 1);
  ray.setFromCamera(ndc, camera);
  const hit = ray.intersectObjects(items.map((x) => x.g), true)[0];
  if (hit) { let o = hit.object; while (o && !o.userData.item) o = o.parent; if (o) { flyTo(items.find((x) => x.it === o.userData.item).g); showCard(o.userData.item); } }
  else $('card').classList.add('hidden');
});

function resize() {
  const w = innerWidth, h = innerHeight;
  renderer.setSize(w, h, false); camera.aspect = w / h; camera.updateProjectionMatrix();
}
addEventListener('resize', resize); resize();

// start: look along Kerala's long NW–SE axis so the state fills a phone screen top to bottom
const N_END = P(74.9, 12.8), S_END = P(77.15, 8.2);
const AXIS = new THREE.Vector2().subVectors(S_END, N_END), LEN = AXIS.length(); AXIS.normalize();
const MID = new THREE.Vector2().addVectors(N_END, S_END).multiplyScalar(0.5);
function homeView() {
  const tilt = THREE.MathUtils.degToRad(camera.aspect > 1 ? 52 : 38);             // angle away from straight-down: gives the 3D look
  const vfov = THREE.MathUtils.degToRad(camera.fov / 2);
  const D = HOME_D = (LEN * Math.cos(tilt) * 0.5) / Math.tan(vfov) * 1.2;
  const tgt = new THREE.Vector3(MID.x + AXIS.x * 48, 0, MID.y + AXIS.y * 48);
  controls.target.copy(tgt);
  camera.position.set(tgt.x + AXIS.x * Math.sin(tilt) * D, Math.cos(tilt) * D, tgt.z + AXIS.y * Math.sin(tilt) * D);
  controls.update();
}
homeView();
addEventListener('resize', () => { if (!fly) homeView(); });

const clock = new THREE.Clock();
function tick() {
  const t = clock.getElapsedTime();
  if (fly) {
    const k = Math.min(1, (performance.now() - fly.t0) / fly.dur), e = k < 0.5 ? 4 * k * k * k : 1 - Math.pow(-2 * k + 2, 3) / 2;
    camera.position.lerpVectors(fly.from.p, fly.toP, e); controls.target.lerpVectors(fly.from.t, fly.toT, e);
    if (k >= 1) fly = null;
  }
  for (const x of items) { if (x.ring) { const s = 1 + 0.25 * Math.sin(t * 3); x.ring.scale.set(s, s, s); x.ring.material.opacity = 0.5 + 0.3 * Math.sin(t * 3); } }
  // labels keep a readable on-screen size: shrink as you zoom in instead of filling the screen
  const _v = new THREE.Vector3();
  for (const l of LABELS) { const d = camera.position.distanceTo(l.getWorldPosition(_v)); const k = THREE.MathUtils.clamp(d / HOME_D, 0.09, 1.3); l.scale.copy(l.userData.base).multiplyScalar(k); if (l.userData.tag) l.visible = l.userData.keep || d < HOME_D * 0.45; }
  controls.update();
  renderer.render(scene, camera);
  requestAnimationFrame(tick);
}
build().catch((e) => { $('loading').textContent = 'ലോഡ് ചെയ്യാൻ പറ്റിയില്ല'; console.error(e); });
tick();
