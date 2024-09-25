import { api, LightningElement, wire } from "lwc";
import getOrderHealth from "@salesforce/apex/OrderHealthController.getOrderHealth";
import GREEN from "@salesforce/resourceUrl/green";
import RED from "@salesforce/resourceUrl/red";

export default class OrderHealth extends LightningElement {
  @api recordId;
  isHealthGood = true;
  healthIcon = GREEN;
  @wire(getOrderHealth, { recordId: "$recordId" })
  orderData({ data, error }) {
    if (data) {
      if (
        data &&
        data.length > 0 &&
        data[0].OrderItems &&
        data[0].OrderItems.length > 0
      ) {
        for (let i = 0; i < data[0].OrderItems.length; i++) {
          if (
            data[0].OrderItems[i].Product2.rco__Availability__c === "Backorder"
          ) {
            this.isHealthGood = false;
            this.healthIcon = RED;
            break;
          }
        }
      }
    } else if (error) {
      console.log("OH: Do something about it");
    }
  }
}
