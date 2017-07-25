import { Component } from '@angular/core';

import { NavParams } from 'ionic-angular';
import { AuthService } from '../../services/auth.service';
import { OrderPickupSchedule } from '../../models/order-pickup-schedule';
import _  from 'lodash';

@Component({
	selector: 'page-orders',
	templateUrl: 'orders.html'
})
export class OrdersPage {

  orderPickupSchedule: OrderPickupSchedule;
  by: string = "producer";
  wholesellers: any[];
  hasOrdersForDelivery: boolean;
  hasOrdersForPacking: boolean;
  currentProducerEntityId: string;

	constructor(
    private navParams: NavParams,
		private authService: AuthService) {
      this.orderPickupSchedule = navParams.get('orderPickupSchedule');
      this.hasOrdersForDelivery = navParams.get('hasOrdersForDelivery');
      this.hasOrdersForPacking = navParams.get('hasOrdersForPacking');
      this.currentProducerEntityId = navParams.get('currentProducerEntityId');
      this.getFoodItemsByWholeseller();
	}

	ionViewCanEnter() {
		return this.authService.isAuthenticated();
	}
  
  getFoodItemsByWholeseller() :any {

    // first get all food items
    let foodItems = _.flatMap(this.orderPickupSchedule.orders, function(order) { return order.foodItems; } );

    //combine same food item and increase quantity ordered
    let foodItemGroups = _.groupBy(foodItems, 'sellableFoodItemId');
    let uniqueFoodItems = _.map(_.keys(foodItemGroups), function(sellableFoodItemId) { 
      let totalQuantityOrdered = _.reduce(foodItemGroups[sellableFoodItemId], function(sum, item) { return sum + item.quantityOrdered; }, 0);
      let foodItem = _.clone(foodItemGroups[sellableFoodItemId][0]);
      foodItem.quantityOrdered = totalQuantityOrdered;
      return foodItem;
    });
          
    let groupedByWholeseller = _.groupBy(uniqueFoodItems, 'wholeseller.id');
    
    let wholesellers = _.map(_.keys(groupedByWholeseller), function(wholesellerId) { 
      let wholeseller = _.clone(groupedByWholeseller[wholesellerId][0].wholeseller);
      wholeseller.foodItems = _.clone(groupedByWholeseller[wholesellerId]);
      return wholeseller;
    });
    let currentProducerEntityId = this.currentProducerEntityId;
    this.wholesellers = _.sortBy(wholesellers, function(wholeseller) { return wholeseller.id != currentProducerEntityId; });
  }


}
