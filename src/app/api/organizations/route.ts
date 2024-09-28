import {Db} from "@/app/db/db";

/**
 * @swagger
 * /api/organizations:
 *   get:
 *     description: Returns all organizations
 *     tags:
 *       - organizations
 *     responses:
 *       200:
 *         description: Contains all organizations
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/OrgNode'
 */
export async function GET() {
    return Response.json(Db.getOrganizations());
}
