public without sharing class OrderHealthController {
    
    @AuraEnabled(cacheable=true)
    public static List<Order> getOrderHealth(String recordId){
        System.debug('sending order data for id : '+ recordId);
        return [select id, (select id,product2.rco__Availability__c from OrderItems) from order where id = :recordId];
    }
}