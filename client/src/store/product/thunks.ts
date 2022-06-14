import {createAsyncThunk} from '@reduxjs/toolkit';
import {TGetAllCountProducts, TSorting} from '../../types';
import {TAppAsyncThunkConfig} from '../store';

type thunkGetAllProductsArgs = { page: number, limit: number, sorting: TSorting }
type thunkGetAllProductsReturn = {
  response: TGetAllCountProducts,
  args: thunkGetAllProductsArgs
}

export const thunkGetAllProducts = createAsyncThunk<thunkGetAllProductsReturn, thunkGetAllProductsArgs, TAppAsyncThunkConfig>('product/getAll',
  async (args, {extra: api}) => ({
    response: (await api.product.getAll(args.page, args.limit, args.sorting)).data,
    args
  }))