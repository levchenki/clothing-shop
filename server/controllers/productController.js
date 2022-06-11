const uuid = require('uuid');
const path = require('path');
const ApiError = require('../error/ApiError');
const client = require('../connection');

class ProductController {
  async create(req, res, next) {
    try {
      const product = req.body;

      const {picture_url} = req.files ? req.files : ''

      let fileName = uuid.v4() + '.jpg';
      console.log(picture_url)
      if (picture_url){
        picture_url.mv(path.resolve(__dirname, '..', 'static', fileName));
      } else {
        fileName = ''
      }

      let insertQuery = `insert into products (name, price, picture_url, id_brand, id_category)
                         values (\'${product.name}\', ${product.price}, \'${fileName}\', ${product.id_brand},
                                 ${product.id_category})
                         returning (id_product, name, price, picture_url, id_brand, id_category);`;
      await client.query(insertQuery, (err, result) => {
        if (!err) {
          res.send(result.rows);
        } else {
          console.log(err.message);
        }
      })
    } catch (e) {
      next(ApiError.badRequest(e.message))
    }

  }

  async getAll(req, res, next) {
    let {brand, category, limit, page} = req.query;
    page = page || 1;
    limit = limit || 20;
    let offset = page * limit - limit;
    if (!brand && !category) {


      const selectCount = `select count(*)
                           from products;`;

      const selectQueryPage = `select id_product, name, price, picture_url, id_brand, id_category
                               from products
                               order by id_product
                               limit ${limit} offset ${offset};`;


      try {
        const count = (await client.query(selectCount)).rows[0];
        const query = (await client.query(selectQueryPage)).rows;
        console.log(count);
        console.log(query);
        return res.json({...count, query});
      } catch (err) {
        console.log(err.message);
      }
    }
    if (brand && !category) {
      const selectQuery = `select *
                           from products
                           where id_brand = ${brand};`;
      try {
        const query = (await client.query(selectQuery)).rows;
        console.log(query);
        return res.json(query);
      } catch (err) {
        console.log(err.message);
      }
    }
    if (!brand && category) {
      const selectQuery = `select *
                           from products
                           where id_category = ${category};`;
      try {
        const query = (await client.query(selectQuery)).rows;
        console.log(query);
        return res.json(query);
      } catch (err) {
        console.log(err.message);
      }
    }
    if (brand && category) {
      const selectQuery = `select *
                           from products
                           where id_brand = ${brand}
                             and id_category = ${category};`;
      try {
        const query = (await client.query(selectQuery)).rows;
        console.log(query);
        return res.json(query);
      } catch (err) {
        console.log(err.message);
      }
    }
  }

  async getOne(req, res) {
    const {id} = req.params
    const selectQuery = `select id_product,
                                p.name  as name,
                                price,
                                picture_url,
                                b.name  as brand_name,
                                country as brand_country,
                                year_of_creation,
                                c.name  as category_name,
                                b.id_brand,
                                c.id_category
                         from products p
                                  join brands b on b.id_brand = p.id_brand
                                  join categories c on c.id_category = p.id_category
                         where id_product = ${id};`
    try {
      const query = (await client.query(selectQuery)).rows[0];
      console.log(query);
      return res.json(query)
    } catch (err) {
      console.log(err.message);
    }
  }

  async delete(req, res) {
    const {id} = req.params;
    const deleteQuery = `delete
                         from products
                         where id_product = ${id};`;
    try {
      await client.query(deleteQuery);
      return res.json({message: `Product with id = ${id} was deleted`});
    } catch (e) {
      console.log(e);
    }
  }

  async update(req, res) {
    const {id} = req.params;
    const product = req.body;
    const {picture_url} = req.files ? req.files : ''

    let fileName = uuid.v4() + '.jpg';
    console.log(picture_url)
    if (picture_url){
      picture_url.mv(path.resolve(__dirname, '..', 'static', fileName));
    } else {
      fileName = ''
    }



    const updateQuery = `update products
                         set name        = \'${product.name}\',
                             price       = \'${product.price}\',
                             picture_url = \'${fileName}\',
                             id_brand    = \'${product.id_brand}\',
                             id_category = \'${product.id_category}\'
                         where id_product = ${id};`
    try {
      client.query(updateQuery);
      return res.json({message: `product with id = ${id} was updated`});
    } catch (e) {
      console.log(e);
      return res.json({error: e.message});
    }
  }
}

module.exports = new ProductController()