import { success } from "../_utils/response";

export async function GET() {
  return success(
    { stations: [] },
    "Stations API working"
  );
}