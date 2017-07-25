import { Component, OnInit } from '@angular/core';
import { NavController, Platform } from 'ionic-angular';
import { State } from '../../models/state';
import { OrdersPage } from '../orders/orders';
import { DataService } from '../../services/data.service';
import { AuthService } from '../../services/auth.service';
import { UiService } from '../../services/ui.service';

@Component({
	selector: 'page-home',
	templateUrl: 'home.html'
})

export class HomePage implements OnInit {

  isAndroid: boolean = false;
	
	state:State = {};
  hasOrdersForDelivery: boolean;
  hasOrdersForPacking: boolean;
  
	ionViewCanEnter() {
		return this.authService.isAuthenticated();
	}
  
  ngOnInit(): void {
    this.state = this.dataService.state;
//    console.log("state=", this.state);
    this.hasOrdersForDelivery = (this.state.producer.producerEntity.orderPickupSchedulesForDelivery.length > 0);
    this.hasOrdersForPacking = (this.state.producer.producerEntity.orderPickupSchedulesForPacking.length > 0);
  }

  pickupSelected(pickup): void {
    this.navCtrl.push(OrdersPage, {orderPickupSchedule: pickup, hasOrdersForDelivery: this.hasOrdersForDelivery, hasOrdersForPacking: this.hasOrdersForPacking, currentProducerEntityId: this.state.producer.producerEntity.id});
  }
	constructor(
		public navCtrl: NavController,
		platform: Platform,
		private dataService: DataService,
		private authService: AuthService,
		private uiService: UiService) {

		this.isAndroid = platform.is('android');
	}


}
