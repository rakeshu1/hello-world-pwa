let deferredPrompt;
const installButton = document.getElementById('installButton');

// Check if service workers are supported
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('service-worker.js')
      .then(registration => {
        console.log('Service Worker registered with scope:', registration.scope);
      })
      .catch(error => {
        console.log('Service Worker registration failed:', error);
      });
  });
}

// Check if the browser is ready to show the install prompt
window.addEventListener('beforeinstallprompt', (e) => {
  console.log('beforeinstallprompt event fired');
  e.preventDefault();  // Prevent the mini-info bar from appearing
  deferredPrompt = e;  // Store the event for later
  installButton.style.display = 'block'; // Show the install button
});

// Handle the "Install PWA" button click
installButton.addEventListener('click', () => {
  if (deferredPrompt) {
    deferredPrompt.prompt();  // Show the install prompt
    deferredPrompt.userChoice
      .then((choiceResult) => {
        console.log('User response to the install prompt:', choiceResult.outcome);
        deferredPrompt = null;  // Reset the deferredPrompt variable
        installButton.style.display = 'none'; // Hide the install button after prompt
      });
  }
});
