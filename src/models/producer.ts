
import {ProducerEntity} from './producer-entity';

export class Producer {
	id: string;
	email: string;
	firstName: string;
	lastName: string;
	type: string;
  producerEntity: ProducerEntity;
  
	constructor(json: any) {
		this.id = json.id;
		this.firstName = json.first_name;
		this.lastName = json.last_name;
		this.email = json.email;
    if (json.type !== 'Producer') {
      throw new Error('User type not supported:' + json.type);
    }
		this.producerEntity = new ProducerEntity(json.producer_entity);
	}
}
