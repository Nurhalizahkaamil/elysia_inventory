export type AddTransactionsDto = {
    product_id: number;
    quantity: number;
    total_price: number;
    transaction_date: Date;
    user_id: string;
};

    export type UpdateTransactionsDto = Partial<AddTransactionsDto>;
  