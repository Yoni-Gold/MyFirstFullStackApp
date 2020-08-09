let myList = [];  // ===> { id: 1 , name: "milk" , amount: 2 , price: 15 } 
let globalID = 0; // creates unique id

const  express  = require('express');
const server = express();

server.use(express.json());
server.use(printLog);
server.use(express.static('./'));

const {readFileSync } = require('fs');
server.get('/', (request,response) => { // apply html page 
    let file = readFileSync('./ShoppingListPage.html','utf8');
    response.send(file);
});

function printLog(request, response, next) // this function is for seenig the requests in the console
{
    console.log("your request URL: " + request.url + " method: " + request.method); // prints the request
    next(); // launches the request function
}

server.get(`/products`, (request, response) => { // shows all the items
    response.send(myList)});

server.get(`/products/:id`, (request, response) => { // shows specific item
    response.send(myList.find(e => e.id == request.params.id))});

server.post(`/products`, (request, response) => { // adds an item
    myList.push({id: ++globalID , name: request.body.name , amount: request.body.amount , price: request.body.price});
    response.send(myList[myList.length - 1]);
});

server.put(`/products/:id`, (request, response) => { // updates an item
    let product = myList.find(e => e.id == request.params.id);
    product.name = request.body.name;
    product.amount = request.body.amount;
    product.price = request.body.price;
    response.send(product);
});

server.delete(`/products/:id`, (request, response) => { // removes an item
    myList = myList.filter(e => e.id != request.params.id);
    response.send("Item removed");
});

server.listen(3000);