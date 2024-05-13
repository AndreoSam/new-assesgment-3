import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { all_user, api_limit, api_sort, base_url, base_url_2, create_url, delete_url, forget_url, login_url, profile_url, register_url, single_url, update_url, updateprod_url, view_url } from "../../../api/api";

let reg_url = base_url + register_url;
let log_url = base_url + login_url;
let prod_url = base_url + view_url;
let singleProduct_url = base_url + single_url;
let createProduct_url = base_url + create_url;
let updateProduct_url = base_url + updateprod_url;
let deleteProduct_url = base_url + delete_url;
let UserProfile_url = base_url + profile_url;
let updatePassword_url = base_url + update_url;
let forgetPassword_url = base_url + forget_url;

const api_url = base_url_2 + all_user;
const limit_url = base_url_2 + api_limit;
const sort_url = base_url_2 + api_sort;

//registration
export const registerUser = createAsyncThunk("post/registerUser", async ({ data }) => {
    const res = await axios.post(`${reg_url}`, data);
    // console.log("Registration Slice: ", res.data);
    return res?.data
})

//login
export const loginUser = createAsyncThunk("post/loginUser", async ({ data }) => {
    const res = await axios.post(log_url, data);
    console.log("login Slice:", res.data);
    window.localStorage.setItem("token", res.data.token);
    return res?.data
})

//profile
export const userProfile = createAsyncThunk("get/userProfile", async () => {
    let res = await axios.get(`${UserProfile_url}`, {
        headers: {
            'x-access-token': window.localStorage.getItem('token')
        }
    })
    return res?.data
})

//forget password
export const forgotUser = createAsyncThunk("post/forgotUser", async ({ data }) => {
    const res = await axios.post(forgetPassword_url, data);
    // console.log("login Slice:", res.data);
    window.localStorage.setItem("token", res.data.token);
    return res?.data
})

//logout
export const logoutUser = createAsyncThunk("logoutUser", async () => {
    window.localStorage.removeItem('token')
    return null
})

//Update password
export const updateUser = createAsyncThunk("get/updateUser", async ({ data }) => {
    let res = await axios.post(updatePassword_url, data, {
        headers: {
            'x-access-token': window.localStorage.getItem('token')
        }
    })
    return res?.data
})

//view products
export const viewProducts = createAsyncThunk("get/viewProducts", async () => {
    let res = await axios.get(prod_url, {
        headers: {
            'x-access-token': window.localStorage.getItem('token')
        }
    })
    // console.log('axios response for crud view:', res.data.data);
    return res?.data
})

//create products
export const createProducts = createAsyncThunk("get/createProducts", async (formData) => {
    let res = await axios.post(createProduct_url, formData, {
        headers: {
            'x-access-token': window.localStorage.getItem('token')
        }
    })
    return res?.data
})

//update products
export const updateProducts = createAsyncThunk("get/updateProducts", async ({ id, prod }) => {
    let res = await axios.post(`${updateProduct_url}/${id}`, prod, {
        headers: {
            'x-access-token': window.localStorage.getItem('token')
        }
    })
    console.log("Response:", res);
    return res?.data
})

//delete products
export const deleteProducts = createAsyncThunk("get/deleteProducts", async (id) => {
    let res = await axios.delete(`${deleteProduct_url}/${id}`, {
        headers: {
            'x-access-token': window.localStorage.getItem('token')
        }
    })
    return res?.data
})

//single products
export const singleProducts = createAsyncThunk("get/singleProducts", async (id) => {
    let res = await axios.get(`${singleProduct_url}/${id}`, {
        headers: {
            'x-access-token': window.localStorage.getItem('token')
        }
    })
    return res?.data
})


export const fetchUser = createAsyncThunk('view/fetchUser', async () => {
    let res = await axios.get(api_url)
    // console.log('axios response for all user data:',res.data);
    return res?.data
})

export const fetchSingle = createAsyncThunk('single/fetchSingle', async (sid) => {
    let res = await axios.get(`${api_url}/${sid}`)
    // console.log('axios response for all single user data:',res.data);
    return res?.data
})

export const fetchSort = createAsyncThunk('sort/fetchSort', async (sid) => {
    let res = await axios.get(sort_url)
    // console.log('axios response for all single user data:',res.data);
    return res?.data
})

export const fetchLimit = createAsyncThunk('limit/fetchLimit', async (sid) => {
    let res = await axios.get(limit_url)
    // console.log('axios response for all single user data:',res.data);
    return res?.data
})

const initialValues = {
    userData: [],
    loading: false,
    error: null,
};

export const mediaSlice = createSlice({
    name: "slice",
    initialState: initialValues,

    extraReducers: (builder) => {
        //Registration
        builder.addCase(registerUser.pending, (state, action) => {
            state.loading = true;
        });
        builder.addCase(registerUser.fulfilled, (state, action) => {
            state.loading = false;
            state.userData = action.payload;
            state.error = null;
            // console.log("Fulfilled action: ", action.payload);
        });
        builder.addCase(registerUser.rejected, (state, action) => {
            state.loading = false;
            state.userData = [];
            state.error = action.error.message;
            // console.log("Rejected action: ", action.error);
        });

        //Login
        builder.addCase(loginUser.pending, (state, action) => {
            state.loading = true;
        });
        builder.addCase(loginUser.fulfilled, (state, action) => {
            state.loading = false;
            state.userData = action.payload;
            state.error = null;
            // console.log("Fulfilled action: ", action.payload);
        });
        builder.addCase(loginUser.rejected, (state, action) => {
            state.loading = false;
            state.userData = [];
            state.error = action.error.message;
            console.log("Rejected action: ", action);
        });

        //Profile page
        builder.addCase(userProfile.pending, (state, action) => {
            state.loading = true;
        });
        builder.addCase(userProfile.fulfilled, (state, action) => {
            state.loading = false;
            state.userData = action.payload;
            state.error = null;
            // console.log("Fulfilled action: ", action.payload);
        });
        builder.addCase(userProfile.rejected, (state, action) => {
            state.loading = false;
            state.userData = [];
            state.error = action.error.message;
            console.log("Rejected action: ", action);
        });

        //Update Password
        builder.addCase(updateUser.pending, (state, action) => {
            state.loading = true;
        });
        builder.addCase(updateUser.fulfilled, (state, action) => {
            state.loading = false;
            state.userData = action.payload;
            state.error = null;
            // console.log("Fulfilled action: ", action.payload);
        });
        builder.addCase(updateUser.rejected, (state, action) => {
            state.loading = false;
            state.userData = [];
            state.error = action.error.message;
            console.log("Rejected action: ", action);
        });

        //Forget Password
        builder.addCase(forgotUser.pending, (state, action) => {
            state.loading = true;
        });
        builder.addCase(forgotUser.fulfilled, (state, action) => {
            state.loading = false;
            state.userData = action.payload;
            state.error = null;
            // console.log("Fulfilled action: ", action.payload);
        });
        builder.addCase(forgotUser.rejected, (state, action) => {
            state.loading = false;
            state.userData = [];
            state.error = action.error.message;
            console.log("Rejected action: ", action);
        });

        //Logout User
        builder.addCase(logoutUser.pending, (state, action) => {
            state.loading = true;
        });
        builder.addCase(logoutUser.fulfilled, (state, action) => {
            state.loading = false;
            state.userData = action.payload;
            state.error = null;
            // console.log("Fulfilled action: ", action.payload);
        });
        builder.addCase(logoutUser.rejected, (state, action) => {
            state.loading = false;
            state.userData = [];
            state.error = action.error.message;
            console.log("Rejected action: ", action);
        });

        //View products
        builder.addCase(viewProducts.pending, (state, action) => {
            state.loading = true;
        });
        builder.addCase(viewProducts.fulfilled, (state, action) => {
            state.loading = false;
            state.userData = action.payload;
            state.error = null;
            // console.log("Fulfilled action: ", action.payload);
        });
        builder.addCase(viewProducts.rejected, (state, action) => {
            state.loading = false;
            state.userData = [];
            state.error = action.error.message;
            console.log("Rejected action: ", action);
        });

        //create products
        builder.addCase(createProducts.pending, (state, action) => {
            state.loading = true;
        });
        builder.addCase(createProducts.fulfilled, (state, action) => {
            state.loading = false;
            state.userData = action.payload;
            state.error = null;
            // console.log("Fulfilled action: ", action.payload);
        });
        builder.addCase(createProducts.rejected, (state, action) => {
            state.loading = false;
            state.userData = [];
            state.error = action.error.message;
            console.log("Rejected action: ", action);
        });

        //delete products
        builder.addCase(deleteProducts.pending, (state, action) => {
            state.loading = true;
        });
        builder.addCase(deleteProducts.fulfilled, (state, action) => {
            state.loading = false;
            state.userData = action.payload;
            state.error = null;
            // console.log("Fulfilled action: ", action.payload);
        });
        builder.addCase(deleteProducts.rejected, (state, action) => {
            state.loading = false;
            state.userData = [];
            state.error = action.error.message;
            console.log("Rejected action: ", action);
        });

        //single products
        builder.addCase(singleProducts.pending, (state, action) => {
            state.loading = true;
        });
        builder.addCase(singleProducts.fulfilled, (state, action) => {
            state.loading = false;
            state.userData = action.payload;
            state.error = null;
            // console.log("Fulfilled action: ", action.payload);
        });
        builder.addCase(singleProducts.rejected, (state, action) => {
            state.loading = false;
            state.userData = [];
            state.error = action.error.message;
            console.log("Rejected action: ", action);
        });


        //all user
        builder.addCase(fetchUser.pending, (state, action) => {
            state.isLoading = true;
        })
        builder.addCase(fetchUser.fulfilled, (state, action) => {
            state.isLoading = false;
            state.userData = action.payload;
            state.err = null;
        })
        builder.addCase(fetchUser.rejected, (state, action) => {
            state.isLoading = false;
            state.userData = [];
            state.err = action.error.message;
            // console.log("Rejected action: ", action);
        })

        //all single
        builder.addCase(fetchSingle.pending, (state, action) => {
            state.isLoading = true;
        })
        builder.addCase(fetchSingle.fulfilled, (state, action) => {
            state.isLoading = false;
            state.userData = action.payload;
            state.err = null;
        })
        builder.addCase(fetchSingle.rejected, (state, action) => {
            state.isLoading = false;
            state.userData = [];
            state.err = action.error.message;
            // console.log("Rejected action: ", action);
        })

        //all sort
        builder.addCase(fetchSort.pending, (state, action) => {
            state.isLoading = true;
        })
        builder.addCase(fetchSort.fulfilled, (state, action) => {
            state.isLoading = false;
            state.userData = action.payload;
            state.err = null;
        })
        builder.addCase(fetchSort.rejected, (state, action) => {
            state.isLoading = false;
            state.userData = [];
            state.err = action.error.message;
            // console.log("Rejected action: ", action);
        })

        //limit
        builder.addCase(fetchLimit.pending, (state, action) => {
            state.isLoading = true;
        })
        builder.addCase(fetchLimit.fulfilled, (state, action) => {
            state.isLoading = false;
            state.userData = action.payload;
            state.err = null;
        })
        builder.addCase(fetchLimit.rejected, (state, action) => {
            state.isLoading = false;
            state.userData = [];
            state.err = action.error.message;
            // console.log("Rejected action: ", action);
        })
    }
})

export default mediaSlice.reducer;