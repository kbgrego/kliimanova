export interface RequestEntry {
  CaptchaToken?: string;
  Name: string;
  Service: string;
  ContactName: string;
  Email: string;
  Address: string;
}

export interface ServiceRequestResponse {
  success: boolean;
  result?: {
    requestId: string;
    status: string;
    timestamp: string;
  };
  error?: string;
  details?: Record<string, string[]>; // Validation error details from Zod
}
