'use strict';

const AdminConnection = require('composer-admin').AdminConnection;
const BrowserFS = require('browserfs/dist/node/index');
const BusinessNetworkConnection = require('composer-client').BusinessNetworkConnection;
const BusinessNetworkDefinition = require('composer-common').BusinessNetworkDefinition;
const path = require('path');

// TEMPORARY -- use browser FS.
const bfs_fs = BrowserFS.BFSRequire('fs');

var CHALLENGE_REGISTRY = "fitChain.main.Challenge";
var ARENA_REGISTRY = "fitChain.main.Arena";
var BUSINESS_REGISTRY = "fitChain.main.Business";
var ATHLETE_REGISTRY = "fitChain.main.Athlete";
var WALLET_REGISTRY = "fitChain.main.Wallet";
var CHALLENGE_ENTRY_REGISTRY ="fitChain.main.ChallengeEntry";


module.exports = (profile, network, userID, userSecret) => {
	let events = [];
	let businessNetworkConnection;
  	let factory;

    businessNetworkConnection = new BusinessNetworkConnection({
        fs: bfs_fs
	});

	businessNetworkConnection = businessNetworkConnection.connect('hlfv1', 'fitChain.main', identity.userID, identity.userSecret);

	factory = businessNetworkConnection.getBusinessNetwork().getFactory();

  	return {
      issueIdentity: (userID, userSecret) => {
        return businessNetworkConnection.issueIdentity(id, secret);
      },
	  setIdentity: (userID, userSecret) => {
		  return businessNetworkConnection.disconnect()
			.then(() => {
			businessNetworkConnection = new BusinessNetworkConnection({
				fs: bfs_fs
			});
			events = [];
			businessNetworkConnection.on('event', (event) => {
				events.push(event);
			});
			return businessNetworkConnection.connect('hlfv1', 'fitChain.main', userID, userSecret);
			});
    },
    participants: {
      athletes: {
        create: (userID, username, email, profileURL) => {
			let partcipant = factory.newResource('fitChain.main', 'Athlete', userID);
			participant.username = username;
			participant.email = email;
			participant.profileURL = profileURL;

			return businessNetworkConnection.getParticipantRegistry(ATHLETE_REGISTRY).then((r) => {
				r.add(participant);
			});
        },
        get: (id) => {
			return businessNetworkConnection.getParticipantRegistry(ATHLETE_REGISTRY).then((r) => {
				r.get(id);
			});
        },
        all: () => {
			return businessNetworkConnection.getParticipantRegistry(ATHLETE_REGISTRY).then((r) => {
				r.getAll();
			});
        }
      },
	  businesses: {
        create: (userID, username, email, profileURL) => {
			let partcipant = factory.newResource('fitChain.main', 'Business', userID);
			participant.username = username;
			participant.email = email;
			participant.profileURL = profileURL;

			return businessNetworkConnection.getParticipantRegistry(BUSINESS_REGISTRY).then((r) => {
				return r.add(participant);
			});
        },
        get: (id) => {
			return businessNetworkConnection.getParticipantRegistry(BUSINESS_REGISTRY).then((r) => {
				return r.get(id);
			});
        },
        all: () => {
			return businessNetworkConnection.getParticipantRegistry(BUSINESS_REGISTRY).then((r) => {
				return r.getAll();
			});
        }
      },

    },
    assets: {
		challenges: {
			create: (id) => {
				let challenge = factory.newResource('fitChain.main', 'Challlenge', id, {generate: 'sample'});
				return businessNetworkConnection.getParticipantRegistry(CHALLENGE_REGISTRY).then((r) => {
					return r.add(challenge);
				});
			},
			get: (id) => {
				return businessNetworkConnection.getParticipantRegistry(CHALLENGE_REGISTRY).then((r) => {
					return r.get(id);
				});
			},
			all: () => {
				return businessNetworkConnection.getParticipantRegistry(CHALLENGE_REGISTRY).then((r) => {
					return r.getAll();
				});
			}
		},
    },
    transactions: {
		// NOTE :: all txns currently generating fake data.
		issueTokens: (target) => {
			let txn = factory.newTransaction('fitChain.main', 'IssueTokens');
			txn.wallet = target;
			return businessNetworkConnection.submitTransaction(txn);
		},
		publishChallenge: (data) => {
			let txn = factory.newTransaction('fitChain.main', 'PublishChallenge','', {generate: 'sample'});
			return businessNetworkConnection.submitTransaction(txn);
		},
		enterChallenge: (data) => {
			let txn = factory.newTransaction('fitChain.main', 'EnterChallenge','', {generate: 'sample'});
			return businessNetworkConnection.submitTransaction(txn);
		},
		withdrawFromChallenge: (data) => {
			let txn = factory.newTransaction('fitChain.main', 'WithdrawFromChallenge','', {generate: 'sample'});
			return businessNetworkConnection.submitTransaction(txn);
		},
		submitChallengeClaim: (data) => {
			let txn = factory.newTransaction('fitChain.main', 'SubmitChallengeClaim','', {generate: 'sample'});
			return businessNetworkConnection.submitTransaction(txn);
		}
    }
  }
};
