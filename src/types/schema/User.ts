import {EAuthStrategy, ERole} from '../enums';

export type User = {
  _id?: string;
  role: ERole;
  authStrategy: EAuthStrategy;
  createdAt?: string | Date;
};

export type ChatUser = {} & User;
