const APIURL = 'https://api.github.com/users/';

const main = document.querySelector('#main');
const form = document.querySelector('#form');
const search = document.querySelector('#search');

async function getUser(username) {
    try {
        const { data } = await axios(APIURL + username);
    
        createUserCard(data);
        getRepos(username);
    } catch(err) {
        if(err.response.status == 404) {
            createErrorCard('No profile with this username');
        }
    }
    
}

async function getRepos(username) {
    try {
        const { data } = await axios(APIURL + username + '/repos?sort=created');
    
        addReposToCard(data);
    } catch(err) {
        if(err.response.status == 404) {
            createErrorCard('Problem Fetching Repos');
        }
    }
    
}

function createUserCard(user) {
    const cardHTML = `
    <div class="card">
            <div>
                <img src="${user.avatar_url}" alt="${user.name}" class="avatar">
            </div>
            <div class="user-info">
                <h2>${user.name}</h2>
                <p>${user.bio}</p>

                <ul>
                <li>${user.followers} <strong>Followers</strong></li>
                <li>${user.following} <strong>Following</strong></li>
                <li>${user.public_repos} <strong>Repos</strong></li>
                </ul>

                <div id="repos">
                </div>
            </div>
        </div>
    `;

    main.innerHTML = cardHTML;
}

function createErrorCard(msg) {
    const cardHTML = `
    <div class="card">
        <h1>${msg}</div>
    </div>
    `

    main.innerHTML = cardHTML;
}

form.addEventListener('submit', (e) => {
    e.preventDefault();
    //extra bit of code from stackoverflow, uses replace with regualr expressions to trimany whitespaces, github API requires it
    const user = (search.value).replace(/ +/g, ""); 

    if(user) {
        getUser(user);
        search.value = '';
    }
})

function addReposToCard(repos) {
    const reposEl = document.getElementById('repos');

    repos //is an array with repo objects
    .slice(0, 10)
    .forEach(repo => {
        const repoEl = document.createElement('a');
        repoEl.classList.add('repo');
        repoEl.href = repo.html_url;
        repoEl.target = '_blank';
        repoEl.innerText = repo.name;

        reposEl.appendChild(repoEl);
    })
}