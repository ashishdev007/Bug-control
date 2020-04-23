export enum StageHeaders {
  OPEN = 'Open',
  IN_PROGRESS = 'In Progress',
  TEST_PENDING = 'To be Tested',
  RE_OPENED = 'Re-opened',
  CLOSED = 'Closed',
}

export const StageHeadersObject: StageHeadersObjectType = {
  OPEN: 'Open',
  IN_PROGRESS: 'In Progress',
  TEST_PENDING: 'To be Tested',
  RE_OPENED: 'Re-opened',
  CLOSED: 'Closed',
};

interface StageHeadersObjectType {
  [key: string]: string;
}
