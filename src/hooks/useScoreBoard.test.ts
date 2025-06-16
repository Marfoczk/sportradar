import { describe, it, expect } from "vitest";
import { useScoreBoard } from "./useScoreBoard";
import { act, renderHook } from "@testing-library/react";

describe("useScoreBoard", () => {
  it("should start a new game and update the state", () => {
    const { result } = renderHook(() => useScoreBoard());

    act(() => {
      result.current.startGame("POL", "ENG");
    });

    expect(result.current.games).toHaveLength(1);
    expect(result.current.games[0]).toMatchObject({
      homeTeam: "POL",
      awayTeam: "ENG",
      homeScore: 0,
      awayScore: 0,
    });
  });

  it("should throw an error when trying to start a duplicate game", () => {
    const { result } = renderHook(() => useScoreBoard());

    act(() => {
      result.current.startGame("POL", "ENG");
    });

    expect(() => {
      act(() => {
        result.current.startGame("POL", "ENG");
      });
    }).toThrowError("Game already exists");
  });

  it("should update the score of an existing match", () => {
    const { result } = renderHook(() => useScoreBoard());

    act(() => {
      result.current.startGame("BRA", "ARG");
    });

    act(() => {
      result.current.updateScore("BRA", "ARG", 2, 1);
    });

    expect(result.current.games[0]).toMatchObject({
      homeTeam: "BRA",
      awayTeam: "ARG",
      homeScore: 2,
      awayScore: 1,
    });
  });

  it("should remove the match when finishGame is called", () => {
    const { result } = renderHook(() => useScoreBoard());

    act(() => {
      result.current.startGame("MEX", "USA");
    });

    act(() => {
      result.current.finishGame("MEX", "USA");
    });

    expect(result.current.games).toHaveLength(0);
  });

  it("should return summary sorted by total score and recent order when scores are equal", () => {
    const { result } = renderHook(() => useScoreBoard());

    act(() => {
      result.current.startGame("POL", "BRA");
      result.current.startGame("GER", "FRA");
      result.current.startGame("ARG", "CAN");
      result.current.startGame("MEX", "USA");
    });

    act(() => {
      result.current.updateScore("POL", "BRA", 10, 2);
      result.current.updateScore("GER", "FRA", 2, 2);
      result.current.updateScore("ARG", "CAN", 6, 6);
      result.current.updateScore("MEX", "USA", 0, 5);
    });

    const { summary } = result.current;

    expect(
      summary.map(
        (game) =>
          `${game.homeTeam} ${game.homeScore} - ${game.awayTeam} ${game.awayScore}`
      )
    ).toEqual([
      "POL 10 - BRA 2",
      "ARG 6 - CAN 6",
      "MEX 0 - USA 5",
      "GER 2 - FRA 2",
    ]);
  });
});
