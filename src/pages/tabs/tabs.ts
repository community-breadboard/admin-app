
import { Component } from '@angular/core';
import { HomePage } from '../home/home';
import { AccountPage } from '../account/account';
import { ServiceDaysPage } from '../serviceDays/serviceDays';
import { DataService } from '../../services/data.service';
import { AuthService } from '../../services/auth.service';


@Component({
	templateUrl: 'tabs.html'
})
export class TabsPage {

	tab1Root: any = HomePage;
	tab2Root: any = ServiceDaysPage;
	tab3Root: any = AccountPage;

	constructor(
		private dataService: DataService,
		private authService: AuthService) {}


	ionViewCanEnter() {
		return this.authService.isAuthenticated();
	}

}
