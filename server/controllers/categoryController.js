const client = require('../connection')

class CategoryController {
  async create(req, res) {
    const category = req.body;
    let insertQuery = `insert into categories (name)
                       values ($1);`;
    const values = [category.name];
    try {
      await client.query(insertQuery, values);
      return res.json({message: `category was inserted`});

    } catch (e) {
      console.log(e)
      return res.json({error: e.message})
    }
  }

  async getAll(req, res) {
    let selectQuery = `select *
                       from categories
                       order by name;`;
    try {
      const categories = (await client.query(selectQuery)).rows;
      return res.json(categories);
    } catch (e) {
      console.log(e)
      return res.json({error: e.message})
    }
  }

  async delete(req, res) {
    const {id_category} = req.body;
    const deleteQuery = `delete
                         from categories
                         where id_category = $1;`;
    const values = [id_category];
    try {
      await client.query(deleteQuery, values);
      return res.json({message: `Category with id = ${id_category} was deleted`})
    } catch (e) {
      console.log(e.message)
      return res.json({error: e.message});
    }
  }

  async update(req, res) {
    const category = req.body;
    const updateQuery = `update categories
                         set name = $2
                         where id_category = $1;`;
    const values = [category.id, category.name]
    try {
      await client.query(updateQuery, values);
      return res.json({message: `category with id = ${category.id} was updated`});
    } catch (e) {
      console.log(e)
      return res.json({error: e.message});
    }
  }
}

module.exports = new CategoryController()