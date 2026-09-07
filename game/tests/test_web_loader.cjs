const assert = require('node:assert/strict');
const { gzipSync } = require('node:zlib');
const { createFetch } = require('../web/network-loader.js');

(async () => {
  const wasm = Buffer.from([0, 97, 115, 109, 1, 0, 0, 0]);
  const calls = [];
  const passthrough = new Response('ordinary asset');
  const fetchAsset = async input => {
    calls.push(String(input));
    return String(input).endsWith('.wasm.pack')
      ? new Response(gzipSync(wasm))
      : passthrough;
  };
  const config = { baseURL: 'https://game.example/play/', executable: 'index', fileSizes: { 'index.wasm': wasm.length } };
  const fetch = createFetch(fetchAsset, config);
  const response = await fetch('index.wasm');
  assert.equal(response.headers.get('Content-Type'), 'application/wasm');
  assert.deepEqual(Buffer.from(await response.arrayBuffer()), wasm);
  assert.equal(calls[0], 'https://game.example/play/index.wasm.pack');
  assert.equal(await fetch('index.pck'), passthrough);
  assert.equal(await fetch('https://other.example/index.wasm'), passthrough);
  const failed = createFetch(async () => new Response('', { status: 503 }), config);
  await assert.rejects(failed('index.wasm'), /download failed \(503\)/);
  const corrupt = createFetch(async () => new Response('broken gzip'), config);
  await assert.rejects(async () => (await corrupt('index.wasm')).arrayBuffer());
  console.log('PASS: compressed engine restores exact bytes; unrelated assets pass through; HTTP and corrupt payloads fail.');
})().catch(error => { console.error(error); process.exitCode = 1; });
