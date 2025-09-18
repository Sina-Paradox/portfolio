window.addEventListener("load", () => {

    const loader = document.getElementById("loader");
    const body = document.body;
  
    const startTime = performance.timing.navigationStart;
  
    const loadTime = Date.now() - startTime;
  
    const minDuration = 3000;
  
    const delay = loadTime < minDuration ? (minDuration - loadTime) : 0;
  
    setTimeout(() => {
      loader.classList.add("hidden");
      body.classList.remove("loading");
    }, delay);
});



window.history.scrollRestoration = "manual";

window.scrollTo(0, 0);