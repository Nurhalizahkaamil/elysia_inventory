import { AddTransactionsDto, UpdateTransactionsDto } from "../dtos/transactions";
import { TransactionsRepository } from "../repositories/transactions";

async function getAll() {
    try {
        const transactions = await TransactionsRepository.getTransactions();
        return { success: true, data: transactions };
    } catch (error) {
        return { success: false, message: 'Failed to retrieve transactions', error };
    }
}

async function getById(id: number) {
    try {
        const transaction = await TransactionsRepository.getTransactionsById(id);
        if (!transaction) {
            return { success: false, message: 'Transaction not found' };
        }
        return { success: true, data: transaction };
    } catch (error) {
        return { success: false, message: 'Failed to retrieve transaction', error };
    }
}

async function create(transaction: AddTransactionsDto) {
    try {
        await TransactionsRepository.createTransactions(transaction);
        return { success: true, message: 'Transaction created successfully' };
    } catch (error) {
        return { success: false, message: 'Failed to create transaction', error };
    }
}

async function updateById(id: number, updateData: UpdateTransactionsDto) {
    try {
        const existingTransaction = await TransactionsRepository.getTransactionsById(id);
        if (!existingTransaction) {
            return { success: false, message: 'Transaction not found' };
        }

        await TransactionsRepository.updateTransactions(id, updateData);
        return { success: true, message: 'Transaction updated successfully' };
    } catch (error) {
        return { success: false, message: 'Failed to update transaction', error };
    }
}

async function deleteById(id: number) {
    try {
        await TransactionsRepository.deleteTransactions(id);
        return { success: true, message: 'Transaction deleted successfully' };
    } catch (error) {
        return { success: false, message: 'Failed to delete transaction', error };
    }
}

export const TransactionsHandler = {
    getAll,
    getById,
    create,
    updateById,
    deleteById,
};
