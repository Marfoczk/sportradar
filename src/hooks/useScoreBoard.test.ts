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
});
