const productList = () => {
    return fetch("http://localhost:3000/products")
        .then((respuesta) => respuesta.json())
        .catch((error) => console.log(error));
};

const createProducts = (name, price, image) => {
    return fetch("http://localhost:3000/products", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            name, 
            price, 
            image,
        })
    })
    .then((respuesta) => respuesta.json())
    .catch((error) => console.log(error));
    
}

const deleteProducts = (id) => {
    return fetch(`http://localhost:3000/products/${id}`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json"
        }
        })
        .then((respuesta) => respuesta.json())
        .catch((error) => console.log(error));
}

export const servicesProducts = {
    productList,
    createProducts,
    deleteProducts
};

