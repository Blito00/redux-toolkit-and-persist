//Un slice en Toolkit es una colección de lógica Redux relacionada que incluye el estado inicial, los reducers y las acciones.
//facilitando la gestión del estado y las acciones correspondientes a una funcionalidad específica de la aplicación.

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

// createAsyncThunk es una utilidad de ToolKit diseñada para simplificar la creación y gestión de acciones asincrónicas en una aplicación. 
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
  // Los extraReducers son una característica de Redux Toolkit que permiten a los reducers manejar acciones definidas fuera del createSlice. 
  extraReducers: (builder) => {
    // Reducers para el estado de carga y error al iniciar sesión
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        // Un Payload es un objeto que suele llevar información relevante para la actualización del estado, como nuevos valores, identificadores o cualquier otro dato necesario para realizar la actualización específica en el store
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

//Se exporta las acciones del reducer LogOut
export const { logout } = userSlice.actions;
export default userSlice.reducer;