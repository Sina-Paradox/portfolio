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



document.addEventListener("DOMContentLoaded", function() {

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



  const authModal = document.getElementById('authModal');
  const messageModal = document.getElementById('messageModal');
  const closeModal = document.getElementById('closeModal');
  const closeMessageBtn = document.getElementById('closeMessageBtn');
  const modalTitle = document.getElementById('modalTitle');
  const authForm = document.getElementById('authForm');
  const submitAuthBtn = document.getElementById('submitAuthBtn');
  const messageText = document.getElementById('messageText');

  let isSignUpMode = false;

  function showMessage(text) {
    messageText.textContent = text;
    messageModal.classList.add('show');
  }

  function checkUsernameExists(username, callback) {
    let users = JSON.parse(localStorage.getItem('users') || '[]');
    callback(users.includes(username));
  }

  function addUsernameToCSV(username, callback) {
    let users = JSON.parse(localStorage.getItem('users') || '[]');
    
    if (users.includes(username)) {
      callback(false, 'Username already exists');
      return;
    }
    
    users.push(username);
    localStorage.setItem('users', JSON.stringify(users));
    callback(true, 'Success');
  }
  
  function signUpUser(username) {
    addUsernameToCSV(username, function(success, message) {
      if (success) {
        showMessage('Thank You!!!');
        setTimeout(() => {
          showProfileSelection(username);
        }, 2000);
      } else {
        showMessage('User Name Already Exists!!!');
      }
      authModal.classList.remove('show');
    });
  }
  
  function signInUser(username) {
    checkUsernameExists(username, function(exists) {
      if (exists) {
        showMessage('Successful!!!');
        localStorage.setItem('currentUser', username);
        updateUserMenu(true, username);
      } else {
        showMessage('Please Sign Up First!!!');
      }
      authModal.classList.remove('show');
    });
  }
  
  function updateUserMenu(isLoggedIn, username) {
    const dropdownContent = document.querySelector('.dropdown-content');
    if (isLoggedIn) {
      dropdownContent.innerHTML = `
        <button id="signOutBtn">Sign Out</button>
        <div style="padding: 10px; border-top: 1px solid #eee;">
          Logged in as: <strong>${username}</strong>
        </div>
      `;
      
      // Add sign out functionality
      document.getElementById('signOutBtn').addEventListener('click', signOutUser);
    } else {
      dropdownContent.innerHTML = `
        <button id="signInBtn">Sign In</button>
        <button id="signUpBtn">Sign Up</button>
      `;
      
      // Reattach event listeners
      document.getElementById('signInBtn').addEventListener('click', () => {
        isSignUpMode = false;
        modalTitle.textContent = 'Sign In';
        submitAuthBtn.textContent = 'Sign In';
        authForm.reset();
        authModal.classList.add('show');
      });
      
      document.getElementById('signUpBtn').addEventListener('click', () => {
        isSignUpMode = true;
        modalTitle.textContent = 'Sign Up';
        submitAuthBtn.textContent = 'Sign Up';
        authForm.reset();
        authModal.classList.add('show');
      });
    }
  }
  
  function signOutUser() {
    localStorage.removeItem('currentUser');
    showMessage('Signed out successfully');
    updateUserMenu(false);
    userDropdown.classList.remove('show');
  }
  
  function showProfileSelection(username) {
    showMessage('Profile picture selection will be implemented next!');
  }

  const currentUser = localStorage.getItem('currentUser');
  if (currentUser) {
    updateUserMenu(true, currentUser);
  }

  document.getElementById('signInBtn').addEventListener('click', () => {
    isSignUpMode = false;
    modalTitle.textContent = 'Sign In';
    submitAuthBtn.textContent = 'Sign In';
    authForm.reset();
    authModal.classList.add('show');
  });

  document.getElementById('signUpBtn').addEventListener('click', () => {
    isSignUpMode = true;
    modalTitle.textContent = 'Sign Up';
    submitAuthBtn.textContent = 'Sign Up';
    authForm.reset();
    authModal.classList.add('show');
  });

  closeModal.addEventListener('click', () => {
    authModal.classList.remove('show');
  });

  closeMessageBtn.addEventListener('click', () => {
    messageModal.classList.remove('show');
  });

  if (authForm) {
    authForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const username = document.getElementById('username').value.trim();
      
      if (username) {
        if (isSignUpMode) {
          signUpUser(username);
        } else {
          signInUser(username);
        }
      }
    });
  }

});