export interface RequestEntry {
  captchaToken?: string;
  Name: string;
  Service: string;
  ContactName: string;
  Email: string;
  Address: string;
}

export interface ProcessResult {
  requestId: string;
  status: 'PENDING' | 'PROCESSED' | 'FAILED';
  timestamp: string;
}
