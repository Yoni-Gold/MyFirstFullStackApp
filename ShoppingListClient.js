

const productsButtonElement = document.querySelector('#products');
// get products list from server
productsButtonElement.addEventListener('click', async ()=> { 
    const response = await axios.get(`http://localhost:3000/products/`);
    console.log(response.data);
});

const inputElement = document.querySelector('#inputProduct');
const searchProductButtonElement = document.querySelector('#searchProduct');
// get product by id
searchProductButtonElement.addEventListener('click', async ()=> {
    let productID = inputElement.value;
    const response = await axios.get(`http://localhost:3000/products/${productID}`);
    console.log(response.data);
});

const newProductButton = document.querySelector('#newProduct');
// post new product to the list
newProductButton.addEventListener('click', async ()=> {
    let product = {
        name: 'coffee',
        amount: '3',
        price: '10'
    };
    const response = await axios.post(`http://localhost:3000/products/`, product);
    console.log(response.data);
});

