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



const firebaseConfig = {
  apiKey: "AIzaSyDeZRotr7SVHg-aqRqR9pNFpOJTMFwKQXo",
  authDomain: "portfolio-7d11f.firebaseapp.com",
  projectId: "portfolio-7d11f",
  storageBucket: "portfolio-7d11f.firebasestorage.app",
  messagingSenderId: "256853786845",
  appId: "1:256853786845:web:80c314acbb77b68ab2db34",
  measurementId: "G-RQ0ZP0GY0R"
};

const app = firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const authContainer = document.getElementById('authContainer');
const googleAuthButton = document.getElementById('googleAuthBtn');
const authButtonContent = document.getElementById('authButtonContent');
const authDropdown = document.getElementById('authDropdown');
const signOutButton = document.getElementById('signOutButton');

function signInWithGoogle() {
  const provider = new firebase.auth.GoogleAuthProvider();

  auth.signInWithPopup(provider)
    .then((result) => {
      console.log('Success! Signed in user:', result.user);

    }).catch((error) => {
      console.error("Error during sign-in:", error);
      alert("Login failed: " + error.message);
    });
}

function updateUI(user) {
  if (user) {
    console.log("User is signed in:", user);
    authButtonContent.innerHTML = `<img src="${user.photoURL}" alt="Profile" class="profile-img">`;
  } else {
    console.log("User is signed out");
    authButtonContent.innerHTML = 'G';
    authDropdown.classList.remove('show');
  }
}

function toggleDropdown() {
  authDropdown.classList.toggle('show');
}

auth.onAuthStateChanged(function(user) {
  updateUI(user);
});

googleAuthButton.addEventListener('click', function() {
  const user = auth.currentUser;

  if (user) {
    toggleDropdown();
  } else {
    signInWithGoogle();
  }
});

signOutButton.addEventListener('click', function() {
  auth.signOut().then(() => {
    console.log("User signed out successfully");
    authDropdown.classList.remove('show');
  }).catch((error) => {
    console.error("Error during sign-out:", error);
  });
});

document.addEventListener('click', function(event) {
  if (!authContainer.contains(event.target)) {
    authDropdown.classList.remove('show');
  }
});