const register = document.querySelector("#register");
const url = "https://ghost-test-server.herokuapp.com/api/auth/register";

register.addEventListener("click", e => {
  e.preventDefault();

  const username = document.querySelector("#username").value;
  const email = document.querySelector("#email").value;
  const password = document.querySelector("#password").value;

  const data = {
    username: `${username}`,
    email: `${email}`,
    password: `${password}`,
  };

  fetch(url, {
    method: "POST",
    body: JSON.stringify(data),
    headers: { "Content-type": "application/json; charset=UTF-8" },
  })
    .then(response => response.json())
    .then(data => {
      window.location.href = "http://127.0.0.1:5500/index.html";
      console.log(data);
    })
    .catch(error => {
      console.error(error);
    });
});
