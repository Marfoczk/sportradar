import { useReducer } from "react";
import type { ScoreBoardState } from "../types/types";

type Action = { type: "START_GAME"; homeTeam: string; awayTeam: string };

function reducer(state: ScoreBoardState, action: Action): ScoreBoardState {
  switch (action.type) {
    case "START_GAME": {
      const exists = state.some(
        (game) => game.homeTeam === action.homeTeam && game.awayTeam === action.awayTeam
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

    default:
      return state;
  }
}

export function useScoreBoard() {
  const [state, dispatch] = useReducer(reducer, []);

  const startGame = (home: string, away: string) =>
    dispatch({ type: "START_GAME", homeTeam: home, awayTeam: away });

  return { games: state, startGame };
}
