import type { Match } from "../../types/types";

type GamesSummaryType = {
  summary: Match[];
  onFinish: (home: string, away: string) => void;
};

export const GamesSummary: React.FC<GamesSummaryType> = ({
  summary,
  onFinish,
}) => {
  return (
    <>
      <h2>📊 Live Summary</h2>
      <ul>
        {summary.map(({ homeTeam, homeScore, awayTeam, awayScore }, idx) => (
          <li key={`${homeTeam}-${awayTeam}-${idx}`}>
            {homeTeam} {homeScore} - {awayTeam} {awayScore}
            <button
              aria-label={`finish ${homeTeam} vs ${awayTeam}`}
              onClick={() => onFinish(homeTeam, awayTeam)}
            >
              Finish
            </button>
          </li>
        ))}
      </ul>
    </>
  );
};
