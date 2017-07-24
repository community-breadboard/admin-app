
import { Injectable } from '@angular/core';
import { State } from '../models/state';
import { Observable } from 'rxjs/Observable';
import { Response }  from '@angular/http';
import { Storage } from "@ionic/storage";
import { AuthHttp } from 'angular2-jwt';
import { Producer } from '../models/producer';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/observable/throw';
import _ from "lodash";


@Injectable()
export class DataService {

	baseUrl: string = 'http://localhost:3000';
	authUrl = this.baseUrl + '/user_token';
	currentUserUrl = this.baseUrl + '/current_producer';

	state: State = new State();


	public handleError (error: Response | any) {
		// In a real world app, you might use a remote logging infrastructure
		let errMsg: string;
		if (error instanceof Response) {
			const body = error.json() || '';
			const err = JSON.stringify(body);
			errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
		} else {
			errMsg = error.message ? error.message : error.toString();
		}
		console.error(errMsg);
		return Observable.throw(errMsg);
	}

	constructor (
		private storage: Storage,
		private authHttp: AuthHttp,
	) {}

}
