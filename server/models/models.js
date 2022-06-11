class Brand {
  id_brand;
  name;
  country;
  yearOfCreation;
}

class Category {
  id_category;
  name;
}

class Discount {
  id_discount;
  value;
  dateStart;
  dateEnd;
}

class DiscountsToBrands {
  id_discount;
  id_brand;
}

class DiscountsToCategories {
  id_discount;
  id_category;
}

class DiscountsToProducts {
  id_discount;
  id_product;
}

class User {
  id_user;
  name;
  lastname;
  patronymic;
  email;
  password;
  phoneNumber;
}

class Employees {
  id_user;
  id_position;
}

class Position {
  id_position;
  name;
  wage;
}

class Product {
  id_product;
  name;
  price;
  pictureUrl;
  id_brand;
  id_category;
}

class Warehouse {
  id_warehouse;
  address;
}

class ProductsToWarehouses {
  id_product;
  id_warehouse;
  count;
  size;
}

class Purchaser {
  id_user;
}

class Order {
  id_order;
  date;
  address;
  id_user;
}

class ProductsToOrders {
  id_product;
  id_order;
  count;
  size;
}

class Evaluation {
  id_evaluation;
  rating;
  comment;
  id_product;
  id_user;
}

module.exports = {
  Brand, Category, Discount, DiscountsToBrands, DiscountsToCategories, DiscountsToProducts, User, Employees, Position, Product, Warehouse, ProductsToWarehouses, Purchaser, Order, ProductsToOrders, Evaluation
}