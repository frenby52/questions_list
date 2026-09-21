import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

interface Filters {
    search: string,
    specializationId: number | null,
    skills: number[],
    keywords: string[],
    complexity: string[],
    rate: number[],
    status: string,
}

interface FiltersState {
    filters: Filters;
}

const initialState: FiltersState = {
    filters: {
        search: '',
        specializationId: null,
        skills: [],
        keywords: [],
        complexity: [],
        rate: [],
        status: 'all',
    },
};

export const filtersSlice = createSlice({
  name: 'filters',
  initialState,
  reducers: {
    setFilters: (state, action: PayloadAction<Filters>) => {
      state.filters = action.payload;
    },
  },
});

export const { setFilters } = filtersSlice.actions;

export default filtersSlice.reducer;