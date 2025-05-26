import { User } from "./user";

export interface MessageType {
  id: number;
  sender: User;
  recipient: User;
  text: string;
  timestamp: string; 
  is_read: boolean;
}
