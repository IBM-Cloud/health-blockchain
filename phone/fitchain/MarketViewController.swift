//
//  MarketViewController.swift
//  fitchain
//
//  Created by Anton McConville on 2017-04-27.
//  Copyright © 2017 Anton McConville. All rights reserved.
//

import UIKit

class MarketViewController: UIViewController {

    override func viewDidLoad() {
        super.viewDidLoad()

        let dark = UIColor(red:0.14, green:0.14, blue:0.17, alpha:1.0)
        navigationController!.navigationBar.barTintColor = dark;
        navigationController!.navigationBar.tintColor = UIColor.white;
        tabBarController!.tabBar.barTintColor = dark;
        tabBarController!.tabBar.tintColor = UIColor.white;

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
