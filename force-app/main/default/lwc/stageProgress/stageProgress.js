import { api, LightningElement, wire } from "lwc";
import { getPicklistValues } from "lightning/uiObjectInfoApi";
import STATUS from "@salesforce/schema/Order.Status";
import { getRecord } from "lightning/uiRecordApi";

const FIELDS = ["Order.Status"];

export default class StageProgress extends LightningElement {
  @api recordId;
  status;

  @wire(getRecord, { recordId: "$recordId", fields: FIELDS })
  order({ data, error }) {
    if (data) {
      console.log("Order" + JSON.stringify(data));
      this.status = data.fields.Status.value;
    }
    if (error) {
      console.log("Do something about it");
    }
  }

  nextStep() {
    this.status = "Fullfilment";
  }

  // get status() {
  //     if(this.order && this.order.data)
  //     {
  //         console.log(
  //         JSON.stringify(this.order.data));
  //         return this.order.data.fields.Status.value;
  //     }
  //     return "";
  // }

  @wire(getPicklistValues, {
    recordTypeId: "012000000000000AAA",
    fieldApiName: STATUS
  })
  statusValues({ data, error }) {
    if (data) {
      console.log(JSON.stringify(data.values));
      this.steps = data.values;
    } else if (error) {
      console.log("Do something about it");
    }
  }

  steps = [
    { label: "Contacted", value: "step-1" },
    { label: "Open", value: "step-2" },
    { label: "Unqualified", value: "step-3" },
    { label: "Nurturing", value: "step-4" },
    { label: "Closed", value: "step-5" }
  ];

  connectedCallback() {
    console.log("status received => " + JSON.stringify(this.statusValues));
    if (this.statusValues.data && this.statusValues.data.values.length > 0) {
      this.steps = this.statusValues.data.values.map((value) => ({
        label: value.label,
        value: value.value
      }));
    }
  }
}
