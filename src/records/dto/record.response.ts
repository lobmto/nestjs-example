import { paths } from 'src/schema';

export type RecordResponse =
  paths['/records/{id}']['get']['responses'][200]['content']['application/json'];
