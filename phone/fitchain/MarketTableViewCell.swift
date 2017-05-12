//
//  MarketTableViewCell.swift
//  fitchain
//
//  Created by Anton McConville on 2017-05-12.
//  Copyright © 2017 Anton McConville. All rights reserved.
//

import UIKit

class MarketTableViewCell: UITableViewCell {
    
    @IBOutlet weak var challengeIcon: UIImageView!
    @IBOutlet weak var titleLabel: UILabel!
    @IBOutlet weak var endLabel: UILabel!
    @IBOutlet weak var beginLabel: UILabel!
    @IBOutlet weak var about:UITextView!

    override func awakeFromNib() {
        super.awakeFromNib()
        // Initialization code
    }

    override func setSelected(_ selected: Bool, animated: Bool) {
        super.setSelected(selected, animated: animated)

        // Configure the view for the selected state
    }

}













