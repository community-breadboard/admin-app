import {OrderPickupSchedule} from './order-pickup-schedule';

export class ProducerEntity {
	name: string;
	webSiteUrl: string;
	description: string;
	offerings: string[];
  orderPickupSchedulesForDelivery: OrderPickupSchedule[];
  orderPickupSchedulesForPacking: OrderPickupSchedule[];
  nextUpcomingOrderPickupSchedule: OrderPickupSchedule;
  
	constructor(json) {
		this.name = json.name;
		this.webSiteUrl = json.web_site_url;
		this.description = json.description;
		this.offerings = json.offerings? json.offerings.split(',') : [];
    this.orderPickupSchedulesForDelivery = [];
    for (let pickup of json.order_pickup_schedules_for_delivery) {
  		this.orderPickupSchedulesForDelivery.push(new OrderPickupSchedule(pickup));
  	};
    this.orderPickupSchedulesForPacking = []
    for (let pickup of json.order_pickup_schedules_for_packing) {
  		this.orderPickupSchedulesForPacking.push(new OrderPickupSchedule(pickup));
  	};
    if (json.next_upcoming_order_pickup_schedule) {
      this.nextUpcomingOrderPickupSchedule = new OrderPickupSchedule(json.next_upcoming_order_pickup_schedule);
    }
	}
}
