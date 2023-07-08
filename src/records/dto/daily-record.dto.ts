import { TimeRecord } from './record.dto';

export type DailyRecord = {
  date: string;
  records: TimeRecord[];
};
