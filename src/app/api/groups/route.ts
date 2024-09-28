import {Db} from "@/app/db/db";

/**
 * @swagger
 * /api/groups:
 *   get:
 *     description: Returns all groups
 *     tags:
 *       - groups
 *     responses:
 *       200:
 *         description: Contains all groups
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/OrgGroup'
 */
export async function GET() {
    return Response.json(Db.getGroups());
}
