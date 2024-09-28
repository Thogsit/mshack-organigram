import {Db} from "@/app/db/db";
import {OrgNode, OrgNodeDto} from "@/app/models/OrgNode";

/**
 * @swagger
 * /api/organizations/{id}:
 *   get:
 *     description: Returns the requested organization
 *     tags:
 *       - organizations
 *     responses:
 *       200:
 *         description: Contains the requested organization
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/OrgNode'
 *       404:
 *         description: Organization not found
 *         content:
 *           text/plain:
 *             schema:
 *               type: string
 */
export async function GET(_: Request, {params}: { params: { id: string } }) {
    const org: OrgNode | undefined = Db.getOrganizationById(params.id);

    return org ? Response.json(org) : new Response('Organization not found', {status: 404});
}

/**
 * @swagger
 * /api/organizations/{id}:
 *   put:
 *     description: Updates the requested organization
 *     tags:
 *       - organizations
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/OrgNodeDto'
 *     responses:
 *       200:
 *         description: Contains the updated organization
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/OrgNode'
 *       404:
 *         description: Organization not found
 *         content:
 *           text/plain:
 *             schema:
 *               type: string
 */
export async function PUT(req: Request, {params}: { params: { id: string } }) {
    const orgData: OrgNodeDto = await req.json();
    const org = orgData.toOrgNode(params.id);
    Db.updateOrganization(params.id, org);

    return Response.json(org);
}

/**
 * @swagger
 * /api/organizations/{id}:
 *   post:
 *     description: Adds a new organization
 *     tags:
 *       - organizations
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/OrgNodeDto'
 *     responses:
 *       201:
 *         description: Contains the added organization
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/OrgNode'
 */
export async function POST(req: Request, {params}: { params: { id: string } }) {
    const orgData: OrgNodeDto = await req.json();
    const org = orgData.toOrgNode(params.id);
    Db.addOrganization(org);

    return Response.json(org, {status: 201});
}

/**
 * @swagger
 * /api/organizations/{id}:
 *   delete:
 *     description: Deletes the requested organization
 *     tags:
 *       - organizations
 *     responses:
 *       200:
 *         description: Contains the deleted organization
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/OrgNode'
 *       404:
 *         description: Organization not found
 *         content:
 *           text/plain:
 *             schema:
 *               type: string
 */
export async function DELETE(_: Request, {params}: { params: { id: string } }) {
    const org = Db.deleteOrganization(params.id);

    return Response.json(org);
}
