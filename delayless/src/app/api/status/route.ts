import { NextRequest } from "next/server";
import { success, failure } from "../_utils/response";
import { trains } from "../_mock/trains";
import { getDelaySeverity } from "../_utils/delay";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const trainNo = searchParams.get("trainNo");

  if (!trainNo) {
    return failure("trainNo query parameter is required", 400);
  }

  const train = trains.find(t => t.trainNo === trainNo);

  if (!train) {
    return failure("Train not found", 404);
  }

  return success(
    {
      trainNo: train.trainNo,
      name: train.name,
      delayMinutes: train.delayMinutes,
      severity: getDelaySeverity(train.delayMinutes),
      lastUpdated: new Date().toISOString(),
    },
    "Train status fetched"
  );
}
