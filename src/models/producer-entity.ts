import {OrderPickupSchedule} from './order-pickup-schedule';

export class ProducerEntity {
  id: string;
	name: string;
	webSiteUrl?: string;
	description?: string;
	offerings?: string[];
  orderPickupSchedulesForDelivery?: OrderPickupSchedule[];
  orderPickupSchedulesForPacking?: OrderPickupSchedule[];
  nextUpcomingOrderPickupSchedule?: OrderPickupSchedule;
  
	constructor(json) {
    this.id = json.id;
		this.name = json.name;
    if (json.web_site_url) { this.webSiteUrl = json.web_site_url; }
		if (json.description) { this.description = json.description; }
		if (json.offerings) { this.offerings = json.offerings? json.offerings.split(',') : []; }
    if (json.order_pickup_schedules_for_delivery) {
      this.orderPickupSchedulesForDelivery = [];
      for (let pickup of json.order_pickup_schedules_for_delivery) {
    		this.orderPickupSchedulesForDelivery.push(new OrderPickupSchedule(pickup));
    	};      
    }
    if (json.order_pickup_schedules_for_packing) {
      this.orderPickupSchedulesForPacking = []
      for (let pickup of json.order_pickup_schedules_for_packing) {
    		this.orderPickupSchedulesForPacking.push(new OrderPickupSchedule(pickup));
    	};      
    }
    if (json.next_upcoming_order_pickup_schedule) {
      this.nextUpcomingOrderPickupSchedule = new OrderPickupSchedule(json.next_upcoming_order_pickup_schedule);
    }
	}
}
