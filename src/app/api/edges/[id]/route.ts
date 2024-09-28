import {OrgEdge, OrgEdgeDto} from "@/app/models/OrgEdge";
import {Db} from "@/app/db/db";

/**
 * @swagger
 * /api/edges/{id}:
 *   get:
 *     description: Returns the requested edge
 *     tags:
 *       - edges
 *     responses:
 *       200:
 *         description: Contains the requested edge
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/OrgEdge'
 *       404:
 *         description: Edge not found
 *         content:
 *           text/plain:
 *             schema:
 *               type: string
 */
export async function GET(_: Request, {params}: { params: { id: string } }) {
    const edge: OrgEdge | undefined = Db.getEdgeById(params.id);

    return edge ? Response.json(edge) : new Response('Edge not found', {status: 404});
}

/**
 * @swagger
 * /api/edges/{id}:
 *   put:
 *     description: Updates the requested edge
 *     tags:
 *       - edges
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/OrgEdgeDto'
 *     responses:
 *       200:
 *         description: Contains the updated edge
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/OrgEdge'
 *       404:
 *         description: Edge not found
 *         content:
 *           text/plain:
 *             schema:
 *               type: string
 */
export async function PUT(req: Request, {params}: { params: { id: string } }) {
    const edgeDto: OrgEdgeDto = await req.json();
    const edge: OrgEdge = edgeDto.toOrgEdge(params.id);
    Db.updateEdge(params.id, edge);

    return Response.json(edge);
}

/**
 * @swagger
 * /api/edges/{id}:
 *   post:
 *     description: Adds a new edge
 *     tags:
 *       - edges
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/OrgEdgeDto'
 *     responses:
 *       201:
 *         description: Contains the added edge
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/OrgEdge'
 */
export async function POST(req: Request, {params}: { params: { id: string } }) {
    const edgeDto: OrgEdgeDto = await req.json();
    const edge: OrgEdge = edgeDto.toOrgEdge(params.id);
    Db.addEdge(edge);

    return Response.json(edge, {status: 201});
}

/**
 * @swagger
 * /api/edges/{id}:
 *   delete:
 *     description: Deletes the requested edge
 *     tags:
 *       - edges
 *     responses:
 *       200:
 *         description: Contains the deleted edge
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/OrgEdge'
 *       404:
 *         description: Edge not found
 *         content:
 *           text/plain:
 *             schema:
 *               type: string
 */
export async function DELETE(_: Request, {params}: { params: { id: string } }) {
    const edge = Db.deleteEdge(params.id);

    return Response.json(edge);
}
