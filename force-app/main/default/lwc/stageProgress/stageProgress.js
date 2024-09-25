import { api, LightningElement, wire } from "lwc";
import { getPicklistValues } from "lightning/uiObjectInfoApi";
import STATUS from "@salesforce/schema/Order.Status";
import ID_FIELD from "@salesforce/schema/Order.Id";
import { getRecord } from "lightning/uiRecordApi";
import { updateRecord } from "lightning/uiRecordApi";
import { ShowToastEvent } from "lightning/platformShowToastEvent";
import { refreshApex } from "@salesforce/apex";

const FIELDS_WANTED = ["Order.Status"];

export default class StageProgress extends LightningElement {
  @api recordId;
  status;

  @wire(getRecord, { recordId: "$recordId", fields: FIELDS_WANTED })
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
    console.log("this status = "+ this.status);
    if(this.status === "New")
    {
        this.status = "Fullfilment";
        const fields = {};
        fields[ID_FIELD.fieldApiName] = this.recordId;
        fields[STATUS.fieldApiName] = this.status;

        const toUpdate = { fields };

        console.log("to update "+ JSON.stringify(toUpdate));
        
        updateRecord(toUpdate)
            .then( () => {
                console.log("success");
                 this.dispatchEvent(
                     new ShowToastEvent({
                       title: "Success",
                       message: "Order Stage updated",
                       variant: "success",
                     }),
                   );
                   // Display fresh data in the form
                   return refreshApex(this.order);
            })
            .catch((error) => {
                console.log("Do something, couldn't update!"+ JSON.stringify(error));
                 this.dispatchEvent(
                     new ShowToastEvent({
                       title: "Error updating record",
                       message: error.body.message,
                       variant: "error",
                     }),
                   );
            });
            console.log("after update record");
    }
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

  steps = [];

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
