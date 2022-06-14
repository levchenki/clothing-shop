const client = require('../connection')

class BrandController {
  async create(req, res) {
    const brand = req.body;
    const insertQuery = `insert into brands (name, country, year_of_creation)
                         values ($1, $2, $3);`;
    const values = [brand.name, brand.country, brand.year_of_creation]
    try {
      await client.query(insertQuery, values)
      return res.json({message: `brand was inserted`});
    } catch (e) {
      console.log(e.message);
    }
  }

  async getAll(req, res) {
    let selectQuery = `select *
                       from brands
                       order by name;`;
    try {
      const query = (await client.query(selectQuery)).rows
      return res.json(query);
    } catch (e) {
      console.log(e.message);
    }
  }

  async delete(req, res) {
    const {id_brand} = req.body;
    const deleteQuery = `delete
                         from brands
                         where id_brand = $1;`;
    const values = [id_brand]
    try {
      await client.query(deleteQuery, values)
      return res.json({message: `brand with id = ${id_brand} was deleted`});
    } catch (e) {
      console.log(e.message);
    }
  }

  async update(req, res) {
    const brand = req.body;
    const updateQuery = `update brands
                         set name             = $2,
                             country          = $3,
                             year_of_creation = $4
                         where id_brand = $1;`;
    const values = [brand.id, brand.name, brand.country, brand.year_of_creation]
    try {
      await client.query(updateQuery, values);
      return res.json({message: `category with id = ${brand.id} was updated`})
    } catch (e) {
      console.log(e)
      return res.json({error: e.message});
    }
  }
}

module.exports = new BrandController()