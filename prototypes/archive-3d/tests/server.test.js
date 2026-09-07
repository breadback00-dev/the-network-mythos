import test from 'node:test';
import assert from 'node:assert/strict';
import { createServer } from '../server.js';

test('static media server supports ranges, HEAD, and safe failures', async () => {
  const server = createServer();
  await new Promise(resolve => server.listen(0, '127.0.0.1', resolve));
  const url = `http://127.0.0.1:${server.address().port}`;
  try {
    const full = await fetch(url + '/media/door-meme.svg');
    assert.equal(full.status, 200);
    assert.match(full.headers.get('content-type'), /image\/svg/);
    const body = await full.text();
    const partial = await fetch(url + '/media/door-meme.svg', { headers: { Range: 'bytes=0-9' } });
    assert.equal(partial.status, 206);
    assert.equal(await partial.text(), body.slice(0, 10));
    assert.equal((await fetch(url + '/media/door-meme.svg', { method: 'HEAD' })).status, 200);
    assert.equal((await fetch(url + '/media/door-meme.svg', { headers: { Range: 'bytes=99999999-' } })).status, 416);
    assert.equal((await fetch(url + '/missing.wav')).status, 404);
    assert.equal((await fetch(url + '/%2e%2e%2fpackage.json')).status, 403);
    assert.equal((await fetch(url + '/%ZZ')).status, 400);
  } finally { await new Promise(resolve => server.close(resolve)); }
});
