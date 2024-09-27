/**
 * @swagger
 * /api/entities:
 *   get:
 *     description: Returns hello world
 *     responses:
 *       200:
 *         description: Hello world!
 */
export async function GET() {
    return Response.json({
        message: "Hello world!",
    });
}