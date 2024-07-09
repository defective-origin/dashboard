declare module 'mongoose' {
  interface SchemaOptions {
    /** Add fields: updatedAt, updatedBy, createdAt, createdBy */
    ChangeStamps?: boolean;
  }

  interface Schema {
    /** In order to get options in middleware */
    options: SchemaOptions;
  }
}
