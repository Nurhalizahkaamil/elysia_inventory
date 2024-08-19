export type AddCategoryDto = {
    name: string;
    description?: string;
    status: string;
    createdAt: Date;
    updatedAt: Date;
  };
  
  export type UpdateCategoryDto = Partial<AddCategoryDto>;
  