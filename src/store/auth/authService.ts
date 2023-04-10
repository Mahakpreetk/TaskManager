import { createAsyncThunk } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
import { User, UserCredentials } from "src/models/user";
import axios from '../axios';
import { setUser } from "./authSlice";

export const createUserAccount = createAsyncThunk(
  'auth/createAccount',
  async (user: User, { fulfillWithValue, rejectWithValue, dispatch }) => {
    try {
      const { data } = await axios.post('/users', user);
      return fulfillWithValue(data);
    } catch (err) {
      const error = err as AxiosError;
      return rejectWithValue(error.response?.data);
    }
  }
);

export const getUsers = createAsyncThunk(
  'auth/getUsers',
  async (_, { fulfillWithValue, rejectWithValue, dispatch }) => {
    try {
      const { data } = await axios.get('/users');
      return fulfillWithValue(data);
    } catch (err) {
      const error = err as AxiosError;
      return rejectWithValue(error.response?.data);
    }
  }
);

export const updateUserAccount = createAsyncThunk(
  'auth/updateUserAccount',
  async (user: User, { fulfillWithValue, rejectWithValue, dispatch }) => {
    try {
      const { data } = await axios.put(`/users/${user._id}`, user);
      dispatch(setUser(data));
      return fulfillWithValue(data);
    } catch (err) {
      const error = err as AxiosError;
      return rejectWithValue(error.response?.data);
    }
  }
);

export const deleteUserAccount = createAsyncThunk(
  'auth/deleteUserAccount',
  async (id: string, { fulfillWithValue, rejectWithValue, dispatch }) => {
    try {
      const { data } = await axios.delete(`/users/${id}`);
      return fulfillWithValue(data);
    } catch (err) {
      const error = err as AxiosError;
      return rejectWithValue(error.response?.data);
    }
  }
);

export const userPasswordReset = createAsyncThunk(
  'auth/userPasswordReset',
  async (credentials: UserCredentials, { fulfillWithValue, rejectWithValue }) => {
    try {
      const { data } = await axios.patch('/users/change-password', credentials);
      return fulfillWithValue(data);
    } catch (err) {
      const error = err as AxiosError;
      return rejectWithValue(error.response?.data);
    }
  }
);

export const userLogin = createAsyncThunk(
  'auth/login',
  async (credentials: UserCredentials, { fulfillWithValue, rejectWithValue, dispatch }) => {
    try {
      const { data } = await axios.post('/users/login', credentials);
      dispatch(setUser(data));
      return fulfillWithValue(data);
    } catch (err) {
      const error = err as AxiosError;
      return rejectWithValue(error.response?.data);
    }
  }
);

export const userLogout = createAsyncThunk(
  'auth/logout',
  async (_, { fulfillWithValue, rejectWithValue }) => {
    try {

    } catch (error) {
      return rejectWithValue({ error });
    }
  }
);

