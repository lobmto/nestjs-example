export type DailyRecord = {
  date: string;
  records: {
    date: string;
    startedAt: string;
    endedAt: string;
  }[];
};
