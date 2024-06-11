export interface AccessTokenPayload {
    email: string;
    sub: string; // Typically the user ID
    roles: string[]; // Array of roles
  }
  