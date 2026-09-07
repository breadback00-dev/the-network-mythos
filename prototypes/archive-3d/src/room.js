import * as THREE from 'three';

export function createRoom(container, onStation, onFailure) {
  const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: false });
  renderer.setPixelRatio(Math.min(devicePixelRatio, 1.6));
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFShadowMap;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.05;
  container.append(renderer.domElement);
  const scene = new THREE.Scene();
  scene.background = new THREE.Color(0x17201f);
  scene.fog = new THREE.FogExp2(0x17201f, .024);
  const camera = new THREE.PerspectiveCamera(48, 1, .1, 70);
  const position = new THREE.Vector3(8.6, 6.2, 11.8);
  const look = new THREE.Vector3(0, 1.7, -1.1);
  const destination = position.clone(), target = look.clone();
  let quiet = matchMedia('(prefers-reduced-motion: reduce)').matches;
  let active = true, disposed = false, frame = 0, last = 0, entered = false;
  let sceneStatus = 'ACCOUNT VERIFIED';
  const hotspots = [], textures = [], materials = [], geometries = [];
  const material = (color, roughness = .8, metalness = 0) => {
    const mat = new THREE.MeshStandardMaterial({ color, roughness, metalness });
    materials.push(mat); return mat;
  };
  const wood = material(0x564032), darkWood = material(0x352a24), black = material(0x16201d), brass = material(0x8d7850, .45, .55), paper = material(0xc4bfa5), wall = material(0x3b4841), floor = material(0x2b332e);
  const mesh = (geometry, mat, x, y, z, parent = scene) => {
    geometries.push(geometry);
    const item = new THREE.Mesh(geometry, mat);
    item.position.set(x, y, z); item.castShadow = true; item.receiveShadow = true; parent.add(item); return item;
  };
  const box = (w, h, d, mat, x, y, z, parent) => mesh(new THREE.BoxGeometry(w, h, d), mat, x, y, z, parent);
  const cylinder = (r, h, mat, x, y, z, parent) => mesh(new THREE.CylinderGeometry(r, r, h, 16), mat, x, y, z, parent);
  function canvasTexture(w, h, draw) {
    const canvas = document.createElement('canvas'); canvas.width = w; canvas.height = h;
    draw(canvas.getContext('2d'), w, h);
    const texture = new THREE.CanvasTexture(canvas); texture.colorSpace = THREE.SRGBColorSpace; textures.push(texture); return texture;
  }
  function surface(w, h, texture, x, y, z, glow = false) {
    const mat = glow ? new THREE.MeshBasicMaterial({ map: texture }) : new THREE.MeshStandardMaterial({ map: texture, roughness: .9 });
    materials.push(mat); return mesh(new THREE.PlaneGeometry(w, h), mat, x, y, z);
  }
  function card(title, subtitle, w = 360, h = 460) {
    return canvasTexture(w, h, (ctx) => {
      ctx.fillStyle = '#d8d1b7'; ctx.fillRect(0, 0, w, h); ctx.fillStyle = '#777d63'; ctx.font = '16px Arial'; ctx.fillText(subtitle, 26, 42);
      ctx.fillStyle = '#303f32'; ctx.font = '29px Georgia'; title.split('|').forEach((line, i) => ctx.fillText(line, 26, 105 + i * 38));
      ctx.fillStyle = '#a8ad96'; for (let i = 0; i < 8; i++) ctx.fillRect(26, 230 + i * 20, w - 70 - (i % 3) * 22, 3);
      ctx.fillStyle = '#8f5241'; ctx.strokeStyle = '#8f5241'; ctx.strokeRect(25, h - 63, 125, 32); ctx.font = '13px Arial'; ctx.fillText('ARCHIVE COPY', 36, h - 42);
    });
  }
  box(16, .22, 12, floor, 0, -.16, -.4);
  for (let i = -8; i < 8; i++) box(.016, .012, 12, darkWood, i, -.04, -.4);
  box(16, 6.2, .25, wall, 0, 3, -5.6);
  box(.25, 6.2, 11.5, wall, -8, 3, -.2);
  box(.2, .3, 11.5, darkWood, -7.83, .2, -.2);
  box(16, .3, .2, darkWood, 0, .2, -5.43);
  for (let x = -7; x < 8; x += 1.15) { box(.045, 1.25, .045, darkWood, x, .85, -5.42); }
  box(16, .075, .12, brass, 0, 1.5, -5.42);

  // The window gives the Archive a world beyond its records.
  box(4.5, 3.7, .14, black, -4.3, 3.5, -5.39);
  const windowTexture = canvasTexture(650, 550, (ctx, w, h) => {
    const gradient = ctx.createLinearGradient(0, 0, 0, h); gradient.addColorStop(0, '#243b49'); gradient.addColorStop(.7, '#687c7b'); gradient.addColorStop(1, '#adb19b'); ctx.fillStyle = gradient; ctx.fillRect(0, 0, w, h);
    for (let i = 0; i < 14; i++) { const height = 90 + ((i * 73) % 180); ctx.fillStyle = i % 2 ? '#34494c' : '#3c5154'; ctx.fillRect(i * 52, h - height, 47, height); ctx.fillStyle = '#bdbb8b'; for (let j = 0; j < 5; j++) if ((i + j) % 3) ctx.fillRect(i * 52 + 9, h - height + 17 + j * 23, 5, 7); }
    ctx.strokeStyle = '#cad5c52b'; ctx.lineWidth = 1; for (let i = 0; i < 100; i++) { const x = (i * 179) % w, y = (i * 83) % h; ctx.beginPath(); ctx.moveTo(x, y); ctx.lineTo(x - 3, y + 19); ctx.stroke(); }
  });
  surface(4.2, 3.4, windowTexture, -4.3, 3.5, -5.3, true);
  box(.12, 3.6, .14, black, -4.3, 3.5, -5.18); box(4.3, .12, .14, black, -4.3, 3.4, -5.18);
  box(4.8, .17, .45, darkWood, -4.3, 1.65, -5.1);

  function desk(x, z, width) {
    box(width, .18, 1.8, wood, x, 1.52, z);
    for (const offset of [-width / 2 + .25, width / 2 - .25]) for (const dz of [-.6, .6]) box(.11, 1.5, .11, black, x + offset, .72, z + dz);
    box(width - .3, .09, .08, brass, x, .47, z - .6);
  }
  desk(-3.9, -2.5, 4.2); desk(2.35, -2.8, 4.3);
  // Personal station: a phone on a tilted stand, a lamp, a cup, loose papers.
  const phone = box(.7, 1.24, .085, black, -3.7, 2.16, -2.37); phone.rotation.x = -.22;
  const phoneTex = canvasTexture(280, 470, (ctx, w, h) => {
    const g = ctx.createLinearGradient(0, 0, w, h); g.addColorStop(0, '#5c7970'); g.addColorStop(1, '#1b3731'); ctx.fillStyle = g; ctx.fillRect(0, 0, w, h); ctx.fillStyle = '#e1e6ca'; ctx.font = '12px Arial'; ctx.fillText('THREADLINE', 22, 40); ctx.font = '35px Georgia'; ctx.fillText('The door', 22, 120); ctx.fillText('was real.', 22, 165); ctx.font = '14px Arial'; ctx.fillText('@maravale', 22, 330); ctx.fillStyle = '#dfc690'; ctx.beginPath(); ctx.moveTo(124, 220); ctx.lineTo(124, 270); ctx.lineTo(165, 245); ctx.fill(); ctx.fillRect(22, 400, 230, 2);
  });
  const phoneScreen = surface(.61, 1.07, phoneTex, -3.7, 2.17, -2.303, true); phoneScreen.rotation.x = -.22;
  box(.62, .08, .55, brass, -3.7, 1.64, -2.46);
  cylinder(.28, .055, brass, -5.2, 1.64, -2.85); cylinder(.033, .9, brass, -5.2, 2.08, -2.85);
  const lampMat = material(0x8a9b77, .35, .2); mesh(new THREE.ConeGeometry(.43, .38, 32, 1, true), lampMat, -5.2, 2.58, -2.85);
  const lamp = new THREE.PointLight(0xffd298, 28, 7, 2); lamp.position.set(-5.2, 2.38, -2.85); lamp.castShadow = true; scene.add(lamp);
  cylinder(.16, .32, material(0xb4b59a), -2.5, 1.78, -2.2);
  const loose = surface(.72, .95, card('Please|slow down.', 'RAFI / PRIVATE'), -4.65, 1.626, -1.95); loose.rotation.x = -Math.PI / 2; loose.rotation.z = -.2;
  // Institutional station.
  box(2.75, 1.82, .19, black, 2.45, 2.72, -3.06); box(.15, .65, .18, black, 2.45, 1.84, -3.12); box(.85, .08, .48, black, 2.45, 1.65, -3.01);
  const screenCanvas = document.createElement('canvas'); screenCanvas.width = 840; screenCanvas.height = 520;
  function drawScreen() {
    const c = screenCanvas.getContext('2d'); c.fillStyle = '#152c28'; c.fillRect(0, 0, 840, 520); c.fillStyle = '#8fa794'; c.font = '17px Arial'; c.fillText('THREADLINE / CREATOR INTEGRITY', 40, 55); c.strokeStyle = '#72907a'; c.beginPath(); c.moveTo(40, 85); c.lineTo(795, 85); c.stroke(); c.fillStyle = '#d5dbb7'; c.font = '44px Georgia'; c.fillText(sceneStatus, 40, 170);
    const rows = {
      'PUBLIC COPIES DETECTED': ['SOURCE FILE     UNAVAILABLE', 'ARCHIVE COPY          RETAINED', 'PUBLIC MIRRORS        DETECTED'],
      'RECORD SEALED': ['PACKET                SEALED', 'PUBLIC RECORD      UNCHANGED', 'WITNESS CONTACT    RESTRICTED'],
      'ACCESS REQUEST WAITING': ['RECORD             PRESERVED', 'REQUESTER      THE PORCHLIGHT', 'ACCESS       AWAITING CONSENT'],
    }[sceneStatus] || ['SUBJECT     @maravale', 'CREDENTIAL CHAIN     CONTINUOUS', 'VOICE MATCH             97.8%'];
    c.font = '23px monospace'; c.fillStyle = '#89b69b'; rows.forEach((line, i) => c.fillText(line, 40, 250 + i * 53));
    c.fillStyle = '#bbbd8b'; c.font = '17px Arial'; c.fillText('A verified account. An unresolved person.', 40, 455);
  }
  drawScreen(); const screenTexture = new THREE.CanvasTexture(screenCanvas); screenTexture.colorSpace = THREE.SRGBColorSpace; textures.push(screenTexture); surface(2.56, 1.6, screenTexture, 2.45, 2.74, -2.953, true);
  const screenLight = new THREE.PointLight(0x84b5a7, 7, 5); screenLight.position.set(2.4, 2.6, -2.7); scene.add(screenLight);
  box(1.6, .08, .58, material(0x46514a), 2.4, 1.67, -1.98);
  for (let row = 0; row < 4; row++) for (let col = 0; col < 13; col++) box(.08, .016, .07, black, 1.76 + col * .104, 1.72, -2.15 + row * .105);
  for (let i = 0; i < 4; i++) { const book = box(.45, .13, .7, material([0x647463, 0x777052, 0x3f5b5a, 0x796654][i]), 3.98, 1.7 + i * .13, -2.35); book.rotation.y = (i - 1) * .07; }
  // The board uses the same two source cards as the readable comparison.
  box(3.2, 2.22, .11, darkWood, .14, 3.85, -5.3); box(3.02, 2.03, .05, material(0x7b755b), .14, 3.85, -5.22);
  const a = surface(.84, 1.09, card('Mara|returned.', 'PUBLIC SUMMARY'), -.59, 3.95, -5.17); a.rotation.z = -.055;
  const b = surface(.84, 1.09, card('Account|continuity.', 'INTERNAL REPORT'), .77, 3.71, -5.17); b.rotation.z = .045;
  const pinMat = material(0xbc8263); for (const [x, y] of [[-.58, 4.41], [.76, 4.18]]) { const pin = mesh(new THREE.SphereGeometry(.04, 8, 8), pinMat, x, y, -5.1); pin.castShadow = false; }
  const cordMat = new THREE.LineBasicMaterial({ color: 0xd6b386, transparent: true, opacity: .25 }); materials.push(cordMat);
  const cordGeo = new THREE.BufferGeometry().setFromPoints([new THREE.Vector3(-.59, 3.75, -5.09), new THREE.Vector3(.1, 3.53, -5.09), new THREE.Vector3(.77, 3.71, -5.09)]); geometries.push(cordGeo); const cord = new THREE.Line(cordGeo, cordMat); scene.add(cord);
  // Storage, plants, and an empty chair make this a place someone uses.
  box(1.15, 2.3, .95, material(0x49574e, .6, .25), 6.2, 1.15, -4.8);
  for (let i = 0; i < 4; i++) { box(1.02, .45, .035, material(0x56645a), 6.2, .38 + i * .54, -4.29); box(.33, .04, .05, brass, 6.2, .38 + i * .54, -4.24); }
  const pot = material(0x735844); cylinder(.28, .5, pot, 5.15, .25, -3.3);
  const leaves = material(0x687f59); for (let i = 0; i < 8; i++) { const leaf = mesh(new THREE.SphereGeometry(.22, 8, 10), leaves, 5.15 + Math.sin(i * 2) * .27, .85 + (i % 3) * .22, -3.3 + Math.cos(i * 2) * .25); leaf.scale.set(.4, 1.8, .7); leaf.rotation.z = Math.sin(i) * .6; }
  const chair = new THREE.Group(); scene.add(chair); chair.position.set(2.3, 0, .1); chair.rotation.y = -.18;
  box(1.1, .15, 1, darkWood, 0, .85, 0, chair); box(1.1, 1.2, .13, darkWood, 0, 1.43, .5, chair);
  for (const x of [-.42, .42]) for (const z of [-.37, .37]) box(.08, .84, .08, black, x, .42, z, chair);
  const rug = box(6.2, .012, 3.7, material(0x555c46), -.7, .008, 1.5); rug.receiveShadow = true;
  const ambient = new THREE.HemisphereLight(0x93b3b4, 0x5c5139, 1.8); scene.add(ambient);
  const moon = new THREE.DirectionalLight(0xadcad0, 2.2); moon.position.set(-5, 7, -2); moon.castShadow = true; moon.shadow.mapSize.set(2048, 2048); moon.shadow.camera.left = -10; moon.shadow.camera.right = 10; moon.shadow.camera.top = 10; moon.shadow.camera.bottom = -10; moon.shadow.bias = -.001; scene.add(moon);
  const warm = new THREE.PointLight(0xe3b975, 45, 16, 2); warm.position.set(4, 5, 3); scene.add(warm);
  const points = new Float32Array(105 * 3); for (let i = 0; i < 105; i++) { points[i * 3] = ((i * 3.713) % 13) - 6.5; points[i * 3 + 1] = .7 + ((i * .379) % 4.5); points[i * 3 + 2] = ((i * 1.381) % 8) - 4; }
  const dustGeo = new THREE.BufferGeometry(); dustGeo.setAttribute('position', new THREE.BufferAttribute(points, 3)); geometries.push(dustGeo); const dustMat = new THREE.PointsMaterial({ color: 0xe0d9ac, size: .013, transparent: true, opacity: .22 }); materials.push(dustMat); const dust = new THREE.Points(dustGeo, dustMat); scene.add(dust);
  const anchors = { phone: new THREE.Vector3(-3.7, 2.6, -1.9), terminal: new THREE.Vector3(2.45, 3.2, -2.6), wall: new THREE.Vector3(.2, 4.3, -5) };
  const views = { phone: [new THREE.Vector3(-1.7, 3.5, 3.1), new THREE.Vector3(-3.8, 2, -2.4)], terminal: [new THREE.Vector3(4.6, 3.4, 3), new THREE.Vector3(2.4, 2.3, -2.8)], wall: [new THREE.Vector3(2.4, 4.1, 2.2), new THREE.Vector3(.1, 3.6, -5)] };
  for (const [name, anchor] of Object.entries(anchors)) { const targetMat = new THREE.MeshBasicMaterial({ visible: false }); materials.push(targetMat); const item = mesh(new THREE.SphereGeometry(.7, 8, 8), targetMat, anchor.x, anchor.y, anchor.z); item.userData.station = name; hotspots.push(item); }
  const ray = new THREE.Raycaster(), pointer = new THREE.Vector2();
  function hit(event) { const rect = renderer.domElement.getBoundingClientRect(); pointer.set((event.clientX - rect.left) / rect.width * 2 - 1, -(event.clientY - rect.top) / rect.height * 2 + 1); ray.setFromCamera(pointer, camera); return ray.intersectObjects(hotspots)[0]?.object.userData.station; }
  renderer.domElement.addEventListener('pointerup', (event) => { if (entered && active) { const station = hit(event); if (station) onStation(station); } });
  renderer.domElement.addEventListener('pointermove', (event) => { renderer.domElement.style.cursor = entered && hit(event) ? 'pointer' : 'default'; });
  renderer.domElement.addEventListener('webglcontextlost', (event) => { event.preventDefault(); active = false; onFailure(); });
  function resize() { const width = innerWidth, height = innerHeight; camera.aspect = width / height; camera.updateProjectionMatrix(); renderer.setSize(width, height); if (width < 800 && !entered) destination.set(10.4, 7.5, 15.6); }
  function projectLabels() {
    const placed = [];
    for (const [name, anchor] of Object.entries(anchors)) {
      const label = document.querySelector(`#label-${name}`);
      if (!label) continue;
      const p = anchor.clone().project(camera), width = label.offsetWidth, height = label.offsetHeight;
      const x = Math.max(12, Math.min(innerWidth - width - 12, (p.x + 1) * innerWidth / 2 - width / 2));
      let y = Math.max(innerHeight * .4, Math.min(innerHeight * .77, (-p.y + 1) * innerHeight / 2)) - height / 2;
      for (const previous of placed) {
        if (x < previous.x + previous.width + 12 && x + width + 12 > previous.x && y < previous.y + previous.height + 12 && y + height + 12 > previous.y) y = previous.y + previous.height + 12;
      }
      placed.push({ x, y, width, height });
      label.style.left = `${x + width / 2}px`; label.style.top = `${y + height / 2}px`;
    }
  }
  function animate(time) { if (disposed) return; frame = requestAnimationFrame(animate); if (!active || document.hidden) { last = time; return; } const step = quiet ? 1 : Math.min(1, (time - (last || time)) / 180); last = time; position.lerp(destination, step); look.lerp(target, step); camera.position.copy(position); camera.lookAt(look); if (!quiet) dust.position.y = Math.sin(time * .00015) * .12; renderer.render(scene, camera); projectLabels(); }
  resize(); addEventListener('resize', resize); frame = requestAnimationFrame(animate);
  return {
    enter() { entered = true; destination.set(7.2, 5.5, 10.9); target.set(-.1, 1.8, -1.8); },
    approach(name) { const view = views[name]; if (view) { destination.copy(view[0]); target.copy(view[1]); } },
    overview() { destination.set(7.2, 5.5, 10.9); target.set(-.1, 1.8, -1.8); },
    setQuiet(value) { quiet = value; },
    setActive(value) { active = value; },
    discovery() { cordMat.opacity = 1; },
    outcome(value) { sceneStatus = value.status; drawScreen(); screenTexture.needsUpdate = true; warm.color.setHex(value.color); },
    dispose() { disposed = true; cancelAnimationFrame(frame); removeEventListener('resize', resize); textures.forEach(x => x.dispose()); materials.forEach(x => x.dispose()); geometries.forEach(x => x.dispose()); renderer.dispose(); renderer.domElement.remove(); },
  };
}
