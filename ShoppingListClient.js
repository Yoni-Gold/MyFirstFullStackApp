

const productsButtonElement = document.querySelector('#products');
// get products list from server
productsButtonElement.addEventListener('click', async ()=> { 
    const { data } = await axios.get(`http://localhost:3000/products/`);
    console.log(data);
});

const inputElement = document.querySelector('#inputProduct');
const searchProductButtonElement = document.querySelector('#searchProduct');
// get product by id
searchProductButtonElement.addEventListener('click', async ()=> {
    let productID = inputElement.value;
    const { data } = await axios.get(`http://localhost:3000/products/${productID}`);
    console.log(data);
});

