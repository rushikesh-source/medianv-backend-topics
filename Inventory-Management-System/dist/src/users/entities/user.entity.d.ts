import { AppBaseEntity } from '../../common/entities/base.entity';
export declare class User extends AppBaseEntity {
    name: string;
    email: string;
    password: string;
    role: string;
}
