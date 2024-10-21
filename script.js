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
      alert('Error: Input cannot be empty');
   }
}

// function to get input value
function getInputValue() {
   return document.querySelector('input').value.trim();
}

// function to validate input
function validateInput(input) {
   if (!input) {
      throw new Error();
   }
}

// function to fetch data
async function fetchData(url) {
   const res = await fetch(url);
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

searchBtn.addEventListener('click', (e) => {
   e.preventDefault();
   fetchGithubProfile();
   document.querySelector('input').value = '';
});
