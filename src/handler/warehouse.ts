import { AddWarehouseDto, UpdateWarehouseDto } from "../dtos/warehouse";
import { WarehousesRepository } from "../repositories/warehouse";

async function getAll() {
    try {
        const warehouses = await WarehousesRepository.getWarehouses();
        return { success: true, data: warehouses };
    } catch (error) {
        return { success: false, message: 'Failed to retrieve warehouses', error };
    }
}

async function getById(id: number) {
    try {
        const warehouse = await WarehousesRepository.getWarehouseById(id);
        if (!warehouse) {
            return { success: false, message: 'Warehouse not found' };
        }
        return { success: true, data: warehouse };
    } catch (error) {
        return { success: false, message: 'Failed to retrieve warehouse', error };
    }
}

async function create(warehouse: AddWarehouseDto) {
    try {
        await WarehousesRepository.createWarehouse(warehouse);
        return { success: true, message: 'Warehouse created successfully' };
    } catch (error) {
        return { success: false, message: 'Failed to create warehouse', error };
    }
}

async function updateById(id: number, updateData: UpdateWarehouseDto) {
    try {
        const existingWarehouse = await WarehousesRepository.getWarehouseById(id);
        if (!existingWarehouse) {
            return { success: false, message: 'Warehouse not found' };
        }

        await WarehousesRepository.updateWarehouse(id, updateData);
        return { success: true, message: 'Warehouse updated successfully' };
    } catch (error) {
        return { success: false, message: 'Failed to update warehouse', error };
    }
}

async function deleteById(id: number) {
    try {
        await WarehousesRepository.deleteWarehouse(id);
        return { success: true, message: 'Warehouse deleted successfully' };
    } catch (error) {
        return { success: false, message: 'Failed to delete warehouse', error };
    }
}

export const WarehousesHandler = {
    getAll,
    getById,
    create,
    updateById,
    deleteById,
};
