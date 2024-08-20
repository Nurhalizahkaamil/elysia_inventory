import db from "../database/db";
import type { AddInventoryDto, UpdateInventoryDto } from "../dtos/inventory";

async function getInventories() {
    return db.inventory.findMany({
        select: {
            id: true,
            product_id: true,
            quantity: true,
            location: true,
            warehouse_id: true,
            note: true,
            createdAt: true,
            updatedAt: true,
            created_by: true,
        },
    });
}

async function getInventoryById(id: number) {
    return db.inventory.findFirstOrThrow({
        where: { id },
        select: {
            id: true,
            product_id: true,
            quantity: true,
            location: true,
            warehouse_id: true,
            note: true,
            createdAt: true,
            updatedAt: true,
            created_by: true,
        },
    });
}

async function createInventory(inventory: AddInventoryDto) {
    return db.inventory.create({
        data: {
            product_id: inventory.product_id,
            quantity: inventory.quantity,
            location: inventory.location,
            warehouse_id: inventory.warehouse_id,
            note: inventory.note,
            created_by: inventory.created_by,
        },
    });
}

async function updateInventory(id: number, inventory: UpdateInventoryDto) {
    return db.inventory.update({
        where: { id },
        data: {
            product_id: inventory.product_id,
            quantity: inventory.quantity,
            location: inventory.location,
            warehouse_id: inventory.warehouse_id,
            note: inventory.note,
            created_by: inventory.created_by,
        },
    });
}

async function deleteInventory(id: number) {
    return db.inventory.delete({
        where: { id },
    });
}

export const InventoriesRepository = {
    getInventories,
    getInventoryById,
    createInventory,
    updateInventory,
    deleteInventory,
};
