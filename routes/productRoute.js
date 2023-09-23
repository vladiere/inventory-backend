const express = require('express');
const productController = require('../controllers/productController');
const verifyToken = require('../middlewares/verifyToken');

const router = express.Router();

// GET Method
router.get('/all', verifyToken, productController.getAllProducts); // Get all products
router.get('/single/:id', verifyToken, productController.getByIDProduct); // Get single product by id

// POST Methods
router.post('/create', verifyToken, productController.createNewProduct); //Create new product
router.put('/update/:id', verifyToken, productController.updateProduct); //Update an existing product

// DELETE Method
router.delete('/delete/:id', verifyToken, productController.deleteProductByID); //Delete an exist product

module.exports = router;