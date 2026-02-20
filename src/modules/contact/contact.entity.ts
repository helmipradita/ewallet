import { Contact } from '@prisma/client';

export class ContactEntity {
  constructor(
    public id: number,
    public first_name: string,
    public last_name: string | null,
    public email: string | null,
    public phone: string | null,
    public username: string
  ) {}

  static fromPrisma(data: Contact): ContactEntity {
    return new ContactEntity(
      data.id,
      data.first_name,
      data.last_name,
      data.email,
      data.phone,
      data.username
    );
  }

  toResponse(): import('./contact.dto').ContactResponseDTO {
    return {
      id: this.id,
      first_name: this.first_name,
      last_name: this.last_name,
      email: this.email,
      phone: this.phone,
    };
  }
}
