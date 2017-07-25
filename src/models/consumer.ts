
export class Consumer {
	id: string;
	email: string;
	firstName: string;
	lastName: string;
  
	constructor(json: any) {
		this.id = json.id;
		this.firstName = json.first_name;
		this.lastName = json.last_name;
		this.email = json.email;
	}
}
