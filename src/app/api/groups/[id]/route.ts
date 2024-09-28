import {OrgGroup, OrgGroupDto} from "@/app/models/OrgGroup";
import {Db} from "@/app/db/db";

/**
 * @swagger
 * /api/groups/{id}:
 *   get:
 *     description: Returns the requested group
 *     tags:
 *       - groups
 *     responses:
 *       200:
 *         description: Contains the requested group
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/OrgGroup'
 *       404:
 *         description: Group not found
 *         content:
 *           text/plain:
 *             schema:
 *               type: string
 */
export async function GET({params}: { params: { id: string } }) {
    const group: OrgGroup | undefined = Db.getGroupById(params.id);

    return group ? Response.json(group) : new Response('Group not found', {status: 404});
}

/**
 * @swagger
 * /api/groups/{id}:
 *   put:
 *     description: Updates the requested group
 *     tags:
 *       - groups
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/OrgGroupDto'
 *     responses:
 *       200:
 *         description: Contains the updated group
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/OrgGroup'
 *       404:
 *         description: Group not found
 *         content:
 *           text/plain:
 *             schema:
 *               type: string
 */
export async function PUT(req: Request, {params}: { params: { id: string } }) {
    const groupDto: OrgGroupDto = await req.json();
    const group: OrgGroup = groupDto.toOrgGroup(params.id);
    Db.updateGroup(params.id, group);

    return Response.json(group);
}

/**
 * @swagger
 * /api/groups/{id}:
 *   post:
 *     description: Adds a new group
 *     tags:
 *       - groups
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/OrgGroupDto'
 *     responses:
 *       201:
 *         description: Contains the added group
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/OrgGroup'
 */
export async function POST(req: Request, {params}: { params: { id: string } }) {
    const orgData: OrgGroupDto = await req.json();
    const group: OrgGroup = orgData.toOrgGroup(params.id);
    Db.addGroup(group);

    return Response.json(group, {status: 201});
}

/**
 * @swagger
 * /api/groups/{id}:
 *   delete:
 *     description: Deletes the requested group
 *     tags:
 *       - groups
 *     responses:
 *       200:
 *         description: Contains the deleted group
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/OrgGroup'
 *       404:
 *         description: Group not found
 *         content:
 *           text/plain:
 *             schema:
 *               type: string
 */
export async function DELETE({params}: { params: { id: string } }) {
    const group = Db.deleteGroup(params.id);

    return Response.json(group);
}
