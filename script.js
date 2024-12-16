document.addEventListener("DOMContentLoaded", () => {
    const progressBars = document.querySelectorAll(".progress-bar");
  
    function animateBars() {
      progressBars.forEach((bar) => {
        const percent = bar.getAttribute("data-percent");
        const rect = bar.getBoundingClientRect();
        const windowHeight = window.innerHeight;
  
        // Check if bar is in the viewport
        if (rect.top <= windowHeight - 100) {
          bar.style.width = "100%";
          bar.style.transition = "width 1s ease-in-out";
  
          // Fill the bar to the specific percentage
          bar.style.setProperty("--progress", percent + "%");
          bar.style.setProperty("width", percent + "%");
        }
      });
    }
  
    window.addEventListener("scroll", animateBars);
  });
  