import { servicesProducts } from "../services/product-services.js";

const productContainer = document.querySelector("[data-product]");
const form = document.querySelector("[data-form]");

function createCard(name, price, image, id){
    const card = document.createElement("div");
    card.classList.add("card");

    card.innerHTML = `
                        
                    <div class="img-container">
                        <img src="${image}"
                            alt="${name}">
                    </div>
                        
                    <div class="card-container--info">
                        <p>${name}</p>
                        <div class="card-container--value">
                            <p>$ ${price}</p>
                            <button class="delete-button" data-id="${id}">
                                <img src="./assets/trash-solid-24.png" alt="Eliminar">
                            </button>
                        </div>
                    </div>
    `;

    card.querySelector(".delete-button").addEventListener("click", (e) => {
        e.preventDefault();
        const productID = e.target.closest(".delete-button").getAttribute("data-id");
        deleteCard(productID);
    });

    productContainer.appendChild(card);
    return card;
};

const render = async () => {
    try {
       // productContainer.innerHTML = "";
        const listaProductos = await servicesProducts.productList();
       
        listaProductos.forEach(product => {
            productContainer.appendChild(
                createCard(
                    product.name,
                    product.price,
                    product.image,
                    product.id
                )
            )
        });

    } catch (error) {
        console.log(error);
    }
};

form.addEventListener("submit", (evento) => {
    evento.preventDefault();

    const name = document.querySelector("[data-name]").value;
    const price = document.querySelector("[data-price]").value;
    const image = document.querySelector("[data-image]").value;
    
    console.log(name);
    console.log(price);
    console.log(image);

    servicesProducts
        .createProducts(name, price, image)
        .then((respuesta) => console.log(respuesta))
        .catch((error) => console.log(error));
});

const deleteCard = (id) => {
    servicesProducts
        .deleteProducts(id)
        .then((respuesta) => {
            console.log(respuesta);

            const cardToDelete = document.querySelector(`.delete-button[data-id='${id}']`).closest(".card");
            if(cardToDelete){
            cardToDelete.remove();
            }
        })
        .catch((error) => console.log(error));
}

render();

