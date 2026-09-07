(function (root) {
  'use strict';
  function createFetch(fetchAsset, config) {
    const wasmURL = new URL(config.executable + '.wasm', config.baseURL);
    return async function (input, init) {
      const address = input instanceof Request ? input.url : String(input);
      const requested = new URL(address, config.baseURL);
      if (requested.href !== wasmURL.href) return fetchAsset(input, init);
      const response = await fetchAsset(new URL(config.executable + '.wasm.pack', config.baseURL), init);
      if (!response.ok || !response.body) throw new Error('The encounter download failed (' + response.status + ').');
      return new Response(response.body.pipeThrough(new DecompressionStream('gzip')), {
        headers: {
          'Content-Type': 'application/wasm',
          'Content-Length': String(config.fileSizes[config.executable + '.wasm']),
        },
      });
    };
  }
  root.NetworkLoader = { createFetch };
  if (typeof module !== 'undefined') module.exports = { createFetch };
})(globalThis);
