import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { supabase } from "../../utils/supabase";

const initleState = {
  productsData: [],
  isLoading: false,
  errors: null,
  allCategorys: [],
  filteredProducts: [],
};

const GetAllProducts = createAsyncThunk("get-all-poducts", async () => {
  try {
    const { data, error: errors } = await supabase.from("products").select("*");
    if (errors) {
      throw errors;
    }
    return data;
  } catch (error) {
    console.log("Error fetching products:", error);
    throw error;
  }
});
const GetAllCategroies = createAsyncThunk("get-all-Gategpries", async () => {
  try {
    const { data, error: errors } = await supabase
      .from("categories")
      .select("*");
    if (errors) {
      throw errors;
    }
    return data;
  } catch (error) {
    console.log("Error fetching products:", error);
    throw error;
  }
});
const GetProductsByCategory = createAsyncThunk(
  "get-poducts-by-category",
  async (CategoryId) => {
    try {
      const { data, error: errors } = await supabase.rpc(
        "get_products_by_category",
        { category_id_param: CategoryId }
      );
      if (errors) {
        throw errors;
      }
      return data;
    } catch (error) {
      console.log("Error fetching products by category:", error);
      throw error;
    }
  }
);

const GetAllProductsSlice = createSlice({
  name: "get-all-products",
  initialState: initleState,
  extraReducers: (builder) => {
    builder
      .addCase(GetAllProducts.pending, (state) => {
        state.isLoading = true;
        state.errors = null;
      })
      .addCase(GetAllProducts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.productsData = action.payload;
      })
      .addCase(GetAllProducts.rejected, (state, action) => {
        state.isLoading = false;
        state.errors = action.payload;
      });
    builder.addCase(GetAllCategroies.fulfilled, (state, action) => {
      state.allCategorys = action.payload;
    });
    builder.addCase(GetProductsByCategory.fulfilled, (state, action) => {
      state.filteredProducts = action.payload;
    });
  },
});

const GetAllProductsReducer = GetAllProductsSlice.reducer;
export {
  GetAllProducts,
  GetAllProductsReducer,
  GetAllCategroies,
  GetProductsByCategory,
};
