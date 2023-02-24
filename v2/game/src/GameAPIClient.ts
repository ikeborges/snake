export namespace GameAPIClient {
  // Hardcoded URL: Don't do this! Use an environment variable instead.
  const API_URL = "https://snake-api.vercel.app/";

  export async function saveStatsInRanking(
    playerName: string,
    score: number,
    elapsedTime: number
  ) {
    return fetch(
      `${API_URL}/ranking?playerName=${playerName}&score=${score}&elapsedTime=${elapsedTime}`,
      {
        method: "POST",
      }
    );
  }

  export async function getRanking() {
    return fetch(`${API_URL}/ranking`);
  }
}
