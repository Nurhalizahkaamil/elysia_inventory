export type AddProductDto = {
  name: string;
  description?: string;
  price: number;
  expiry_date: Date;
  status: string;
  category_id: number;
  supplier_id: number;

};

export type UpdateProductDto = Partial<AddProductDto>;
