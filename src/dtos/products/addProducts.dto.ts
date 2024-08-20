export type AddProductDto = {
  name: string;
  description?: string;
  price: number;
  expiry_date: Date;
  status: string;
  category_id: string;
  supplier_id: string;

};

export type UpdateProductDto = Partial<AddProductDto>;
