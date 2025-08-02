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

// Install prompt logic
let deferredPrompt;
const installButton = document.getElementById('installButton');

// Log when beforeinstallprompt is fired
window.addEventListener('beforeinstallprompt', (e) => {
  console.log('beforeinstallprompt fired');
  e.preventDefault();  // Prevents the default mini-info bar from showing up
  deferredPrompt = e;  // Save the event so it can be triggered later
  installButton.style.display = 'block'; // Show the install button
});

// Trigger the install prompt when the install button is clicked
installButton.addEventListener('click', () => {
  if (deferredPrompt) {
    deferredPrompt.prompt();  // Show the install prompt
    deferredPrompt.userChoice
      .then((choiceResult) => {
        console.log(choiceResult.outcome);  // Log whether the user installed the PWA
        deferredPrompt = null;  // Reset the deferredPrompt variable
        installButton.style.display = 'none'; // Hide the install button after prompt
      });
  }
});
