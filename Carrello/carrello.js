//da testare
let total = 0;

        const getCartItem = () => {
            let cartElements = document.querySelector("#cart-elements");
            cartElements.innerHTML = ""; // Svuota il contenitore prima di aggiungere gli elementi

            for (let key in localStorage) {
                if (key.charAt(0) === "q" || key === "authToken") continue;

                const item = JSON.parse(localStorage.getItem(key));
                if (item === null) continue;

                const element = document.createElement("tr");
                element.classList.add(`element-${item.id}`);
                element.innerHTML = `
                    <td>${item.name}</td>
                    <td>$${item.price}</td>`;

                cartElements.appendChild(element);
            }

            getTotalPrice();
        }

        const getTotalPrice = () => {
            total = 0;
            for (let key in localStorage) {
                if (!isNaN(parseInt(key))) {
                    let item = JSON.parse(localStorage.getItem(key));
                    if (item) {
                        total += item.price;
                    }
                }
            }

            let totalCart = parseFloat(total).toFixed(2);
            document.querySelector(".total-cart").textContent = `$${totalCart}`;
            document.querySelector(".checkout-btn").textContent = `Checkout - $${totalCart}`;
        }

        getCartItem();