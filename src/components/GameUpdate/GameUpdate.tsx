import { useState } from "react";
import type { Match } from "../../types/types";

type GameUpdateType = {
  games: Match[];
  onUpdate: (
    home: string,
    away: string,
    homeScore: number,
    awayScore: number
  ) => void;
};

export const GameUpdate: React.FC<GameUpdateType> = ({ games, onUpdate }) => {
  const [homeScore, setHomeScore] = useState(0);
  const [awayScore, setAwayScore] = useState(0);
  const [selectedMatch, setSelectedMatch] = useState<string>("");

  const handleSelectGame = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const key = e.target.value;
    setSelectedMatch(key);

    const [home, away] = key.split(" vs ");
    const game = games.find(
      (game) => game.homeTeam === home && game.awayTeam === away
    );
    if (game) {
      setHomeScore(game.homeScore);
      setAwayScore(game.awayScore);
    }
  };

  const handleUpdateScore = () => {
    const [home, away] = selectedMatch.split(" vs ");
    onUpdate(home, away, homeScore, awayScore);
  };

  return (
    <>
      <h2>📝 Update Score</h2>
      <select value={selectedMatch} onChange={handleSelectGame}>
        <option value="">Select a match to update</option>
        {games.map(({ homeTeam, awayTeam }) => (
          <option
            key={`${homeTeam}-${awayTeam}`}
            value={`${homeTeam} vs ${awayTeam}`}
          >
            {homeTeam} vs {awayTeam}
          </option>
        ))}
      </select>
      {selectedMatch && (
        <div>
          <input
            data-testid="homeScoreUpdateInput"
            type="number"
            value={homeScore}
            onChange={(e) => setHomeScore(+e.target.value)}
          />
          <input
            data-testid="awayScoreUpdateInput"
            type="number"
            value={awayScore}
            onChange={(e) => setAwayScore(+e.target.value)}
          />
          <button onClick={handleUpdateScore}>Update</button>
        </div>
      )}
    </>
  );
};
