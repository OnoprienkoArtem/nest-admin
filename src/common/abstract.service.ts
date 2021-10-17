import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { PaginatedResult } from './models/paginated-result.interface';

@Injectable()
export abstract class AbstractService {
  protected constructor(protected readonly repository: Repository<any>) {}

  async paginate(page = 1): Promise<PaginatedResult> {
    const take = 15;
    const [data, total] = await this.repository.findAndCount({
      take,
      skip: (page - 1) * take,
    });

    return {
      data,
      meta: {
        total,
        page,
        last_page: Math.ceil(total / take),
      },
    };
  }

  async all(): Promise<any[]> {
    return this.repository.find();
  }

  // async create(data): Promise<User> {
  //   return this.userRepository.save(data);
  // }
  //
  // async findOne(condition): Promise<User> {
  //   return this.userRepository.findOne(condition);
  // }
  //
  // async update(id: number, data): Promise<any> {
  //   return this.userRepository.update(id, data);
  // }
  //
  // async delete(id: number): Promise<any> {
  //   return this.userRepository.delete(id);
  // }
}
