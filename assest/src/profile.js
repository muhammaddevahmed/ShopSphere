  // Save profile data to localStorage
  const saveProfileData = (data) => {
    localStorage.setItem('userProfile', JSON.stringify(data));
  };

  // Load profile data from localStorage
  const loadProfileData = () => {
    const savedData = JSON.parse(localStorage.getItem('userProfile'));
    if (savedData) {
      document.getElementById('username').value = savedData.username || '';
      document.getElementById('email').value = savedData.email || '';
      document.getElementById('country').value = savedData.country || '';
      document.getElementById('language').value = savedData.language || 'English';
      document.getElementById('userDetails').innerHTML = `
        <p><strong>Username:</strong> ${savedData.username}</p>
        <p><strong>Email:</strong> ${savedData.email}</p>
        <p><strong>Country:</strong> ${savedData.country}</p>
        <p><strong>Language:</strong> ${savedData.language}</p>
        <p><strong>Profile Picture:</strong></p>
        <img src="${savedData.profilePic || ''}" alt="Profile Picture" class="w-24 h-24 rounded-full">
      `;
    }
  };

  // Handle form submission
  document.getElementById('profileForm').addEventListener('submit', (e) => {
    e.preventDefault();
    const username = document.getElementById('username').value;
    const email = document.getElementById('email').value;
    const country = document.getElementById('country').value;
    const language = document.getElementById('language').value;
    const profilePic = document.getElementById('profilePic').files[0] ? URL.createObjectURL(document.getElementById('profilePic').files[0]) : '';

    const userData = {
      username,
      email,
      country,
      language,
      profilePic
    };

    saveProfileData(userData);
    loadProfileData();  // Reload to show saved data
  });

  // Load user data on page load
  loadProfileData();
