import { paths } from 'src/schema';

export type RecordResponse =
  paths['/records/{date}']['get']['responses'][200]['content']['application/json'];
