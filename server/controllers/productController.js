const uuid = require('uuid');
const path = require('path');
const ApiError = require('../error/ApiError');
const client = require('../connection');

class ProductController {
  async create(req, res, next) {
    const product = req.body;
    try {
      const {picture_url} = req.files ? req.files : ''
      let fileName = uuid.v4() + '.jpg';
      console.log(picture_url)
      if (picture_url) {
        picture_url.mv(path.resolve(__dirname, '..', 'static', fileName));
      } else {
        fileName = ''
      }
      const insertQuery = `insert into products (name, price, picture_url, id_brand, id_category)
                           values ($1, $2, $3, $4, $5);`;
      const values = [product.name, product.price, fileName, product.id_brand, product.id_category]
      await client.query(insertQuery, values)
      return res.json({message: `new product was inserted`});
    } catch (e) {
      next(ApiError.badRequest(e.message))
    }
  }

  async getAll(req, res) {
    let {brand, category, limit, page, sort} = req.query;
    page = page || 1;
    limit = limit || 20;
    let offset = page * limit - limit;

    switch (sort) {
      case 'brand':
        sort = 'brand_name';
        break;
      case 'category':
        sort = 'category_name';
        break;
      default:
        sort = 'name';
        break;
    }

    console.log(sort)

    if (!brand && !category) {
      const selectCount = `select count(*)
                           from products;`;

      const selectQueryPage = `select id_product,
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
                                        join categories c on c.id_category = p.id_category
                                        join brands b on b.id_brand = p.id_brand
                               order by ${sort}
                               limit $1 offset $2;`;
      const values = [limit, offset]
      try {
        const count = (await client.query(selectCount)).rows[0];
        const query = (await client.query(selectQueryPage, values)).rows;
        return res.json({...count, query});
      } catch (e) {
        console.log(e.message);
        return res.json({error: e.message})
      }
    }

    if (brand && !category) {
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
                                    join categories c on c.id_category = p.id_category
                                    join brands b on b.id_brand = p.id_brand
                           where b.id_brand = $1
                           order by name
                           limit $2 offset $3;`;
      const values = [brand, limit, offset]
      try {
        const query = (await client.query(selectQuery, values)).rows;
        console.log(query);
        return res.json(query);
      } catch (err) {
        console.log(err.message);
      }
    }
    if (!brand && category) {
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
                                    join categories c on c.id_category = p.id_category
                                    join brands b on b.id_brand = p.id_brand
                           where c.id_category = $1
                           order by name
                           limit $2 offset $3;`;
      const values = [category, limit, offset]
      try {
        const query = (await client.query(selectQuery, values)).rows;
        console.log(query);
        return res.json(query);
      } catch (err) {
        console.log(err.message);
      }
    }
    if (brand && category) {
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
                                    join categories c on c.id_category = p.id_category
                                    join brands b on b.id_brand = p.id_brand
                           where c.id_category = $1
                             and b.id_brand = $2
                           order by name
                           limit $3 offset $4;`;
      const values = [category, brand, limit, offset]
      try {
        const query = (await client.query(selectQuery, values)).rows;
        console.log(query);
        return res.json(query);
      } catch (e) {
        console.log(e.message);
      }
    }
  }

  async getOne(req, res) {
    const {id} = req.params
    const selectSizesQuery = `select *
                              from products_to_warehouses
                              where id_product = $1`;
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
                         where id_product = $1;`
    const values = [id]
    try {
      const sizes = (await client.query(selectSizesQuery, values)).rows
      const query = (await client.query(selectQuery, values)).rows[0];
      console.log(sizes);
      console.log(query);
      return res.json({sizes, query})
    } catch (e) {
      console.log(e.message);
    }
  }

  async delete(req, res) {
    const {id} = req.params;
    const deleteQuery = `delete
                         from products
                         where id_product = $1;`;
    const values = [id];
    try {
      await client.query(deleteQuery, values);
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
    if (picture_url) {
      picture_url.mv(path.resolve(__dirname, '..', 'static', fileName));
    } else {
      fileName = ''
    }
    const updateQuery = `update products
                         set name        = $2,
                             price       = $3,
                             picture_url = $4,
                             id_brand    = $5,
                             id_category = $6
                         where id_product = $1;`
    const values = [id, product.name, product.price, fileName, product.id_brand, product.id_category]
    try {
      client.query(updateQuery, values);
      return res.json({message: `product with id = ${id} was updated`});
    } catch (e) {
      console.log(e);
      return res.json({error: e.message});
    }
  }
}

module.exports = new ProductController()