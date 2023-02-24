export namespace GameAPIClient {
  const API_URL = "http://localhost:3000";

  export async function getRankingPosition(
    playerName: string,
    score: number,
    elapsedTime: number
  ) {
    return fetch(
      `${API_URL}/ranking?playerName=${playerName}&score=${score}&elapsedTime=${elapsedTime}`
    );
  }
}