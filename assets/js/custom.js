// Random text options
const randomTexts = ["Just make it EXIST first. You can make it good later.", "Hang tight!", "Almost there!"];

// Set a random text in the preloader
document.getElementById('loading-text').textContent =
  randomTexts[Math.floor(Math.random() * randomTexts.length)];

// Check if this is the first load
const isFirstLoad = !localStorage.getItem('hasLoadedBefore');

// Set the loading delay based on whether it's the first load
const delay = isFirstLoad ? 4000 : 1500; // 4000ms for first load, 1500ms for subsequent loads

window.addEventListener('load', () => {
  const preloader = document.getElementById('preloader');
  const content = document.getElementById('content');

  // Ensure preloader stays for the calculated delay
  setTimeout(() => {
    // Hide the preloader
    preloader.style.display = 'none';

    // Show the content
    content.style.display = 'block';

    // Add a delay of 0.2 seconds before setting opacity to 100%
    setTimeout(() => {
      content.style.opacity = '1';
      content.style.transition = 'opacity 0.2s ease-in-out'; // Smooth transition effect
    }, 200); //

    // Mark that the site has been loaded before
    localStorage.setItem('hasLoadedBefore', 'true');
  }, delay);
});




function RequestCaseStudy() {
    alert(
      `Description:\n
      a) First point\n
      b) Second point\n
      c) Third point\n
      d) Fourth point\n
      e) Fifth point`
    );
  }