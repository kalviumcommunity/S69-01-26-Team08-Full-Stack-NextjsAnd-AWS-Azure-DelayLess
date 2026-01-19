import { success } from "../_utils/response";

export async function GET() {
  return success(
    { service: "delayless-backend" },
    "Backend is running"
  );
}
