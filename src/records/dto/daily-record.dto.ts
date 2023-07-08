export type DailyRecord = {
  date: string;
  records: {
    label: string;
    startedAt: string;
  }[];
};
