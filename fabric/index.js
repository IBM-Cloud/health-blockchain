'use strict';

// TODO :: THESE ARE FOR MOCK CONNECTION .. add later
// const AdminConnection = require('composer-admin').AdminConnection;
// const BrowserFS = require('browserfs/dist/node/index');
// const BusinessNetworkDefinition = require('composer-common').BusinessNetworkDefinition;
// const path = require('path');
// const bfs_fs = BrowserFS.BFSRequire('fs');

const fs = require('fs');
const path = require('path');

const AdminConnection = require('composer-admin').AdminConnection;
const BusinessNetworkConnection = require('composer-client').BusinessNetworkConnection;
const BusinessNetworkDefinition = require('composer-common').BusinessNetworkDefinition;

const BrowserFS = require('browserfs/dist/node/index');
const bfs_fs = BrowserFS.BFSRequire('fs');

// Namespace constants
const {
	ARCHIVE_VERSION,
	ARCHIVE_PATH,

	NS,
	NS_OPERATOR,
	NS_BUSINESS,
	NS_ATHLETE,
	NS_CHALLENGE,
	NS_CHALLENGE_ENTRY,
	NS_ARENA 
} = require ('./constants');

class FabricConnection {
	// NOTE :: destructuring to make interface explicit.
	// @config = {connectionProfile, businessNetwork}
	constructor(mock = false) {
		this.config = {};
		this.events = [];
		this.mock = mock;

		this.conn = new BusinessNetworkConnection();
	}

	// NOTE :: Default connection values are for the default composer peeradmin user
	connect(connectionProfile = 'hlfv1', businessNetwork = 'fitchain-composer', enrollmentID = 'PeerAdmin', enrollmentSecret = 'password') {

		let makeConnection;

		if (this.mock) {
			console.log("establishing mock connection");
			makeConnection = this._mockConnect()
		} else {
			this.conn = new BusinessNetworkConnection();			
			makeConnection = this.conn.connect(connectionProfile, businessNetwork, enrollmentID, enrollmentSecret)
		}

		return makeConnection.then((networkDefinition) => {
			console.log("Connection Established")
			console.log(networkDefinition);

			this.config = {connectionProfile, businessNetwork, enrollmentID};
			this.events = [];
			this.conn.on('event',(e) => {
				this.events.push(e);
			});
			this.factory = this.conn.getBusinessNetwork().getFactory();
			return networkDefinition;
		}).catch((e) => {
			console.log(e)
			throw e;
		})
	}

	_mockConnect() {
		const connectionProfile = 'defaultProfile';
		const businessNetwork = 'fitchain';
		const enrollmentID = 'admin';
		const enrollmentSecret = 'adminpw';

		this.config = {
			connectionProfile,
			businessNetwork
		};

		BrowserFS.initialize(new BrowserFS.FileSystem.InMemory());

		// Create a new admin connection.
		const adminConnection = new AdminConnection({
			fs: bfs_fs
		});

		// Create a new connection profile that uses the embedded (in-memory) runtime.
		return adminConnection.createProfile(connectionProfile, {
			type: 'embedded'
		})
		.then(() => {
			console.log("before admin connection")
			// Establish an admin connection. The user ID must be admin. The user secret is
			// ignored, but only when the tests are executed using the embedded (in-memory)
			// runtime.
			return adminConnection.connect(connectionProfile, businessNetwork, enrollmentID, enrollmentSecret);

		})
		.then((r) => {
			console.log(`After the admin connection ${r}`);

			// load fitchain archive file
			// TODO :: include version in bna file; list version in constants;
			return fs.readFile(ARCHIVE_PATH).then((f) => {
				return BusinessNetworkDefinition.fromArchive(f);
			});
		})
		.then((businessNetworkDefinition) => {
			console.log(businessNetworkDefinition)

			// Deploy and start the business network defined by the business network definition.
			return adminConnection.deploy(businessNetworkDefinition);

		})
		.then((r) => {
			console.log("post-deploy")
			console.log(r)

			// Create and establish a business network connection
			this.conn = new BusinessNetworkConnection({
				fs: bfs_fs
			});

			this.events = [];
			this.conn.on('event', (event) => {
				this.events.push(event);
			});

			return this.conn.connect(connectionProfile, connectionProfile, enrollmentID, enrollmentSecret);

		});
	}
	// set identity used to interact with fabric.
	useIdentity(enrollmentID, enrollmentSecret) {

		const {connectionProfile, businessNetwork} = this.config;
		
		if (!(connectionProfile && businessNetwork)) throw new Error('Configuration not set.  call connect');

		this.conn.disconnect().then(() => {
			let options = {};
			if (this.mock) this.options.fs = bfs_fs;
			this.conn = new BusinessNetworkConnection(options);
			this.events = [];
			this.conn.on('event', (event) => {
				this.events.push(event);
			});
			return this.conn.connect(connectionProfile, businessNetwork, enrollmentID, enrollmentSecret);
		});
	}

	// 
	// @participant is the fully qualified ID of the participant 
	// @enrollmentID is the name of the identity / fabric enrollment
	// Current connection identity must have this capability
	issueIdentity(participant, enrollmentID) {
		return this.conn.issueIdentity(participant, enrollmentID);
	}

	//////////////////
	// PARTICIPANTS //
	//////////////////
	

	// @userID
	// @data
	createBusiness(userID, data = {}, generate = false){
		let partcipant = this.factory.newResource(NS, 'Business', userID, {generate: (generate) ? 'sample':'empty'});
		
		const {username, email, profileURL} = data;
		if (username) participant.username = username;
		if (email) participant.email = email;
		if (profileURL) participant.profileURL = profileURL;

		participant.wallet = this.factory.newConcept(NS, 'EmbeddedWallet');

		return this.conn.getParticipantRegistry(NS_BUSINESS).then((r) => {
			return r.add(participant);
		});
	}

	getBusiness(userID){
		return this.conn.getParticipantRegistry(NS_BUSINESS).then((r) => {
			return r.get(userID);
		});
	}

	// TODO :: introduce query scopes.
	listBusinesses(/*scope*/){
		return this.conn.getParticipantRegistry(NS_BUSINESS).then((r) => {
			return r.getAll();
		});
	}

	// @userID
	// @data
	createAthlete(userID, data = {}, generate = false){
		let partcipant = this.factory.newResource(NS, 'Athlete', userID, {generate: (generate) ? 'sample':'empty'});

		const {username, email, profileURL} = data;
		if (username) participant.username = username;
		if (email) participant.email = email;
		if (profileURL) participant.profileURL = profileURL;

		participant.wallet = this.factory.newConcept(NS, 'EmbeddedWallet');		

		return this.conn.getParticipantRegistry(NS_ATHLETE).then((r) => {
			return r.add(participant);
		});
	}

	getAthlete(userID){
		return this.conn.getParticipantRegistry(NS_ATHLETE).then((r) => {
			return r.get(userID);
		});
	}

	listAthletes(/*scope*/){
		return this.conn.getParticipantRegistry(NS_ATHLETE).then((r) => {
			return r.getAll();
		});
	}

	////////////////
	// CHALLENGES //
	////////////////

	newChallenge(challengeID, data = {}, sample = false, includeOptionalFields = true) {
		const options = {
			generate: (sample) ? 'sample':'empty',
			includeOptionalFields
		};

		let challenge = this.factory.newResource(NS, 'Challenge', challengeID, options);

		const {
			name,
			description,
			expiration,
			entryFee,
			tokenReward,
			maxParticipants
		} = data;

		if (name) challenge.name = name;
		if (description) challenge.description = description;
		if (expiration) challenge.expiration = expiration;
		if (entryFee) challenge.entryFee = entryFee;
		if (tokenReward) challenge.tokenReward = tokenReward;
		if (maxParticipants) challenge.maxParticipants = maxParticipants;

		return challenge;
	}

	newChallengeQuantityRequirements(data = {}, sample = false, includeOptionalFields = true) {

		const options = {
			generate: (sample) ? 'sample':'empty',
			includeOptionalFields
		};

		let req = this.factory.newConcept(NS, 'HKQuantityRequirements', options)

		const {
			quantityType,
			quantityOperation,
			value,			
			timeSpan,
		} = data;

		if (quantityType) req.quantityType = quantityType;
		if (quantityOperation) req.quantityOperation = quantityOperation;
		if (value) req.value = value;		
		if (timeSpan) {
			let {start, stop} = timeSpan;
			if (!(start && stop)) throw new Error("Invalid timeSpan attribute; expected {start:TS, stop:TS}");
			req.timeSpan = this.factory.newConcept(NS,'ChallengeTimeSpan');
			req.timeSpan.start = start;
			req.timeSpan.stop = stop;
		}

		return req;
	}

	newChallengeWorkoutRequirements(data = {}, sample = false, includeOptionalFields = true) {

		const options = {
			generate: (sample) ? 'sample':'empty',
			includeOptionalFields
		};
		
		let req = this.factory.newConcept(NS, 'HKWorkoutRequirements', options)

		const {
			workoutType,
			workoutProperty,
			value,
			count,
			timeSpan
		} = data;

		if (workoutType) req.workoutType = workoutType;
		if (workoutProperty) req.workoutProperty = workoutProperty;
		if (value) req.value = value;
		if (count) req.count = count;
		if (timeSpan) {
			let {start, stop} = timeSpan;
			if (!(start && stop)) throw new Error("Invalid timeSpan attribute; expected {start:TS, stop:TS}");
			req.timeSpan = this.factory.newConcept(NS,'ChallengeTimeSpan');
			req.timeSpan.start = start;
			req.timeSpan.stop = stop;
		}
		
		return req;
	}


	createChallenge(challenge, businessID){

		if (!(challenge.quantityRequirements || challenge.workoutRequirements)) {
			throw new Error("Invalid Challenge resource: either quantityRequirements or workoutRequirements must be present");
		}

		challenge.owner = this.factory.newRelationship(NS,'Business', businessID);
		challenge.escrowWallet = this.factory.newConcept(NS,'EmbeddedWallet');
		challenge.entries = [];

		return this.conn.getAssetRegistry(NS_CHALLENGE).then((r) => {
			return r.add(challenge);
		});

	}

	getChallenge(challengeID) {
		return this.conn.getAssetRegistry(NS_CHALLENGE).then((r) => {
			return r.get(challengeID);
		});
	}

	// scope by: ownerID, state, [type, requirements]
	listChallenges(scope = {}) {
		// NOTE :: add other fields here
		const {ownerID, state} = scope;

		let queryString = `SELECT ${NS_CHALLENGE}`;
		const ownerIDString = `WHERE (owner == _$ownerID)`;
		const stateString = `WHERE (state == _$state)`;

		if (ownerID && state) {
			queryString += ` ${ownerIDString} AND ${stateString}`;
		} else if (ownerID) {
			queryString += ` ${ownerIDString}`;
		} else if (state) {
			queryString += ` ${stateString}`;			
		}

		const query = this.conn.buildQuery(queryString);
		return this.conn.query(query, {ownerID, state});
	}

	// get all challenge entries for a 
	// scope: athleteID, [challenge ?]
	getChallengeEntry(challengeEntryID) {
		return this.conn.getAssetRegistry(NS_CHALLENGE_ENTRY).then((r) => {
			return r.get(challengeEntryID);
		});
	}

	// scope : by user ID
	listChallengeEntries(scope = {}) {
		const {athleteID, state} = scope;

		let queryString = `SELECT ${NS_CHALLENGE_ENTRY}`;
		const athleteIDString = `WHERE (owner == _$athleteID)`;
		const stateString = `WHERE (state == _$state)`;

		if (athleteID && state) {
			queryString += ` ${athleteIDString} AND ${stateString}`;
		} else if (athleteID) {
			queryString += ` ${athleteIDString}`;
		} else if (state) {
			queryString += ` ${stateString}`;			
		}

		const query = this.conn.buildQuery(queryString);
		return this.conn.query(query, {athleteID, state});
	}

	////////////////////////////
	// CHALLENGE TRANSACTIONS //
	////////////////////////////	

	// Can ONLY be submitted by a business user against a tranasaction they own.  
	// escrowAmount is optional -- will replace automatic escrow amount for rewards
	businessPublishChallenge(challengeID, arenaID, escrowAmount) {
		// create new challenge transaction.
		let txn = this.factory.newTransaction(NS, 'PublishChallenge');
		txn.challenge = this.factory.newRelationship(NS, 'Challenge', challengeID);
		txn.arena = this.factory.newRelationship(NS, 'Arena', arenaID);
		if (escrowAmount) txn.escrowAmount = escrowAmount;

		return this.conn.submitTransaction(txn);
	}


	athleteEnterChallenge(challengeID, athleteID) {
		let txn = this.factory.newTransaction(NS, 'EnterChallenge');
		txn.challenge = this.factory.newRelationship(NS, 'Challenge', challengeID);
		txn.athlete = this.factory.newRelationship(NS, 'Athlete', athleteID);

		return this.conn.submitTransaction(txn);
	}

	athleteWithdrawFromChallenge(challengeEntryID) {
		let txn = this.factory.newTransaction(NS, 'WithdrawFromChallenge');
		txn.challengeEntry = this.factory.newRelationship(NS, 'Challenge', challengeEntryID);

		// NOTE :: need to confirm that validation rules in ACL can restrict this txn from only entry's user.  I think association will be loaded..
		return this.conn.submitTransaction(txn);
	}

	// TODO :: Add "claim" data once it's determined what that is.
	athleteSubmitChallengeClaim(challengeEntryID) {
		let txn = this.factory.newTransaction(NS, 'SubmitChallengClaim');
		txn.challengeEntry = this.factory.newRelationship(NS, 'Challenge', challengeEntryID);
		txn.claim = this.factory.newConcept(NS, 'ChallengeClaim');
		// NOTE :: need to confirm that validation rules in ACL can restrict this txn from only entry's user.  I think association will be loaded..
		return this.conn.submitTransaction(txn);
	}

	operatorIssueTokens(userID, amount = 0) {
		let txn = this.factory.newTransaction(NS, 'SubmitChallengeClaim');
		txn.recipient = this.factory.newRelationship(NS, 'Business', userID);
		txn.amount = amount;
		return this.conn.submitTransaction(txn);
	}

}

module.exports = {FabricConnection};