export class CreateRecordDto {
  // Todo: Validation
  readonly id: string;
  readonly projectId: string;
  readonly start: Date;
  readonly end: Date;
}
