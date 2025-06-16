import { useState } from "react";

// dummy data
const games = [
  {
    homeTeam: "POL",
    awayTeam: "ENG",
    homeScore: 1,
    awayScore: 0,
    addedAt: 1750029204530,
  },
  {
    homeTeam: "USA",
    awayTeam: "MEX",
    homeScore: 5,
    awayScore: 4,
    addedAt: 1750029209551,
  },
];

export const ScoreBoard = () => {
  const [home, setHome] = useState("");
  const [away, setAway] = useState("");
  const [homeScore, setHomeScore] = useState(0);
  const [awayScore, setAwayScore] = useState(0);
  const [selectedMatchKey, setSelectedMatchKey] = useState<string>("");

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

  return (
    <div>
      <h1>⚽ Football ScoreBoard</h1>
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
          <button>Start Game</button>
          <button>Finish Game</button>
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
              type="number"
              value={homeScore}
              onChange={(e) => setHomeScore(+e.target.value)}
            />
            <input
              type="number"
              value={awayScore}
              onChange={(e) => setAwayScore(+e.target.value)}
            />
            <button>Update</button>
          </div>
        )}
      </div>
      <div>
        <h2>📊 Live Summary</h2>
        <ul>
          {games.map((g, idx) => (
            <li key={`${g.homeTeam}-${g.awayTeam}-${idx}`}>
              {g.homeTeam} {g.homeScore} - {g.awayTeam} {g.awayScore}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
