import { UserRoles } from './user-roles.enum';

export class User {

  constructor(
    public id: string,
    public email: string,
    public firstName: string,
    public lastName: string,
    public role: UserRoles,
    public token: string) {
  }
}
