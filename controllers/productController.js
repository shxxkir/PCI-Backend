const connection = require('../configs/db');

exports.create = async (req,res) => {
    if(!req.body){
        res.status(400).send({message: "Content cannot be empty!"});
        return;
    }

    const { p_id, p_name, cat, sup_id, price, qty }= req.body;

    query = `INSERT INTO Product VALUES ('${p_id}','${p_name}','${cat}','${sup_id}',${price},${qty})`
    
    connection.query(query, (err, results) => {
        if (err) {
            console.error('Error inserting product data:', err);
            res.status(500).send({ message: err.message || 'Error inserting product data' });
            return;
        } else {
            res.status(201).json({ message: "Product Details Added Successfully" });
        }
    })
}

exports.findAll = async (req,res) => {
    query = 'SELECT * FROM Product'

    connection.query(query, (err, results) => {
        if (err) {
            console.error('Error retrieving product data:', err);
            res.status(500).send({ message: err.message || 'Error retrieving product data' });
            return;
        } else {
        res.status(201).json(results);
        }
    })
}

exports.findOne = async (req,res) => {
    const id = req.params.id;
    query = `SELECT * FROM Product WHERE p_id = '${id}'`
    
    connection.query(query, (err, results) => {
        if (err) {
            console.error('Error retrieving product data:', err);
            res.status(500).send({ message: err.message || 'Error retrieving product data' });
            return;
        } else {
            if (results.length === 0) {
                res.status(404).json({ error: `Cannot retrieve product data with id = ${id}. Maybe id is incorrect` });
            } else {
                res.status(201).json(results);
            }
        }
    })
}

exports.update = async (req,res) => {
    const id = req.params.id;
    const { p_name, cat, sup_id, price, qty } = req.body;

    if(!req.body){
        return res
            .status(400)
            .send({ message : "Data to update can not be empty"})
    }

    query = 
        `UPDATE Product
        SET p_name = '${p_name}', cat = '${cat}', sup_id = '${sup_id}', price = ${price}, qty = ${qty}
        WHERE p_id = '${id}'`

    connection.query(query, (err, results) => {
        if (err) {
            console.error(err);
            res.status(500).json({ error: err.message || 'Error updating product data' });
        } else {
            if (results.affectedRows === 0) {
                res.status(404).json({ error: `Cannot update product data with id = ${id}. Maybe id is incorrect` });
            } else {
                res.status(201).json({ message: 'Product details updated successfully' });
            }
        }
    })
}

exports.delete = async (req,res) => {
    const id = req.params.id;
    query = `DELETE FROM Product WHERE p_id = '${id}'`

    connection.query(query, (err, results) => {
        if (err) {
            console.error(err);
            res.status(500).json({ error: err.message || 'Error deleting product data' });
        } else {
            if (results.affectedRows === 0) {
                res.status(404).json({ error: `Cannot delete product data with id = ${id}. Maybe id is incorrect` });
            } else {
                res.status(201).json({ message: 'Product details deleted successfully' });
            }
        }
    })
}