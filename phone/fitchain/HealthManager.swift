import Foundation
import HealthKit

class HealthManager {
    
    let healthStore: HKHealthStore = HKHealthStore()
    
    var enablement:Bool = false;
    
    func authorizeHealthKit() -> Bool{
     
        if HKHealthStore.isHealthDataAvailable(){
            
            let stepsCount = NSSet(object:HKQuantityType.quantityType(forIdentifier:HKQuantityTypeIdentifier.stepCount)!)
            
            healthStore.requestAuthorization(toShare: nil, read:(stepsCount as! Set<HKObjectType>), completion: self.checkAuthorization)
        }
        
        return enablement;
    }
    
    func checkAuthorization(success:Bool, error:Error?) -> Void{
    
        enablement = success;
    }
}
