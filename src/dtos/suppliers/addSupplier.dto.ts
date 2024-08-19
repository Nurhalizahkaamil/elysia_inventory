export type AddSupplierDto = {
    name: string;
    contact: string;
    address: string;
    createdAt: Date;
    updatedAt: Date;
  };
  
  export type UpdateSupplierDto = Partial<AddSupplierDto>;
  