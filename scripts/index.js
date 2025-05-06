document.getElementById("order").addEventListener("click", function () {
  const app = document.getElementById("app");

  function order() {
    app.innerHTML = `<h1> pick size </h1>
    <button data-size="big">big</button>
   <button data-size="small">small</button>
    <button data-size="large">large</button>
    `;
  }
  order();

  let size;

  app.addEventListener("click", function (e) {
    if (e.target.tagName === "BUTTON" && e.target.dataset.size) {
      size = e.target.dataset.size;
      showtoppings(size);
    }
  });

  function showtoppings(size) {
    app.innerHTML = `
    <h1> pick a topping for your ${size} pizza </h1>
     <button data-topping="cheese">cheese</button>
   <button data-topping="pepperoni">pepperoni</button> 
    <button data-topping="chicken">chicken</button>
    
    `;
  }
  app.addEventListener("click", function (e) {
    if (e.target.tagName === "BUTTON" && e.target.dataset.topping) {
      const topping = e.target.dataset.topping;
      showsummary(size, topping);
    }
  });

  function showsummary(size, topping) {
    let countdown = 5;

    const interval = setInterval(function () {
      app.innerHTML = `
        <p>Your order will arrive in <strong>${countdown}</strong> seconds...</p>
      `;
      countdown--;

      if (countdown < 0) {
        clearInterval(interval);
        app.innerHTML = `
          <h1>Your pizza order summary:</h1>
          <p>Size: <strong>${size}</strong></p>
          <p>Topping: <strong>${topping}</strong></p>
          <button id="order">Order again</button>
        `;

        // Reattach event listener after DOM is updated
        document.getElementById("order").addEventListener("click", function () {
          order();
        });
      }
    }, 1000);
  }
});
