import { NextRequest } from "next/server";
import { success, failure } from "../_utils/response";
import { trains } from "../_mock/trains";
import { getDelaySeverity } from "../_utils/delay";
import { getTravelDecision } from "../_utils/decision";

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

  const decision = getTravelDecision(train.delayMinutes);

  return success(
    {
      trainNo: train.trainNo,
      delayMinutes: train.delayMinutes,
      severity: getDelaySeverity(train.delayMinutes),
      ...decision,
    },
    "Decision generated"
  );
}


