async function fetchGithubProfile() {
   try {
      const input = getInputValue();
      const url = `https://api.github.com/users/${input}`;
      validateInput(input);

      const data = await fetchData(url);
      const userInfo = document.querySelector('.user-info');
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
   const avatar = document.querySelector('img');
   const followers = document.querySelector('.followers-count');
   const following = document.querySelector('.following-count');
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

   document.querySelector('.company-name').textContent = data.company;
   document.querySelector('.location-name').textContent = data.location;
   document.querySelector('.blog-name').textContent = data.blog;

   const moreInfoLocation = document.querySelector('.location');
   const moreInfoCompany = document.querySelector('.company');
   const moreInfoBlog = document.querySelector('.blog');

   // hide element based on data
   hideElementIfNull(moreInfoLocation, data.location);
   hideElementIfNull(moreInfoCompany, data.company);
   hideElementIfNull(moreInfoBlog, data.blog);
}

// function to hide element if data is null
function hideElementIfNull(element, dataValue) {
   if (dataValue === null || dataValue === '') element.style.display = 'none';
}

// event listener
const searchBtn = document.querySelector('button');
searchBtn.addEventListener('click', (e) => {
   e.preventDefault();
   fetchGithubProfile();
   document.querySelector('input').value = '';
});
