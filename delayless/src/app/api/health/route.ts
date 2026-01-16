// src/app/api/health/route.ts

export async function GET() {
  return Response.json({
    status: "ok",
    message: "Backend is up and running",
    service: "DelayLess API",
    timestamp: new Date().toISOString()
  });
}

