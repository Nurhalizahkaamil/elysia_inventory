export interface AddProductDto {
    name: string;
    description?: string;
    price: number;
    expiry_date: Date;
    status: string; // Or use ProductStatus if you have predefined statuses
    category_id: number;
    supplier_id: number;
  }
  
  // DTO for updating an existing product
  export interface UpdateProductDto {
    name?: string;
    description?: string;
    price?: number;
    expiry_date?: Date;
    status?: string; // Or use ProductStatus
    category_id?: number;
    supplier_id?: number;
  }