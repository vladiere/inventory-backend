const productService = require('../services/productsService');

const createNewProduct = async (req, res) => {
    try {
        const product = req.body;
        const result = await productService.createNewProduct(product);

        return res.status(201).json(result)
    } catch (error) {
        console.error('Error in creating new product in controller: ', error.message);
        return res.status(500).json({ message: error.message });
    }
}

const getAllProducts = async (req, res) => {
    try {
        const result = await productService.getAllProducts();

        return res.status(200).json(result);
    } catch (error) {
        console.error('Error in getting all product in controller: ', error.message);
        return res.status(500).json({ message: error.message });
    }
}

const getByIDProduct = async (req, res) => {
    try {
        const { id } = req.params;

        const result = await productService.getByIDProduct(id);

        return res.status(200).json(result);
    } catch (error) {
        console.error('Error in getting product by ID in controller: ', error.message);
        return res.status(500).json({ message: error.message });
    }
}

const updateProduct = async (req, res) => {
    try {
        const product = req.body;
        const { id } = req.params;
        console.info(product)

        const result = await productService.updateProduct(product, id);

        res.status(200).json(result);
    } catch (error) {
        console.error('Updating product ERROR on controller: ', error.message);
        return res.status(500).json({ message: error.message });
    }
}

const deleteProductByID = async (req, res) => {
    try {
        const { id } = req.params;

        const result = await productService.deleteProductByID(id);

        res.status(200).json(result)
    } catch (error) {
        console.error('Deleting product ERROR on controller: ', error.message);
        return res.status(500).json({ message: error.message });
    }
}

module.exports = {
    createNewProduct,
    getAllProducts,
    getByIDProduct,
    updateProduct,
    deleteProductByID
}