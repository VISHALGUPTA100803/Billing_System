import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Bill, BillState } from '../types/bill';

const initialState: BillState = {
  bills: [
    {
      id: 1,
      description: "Dominoes",
      category: "FoodNDining",
      amount: "430",
      date: "01-02-2020"
    },
    {
      id: 2,
      description: "Car wash",
      category: "utility",
      amount: "500",
      date: "01-06-2020"
    },
    {
      id: 3,
      description: "Amazon",
      category: "shopping",
      amount: "2030",
      date: "01-07-2020"
    },
    {
      id: 4,
      description: "House rent",
      category: "Food & Dining",
      amount: "35900",
      date: "01-03-2020"
    },
    {
      id: 5,
      description: "Tuition",
      category: "education",
      amount: "2200",
      date: "01-12-2020"
    },
    {
      id: 6,
      description: "Laundry",
      category: "Personal Care",
      amount: "320",
      date: "01-14-2020"
    },
    {
      id: 7,
      description: "Vacation",
      category: "Travel",
      amount: "3430",
      date: "01-18-2020"
    }
  ],
  selectedCategory: null,
  monthlyBudget: 50000
};

const billSlice = createSlice({
  name: 'bills',
  initialState,
  reducers: {
    addBill: (state, action: PayloadAction<Bill>) => {
      state.bills.push(action.payload);
    },
    editBill: (state, action: PayloadAction<Bill>) => {
      const index = state.bills.findIndex(bill => bill.id === action.payload.id);
      if (index !== -1) {
        state.bills[index] = action.payload;
      }
    },
    removeBill: (state, action: PayloadAction<number>) => {
      state.bills = state.bills.filter(bill => bill.id !== action.payload);
    },
    setSelectedCategory: (state, action: PayloadAction<string | null>) => {
      state.selectedCategory = action.payload;
    },
    setMonthlyBudget: (state, action: PayloadAction<number>) => {
      state.monthlyBudget = action.payload;
    }
  }
});

export const { addBill, editBill, removeBill, setSelectedCategory, setMonthlyBudget } = billSlice.actions;
export default billSlice.reducer;