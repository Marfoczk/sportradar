export interface Match {
  homeTeam: string;
  awayTeam: string;
  homeScore: number;
  awayScore: number;
  addedAt: number;
}

export type ScoreBoardState = Match[];