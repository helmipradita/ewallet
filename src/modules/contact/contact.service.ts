import { ContactRepository } from './contact.repository';
import { ContactEntity } from './contact.entity';
import { CreateContactRequest, UpdateContactRequest, SearchContactRequest } from './contact.dto';
import { Validation } from '../../common/validation/validation';
import { ContactValidation } from './contact.validation';
import { ResponseError } from '../../common/error/response-error';
import { UserEntity } from '../user/user.entity';

export class ContactService {
  static async create(user: UserEntity, request: CreateContactRequest): Promise<ContactEntity> {
    const createRequest = Validation.validate(ContactValidation.CREATE, request) as CreateContactRequest;

    const contact = await ContactRepository.create(user.username, createRequest);
    return ContactEntity.fromPrisma(contact);
  }

  static async get(user: UserEntity, id: number): Promise<ContactEntity> {
    const contact = await ContactRepository.findByIdAndUsername(id, user.username);
    if (!contact) {
      throw new ResponseError(404, 'Contact not found');
    }

    return ContactEntity.fromPrisma(contact);
  }

  static async update(user: UserEntity, id: number, request: UpdateContactRequest): Promise<ContactEntity> {
    const updateRequest = Validation.validate(ContactValidation.UPDATE, request) as UpdateContactRequest;

    const contact = await ContactRepository.findByIdAndUsername(id, user.username);
    if (!contact) {
      throw new ResponseError(404, 'Contact not found');
    }

    const updated = await ContactRepository.update(id, user.username, updateRequest);
    return ContactEntity.fromPrisma(updated);
  }

  static async delete(user: UserEntity, id: number): Promise<void> {
    const contact = await ContactRepository.findByIdAndUsername(id, user.username);
    if (!contact) {
      throw new ResponseError(404, 'Contact not found');
    }

    await ContactRepository.delete(id, user.username);
  }

  static async search(user: UserEntity, request: SearchContactRequest): Promise<{ data: ContactEntity[]; paging: { current_page: number; total_page: number; size: number } }> {
    const searchRequest = Validation.validate(ContactValidation.SEARCH, request) as SearchContactRequest;

    const page = searchRequest.page || 1;
    const size = searchRequest.size || 10;

    const result = await ContactRepository.search(user.username, {
      ...searchRequest,
      page,
      size,
    });

    const totalPage = Math.ceil(result.total / size);

    return {
      data: result.data.map((c) => ContactEntity.fromPrisma(c)),
      paging: {
        current_page: page,
        total_page: totalPage,
        size,
      },
    };
  }
}
