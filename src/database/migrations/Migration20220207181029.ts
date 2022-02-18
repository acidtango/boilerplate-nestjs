import { DatabaseConnection } from '../DatabaseConnection'

export async function up(db: DatabaseConnection): Promise<void> {
  await db.schema
    .createTable('users')
    .addColumn('id', 'varchar(36)', (col) => col.primaryKey())
    .addColumn('name', 'varchar(255)', (col) => col.notNull())
    .addColumn('last_name', 'varchar(255)', (col) => col.notNull())
    .addColumn('phone', 'varchar(255)', (col) => col.notNull().unique())
    .execute()

  await db.schema
    .createTable('contacts')
    .addColumn('name', 'varchar(255)', (col) => col.notNull())
    .addColumn('phone', 'varchar(255)', (col) => col.notNull())
    .addColumn('user_id', 'varchar(36)', (col) =>
      col.references('users.id').onDelete('cascade').notNull()
    )
    .execute()

  await db.schema.createIndex('contacts_user_id_index').on('contacts').column('user_id').execute()
}

export async function down(db: DatabaseConnection): Promise<void> {
  await db.schema.dropTable('contacts').execute()
  await db.schema.dropTable('users').execute()
}
