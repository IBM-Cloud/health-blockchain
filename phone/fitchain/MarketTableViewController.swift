//
//  MarketTableViewController.swift
//  fitchain
//
//  Created by Anton McConville on 2017-05-09.
//  Copyright © 2017 Anton McConville. All rights reserved.
//

import UIKit

class MarketTableViewController: UITableViewController {
    
    @IBOutlet weak var table: UITableView!
    
    var challenges = Array<Challenge>();    
    
    let appDelegate = UIApplication.shared.delegate as! AppDelegate


    override func viewDidLoad() {
        super.viewDidLoad()
        
        let dark = UIColor(red:0.14, green:0.14, blue:0.17, alpha:1.0)
        navigationController!.navigationBar.barTintColor = dark;
        navigationController!.navigationBar.tintColor = UIColor.white;

        self.buildTestData()
        
        
        // Uncomment the following line to preserve selection between presentations
        // self.clearsSelectionOnViewWillAppear = false
        
        // Uncomment the following line to display an Edit button in the navigation bar for this view controller.
        // self.navigationItem.rightBarButtonItem = self.editButtonItem()
    }
    
    func buildTestData(){
        
        var dateComponents = DateComponents()
        
        dateComponents.year = 2017
        dateComponents.month = 4
        dateComponents.day = 0
        dateComponents.timeZone = TimeZone(abbreviation: "EST")
        dateComponents.hour = 12
        dateComponents.minute = 0
        
        let userCalendar = Calendar.current // user calendar
        
        // - - - - - - -
        
        let startBTW = userCalendar.date(from: dateComponents)
        
        dateComponents.day = 30
        
        let endBTW = userCalendar.date(from: dateComponents)
        
        // - - - - - - -
        
        var bikeToWork = Challenge();
        
        bikeToWork.title = "Bike To Work";
        bikeToWork.start = startBTW;
        bikeToWork.end = endBTW;
        bikeToWork.image = "bike.png"
        bikeToWork.unit = "Days"
        bikeToWork.goal = 31
        bikeToWork.activity = "CYCLING"
        bikeToWork.description = "Earn a water bottle for 10 bike commutes to work"
        
        // - - - - - - -
        
        dateComponents.day = 1
        dateComponents.month = 0
        
        
        let startFFW = userCalendar.date(from: dateComponents)
        
        dateComponents.day = 11
        dateComponents.month = 30
        
        
        let endFFW = userCalendar.date(from: dateComponents)
        
        // - - - - - - -
        
        var fitForWork = Challenge();
        
        fitForWork.title = "Fit For Work";
        fitForWork.start = startFFW;
        fitForWork.end = endFFW;
        fitForWork.image = "skip.png"
        fitForWork.unit = "Days"
        fitForWork.goal = 30
        fitForWork.activity = "ANY"
        fitForWork.description = "$100 health insurance credit for 30 workouts a year"

        
        // - - - - - - -
        
        
        dateComponents.day = 1
        dateComponents.month = 10
        
        
        let startSC = userCalendar.date(from: dateComponents)
        
        dateComponents.day = 30
        dateComponents.month = 3
        dateComponents.year = 2018
        
        let endSC = userCalendar.date(from: dateComponents)

        
        var stairChallenge = Challenge();
        
        stairChallenge.title = "Stair Challenge";
        stairChallenge.start = startSC;
        stairChallenge.end = endSC;
        stairChallenge.image = "stair.png"
        stairChallenge.unit = "Steps"
        stairChallenge.goal = 1000
        stairChallenge.activity = "STAIRS"
        stairChallenge.description = "Bobble hat for 1000 stairs climbed this winte"
        
        // - - - - - - -
        
        dateComponents.day = 1
        dateComponents.month = 1
        
        
        let startRL = userCalendar.date(from: dateComponents)
        
        dateComponents.day = 30
        dateComponents.month = 11
        dateComponents.year = 2017
        
        let endRL = userCalendar.date(from: dateComponents)


        var runnersLife = Challenge();
        
        runnersLife.title = "Runners Life Insurance";
        runnersLife.start = startRL;
        runnersLife.end = endRL;
        runnersLife.image = "skip.png"
        runnersLife.unit = "Steps"
        runnersLife.activity = "STAIRS"
        
        // - - - - - - -
        
        
        var halfMarathon = Challenge();
        
        halfMarathon.title = "Half Marathon Qualifying";
        halfMarathon.start = startRL;
        halfMarathon.end = endRL;
        halfMarathon.image = "skip.png"
        halfMarathon.unit = "Time"
        halfMarathon.goal = 90
        halfMarathon.activity = "RUN"
        
        // - - - - - - -

        challenges.append(bikeToWork)
        challenges.append(fitForWork)
        challenges.append(stairChallenge)
        challenges.append(runnersLife)
        challenges.append(halfMarathon)

        print("built test data")
        
        print ("---------------")
        
        print(challenges);
    }

    override func didReceiveMemoryWarning() {
        super.didReceiveMemoryWarning()
        // Dispose of any resources that can be recreated.
    }

    // MARK: - Table view data source

    override func numberOfSections(in tableView: UITableView) -> Int {
        // #warning Incomplete implementation, return the number of sections
        return 1
    }

    override func tableView(_ tableView: UITableView, numberOfRowsInSection section: Int) -> Int {
        // #warning Incomplete implementation, return the number of rows
        return self.challenges.count;
    }

    override func tableView(_ tableView: UITableView, cellForRowAt indexPath: IndexPath) -> UITableViewCell {
        let cell = tableView.dequeueReusableCell(withIdentifier: "marketCell", for: indexPath)as! MarketTableViewCell


        let rowdata = self.challenges[indexPath.row];
        cell.titleLabel.text = rowdata.title
        
        let rowicon = rowdata.image;
        cell.challengeIcon.image = UIImage(named:rowicon);
        
        cell.about.text = rowdata.description;

        return cell
    }


    /*
    // Override to support conditional editing of the table view.
    override func tableView(_ tableView: UITableView, canEditRowAt indexPath: IndexPath) -> Bool {
        // Return false if you do not want the specified item to be editable.
        return true
    }
    */

    /*
    // Override to support editing the table view.
    override func tableView(_ tableView: UITableView, commit editingStyle: UITableViewCellEditingStyle, forRowAt indexPath: IndexPath) {
        if editingStyle == .delete {
            // Delete the row from the data source
            tableView.deleteRows(at: [indexPath], with: .fade)
        } else if editingStyle == .insert {
            // Create a new instance of the appropriate class, insert it into the array, and add a new row to the table view
        }    
    }
    */

    /*
    // Override to support rearranging the table view.
    override func tableView(_ tableView: UITableView, moveRowAt fromIndexPath: IndexPath, to: IndexPath) {

    }
    */

    /*
    // Override to support conditional rearranging of the table view.
    override func tableView(_ tableView: UITableView, canMoveRowAt indexPath: IndexPath) -> Bool {
        // Return false if you do not want the item to be re-orderable.
        return true
    }
    */

    /*
    // MARK: - Navigation

    // In a storyboard-based application, you will often want to do a little preparation before navigation
    override func prepare(for segue: UIStoryboardSegue, sender: Any?) {
        // Get the new view controller using segue.destinationViewController.
        // Pass the selected object to the new view controller.
    }
    */

}
