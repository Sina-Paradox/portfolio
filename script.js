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



const userMenuBtn = document.getElementById('userMenuBtn');
const userDropdown = document.getElementById('userDropdown');

userMenuBtn.addEventListener('click', (e) => {
  e.stopPropagation();
  userDropdown.classList.toggle('show');
});

document.addEventListener('click', (e) => {
  if (!userMenuBtn.contains(e.target) && !userDropdown.contains(e.target)) {
    userDropdown.classList.remove('show');
  }
});

userDropdown.addEventListener('mouseenter', () => {
  userDropdown.classList.add('show');
});

userDropdown.addEventListener('mouseleave', () => {
  if (!userDropdown.classList.contains('force-open')) {
    userDropdown.classList.remove('show');
  }
});

userMenuBtn.addEventListener('click', () => {
  if (userDropdown.classList.contains('show')) {
    userDropdown.classList.add('force-open');
  } else {
    userDropdown.classList.remove('force-open');
  }
});