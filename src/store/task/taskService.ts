import { createAsyncThunk } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
import { Task, TaskStatus } from "src/models/task";
import axios from '../axios';


export const addTask = createAsyncThunk(
  'task/addTask',
  async (task: Task, { fulfillWithValue, rejectWithValue }) => {
    try {
      const { data } = await axios.post('/tasks', task);
      return fulfillWithValue(data);
    } catch (err) {
      const error = err as AxiosError;
      return rejectWithValue(error.response?.data);
    }
  }
);

export const getAllTasks = createAsyncThunk(
  'task/getAllTasks', async (status: TaskStatus, { fulfillWithValue, rejectWithValue }) => {
    try {
      const { data } = await axios.get(`/tasks/${status}`);
      return fulfillWithValue(data);
    } catch (err) {
      const error = err as AxiosError;
      return rejectWithValue(error.response?.data);
    }
  }
);

export const updateTaskById = createAsyncThunk(
  'task/updateTaskById', async (task: Task, { fulfillWithValue, rejectWithValue }) => {
    try {
      const { data } = await axios.put(`/tasks/${task._id}`, task);
      return fulfillWithValue(data);
    } catch (err) {
      const error = err as AxiosError;
      return rejectWithValue(error.response?.data);
    }
  }
);

export const deleteTaskById = createAsyncThunk(
  'task/deleteTaskById', async (id: string, { fulfillWithValue, rejectWithValue }) => {
    try {
      const { data } = await axios.delete(`/tasks/${id}`);
      return fulfillWithValue(data);
    } catch (err) {
      const error = err as AxiosError;
      return rejectWithValue(error.response?.data);
    }
  }
);

