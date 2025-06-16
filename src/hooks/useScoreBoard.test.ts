import { describe, it, expect } from 'vitest';
import { useScoreBoard } from './useScoreBoard';
import { act, renderHook } from '@testing-library/react';

describe('useScoreBoard', () => {
  it('should start a new game and update the state', () => {
    const { result } = renderHook(() => useScoreBoard());

    act(() => {
      result.current.startGame('POL', 'ENG');
    });

    expect(result.current.games).toHaveLength(1);
    expect(result.current.games[0]).toMatchObject({
      homeTeam: 'POL',
      awayTeam: 'ENG',
      homeScore: 0,
      awayScore: 0,
    });
  });

  it('should throw an error when trying to start a duplicate game', () => {
    const { result } = renderHook(() => useScoreBoard());

    act(() => {
      result.current.startGame('POL', 'ENG');
    });

    expect(() => {
      act(() => {
        result.current.startGame('POL', 'ENG');
      });
    }).toThrowError('Game already exists');
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
});
