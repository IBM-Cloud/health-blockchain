const ARCHIVE_VERSION = '0.0.1';
const ARCHIVE_PATH = `archives/fitchain@${ARCHIVE_VERSION}`;

const NS = 'fitChain.main';

const NS_OPERATOR = `${NS}.Operator`;
const NS_BUSINESS = `${NS}.Business`;
const NS_ATHLETE = `${NS}.Athlete`;

const NS_CHALLENGE = `${NS}.Challenge`;
const NS_CHALLENGE_ENTRY = `${NS}.ChallengeEntry`;
const NS_ARENA = `${NS}.Arena`;



module.exports = {
	ARCHIVE_VERSION,
	ARCHIVE_PATH,

	NS,
	NS_OPERATOR,
	NS_BUSINESS,
	NS_ATHLETE,
	NS_CHALLENGE,
	NS_CHALLENGE_ENTRY,
	NS_ARENA
};