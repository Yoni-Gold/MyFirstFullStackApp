const inputElement = document.querySelector('#inputProduct'); // input element

// ========== get list of products ==========
async function displayListOfProducts () {
    const response = await axios.get(`http://localhost:3000/products/`);
    allProductsTable(response.data);
}
displayListOfProducts();

// ========== get product by id ==========
const searchProductButtonElement = document.querySelector('#searchProduct');
searchProductButtonElement.addEventListener('click', async ()=> {
    let productID = inputElement.value;
    const response = await axios.get(`http://localhost:3000/products/${productID}`);
    console.log(response.data);
});

// ========== post new product to the list ==========10
const newProductButtonElement = document.querySelector('#newProduct');
newProductButtonElement.addEventListener('click', async ()=> {
    let newName = document.querySelector('#newName');
    let newAmount = document.querySelector('#newAmount');
    let newPrice = document.querySelector('#newPrice');
    
    if (newName.value != "" && newAmount.value != "" && newPrice.value != ""){
        let newProduct = {
            name: newName.value,
            amount: newAmount.value,
            price: newPrice.value
        };
        newName.value = '';
        newAmount.value = '';
        newPrice.value = '';
        const response = await axios.post(`http://localhost:3000/products/`, newProduct);
        console.log(response.data);
        displayListOfProducts();
    } else {
        alert('must insert name, amount and price');
    }
});



// ========== delete product by id ==========
async function deleteProductById(id) {
    const response = await axios.delete(`http://localhost:3000/products/${id}`);
    console.log(response.data);
    displayListOfProducts();
}

// ========== display all products in a table ==========
function allProductsTable (products) { 
    let htmlProductsTable = `
    <table id="productsTable">
        <tr>
            <th>name</th>
            <th>amount</th>
            <th>price</th>
            <th></th>
        </tr>`; // sending </table> at the end 
    products.forEach((product,i)=> {
        let htmlTableRow = `
        <tr>
            <td>${product.name}</td>
            <td>${product.amount}</td>
            <td>${product.price}</td>
            <td>
                <button onclick="deleteProductById(${product.id})">[X]</button>
                <button onclick="updateProductById(${product.id})">[+]</button>
            </td>
        </tr>`;
        htmlProductsTable += htmlTableRow ;
    });
    document.querySelector('.productsContainer').innerHTML = htmlProductsTable + `</table>`;
}



// ========== update product ==========
async function updateProductById(id) {

    const updateContainerElement = document.querySelector('#updateContainer');
    const getResponse = await axios.get(`http://localhost:3000/products/${id}`);
    console.log(getResponse.data);
    let htmlText = `
        <div id="innerContainer">
            <div class="updateName">${getResponse.data.name}</div>
            <div>Amount: <input id="amountUpdate" class="updateInputElement" placeholder="${getResponse.data.amount}"></div>
            <div>Price: <input id="priceUpdate" class="updateInputElement" placeholder="${getResponse.data.price}"></div>
            <button id="applyUpdate">Apply Update</button>
        </div>`;
    updateContainerElement.innerHTML = htmlText;

    document.querySelector('#applyUpdate').addEventListener('click', async ()=> {
        let updateAmount = document.querySelector('#amountUpdate');
        let updatePrice = document.querySelector('#priceUpdate');

        let updatedProduct = {
            name: getResponse.data.name,
            amount: updateAmount.value != '' ? updateAmount.value : getResponse.data.amount,
            price: updatePrice.value != '' ? updatePrice.value : getResponse.data.price
        };
        const updateResponse = await axios.put(`http://localhost:3000/products/${id}`, updatedProduct);
        console.log(updateResponse.data);

        document.querySelector('#innerContainer').remove();
        displayListOfProducts()
    });
}





