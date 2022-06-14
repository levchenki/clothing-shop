import {createSlice} from '@reduxjs/toolkit';
import {TGetAllProducts, TSorting} from '../../types';
import {thunkGetAllProducts} from './thunks';

const initialState = {
  list: [] as TGetAllProducts[],
  page: 1,
  limit: 10,
  sorting: 'name' as TSorting,
  serverCount: 0,
  status: 'idle' as 'idle' | 'pending' | 'fulfilled' | 'rejected',
  error: null as null | string
}
export const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {},
  extraReducers: builder => builder
    .addCase(thunkGetAllProducts.fulfilled, (state, action) => {
      state.list = action.payload.response.query
      state.serverCount = action.payload.response.count
      state.limit = action.payload.args.limit
      state.page = action.payload.args.page
      state.sorting = action.payload.args.sorting
      state.status = 'fulfilled'
    })
    .addCase(thunkGetAllProducts.pending, (state) => {
      state.error = null
      state.status = 'pending'
    })
    .addCase(thunkGetAllProducts.rejected, (state, action) => {
      state.error = 'Поломалось...'
      state.status = 'rejected'
    })
})