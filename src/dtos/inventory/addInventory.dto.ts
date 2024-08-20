export type AddInventoryDto = {
    product_id: number;
    quantity: number;
    location: string;
    warehouse_id: number;
    note?: string;
    created_by: string; // UUID
  };
  
  export type UpdateInventoryDto = Partial<AddInventoryDto>;
  