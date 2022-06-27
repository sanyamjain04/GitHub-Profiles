const APIURL = "https://api.github.com/users/";

const main = document.getElementById("main");
const form = document.getElementById("form");
const search = document.getElementById("search");

getUser("sanyamjain04");

async function getUser(username) {
  const resp = await fetch(APIURL + username);
  const respData = await resp.json();
  
  createUserCard(respData);

  getRepos(username);
}

async function getRepos(username) {
    const resp = await fetch(APIURL + username + "/repos");
    const respData = await resp.json();
    
    addReposToCard(respData);

}
function createUserCard(username) {
  const cardHTML = `
        <div class="card">
            <div>
                <img class="avatar" src= "${username.avatar_url}" alt ="${username.name}">
            </div>
            <div class="user-info">
                <h2>${username.name}</h2>
                <p> ${username.bio} </p>

                <ul class="info">
                <li> <strong>Followers</strong>: ${username.followers}</li>
                <li> <strong>Following</strong>: ${username.following}</li>
                <li> <strong>Repos</strong>:  ${username.public_repos}</li>
                </ul>
                <div id="repo"></div>
            </div> 
        </div>
    `;

  main.innerHTML = cardHTML;
}

function addReposToCard(repos) {
    const reposEl = document.getElementById("repo");

    repos
        .sort((a, b) => b.stargazers_count - a.stargazers_count)
        .slice(0, 10)
        .forEach((repo) => {
            const repoEl = document.createElement("a");
            repoEl.classList.add("repo");

            repoEl.href = repo.html_url;
            repoEl.target = "_blank";
            repoEl.innerText = repo.name;

            reposEl.appendChild(repoEl);
        });
}


form.addEventListener("submit", (e) => {
  e.preventDefault();
  const user = search.value;

  if (user) {
    getUser(user);

    search.value = "";
  }
});
