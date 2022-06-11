const {Category} = require('../models/models')
const ApiError = require('../error/ApiError')
const client = require('../connection')

class CategoryController {
  async create(req, res) {
    const category = req.body;
    let insertQuery = `insert into categories (name)
                       values (\'${category.name}\');`;

    await client.query(insertQuery, (err, result) => {
      if (!err) {
        res.send('Insertion was successful');
      } else {
        console.log(err.message);
      }
    })
  }

  async getAll(req, res) {
    let insertQuery = `select *
                       from categories;`;
    await client.query(insertQuery, (err, result) => {
      if (!err) {
        res.send(result.rows);
      } else {
        console.log(err.message)
      }
    })
  }

  async delete(req, res) {
    const {id} = req.body;
    const deleteQuery = `delete
                         from categories
                         where id_category = ${id}`;
    try {
      await client.query(deleteQuery);
      return res.json({message: `Category with id = ${id} was deleted`})
    } catch (e) {
      console.log(e.message)
      return res.json({error: e.message});
    }
  }

  async update(req, res) {
    // const {id} = req.params;
    const category = req.body;
    const updateQuery = `update categories
                         set name = \'${category.name}\'
                         where id_category = ${category.id};`
    try{
      client.query(updateQuery);
      return res.json({message: `category with id = ${category.id} was updated`})
    } catch (e) {
      console.log(e)
      return res.json({error: e.message});
    }
  }
}

module.exports = new CategoryController()