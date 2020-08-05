const inputElement = document.querySelector('#inputProduct'); // input element


const productsButtonElement = document.querySelector('#products');
// get products list from server
productsButtonElement.addEventListener('click', async ()=> { 
    const response = await axios.get(`http://localhost:3000/products/`);
    console.log(response.data);
});

const searchProductButtonElement = document.querySelector('#searchProduct');
// get product by id
searchProductButtonElement.addEventListener('click', async ()=> {
    let productID = inputElement.value;
    const response = await axios.get(`http://localhost:3000/products/${productID}`);
    console.log(response.data);
});

const newProductButtonElement = document.querySelector('#newProduct');
// post new product to the list
newProductButtonElement.addEventListener('click', async ()=> {
    let newProduct = {
        name: 'coffee',
        amount: '3',
        price: '10'
    };
    const response = await axios.post(`http://localhost:3000/products/`, newProduct);
    console.log(response.data);
});

const updateProductButtonElement = document.querySelector('#updateProduct');
// update product by id
updateProductButtonElement.addEventListener('click', async ()=> {
    let updateProduct = {
        name: 'bread',
        amount: '1',
        price: '5'
    };
    const response = await axios.put(`http://localhost:3000/products/1`, updateProduct);
    console.log(response.data);
});

const deleteProductButtonElement = document.querySelector('#deleteProduct');
// delete product by id
deleteProductButtonElement.addEventListener('click', async ()=> {
    let productID = inputElement.value;
    const response = await axios.delete(`http://localhost:3000/products/${productID}`);
    console.log(response.data);
});