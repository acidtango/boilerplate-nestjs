import { Migration } from '@mikro-orm/migrations';

export class Migration20210806212059 extends Migration {

  async up(): Promise<void> {
    this.addSql('create table "users" ("id" varchar(36) not null, "name" varchar(255) not null, "last_name" varchar(255) not null, "phone" varchar(255) not null);');
    this.addSql('alter table "users" add constraint "users_pkey" primary key ("id");');

    this.addSql('create table "contacts" ("id" varchar(36) not null, "name" varchar(255) not null, "phone" varchar(255) not null, "user_id" varchar(36) not null);');
    this.addSql('alter table "contacts" add constraint "contacts_pkey" primary key ("id");');

    this.addSql('alter table "contacts" add constraint "contacts_user_id_foreign" foreign key ("user_id") references "users" ("id") on update cascade;');

    this.addSql('alter table "users" add constraint "users_phone_unique" unique ("phone");');
  }

}
