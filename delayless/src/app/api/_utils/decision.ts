export function getTravelDecision(delay: number) {
  if (delay === 0) {
    return {
      suggestion: "Proceed as planned",
      confidence: "high",
    };
  }

  if (delay <= 10) {
    return {
      suggestion: "Minor delay, wait for train",
      confidence: "medium",
    };
  }

  if (delay <= 30) {
    return {
      suggestion: "Consider waiting or alternate route",
      confidence: "medium",
    };
  }

  return {
    suggestion: "Consider alternate route or train",
    confidence: "high",
  };
}


