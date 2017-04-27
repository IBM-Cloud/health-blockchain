//
//  StatusViewController.swift
//  fitchain
//
//  Created by Anton McConville on 2017-04-27.
//  Copyright © 2017 Anton McConville. All rights reserved.
//

import UIKit

class StatusViewController: UIViewController {

    override func viewDidLoad() {
        super.viewDidLoad()

        // Do any additional setup after loading the view.
        
        let limpet = UIColor(red:0.61, green:0.85, blue:0.85, alpha:1.0)
        
        let snorkel = UIColor(red:0.00, green:0.31, blue:0.51, alpha:1.0)
        
        let dark = UIColor(red:0.14, green:0.14, blue:0.17, alpha:1.0)
        navigationController!.navigationBar.barTintColor = dark
//        navigationController!.navigationBar.titleTextAttributes = [NSForegroundColorAttributeName: UIColor.white]
//        
        tabBarController!.tabBar.barTintColor = dark
        
        tabBarController!.tabBar.tintColor = snorkel
    }

    override func didReceiveMemoryWarning() {
        super.didReceiveMemoryWarning()
        // Dispose of any resources that can be recreated.
    }
    

    /*
    // MARK: - Navigation

    // In a storyboard-based application, you will often want to do a little preparation before navigation
    override func prepare(for segue: UIStoryboardSegue, sender: Any?) {
        // Get the new view controller using segue.destinationViewController.
        // Pass the selected object to the new view controller.
    }
    */

}
