const express = require('express')
const app = express()
const port = 3000

let bodyParser = require('body-parser');
app.use(bodyParser.json());

let products = [];

app.get('/products', (req, res) => {
  res.send(products);
})

app.post('/products', function (req, res) {
  if (!req.body) return res.sendStatus(400);
  
  let data = new Object(req.body);
  data['id'] = products.length + 1;
  products.push(data);
  res.send(products);
});

app.put('/products', function (req, res) {
    products.forEach(product => {
    if (product.id === +req.body['id']) {
      product.name = req.body['name']
    }
  })
  res.send(products)
});

app.delete('/products/:id', function (req, res) {
	for (var i = 0; i < products.length; i++) {
    	if (products[i].id === +req.body['id']) {
    		res.send(products[i])
      		products.splice(i, 1);
    	}
  	}
});

app.listen(port, () => console.log(`Прослушивание на порту ${port}!`))
  
