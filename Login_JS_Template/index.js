const login = document.querySelector("#login");
const url = "https://ghost-test-server.herokuapp.com/api/auth/login";

login.addEventListener("click", e => {
  e.preventDefault();

  const email = document.querySelector("#email").value;
  const password = document.querySelector("#password").value;

  const data = {
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
      if (data.token) localStorage.setItem("user", JSON.stringify(data));
      window.location.href = "http://127.0.0.1:5500/homepage.html";
    })
    .catch(error => {
      console.error(error);
    });
});
