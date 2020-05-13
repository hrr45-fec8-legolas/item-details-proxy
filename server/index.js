const express = require('express');
const path = require('path');
const { createProxyMiddleware } = require('http-proxy-middleware');


const app = express();

app.use(express.static(path.join(__dirname, '/../public/')));

const singleItemProxy = createProxyMiddleware({target: 'http://localhost:3001'});
const itemDetailsProxy = createProxyMiddleware({target: 'http://localhost:3002'});
const relatedItemsProxy = createProxyMiddleware({target: 'http://localhost:3003'});
const reviewsProxy = createProxyMiddleware({target: 'http://localhost:3004'});

app.use('/api/items/:id', singleItemProxy);
app.use('/items/:id', itemDetailsProxy);
app.use('/api/related_products/:id', relatedItemsProxy);
app.use('/api/allreviews/', reviewsProxy);

const PORT = 3005;
app.listen(PORT, () => {
  console.log(`Listening on ${PORT}`);
});
