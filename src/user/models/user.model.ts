import { Role } from '@roles/roles.enum'; // Adjust the import path as necessary

export class User {
  username: string;
  password: string;
  email: string;
  googleId?: string;
  firstName?: string;
  lastName?: string;
  picture?: string;
  roles: Role[]; // Add roles field
  vendorID?: string;
  orders: string[];
  orderHistory: string[];
}