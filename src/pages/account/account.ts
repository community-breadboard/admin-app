import { Component } from '@angular/core';

import { NavController } from 'ionic-angular';
import { DataService } from '../../services/data.service';
import { AuthService } from '../../services/auth.service';
import { LoginPage } from '../login/login';
import { State } from '../../models/state';
@Component({
	selector: 'page-account',
	templateUrl: 'account.html'
})
export class AccountPage {

	state: State;

	constructor(
		public navCtrl: NavController,
		private dataService: DataService,
		private authService: AuthService) {
	}

	logout() {
		this.authService.logout();
		this.navCtrl.setRoot(LoginPage);
	}

	ionViewCanEnter() {
		return this.authService.isAuthenticated();
	}


}
