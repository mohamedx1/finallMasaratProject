import { createSlice, PayloadAction } from '@reduxjs/toolkit';


const rol = localStorage.getItem("rols")

const modalaCollapsSlise = createSlice({
  name: 'camera',
  initialState: {
    ModalIsOpend: false, // Initial state is expanded (not collapsed)
    audioIsOpend: true,
    rols:rol,
  },
  reducers: {
    toggleModal(state) {
      state.ModalIsOpend = !state.ModalIsOpend; // Toggle the collapsed state
    },
    toggleaudio(state) {
      state.audioIsOpend = !state.audioIsOpend; // Toggle the collapsed state
    },
    changeRools(state , action: PayloadAction<any>) {
      state.rols = action.payload
    }
  },
});

export default modalaCollapsSlise.reducer;
export const { toggleModal , toggleaudio , changeRools  } = modalaCollapsSlise.actions;