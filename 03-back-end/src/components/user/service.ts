import UserModel from './model';
import IModelAdapterOptions from '../../common/IModelAdapterOptions.interface';
import BaseService from '../../common/BaseService';

class UserModelAdapterOptions implements IModelAdapterOptions {
    loadOrders: boolean = false;
}

class UserService extends BaseService<UserModel> {
    protected async adaptModel(
        data: any,
        options: Partial<UserModelAdapterOptions>
    ): Promise<UserModel> {
        const item = new UserModel();

        item.userId            = +(data?.user_id);
        item.email             =   data?.email;
        item.createdAt         = new Date(data?.created_at);
        item.passwordHash      =   data?.password_hash;
        item.passwordResetCode =   data?.password_reset_code;
        item.forename          =   data?.forename;
        item.surname           =   data?.surname;
        item.phoneNumber       =   data?.phone_number;
        item.postalAddress     =   data?.postal_address;
        item.isActive          = +(data?.is_active) === 1;

        if (options.loadOrders) {
            // ...
        }

        return item;
    }

    public async getAll(): Promise<UserModel[]> {
        return await this.getAllFromTable("user", {}) as UserModel[];
    }

    public async getById(userId: number): Promise<UserModel|null> {
        return await this.getByIdFromTable("user", userId, {}) as UserModel|null;
    }

    public async getByEmail(email: string): Promise<UserModel|null> {
        const users = await this.getAllByFieldNameFromTable("user", "email", email, {});

        if (!Array.isArray(users) || users.length === 0) {
            return null;
        }

        return users[0];
    }
}
export default UserService;