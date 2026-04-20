export interface Merchant {
  bankcode: string;
  iin: number;
  merchantname: string;
  LocationAddress: string;
  SupportCrossBorder: boolean;
  status: boolean;
  mapped?: boolean; // Optional, as it might not always be present
}

export interface ApiResponse {
  data: Merchant[]; // Array of merchants
  mapped?: boolean; // Optional mapped status per item
}