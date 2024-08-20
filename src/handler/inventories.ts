import { AddInventoryDto, UpdateInventoryDto } from "../dtos/inventory";
import { InventoriesRepository } from "../repositories/inventories";

async function getAll() {
    try {
        const inventories = await InventoriesRepository.getInventories();
        return { success: true, data: inventories };
    } catch (error) {
        return { success: false, message: 'Failed to retrieve inventories', error };
    }
}

async function getById(id: number) {
    try {
        const inventory = await InventoriesRepository.getInventoryById(id);
        if (!inventory) {
            return { success: false, message: 'Inventory not found' };
        }
        return { success: true, data: inventory };
    } catch (error) {
        return { success: false, message: 'Failed to retrieve inventory', error };
    }
}

async function create(inventory: AddInventoryDto) {
    try {
        await InventoriesRepository.createInventory(inventory);
        return { success: true, message: 'Inventory created successfully' };
    } catch (error) {
        return { success: false, message: 'Failed to create inventory', error };
    }
}

async function updateById(id: number, updateData: UpdateInventoryDto) {
    try {
        const existingInventory = await InventoriesRepository.getInventoryById(id);
        if (!existingInventory) {
            return { success: false, message: 'Inventory not found' };
        }

        await InventoriesRepository.updateInventory(id, updateData);
        return { success: true, message: 'Inventory updated successfully' };
    } catch (error) {
        return { success: false, message: 'Failed to update inventory', error };
    }
}

async function deleteById(id: number) {
    try {
        await InventoriesRepository.deleteInventory(id);
        return { success: true, message: 'Inventory deleted successfully' };
    } catch (error) {
        return { success: false, message: 'Failed to delete inventory', error };
    }
}

export const InventoriesHandler = {
    getAll,
    getById,
    create,
    updateById,
    deleteById,
};
