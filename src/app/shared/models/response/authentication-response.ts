import { UserRoles } from "../user-roles.enum";

export interface AuthenticationResponse {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: UserRoles;
  token: string;
}
