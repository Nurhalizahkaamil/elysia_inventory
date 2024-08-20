import { AddSupplierDto, UpdateSupplierDto } from "../dtos/suppliers";
import { SuppliersRepository } from "../repositories/suppliers";

export class SuppliersHandler {
    static async getAll() {
        try {
            const suppliers = await SuppliersRepository.getSuppliers();
            return { success: true, data: suppliers };
        } catch (error) {
            return { success: false, message: "Failed to retrieve suppliers", error };
        }
    }

    static async getById(id: number) {
        try {
            const supplier = await SuppliersRepository.getSupplierById(id);
            if (!supplier) {
                return { success: false, message: "Supplier not found" };
            }
            return { success: true, data: supplier };
        } catch (error) {
            return { success: false, message: "Failed to retrieve supplier", error };
        }
    }

    static async create(supplier: AddSupplierDto) {
        try {
            const newSupplier = {
                name: supplier.name,
                contact: supplier.contact,
                address: supplier.address,
                createdAt: new Date(),
                updatedAt: new Date(),
            };
            await SuppliersRepository.createSupplier(newSupplier);
            return { success: true, message: "Supplier created successfully" };
        } catch (error) {
            return { success: false, message: "Failed to create supplier", error };
        }    
    }

    static async updateById(id: number, updateData: UpdateSupplierDto) {
        try {
            const existingSupplier = await SuppliersRepository.getSupplierById(id);
            if (!existingSupplier) {
                return { success: false, message: "Supplier not found" };
            }

            const updatedSupplierData = {
                ...updateData,
                updatedAt: new Date(),
            };
            await SuppliersRepository.updateSupplierById(id, updatedSupplierData);
            return { success: true, message: "Supplier updated successfully" };
        } catch (error) {
            return { success: false, message: "Failed to update supplier", error };
        }
    }

    static async deleteById(id: number) {
        try {
            await SuppliersRepository.deleteSupplierById(id);
            return { success: true, message: "Supplier deleted successfully" };
        } catch (error) {
            return { success: false, message: "Failed to delete supplier", error };
        }
    }
}
