import { Migration } from '@mikro-orm/migrations';

export class Migration20220207181029 extends Migration {

  async up(): Promise<void> {
    this.addSql('create table "users" ("id" text not null, "name" text not null, "last_name" text not null, "phone" text not null);');
    this.addSql('alter table "users" add constraint "users_pkey" primary key ("id");');
    this.addSql('alter table "users" add constraint "users_phone_unique" unique ("phone");');

    this.addSql('create table "contacts" ("id" text not null, "name" text not null, "phone" text not null, "user_id" text not null);');
    this.addSql('alter table "contacts" add constraint "contacts_pkey" primary key ("id");');

    this.addSql('alter table "contacts" add constraint "contacts_user_id_foreign" foreign key ("user_id") references "users" ("id") on update cascade;');
  }

}
