const connection = require('../configs/db');

exports.create = async (req,res) => {
    if(!req.body){
        res.status(400).send({message: "Content cannot be empty!"});
        return;
    }

    const { s_id, s_name, contact, email, address }= req.body;

    query = `INSERT INTO Supplier VALUES ('${s_id}','${s_name}',${contact},'${email}','${address}')`
    
    connection.query(query, (err, results) => {
        if (err) {
            console.error('Error inserting supplier data:', err);
            res.status(500).send({ message: err.message || 'Error inserting supplier data' });
            return;
        } else {
            res.status(201).json({ message: "Supplier Details Added Successfully" });
        }
    })
}

exports.findAll = async (req,res) => {
    query = 'SELECT * FROM Supplier'
    
    // results = await connection.promise().query(query)
    // console.log(results[0])
    // res.status(201).json(results[0])

    connection.query(query, (err, results) => {
        if (err) {
            console.error('Error retrieving supplier data:', err);
            res.status(500).send({ message: err.message || 'Error retrieving supplier data' });
            return;
        } else {
        res.status(201).json(results);
        }
    })
}

exports.findOne = async (req,res) => {
    const id = req.params.id;
    query = `SELECT * FROM Supplier WHERE s_id = '${id}'`
    
    connection.query(query, (err, results) => {
        if (err) {
            console.error('Error retrieving supplier data:', err);
            res.status(500).send({ message: err.message || 'Error retrieving supplier data' });
            return;
        } else {
            if (results.length === 0) {
                res.status(404).json({ error: `Cannot retrieve supplier data with id = ${id}. Maybe id is incorrect` });
            } else {
                res.status(201).json(results);
            }
        }
    })
}

exports.update = async (req,res) => {
    const id = req.params.id;
    const { s_name, contact, email, address }= req.body;

    if(!req.body){
        return res
            .status(400)
            .send({ message : "Data to update can not be empty"})
    }

    query = 
        `UPDATE Supplier
        SET s_name = '${s_name}', contact = ${contact}, email = '${email}', address = '${address}'
        WHERE s_id = '${id}'`

    connection.query(query, (err, results) => {
        if (err) {
            console.error(err);
            res.status(500).json({ error: err.message || 'Error updating supplier data' });
        } else {
            if (results.affectedRows === 0) {
                res.status(404).json({ error: `Cannot update supplier data with id = ${id}. Maybe id is incorrect` });
            } else {
                res.status(201).json({ message: 'Supplier details updated successfully' });
            }
        }
    })
}

exports.delete = async (req,res) => {
    const id = req.params.id;
    query = `DELETE FROM Supplier WHERE s_id = '${id}'`

    connection.query(query, (err, results) => {
        if (err) {
            console.error(err);
            res.status(500).json({ error: err.message || 'Error deleting supplier data' });
        } else {
            if (results.affectedRows === 0) {
                res.status(404).json({ error: `Cannot delete supplier data with id = ${id}. Maybe id is incorrect` });
            } else {
                res.status(201).json({ message: 'Supplier details deleted successfully' });
            }
        }
    })
}