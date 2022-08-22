export interface Transaction {
  monoId: string;
  accountId: string;
  ownerId: string;
  type: "debit" | "credit";
  narration: string;
  amount: string;
  balance: string;
  date: string;
  category: string;
  currency: string;
}
