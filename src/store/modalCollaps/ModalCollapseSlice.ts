import { createSlice } from '@reduxjs/toolkit';




const modalaCollapsSlise = createSlice({
  name: 'camera',
  initialState: {
    ModalIsOpend: false, // Initial state is expanded (not collapsed)
    audioIsOpend:true,
  },
  reducers: {
    toggleModal(state) {
      state.ModalIsOpend = !state.ModalIsOpend; // Toggle the collapsed state
    },
    toggleaudio(state) {
      state.audioIsOpend = !state.audioIsOpend; // Toggle the collapsed state
    },
  },
});

export default modalaCollapsSlise.reducer;
export const { toggleModal , toggleaudio } = modalaCollapsSlise.actions;