export async function GET() {
  return Response.json({
    success: true,
    message: 'Basic API working',
    timestamp: new Date().toISOString()
  });
}
