
//
//  ViewController.swift
//  jobcentre
//
//  Created by Anton McConville on 2016-09-15.
//  Copyright © 2016 Anton McConville. All rights reserved.
//
import UIKit

class ViewController: UIViewController {
    
    let appDelegate = UIApplication.shared.delegate as! AppDelegate
    
    @IBOutlet var username : UITextField!
    
    @IBOutlet var password: UITextField!
    
    @IBAction func login(sender: UIButton) {
        // do something
        
        print(username.text!);
        print(password.text!);
        
        let target = "https://fitchain.mybluemix.net/login";
        
        let url:URL = URL(string: target)!
        let session = URLSession.shared
        
        var request = URLRequest(url: url)
        request.httpMethod = "POST"
        request.cachePolicy = NSURLRequest.CachePolicy.reloadIgnoringCacheData
        
        let paramString = "email=" + username.text! + "&password=" + password.text!;
        request.httpBody = paramString.data(using: String.Encoding.utf8)
        
        let task = session.dataTask(with: request as URLRequest) {
            
            (data, response, error) in
            
            guard let data = data, let _:URLResponse = response  , error == nil else {
                print("error")
                print(response)
                return
            }
            
            let dataString = String(data: data, encoding: String.Encoding.utf8)
            
            let dictionary = self.convertStringToDictionary(text: dataString!)
            
            print(dataString)
            
            print(dictionary)
            
            if let fname = dictionary?["firstName"] {
                self.appDelegate.firstname = fname as! String;
            }
            
            if let lname = dictionary?["lastName"] {
                self.appDelegate.lastname = lname as! String;
            }
            
            if let uname = dictionary?["username"] {
                self.appDelegate.username = uname as! String;
            }
        }
        
        self.performSegue(withIdentifier: "beaconsegue", sender: nil)
        
        task.resume()
    }
    
    override func viewDidLoad() {
        super.viewDidLoad()
        // Do any additional setup after loading the view, typically from a nib.
    }
    
    func convertStringToDictionary(text: String) -> [String:AnyObject]? {
        if let data = text.data(using: String.Encoding.utf8) {
            do {
                return try JSONSerialization.jsonObject(with: data, options: []) as? [String:AnyObject]
            } catch let error as NSError {
                print(error)
            }
        }
        return nil
    }
    
    override func didReceiveMemoryWarning() {
        super.didReceiveMemoryWarning()
        // Dispose of any resources that can be recreated.
    }
}
