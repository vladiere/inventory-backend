const { Connect, Query } = require('../configs/mysql.config');

const createNewProduct = async (product) => {
    try {
        let query = `INSERT INTO product (name, qty, price, descrip) VALUES ('${product.name}', '${product.qty}', '${product.price}', '${product.desc}');`;
        
        const connection = await Connect();
        const result = await Query(connection, query);
        
        return result;
    } catch (error) {
        console.error('Error in creating new Product: ', error.message);
    }
}

const getAllProducts = async () => {
    try {
        let query = 'SELECT * FROM product;';

        const connection = await Connect();
        const result = await Query(connection, query);

        return result;
    } catch (error) {
        console.error('Error in getting all the Products: ', error.message);
    }
}

const getByIDProduct = async (productID) => {
    try {
        let query = `SELECT * FROM product WHERE id = ${productID}`;

        const connection = await Connect();
        const result = await Query(connection, query);

        return result;
    } catch (error) {
        console.error('Error in getting a single Product: ', error.message);
    }
}

const updateProduct = async (product, id) => {
    try {
        let query = `UPDATE product SET name = '${product.name}', qty = '${product.qty}', price = '${product.price}', descrip = '${product.desc}' WHERE id = '${id}'`;

        const connection = await Connect();
        const result = await Query(connection, query);

        if (result.affectedRows === 0) {
            return { message: 'Product not found' };
        }

        return { message: 'Product updated successfully' };
    } catch (error) {
        console.error('Error upon updating Product: ', error.message);
    }
}

const deleteProductByID = async (productID) => {
    try {
        let query = `DELETE FROM product WHERE id = ${productID}`;

        const connection = await Connect();
        const result = await Query(connection, query);

        if (result.affectedRows === 0) {
            return { message: 'Product not found'};
        }

        return { message: 'Product deleted successfully' };
    } catch (error) {
        console.error('Error on deleting Product: ', error.message);
    }
}

module.exports = { createNewProduct, getAllProducts, getByIDProduct, updateProduct, deleteProductByID };