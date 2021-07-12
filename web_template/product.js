const url = "https://ghost-test-server.herokuapp.com/api/food";

window.addEventListener("load", function () {
  fetch(url)
    .then(response => response.json())
    .then(data => {
      let html = "";
      let index = 0;
      for (; index < data.length; ) {
        let htmlSegment = `<div class="row">`;
        for (let i = 0; i < 4 && index < data.length; i++, index++) {
          htmlSegment += `<div class="col-4">
                <h3>${data[index].name}</h3>
                <img src="${data[index].image}" />
                <p>Amount: ${data[index].quantity}</p>
                <p>Expiration Date: ${data[index].date}</p>
                <p>Storage Way: ${data[index].store}</p>
                <div class="btn">
                  <a>Add to cart</a>
                </div>
              </div>`;
        }
        htmlSegment += `</div>`;
        html += htmlSegment;
      }
      html += `<div class="row">
            <div class="page-btn">
                <span>1</span>
                <span>2</span>
                <span>3</span>
                <span>4</span>
                <span>.....</span>
            </div>
        </div>`;
      let container = document.querySelector(".catolog");
      container.innerHTML = html;
    })
    .catch(error => {
      console.error(error);
    });
});
