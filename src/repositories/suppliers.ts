import db from "../database/db";
import type { AddSupplierDto, UpdateSupplierDto } from "../dtos/suppliers";

async function getSuppliers() {
    return await db.supplier.findMany({
        select: {
            id: true,
            name: true,
            contact: true,
            address: true,
            createdAt: true,
            updatedAt: true,
        }
    });
}

async function getSupplierById(id: number) {
    return await db.supplier.findFirstOrThrow({
        where: { id },
        select: {
            id: true,
            name: true,
            contact: true,
            address: true,
            createdAt: true,
            updatedAt: true,
        }
    });
}

async function createSupplier(supplier: AddSupplierDto) {
    return await db.supplier.create({
        data: {
            name: supplier.name,
            contact: supplier.contact,
            address: supplier.address,
            createdAt: new Date(),
            updatedAt: new Date(),
        }
    });
}

async function updateSupplierById(id: number, supplier: UpdateSupplierDto) {
    return await db.supplier.update({
        where: { id },
        data: {
            name: supplier.name,
            contact: supplier.contact,  
            address: supplier.address,
            updatedAt: new Date(),
        }
    });
}

async function deleteSupplierById(id: number) {
    return await db.supplier.delete({
        where: { id }
    });
}

export const SuppliersRepository = {
    getSuppliers,
    getSupplierById,
    createSupplier,
    updateSupplierById,
    deleteSupplierById,
}