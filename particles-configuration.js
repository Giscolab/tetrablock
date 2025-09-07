function initParticles() {
  fetch('particles-config.json')
    .then((response) => response.json())
    .then((config) => {
      particlesJS('particles-js', config);
    });
}
