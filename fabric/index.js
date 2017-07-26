'use strict';

// TODO :: THESE ARE FOR MOCK CONNECTION .. add later
// const AdminConnection = require('composer-admin').AdminConnection;
// const BrowserFS = require('browserfs/dist/node/index');
// const BusinessNetworkDefinition = require('composer-common').BusinessNetworkDefinition;
// const path = require('path');
// const bfs_fs = BrowserFS.BFSRequire('fs');


const BusinessNetworkConnection = require('composer-client').BusinessNetworkConnection;

// Namespace constants
// TODO :: move into separate "constants" module
const NS = 'fitChain.main';

const NS_OPERATOR = `${NS}.Operator`;
const NS_BUSINESS = `${NS}.Business`;
const NS_ATHLETE = `${NS}.Athlete`;

const NS_CHALLENGE = `${NS}.Challenge`;
const NS_CHALLENGE_ENTRY = `${NS}.ChallengeEntry`;
const NS_ARENA = `${NS}.Arena`;


class FabricConnection {
	// NOTE :: destructuring to make interface explicit.
	// @config = {connectionProfile, businessNetwork}
	constructor() {
		this.config = {};
		this.events = [];
		this.conn = new BusinessNetworkConnection();
	}

	// NOTE :: Default connection values are for the default composer peeradmin user
	connect(connectionProfile = 'hlfv1', businessNetwork = 'fitchain-composer', enrollmentID = 'PeerAdmin', enrollmentSecret = 'password') {
		this.conn = new BusinessNetworkConnection();
		return this.conn.connect(connectionProfile, businessNetwork, enrollmentID, enrollmentSecret).then((networkDefinition) => {
			this.config = {connectionProfile, businessNetwork, enrollmentID};
			this.events = [];
			this.conn.on('event',(e) => {
				this.events.push(e);
			});
			this.factory = this.conn.getBusinessNetwork().getFactory();
			return networkDefinition;
		})
	}

	// set identity used to interact with fabric.
	useIdentity(enrollmentID, enrollmentSecret) {
		const {connectionProfile, businessNetwork} = this.config;
		if (!(connectionProfile && businessNetwork)) throw new Error('Configuration not set.  call connect');
		return this.connect(connectionProfile, businessNetwork, enrollmentID, enrollmentSecret);
	}

	// 
	// @participant is the fully qualified ID of the participant 
	// @enrollmentID is the name of the identity / fabric enrollment
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


module.exports = FabricConnection;