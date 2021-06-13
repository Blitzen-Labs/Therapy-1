import { EntityRepository, Repository } from 'typeorm';
import { Solicitation } from '../models/solicitation';

@EntityRepository(Solicitation)
class SolicitationRepository extends Repository<Solicitation>{


}

export { SolicitationRepository }