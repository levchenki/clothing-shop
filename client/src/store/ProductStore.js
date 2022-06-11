import {makeAutoObservable} from 'mobx';

export default class ProductStore {
  constructor() {
    this._categories = []
    this._brands = []
    this._products = []
    this._selectedCategory = {}
    this._selectedBrand = {}
    makeAutoObservable(this);
  }

  setCategories(categories) {
    this._categories = categories;
  }

  setBrands(brands) {
    this._brands = brands;
  }

  setProducts(products) {
    this._products = products;
  }

  setSelectedCategory(category) {
    this._selectedCategory = category;
  }

  setSelectedBrand(brand) {
    this._selectedCategory = brand;
  }

  get categories() {
    return this._categories;
  }

  get brands() {
    return this._brands;
  }

  get products() {
    return this._products;
  }

  get selectedCategory() {
    return this._selectedCategory;
  }
  get selectedBrand() {
    return this._selectedBrand;
  }
}