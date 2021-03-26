import { Professional } from '../models/Professional';
import { EntityRepository, Repository } from 'typeorm';

@EntityRepository(Professional)
class ProRepository extends Repository<Professional>{


}

export { ProRepository }