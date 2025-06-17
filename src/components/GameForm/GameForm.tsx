import { useState } from "react";
import styles from "./GameForm.module.css";
import { Button } from "../Button/Button";

type GameFormType = {
  onStart: (home: string, away: string) => void;
};

export const GameForm = ({ onStart }: GameFormType) => {
  const [home, setHome] = useState("");
  const [away, setAway] = useState("");
  const [error, setError] = useState<string | null>(null);

  const handleOnStart = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      onStart(home, away);
      setError(null);
      setHome("");
      setAway("");
    } catch (e) {
      if (e instanceof Error) {
        setError(e.message);
        setTimeout(() => setError(""), 3000);
      }
    }
  };
  return (
    <>
      {error && (
        <div role="alert" className={styles.alert}>
          Error: {error}
          <span onClick={() => setError("")} className={styles.closeBtn}>
            X
          </span>
        </div>
      )}
      <h2>➕ Start New Game</h2>
      <form onSubmit={(e) => handleOnStart(e)} className={styles.form}>
        <div className={styles.inputsRow}>
          <div className={styles.inputSection}>
            <label htmlFor="home_team">Home team</label>
            <input
              placeholder="Enter home team..."
              id="home_team"
              value={home}
              onChange={(e) => setHome(e.target.value)}
              required
            />
          </div>
          <div className={styles.inputSection}>
            <label htmlFor="away_team">Away team</label>
            <input
              placeholder="Enter away team..."
              id="away_team"
              value={away}
              onChange={(e) => setAway(e.target.value)}
              required
            />
          </div>
        </div>
        <Button value="Start Game"/>
      </form>
    </>
  );
};
