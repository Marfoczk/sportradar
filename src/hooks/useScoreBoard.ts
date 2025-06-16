import { useReducer } from "react";
import type { ScoreBoardState } from "../types/types";

type Action =
  | { type: "START_GAME"; homeTeam: string; awayTeam: string }
  | { type: "FINISH_GAME"; homeTeam: string; awayTeam: string }
  | {
      type: "UPDATE_SCORE";
      homeTeam: string;
      awayTeam: string;
      homeScore: number;
      awayScore: number;
    };

function reducer(state: ScoreBoardState, action: Action): ScoreBoardState {
  switch (action.type) {
    case "START_GAME": {
      const exists = state.some(
        (game) =>
          game.homeTeam === action.homeTeam && game.awayTeam === action.awayTeam
      );
      if (exists) throw new Error("Game already exists");
      return [
        ...state,
        {
          homeTeam: action.homeTeam,
          awayTeam: action.awayTeam,
          homeScore: 0,
          awayScore: 0,
          addedAt: Date.now(),
        },
      ];
    }
    case "FINISH_GAME":
      return state.filter(
        (game) =>
          !(
            game.homeTeam === action.homeTeam &&
            game.awayTeam === action.awayTeam
          )
      );

    case "UPDATE_SCORE":
      return state.map((game) =>
        game.homeTeam === action.homeTeam && game.awayTeam === action.awayTeam
          ? {
              ...game,
              homeScore: action.homeScore,
              awayScore: action.awayScore,
            }
          : game
      );

    default:
      return state;
  }
}

export function useScoreBoard() {
  const [state, dispatch] = useReducer(reducer, []);

  const startGame = (home: string, away: string) =>
    dispatch({ type: "START_GAME", homeTeam: home, awayTeam: away });

  const finishGame = (home: string, away: string) =>
    dispatch({ type: "FINISH_GAME", homeTeam: home, awayTeam: away });

  const updateScore = (
    home: string,
    away: string,
    homeScore: number,
    awayScore: number
  ) =>
    dispatch({
      type: "UPDATE_SCORE",
      homeTeam: home,
      awayTeam: away,
      homeScore,
      awayScore,
    });

  const summary = [...state].sort((a, b) => {
    const totalA = a.homeScore + a.awayScore;
    const totalB = b.homeScore + b.awayScore;
    if (totalA !== totalB) return totalB - totalA;
    return b.addedAt - a.addedAt;
  });

  return { games: state, summary, startGame, finishGame, updateScore };
}
