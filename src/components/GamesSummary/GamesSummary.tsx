import type { Match } from "../../types/types";
import styles from "./GamesSummary.module.css";

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
      <ul className={styles.myList}>
        {summary.map(({ homeTeam, homeScore, awayTeam, awayScore }, idx) => (
          <li
            className={styles.gameListItem}
            key={`${homeTeam}-${awayTeam}-${idx}`}
          >
            <span>
              {homeTeam} {homeScore} - {awayTeam} {awayScore}
            </span>
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
