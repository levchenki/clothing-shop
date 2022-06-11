const client = require('../connection')

class BrandController {
  async create(req, res) {
    const brand = req.body;
    console.log(brand)
    // Генерируем запрос для отправки в базу данных (можно сделать returning)
    let insertQuery = `insert into brands (name, country, year_of_creation)
                       values (\'${brand.name}\', \'${brand.country}\', \'${brand.year_of_creation}\');`;

    await client.query(insertQuery, (err, result) => {
      if (!err) {
        res.send(result.rows);
      } else {
        console.log(err.message);
      }
    })
  }

  async getAll(req, res) {
    let insertQuery = `select *
                       from brands;`;
    await client.query(insertQuery, (err, result) => {
      if (!err) {
        res.send(result.rows);
      } else {
        console.log(err.message);
      }
    })
  }

  async delete(req, res) {
    const {id} = req.body;
    const deleteQuery = `delete
                         from brands
                         where id_brand = ${id};`;
    try {
      await client.query(deleteQuery);
      return res.json({message: `Brand with id = ${id} was deleted`});
    } catch (e) {
      console.log(e);
      return res.json({error: e.message});
    }
  }

  async update(req, res) {
    // const {id} = req.params;
    const brand = req.body;
    const updateQuery = `update brands
                         set name             = \'${brand.name}\',
                             country          = \'${brand.country}\',
                             year_of_creation = \'${brand.year_of_creation}\'
                         where id_brand = ${brand.id};`;
    try {
      const brand = client.query(updateQuery);
      return res.json({message: `brand with id = ${brand.id} was updated`});
    } catch (e) {
      console.log(e)
      return res.json({error: e.message})
    }
  }
}

module.exports = new BrandController()