import { prisma } from '../../database/prisma/client';
import { ContactEntity } from './contact.entity';
import { CreateContactRequest, UpdateContactRequest, SearchContactRequest } from './contact.dto';
import { Contact } from '@prisma/client';

export class ContactRepository {
  static async create(username: string, data: CreateContactRequest): Promise<Contact> {
    return prisma.contact.create({
      data: {
        ...data,
        username,
      },
    });
  }

  static async findByIdAndUsername(id: number, username: string): Promise<Contact | null> {
    return prisma.contact.findFirst({
      where: {
        id,
        username,
      },
    });
  }

  static async update(id: number, username: string, data: UpdateContactRequest): Promise<Contact> {
    return prisma.contact.update({
      where: {
        id,
        username,
      },
      data,
    });
  }

  static async delete(id: number, username: string): Promise<Contact> {
    return prisma.contact.delete({
      where: {
        id,
        username,
      },
    });
  }

  static async search(username: string, request: SearchContactRequest): Promise<{ data: Contact[]; total: number }> {
    const filters: any[] = [];

    if (request.name) {
      filters.push({
        OR: [
          {
            first_name: {
              contains: request.name,
            },
          },
          {
            last_name: {
              contains: request.name,
            },
          },
        ],
      });
    }

    if (request.email) {
      filters.push({
        email: {
          contains: request.email,
        },
      });
    }

    if (request.phone) {
      filters.push({
        phone: {
          contains: request.phone,
        },
      });
    }

    const page = request.page || 1;
    const size = request.size || 10;
    const skip = (page - 1) * size;

    const [data, total] = await Promise.all([
      prisma.contact.findMany({
        where: {
          username,
          AND: filters,
        },
        skip,
        take: size,
      }),
      prisma.contact.count({
        where: {
          username,
          AND: filters,
        },
      }),
    ]);

    return { data, total };
  }

  static async countByIdAndUsername(id: number, username: string): Promise<number> {
    return prisma.contact.count({
      where: {
        id,
        username,
      },
    });
  }
}
