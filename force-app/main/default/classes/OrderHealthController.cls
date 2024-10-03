public without sharing class OrderHealthController {
  @AuraEnabled(cacheable=true)
  public static List<Order> getOrderHealth(String recordId) {
    // System.debug('sending order data for id : '+ recordId);
    return [
      SELECT id, (SELECT id, product2.rco__Availability__c FROM OrderItems)
      FROM order
      WHERE id = :recordId
    ];
  }
}
