import { useState } from "react";
import type { Match } from "../../types/types";
import { Button } from "../Button/Button";
import styles from "./GameUpdate.module.css";

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
      <select
        className={styles.select}
        value={selectedMatch}
        onChange={handleSelectGame}
      >
        <option value="">
          Select a match to update
        </option>
        {games.map(({ homeTeam, awayTeam }) => (
          <option
            className={styles.gameOption}
            key={`${homeTeam}-${awayTeam}`}
            value={`${homeTeam} vs ${awayTeam}`}
          >
            {homeTeam} vs {awayTeam}
          </option>
        ))}
      </select>
      {selectedMatch && (
        <>
          <div className={styles.inputsRow}>
            <div className={styles.inputSection}>
              <label htmlFor="home_team">Home team</label>
              <input
                type="number"
                min="0"
                step="1"
                data-testid="homeScoreUpdateInput"
                value={homeScore}
                onChange={(e) => setHomeScore(+e.target.value)}
              />
            </div>
            <div className={styles.inputSection}>
              <label htmlFor="away_team">Away team</label>
              <input
                type="number"
                min="0"
                step="1"
                data-testid="awayScoreUpdateInput"
                value={awayScore}
                onChange={(e) => setAwayScore(+e.target.value)}
              />
            </div>
          </div>
          <Button
            value="Update"
            onClick={handleUpdateScore}
            customStyles={{ marginTop: "12px" }}
          />
        </>
      )}
    </>
  );
};
