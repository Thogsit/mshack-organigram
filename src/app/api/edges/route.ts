import {Db} from "@/app/db/db";

/**
 * @swagger
 * /api/edges:
 *   get:
 *     description: Returns all edges
 *     tags:
 *       - edges
 *     responses:
 *       200:
 *         description: Contains all edges
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/OrgEdge'
 */
export async function GET() {
    return Response.json(Db.getEdges());
}
