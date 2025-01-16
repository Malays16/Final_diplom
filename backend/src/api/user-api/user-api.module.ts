import { Module } from '@nestjs/common';
import { UserApiAdminController } from './user-api-admin.controller';
import { UserApiManagerController } from './user-api-manager.controller';
import { UserModule } from 'src/user/user.module';

@Module({
  imports: [UserModule],
  controllers: [UserApiAdminController, UserApiManagerController]
})
export class UserApiModule {}