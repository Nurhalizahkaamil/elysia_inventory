import type { ElysiaSwaggerConfig } from "@elysiajs/swagger"; // Pastikan untuk mengimpor tipe ElysiaSwaggerConfig jika diperlukan.

export const swaggerConfig: ElysiaSwaggerConfig = {
    documentation: {
        info: {
            title: "Inventory System API",
            description: "API for inventory system",
            version: "1.0.0",
        },
        components: {
            securitySchemes: {
                BearerAuth: {
                    type: "http",           
                    scheme: "bearer",        
                    bearerFormat: "JWT",     
                },
            },
        },
        security: [
            {
                BearerAuth: [],
            },
        ],
    },
};


/**
 * @swagger
 * components:
 *   schemas:
 *     AddUsersDto:
 *       type: object
 *       properties:
 *         email:
 *           type: string
 *         name:
 *           type: string
 *         password:
 *           type: string
 *         role:
 *           type: string
 *           enum:
 *             - ADMINGUDANG
 *             - APOTEKER
 *       required:
 *         - email
 *         - name
 *         - password
 *         - role
 *   securitySchemes:
 *     BearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 *
 * /users:
 *   post:
 *     summary: Create a new user
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/AddUsersDto'
 *     responses:
 *       200:
 *         description: User created successfully
 *       400:
 *         description: Invalid input
 */

/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: User login to obtain JWT token
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *             required:
 *               - email
 *               - password
 *     responses:
 *       200:
 *         description: Login successful, returns JWT token
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 access_token:
 *                   type: string
 *       401:
 *         description: Unauthorized
 */
