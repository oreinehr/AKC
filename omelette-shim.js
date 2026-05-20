// Polyfill for window.omelette used by image-slot.js.
// Routes writes to the local Express server instead of the Omelette runtime.
if (!window.omelette) {
  window.omelette = {
    writeFile: function(filePath, content) {
      return fetch('/api/slots', {
        method: 'POST',
        headers: { 'Content-Type': 'text/plain' },
        body: content,
      });
    },
  };
}
