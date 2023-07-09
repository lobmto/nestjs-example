import { paths } from 'src/schema';

export type MyIdResponse =
  paths['/me/id']['get']['responses']['200']['content']['application/json'];
