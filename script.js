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
  const currentUser = localStorage.getItem('currentUser');
  const savedTheme = currentUser ? (localStorage.getItem('userTheme') || 'default') : 'default';
  updateTheme(savedTheme);
  const authModal = document.getElementById('authModal');
  const messageModal = document.getElementById('messageModal');
  const closeModal = document.getElementById('closeModal');
  const closeMessageBtn = document.getElementById('closeMessageBtn');
  const modalTitle = document.getElementById('modalTitle');
  const authForm = document.getElementById('authForm');
  const submitAuthBtn = document.getElementById('submitAuthBtn');
  const messageText = document.getElementById('messageText');
  const profileModal = document.getElementById('profileModal');
  const closeProfileModal = document.getElementById('closeProfileModal');
  const confirmProfileBtn = document.getElementById('confirmProfileBtn');
  const themeModal = document.getElementById('themeModal');
  const closeThemeModal = document.getElementById('closeThemeModal');
  const confirmThemeBtn = document.getElementById('confirmThemeBtn');

  let selectedTheme = null;
  let selectedProfile = null;
  let currentSignUpUsername = '';
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
      
      document.getElementById('signOutBtn').addEventListener('click', signOutUser);
      
      let userProfiles = JSON.parse(localStorage.getItem('userProfiles') || '{}');
      if (userProfiles[username]) {
        updateUserButtonProfile(userProfiles[username]);
      }
    } else {
      dropdownContent.innerHTML = `
        <button id="signInBtn">Sign In</button>
        <button id="signUpBtn">Sign Up</button>
      `;
      
      const userMenuBtn = document.getElementById('userMenuBtn');
      userMenuBtn.innerHTML = `
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 12C14.7614 12 17 9.76142 17 7C17 4.23858 14.7614 2 12 2C9.23858 2 7 4.23858 7 7C7 9.76142 9.23858 12 12 12Z" stroke="currentColor" stroke-width="2"/>
          <path d="M20.5899 22C20.5899 18.13 16.7399 15 11.9999 15C7.25991 15 3.40991 18.13 3.40991 22" stroke="currentColor" stroke-width="2"/>
        </svg>
      `;
      
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
    updateTheme('default');
    showMessage('Signed out successfully');
    updateUserMenu(false);
    userDropdown.classList.remove('show');
    const userMenuBtn = document.getElementById('userMenuBtn');
    userMenuBtn.innerHTML = `
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 12C14.7614 12 17 9.76142 17 7C17 4.23858 14.7614 2 12 2C9.23858 2 7 4.23858 7 7C7 9.76142 9.23858 12 12 12Z" stroke="currentColor" stroke-width="2"/>
        <path d="M20.5899 22C20.5899 18.13 16.7399 15 11.9999 15C7.25991 15 3.40991 18.13 3.40991 22" stroke="currentColor" stroke-width="2"/>
      </svg>
    `;
  }
  
  function showProfileSelection(username) {
    currentSignUpUsername = username;
    selectedProfile = null;

    document.querySelectorAll('.profile-option').forEach(option => {
      option.classList.remove('selected');
    });
    
    confirmProfileBtn.disabled = true;
    
    profileModal.classList.add('show');
  }

  function updateUserButtonProfile(profileId) {
    const userMenuBtn = document.getElementById('userMenuBtn');
    const profileImg = document.querySelector(`.profile-option[data-img="${profileId}"] img`).src;
    
    userMenuBtn.innerHTML = '';
    const img = document.createElement('img');
    img.src = profileImg;
    img.alt = 'Profile';
    img.style.width = '150%';
    img.style.height = '150%';
    img.style.borderRadius = '50%';
    img.style.objectFit = 'contain';
    userMenuBtn.appendChild(img);
  }

  function showThemeSelection() {
    selectedTheme = null;

    document.querySelectorAll('.theme-option').forEach(option => {
      option.classList.remove('selected');
    });

    themeModal.classList.add('show');
  }

  function updateTheme(themeName) {
    document.body.classList.remove('theme-blue', 'theme-green', 'theme-purple', 'theme-dark', 'theme-sunset');
    
    if (themeName !== 'default') {
      document.body.classList.add(`theme-${themeName}`);
    }
    
    if (localStorage.getItem('currentUser')) {
      localStorage.setItem('userTheme', themeName);
    }
    
    applyThemeColors(themeName);
  }

  function applyThemeColors(themeName) {
    const root = document.documentElement;
    
    switch(themeName) {
      case 'blue':
        root.style.setProperty('--primary-color', '#6bb5ff');
        root.style.setProperty('--secondary-color', '#1a4e8e');
        break;
      case 'green':
        root.style.setProperty('--primary-color', '#88d8b0');
        root.style.setProperty('--secondary-color', '#2e7c32');
        break;
      case 'purple':
        root.style.setProperty('--primary-color', '#c8a2c8');
        root.style.setProperty('--secondary-color', '#6a1b9a');
        break;
      case 'dark':
        root.style.setProperty('--primary-color', '#666666');
        root.style.setProperty('--secondary-color', '#222222');
        break;
      case 'sunset':
        root.style.setProperty('--primary-color', '#ff9a8b');
        root.style.setProperty('--secondary-color', '#ff6b6b');
        break;
      default: 
        root.style.setProperty('--primary-color', '#f0ae88');
        root.style.setProperty('--secondary-color', '#7c2e28');
    }
  }

  document.querySelectorAll('.theme-option').forEach(option => {
    option.addEventListener('click', () => {
      document.querySelectorAll('.theme-option').forEach(opt => {
        opt.classList.remove('selected');
      });
      
      option.classList.add('selected');
      selectedTheme = option.getAttribute('data-theme');
    });
  });

  closeThemeModal.addEventListener('click', () => {
    themeModal.classList.remove('show');
  });

  confirmThemeBtn.addEventListener('click', () => {
    if (selectedTheme) {
      updateTheme(selectedTheme);
      themeModal.classList.remove('show');
      
      showMessage('Theme applied successfully! Welcome to your new account!');
      
      localStorage.setItem('currentUser', currentSignUpUsername);
      updateUserMenu(true, currentSignUpUsername);
      updateUserButtonProfile(selectedProfile);
    }
  });

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
  
  if (currentUser) {
    let userProfiles = JSON.parse(localStorage.getItem('userProfiles') || '{}');
    if (userProfiles[currentUser]) {
      updateUserButtonProfile(userProfiles[currentUser]);
    }
  }

  document.querySelectorAll('.profile-option').forEach(option => {
    option.addEventListener('click', () => {
      document.querySelectorAll('.profile-option').forEach(opt => {
        opt.classList.remove('selected');
      });
      
      option.classList.add('selected');
  
      selectedProfile = option.getAttribute('data-img');
      
      confirmProfileBtn.disabled = false;
    });
  });

  closeProfileModal.addEventListener('click', () => {
    profileModal.classList.remove('show');
  });

  confirmProfileBtn.addEventListener('click', () => {
    if (selectedProfile && currentSignUpUsername) {
      let userProfiles = JSON.parse(localStorage.getItem('userProfiles') || '{}');
      userProfiles[currentSignUpUsername] = selectedProfile;
      localStorage.setItem('userProfiles', JSON.stringify(userProfiles));
      
      profileModal.classList.remove('show');
      
      setTimeout(() => {
        showThemeSelection();
      }, 500);
    }
  });

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