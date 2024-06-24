import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Estado inicial del usuario
const initialState = {
  email: null,
  password: null,
  nombre: null,
  loggedIn: false,
  loading: false,
  error: null,
};

// Acción asíncrona para el inicio de sesión
export const loginUser = createAsyncThunk(
  'user/loginUser',
  async ({ email, password }, thunkAPI) => {
    try {
      const response = await fetch('http://localhost:3000/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const result = await response.json();

      if (response.ok && !result.error) {
        return result.data;
      } else {
        return thunkAPI.rejectWithValue(result.error);
      }
    } catch (error) {
      return thunkAPI.rejectWithValue('Algo salió mal');
    }
  }
);

// Slice de Redux para el manejo del usuario
const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    // Acción para el logout del usuario
    logout(state) {
      state.email = null;
      state.password = null;
      state.nombre = null;
      state.loggedIn = false;
      state.loading = false;
      state.error = null;
    },
  },
  // Reducers para manejar el estado de carga y error
  extraReducers: (builder) => {
    // Reducers para el estado de carga y error al iniciar sesión
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.email = action.payload.email;
        state.password = action.payload.password;
        state.nombre = action.payload.nombre;
        state.loggedIn = true;
        state.loading = false;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { logout } = userSlice.actions;
export default userSlice.reducer;