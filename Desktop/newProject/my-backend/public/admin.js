document.addEventListener('DOMContentLoaded', () => {
    const productForm = document.getElementById('productForm');
    const productIdInput = document.getElementById('productId');
    const nameInput = document.getElementById('name');
    const descriptionInput = document.getElementById('description');
    const priceInput = document.getElementById('price');
    const productsTable = document.getElementById('productsTable');


    // Load products from the database
    const loadProducts = async () => {
        try {

            console.log('Загрузка товаров...');

            const response = await fetch('/products');
            const products = await response.json();
            productsTable.innerHTML = '';
            products.forEach(product => {
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td>${product.name}</td>
                    <td>${product.description}</td>
                    <td>${product.price}</td>
                    <td>
                        <button onclick="editProduct(${product.id}, '${product.name}', '${product.description}', ${product.price})">Изменить</button>
                        <button onclick="deleteProduct(${product.id})">Удалить</button>
                    </td>
                `;
                productsTable.appendChild(row);
            });
        } catch (error) {
            console.error('Ошибка при загрузке товаров:', error);
        }
    };

    // Save or update a product
    productForm.addEventListener('submit', async (event) => {
        event.preventDefault();
        const id = productIdInput.value;
        const name = nameInput.value;
        const description = descriptionInput.value;
        const price = parseFloat(priceInput.value);

        const productData = { name, description, price };

        try {
            let response;
            if (id) {
                response = await fetch(`/products/${id}`, {
                    method: 'PUT',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(productData),
                });
            } else {
                response = await fetch('/products', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(productData),
                });
            }

            if (response.ok) {
                productIdInput.value = '';
                nameInput.value = '';
                descriptionInput.value = '';
                priceInput.value = '';
                loadProducts();
            } else {
                console.error('Ошибка при сохранении товара');
            }
        } catch (error) {
            console.error('Ошибка при отправке данных:', error);
        }
    });

    // Edit a product
    window.editProduct = (id, name, description, price) => {
        productIdInput.value = id;
        nameInput.value = name;
        descriptionInput.value = description;
        priceInput.value = price;
    };

    // Delete a product
    window.deleteProduct = async (id) => {
        if (confirm('Вы уверены, что хотите удалить этот товар?')) {
            try {
                const response = await fetch(`/products/${id}`, { method: 'DELETE' });
                if (response.ok) {
                    loadProducts();
                } else {
                    console.error('Ошибка при удалении товара');
                }
            } catch (error) {
                console.error('Ошибка при удалении товара:', error);
            }
        }
    };

    // Load the products on page load
    loadProducts();
});
