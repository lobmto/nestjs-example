import { paths } from 'src/schema';

export type LoginResponse =
  paths['/auth']['post']['responses']['200']['content']['application/json'];
