

const productsButtonElement = document.querySelector('#products');
// get products list from server
productsButtonElement.addEventListener('click', async ()=> { 
    const { data } = await axios.get(`http://localhost:3000/products/`);
    console.log(data);
});


