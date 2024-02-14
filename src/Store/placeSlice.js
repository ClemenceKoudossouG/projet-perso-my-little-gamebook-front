import { createSlice } from '@reduxjs/toolkit';

export const initialState = {
    place: '',
};

const placeSlice = createSlice({
    name: 'place',
    initialState,
    reducers: {
        GetPlace: (state, action) => {
            return {
                ...state,
                place: action.payload
            };
        },
    },
});

export const {
    GetPlace
} = placeSlice.actions;



export default placeSlice.reducer;
