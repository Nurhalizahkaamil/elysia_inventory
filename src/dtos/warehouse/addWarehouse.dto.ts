export type AddWarehouseDto = {
    name: string;
    description?: string;
    status?: boolean;
    createdAt: Date;
    updatedAt: Date;
  };
  
  export type UpdateWarehouseDto = Partial<AddWarehouseDto>;
  