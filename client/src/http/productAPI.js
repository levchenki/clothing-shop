import {$authHost, $host} from './index';


//Категории
export const getCategories = async () => {
  const {data} = await $host.get('api/category')
  return data;
}

export const createCategory = async (category) => {
  const {data} = await $authHost.post('api/category', category)
  return data;
}

export const deleteCategory = async (category) => {

}

export const updateCategory = async (category) => {

}

// Бренды
export const getBrands = async () => {
  const {data} = await $host.get('api/brand');
  return data;
}

export const createBrand = async (brand) => {
  const {data} = await $authHost.post('api/brand', brand)
  return data
}

export const deleteBrand = async (brand) => {

}

export const updateBrand = async (brand) => {

}

//Товары
export const getProducts = async () => {
  const {data} = await $host.get('api/product')
  return data;
}
// export const getProducts = async (id_category, id_brand, page, limit) => {
//   const {data} = await $host.get('api/product', {
//     params: {
//       id_category, id_brand, page, limit
//     }
//   })
//   return data;
// }

export const getOneProduct = async (id) => {
  const {data} = await $host.get('api/product/' + id);
  console.log(data)
  return data
}

export const deleteOneProduct = async (id) => {
  await $authHost.delete('api/product/' + id);
}

export const updateOneProduct = async (id, product) => {
  await $authHost.put('api/product/' + id, product)
}

export const createOneProduct = async (product) => {
  await $authHost.post('api/product', product);
}