import {Db} from "@/app/db/db";

/**
 * @swagger
 * /api/graph:
 *   get:
 *     description: Returns the json graph data
 *     tags:
 *       - graph
 *     responses:
 *       200:
 *         description: Contains the json graph data
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/GraphData'
 */
export async function GET() {
    return Response.json(Db.getAsGraphData());
}
