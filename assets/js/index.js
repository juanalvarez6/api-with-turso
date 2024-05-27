const getProducts = async () => {
    const data = await fetch('https://backend-with-turso.onrender.com/products');
    const products = await data.json();
    let productContainer = document.querySelector('#productContainer div');

    products.forEach(product => {
        productContainer.innerHTML += `
        <div class="mt-2 mx-1">
            <div class="card rounded-0" style="width: 14rem;">
                <img src="${product.image}" class="card-img-top rounded-0" alt="${product.title}">
                <div class="card-body">
                    <p class="card-text">$${product.price}</p>
                    <h6 class="card-title">${product.title}</h6>
                    <div class="d-flex justify-content-between">
                        <button type="button" id="deleteButton${product.id}" class="btn btn-danger" data-bs-toggle="modal" data-bs-target="#deleteModal${product.id}">Eliminar</button>
                        <button type="button" class="btn btn-warning" data-bs-toggle="modal" data-bs-target="#editModal${product.id}">Editar</button>
                    </div>
                </div>
            </div>
        </div>

        <div class="modal fade" id="editModal${product.id}" tabindex="-1" aria-labelledby="editModalLabel" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <h1 class="modal-title fs-5" id="editModalLabel">Modal title</h1>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        <div class="d-flex flex-column align-items-center">
                            <div class="d-flex m-2 flex-column w-100">
                                <label for="editName${product.id}">Nombre: </label>
                                <input id="editName${product.id}" type="text" value="${product.title}">
                            </div>

                            <div class="d-flex m-2 flex-column w-100">
                                <label for="editPrice${product.id}">Precio: </label>
                                <input id="editPrice${product.id}" type="number" value="${product.price}">
                            </div>

                            <div class="d-flex m-2 flex-column w-100">
                                <label for="editImage${product.id}">Imagen: </label>
                                <input id="editImage${product.id}" type="text" value="${product.image}">
                            </div>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cerrar</button>
                        <button type="button" class="btn btn-primary" onclick="editProduct(${product.id})">Guardar</button>
                    </div>
                </div>
            </div>
        </div>

        <div class="modal fade" id="deleteModal${product.id}" tabindex="-1" aria-labelledby="deleteModalLabel" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
            <div class="modal-header">
                <h1 class="modal-title fs-5" id="deleteModalLabel">Eliminar Producto</h1>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
                Esta seguro de que desea eliminar el producto <b>${product.title}</b>?
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancelar</button>
                <button type="button" class="btn btn-danger" onclick="deleteProduct(${product.id})">Aceptar</button>
            </div>
            </div>
        </div>
        </div>
        `
    });
}

const getCategories = async () => {
    const data = await fetch('https://backend-with-turso.onrender.com/categories');
    const categories = await data.json();
    let categoriesContainer = document.querySelector('#categoryId');

    categories.forEach(category => {
        categoriesContainer.innerHTML += `
        <option value="${category.id}">${category.name}</option>
        `;
    });

}
getProducts();
getCategories();

const createProduct = () => {
    let title = document.querySelector('#title');
    let price = document.querySelector('#price');
    let description = document.querySelector('#description');
    let image = document.querySelector('#image');
    let categoryId = document.querySelector('#categoryId');

    const newProduct = {
        title: title.value,
        price: price.value,
        description: description.value,
        image: image.value,
        categoryId: categoryId.value
    };

    fetch('https://backend-with-turso.onrender.com/products', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(newProduct)
    }).then(response => {
        response.json();
        $('#confirmCreateModal').modal('show');
        $('#modalCreateProduct').modal('hide');
    });
}

const editProduct = (id) => {
    let title = document.querySelector(`#editName${id}`);
    let price = document.querySelector(`#editPrice${id}`);
    let image = document.querySelector(`#editImage${id}`);

    const putProduct = {
        title: title.value,
        price: price.value,
        image: image.value
    }

    fetch(`https://backend-with-turso.onrender.com/products/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(putProduct)
    }).then(response => {
        response.json();
        $('#confirmEditModal').modal('show');
        $(`#editModal${id}`).modal('hide');
    });
}

const deleteProduct = (id) => {
    fetch(`https://backend-with-turso.onrender.com/products/${id}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        }
    })
        .then(response => {
            response.json();
            $('#confirmDeleteModal').modal('show');
            $(`#deleteModal${id}`).modal('hide');
        });
}

const reloadButton = () => {
    location.reload();
}