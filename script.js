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

const googleSignInButton = document.getElementById('googleSignInBtn');

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

googleSignInButton.addEventListener('click', signInWithGoogle);