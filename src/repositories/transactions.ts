import db from "../database/db";
import type { AddTransactionsDto, UpdateTransactionsDto } from "../dtos/transactions";

async function getTransactions() {
    return db.transaction.findMany({
        select: {
            id: true,
            product_id: true,
            quantity: true,
            total_price: true,
            transaction_date: true,
            user_id: true,
        },
    });
}   

async function getTransactionsById(id: number) {
    return db.transaction.findFirstOrThrow({
        where: { id },
        select: {
            id: true,
            product_id: true,
            quantity: true,
            total_price: true,
            transaction_date: true,
            user_id: true,
        },
    });
}

async function createTransactions(transaction: AddTransactionsDto) {
    return db.transaction.create({ 
        data: {
            product_id: transaction.product_id,
            quantity: transaction.quantity,
            total_price: transaction.total_price,
            transaction_date: transaction.transaction_date,
            user_id: transaction.user_id,
        }
    });
}   

async function updateTransactions(id: number, transaction: UpdateTransactionsDto) {
    return db.transaction.update({
        where: { id },
        data: {
            product_id: transaction.product_id,
            quantity: transaction.quantity,
            total_price: transaction.total_price,
            transaction_date: transaction.transaction_date, 
            user_id: transaction.user_id,
        }
    });
}

async function deleteTransactions(id: number) {
    return db.transaction.delete({
        where: { id },
    });
}

export const TransactionsRepository = {
    getTransactions,
    getTransactionsById,
    createTransactions,
    updateTransactions,
    deleteTransactions,
};