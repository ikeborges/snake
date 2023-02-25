export namespace GameAPIClient {
  const API_URL = import.meta.env.VITE_API_URL;

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
