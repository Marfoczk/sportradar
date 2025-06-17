import { useScoreBoard } from "../../hooks/useScoreBoard";
import { GameForm } from "../GameForm/GameForm";
import { GameUpdate } from "../GameUpdate/GameUpdate";
import { GamesSummary } from "../GamesSummary/GamesSummary";

export const ScoreBoard = () => {
  const { games, summary, startGame, updateScore, finishGame } =
    useScoreBoard();

  return (
    <>
      <h1>⚽ Football ScoreBoard</h1>
      <GameForm onStart={startGame} />
      <GameUpdate games={games} onUpdate={updateScore} />
      <GamesSummary summary={summary} onFinish={finishGame} />
    </>
  );
};
