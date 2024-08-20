import db from "../database/db";
import type { AddWarehouseDto, UpdateWarehouseDto } from "../dtos/warehouse";

async function getWarehouses() {
    return db.warehouse.findMany({
        select: {
            id: true,
            name: true,
            description: true,
            status: true,
            createdAt: true,
            updatedAt: true,
        },
    });
}

async function getWarehouseById(id: number) {
    return db.warehouse.findFirstOrThrow({
        where: { id },
        select: {
            id: true,
            name: true,
            description: true,
            status: true,
            createdAt: true,
            updatedAt: true,
        },
    });
}

async function createWarehouse(warehouse: AddWarehouseDto) {
    return db.warehouse.create({
        data: {
            name: warehouse.name,
            description: warehouse.description,
            status: warehouse.status ?? true, // Default value if not provided
        },
    });
}

async function updateWarehouse(id: number, warehouse: UpdateWarehouseDto) {
    return db.warehouse.update({
        where: { id },
        data: {
            name: warehouse.name,
            description: warehouse.description,
            status: warehouse.status,
        },
    });
}

async function deleteWarehouse(id: number) {
    return db.warehouse.delete({
        where: { id },
    });
}

export const WarehousesRepository = {
    getWarehouses,
    getWarehouseById,
    createWarehouse,
    updateWarehouse,
    deleteWarehouse,
};
