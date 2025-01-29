export interface Bill {
  id: number;
  description: string;
  category: string;
  amount: string;
  date: string;
}

export interface BillState {
  bills: Bill[];
  selectedCategory: string | null;
  monthlyBudget: number;
}