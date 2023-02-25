import { Formatting } from "../util/Formatting";
import { GameAPIClient } from "./GameAPIClient";

function addRow(position: string, name: string, score: string, time: string) {
  const tr = document.createElement("tr");
  const tdPosition = document.createElement("td");
  const tdName = document.createElement("td");
  const tdScore = document.createElement("td");
  const tdTime = document.createElement("td");

  tdPosition.innerText = position;
  tdName.innerText = name;
  tdScore.innerText = score;
  tdTime.innerText = time;

  tr.appendChild(tdPosition);
  tr.appendChild(tdName);
  tr.appendChild(tdScore);
  tr.appendChild(tdTime);

  document.getElementById("tbody-ranking")!.appendChild(tr);
}

document.addEventListener("DOMContentLoaded", async () => {
  let response;

  try {
    response = await GameAPIClient.getRanking();
  } catch (error) {
    console.error(error);
  }

  if (response?.ok) {
    const data = (await response?.json()) as Array<{
      id: number;
      player_name: string;
      score: number;
      elapsed_time: number;
      position: number;
    }>;
    data.forEach(({ player_name, score, elapsed_time, position }) => {
      addRow(
        position.toString(),
        player_name,
        score.toString(),
        Formatting.formatElapsedTime(new Date(elapsed_time))
      );
    });
  }
});
