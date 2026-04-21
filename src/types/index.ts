export type Profile = {
  id: string;
  name: string;
  phone_number: string;
  created_at: string;
};

export type Bet = {
  id: string;
  profile_id: string;
  number: string;
  amount: number;
  session: "12:00 PM" | "4:30 PM";
  draw_date: string; // YYYY-MM-DD
  created_at: string;
  created_by: string;
};

export type Result = {
  id: string;
  date: string;
  session: "12:00 PM" | "4:30 PM";
  winning_number: string;
  created_at: string;
  created_by: string;
};

export type AuditLog = {
  id: string;
  action: string;
  details: any;
  created_at: string;
  admin_id: string;
};
