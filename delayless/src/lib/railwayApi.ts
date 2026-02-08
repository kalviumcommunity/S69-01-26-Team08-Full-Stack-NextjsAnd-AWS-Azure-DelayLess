export async function fetchLiveTrainStatus(trainNumber: string) {
  const url = `https://indian-railway-irctc.p.rapidapi.com/api/v1/train_status?trainNo=${trainNumber}`;

  const res = await fetch(url, {
    headers: {
      "X-RapidAPI-Key": process.env.RAPIDAPI_KEY!,
      "X-RapidAPI-Host": process.env.RAPIDAPI_HOST!,
    },
    cache: "no-store",
  });

  if (!res.ok) throw new Error("Failed to fetch live train status");

  return res.json();
}