export type TProduct = {
  id_product: number;
  name: string;
  price: number;
  picture_url?: string;
  id_brand: number;
  id_category: number;
}

// Get запрос для множества товаров
export type TGetAllProducts = {
  id_product: number;
  name: string;
  price: number;
  picture_url: string;
  brand_name: string;
  brand_country: string;
  year_of_creation: Date;
  category_name: string;
  id_brand: number;
  id_category: number;
}
export type TGetAllCountProducts = {
  count: number;
  query: TGetAllProducts[];
}

// Get запрос для одного товара
type TSize = {
  id_warehouse: number;
  count: number;
  size: string;
}
export type TGetOneProduct = {
  id_product: number;
  name: string;
  price: number;
  picture_url?: string;
  brand_name: string;
  brand_country: string;
  year_of_creation: Date;
  category_name: string;
  id_brand: number;
  id_category: number;
}
export type TGetOneCountProduct = {
  sizes: TSize[];
  query: TGetOneProduct;
}

// Тип для бренда
export type TBrand = {
  id_brand: number;
  name: string;
  country: string;
  year_of_creation: Date | string;
}

// Тип для категории
export type TCategory = {
  id_category: number;
  name: string;
}

export type TEmployee = {
  id_user: number;
  name: string;
  position: string;
  wage: number;
}

export type TSorting = 'name' | 'brand' | 'category'

export type TProductItem = {
  id_product: number;
  name: string;
  price: number;
  img?: string;
  brandName: string;
  categoryName: string;
}
