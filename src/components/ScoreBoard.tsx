import { useState } from "react";
import { useScoreBoard } from "../hooks/useScoreBoard";

export const ScoreBoard = () => {
  const { games, summary, startGame, updateScore, finishGame } =
    useScoreBoard();
  const [home, setHome] = useState("");
  const [away, setAway] = useState("");
  const [homeScore, setHomeScore] = useState(0);
  const [awayScore, setAwayScore] = useState(0);
  const [selectedMatchKey, setSelectedMatchKey] = useState<string>("");
  const [error, setError] = useState<string | null>(null);

  const handleOnStart = () => {
    try {
      startGame(home, away);
      setError(null);
    } catch (e) {
      if (e instanceof Error) setError(e.message);
    }
  };

  const handleSelectGame = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const key = e.target.value;
    setSelectedMatchKey(key);

    const [home, away] = key.split(" vs ");
    const game = games.find(
      (game) => game.homeTeam === home && game.awayTeam === away
    );
    if (game) {
      setHome(home);
      setAway(away);
      setHomeScore(game.homeScore);
      setAwayScore(game.awayScore);
    }
  };

  const handleUpdateScore = () => updateScore(home, away, homeScore, awayScore);
  const handleOnFinish = () => finishGame(home, away);

  return (
    <div>
      <h1>⚽ Football ScoreBoard</h1>
      {error && (
        <div role="alert" className="text-red-600">
          {error}
        </div>
      )}
      <div>
        <input
          placeholder="Home Team"
          value={home}
          onChange={(e) => setHome(e.target.value)}
        />
        <input
          placeholder="Away Team"
          value={away}
          onChange={(e) => setAway(e.target.value)}
        />
        <div>
          <button onClick={handleOnStart}>Start Game</button>
          <button onClick={handleOnFinish}>Finish Game</button>
        </div>
      </div>
      <div>
        <h2>📝 Update Score</h2>
        <select value={selectedMatchKey} onChange={handleSelectGame}>
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
        {selectedMatchKey && (
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
      </div>
      <div>
        <h2>📊 Live Summary</h2>
        <ul>
          {summary.map(({ homeTeam, homeScore, awayTeam, awayScore }, idx) => (
            <li key={`${homeTeam}-${awayTeam}-${idx}`}>
              {homeTeam} {homeScore} - {awayTeam} {awayScore}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
