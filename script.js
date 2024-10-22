const userInfo = document.querySelector('.user-info');
const searchBtn = document.querySelector('button');
const avatar = document.querySelector('img');
const followers = document.querySelector('.followers-count');
const following = document.querySelector('.following-count');

async function fetchGithubProfile() {
   try {
      const input = getInputValue();
      const url = `https://api.github.com/users/${input}`;
      validateInput(input);

      const data = await fetchData(url);
      updateProfile(data);
      userInfo.classList.toggle('hidden');
      userInfo.classList.add('fade-in');

      // animation ends after 0.5s
      setTimeout(() => userInfo.classList.remove('fade-in'), 500);
   } catch (error) {
      alert(`Error: ${error.message}`);
   }
}

// function to get input value
function getInputValue() {
   return document.querySelector('input').value.trim();
}

// function to validate input
function validateInput(input) {
   if (!input) {
      throw new Error('Input cannot be empty');
   }

   // validate Github username
   const usernamePattern = /^[a-z\d](?:[a-z\d]|-(?=[a-z\d])){0,38}$/i;
   if (!usernamePattern.test(input))
      throw new Error('Invalid Github username format');
}

// function to fetch data
async function fetchData(url) {
   const res = await fetch(url);
   if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
   return await res.json();
}

// function to update profile
function updateProfile(data) {
   avatar.src = `${data.avatar_url}`;
   document.querySelector('.heading').textContent = `${data.name}`;
   document.querySelector('.description').textContent =
      data.bio === null ? '' : `${data.bio}`;

   // format followers count
   followers.textContent =
      data.followers >= 1000
         ? `${(data.followers / 1000).toFixed(1)}k`
         : `${data.followers} `;

   // format following count
   following.textContent =
      data.following >= 1000
         ? `${(data.following / 1000).toFixed(1)}k`
         : `${data.following} `;
}

// event listener
searchBtn.addEventListener('click', (e) => {
   e.preventDefault();
   fetchGithubProfile();
   document.querySelector('input').value = '';
});
