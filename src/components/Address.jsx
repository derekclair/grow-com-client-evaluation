
import React, { PropTypes } from 'react';

import { byCode, stateNames } from '../state_names.js';

const Address = ({ office, state }) => {
	if (!office) { return null; }

	let zip = office.substr(office.length - 5, office.length);

	if (zip[0] === '-') {
		zip = office.substr(office.length - 10, office.length);
	}

	let displayState = 'Washington DC';
	let stateIndex = office.indexOf(byCode[state]);
	let street = '';

	if (stateIndex < 0) {
		stateIndex = office.indexOf(displayState);
	}

	if (stateIndex > 0) {
		street = office.substr(0, stateIndex);
	} else {
		displayState = stateNames[state] || 'unknown';
	}

	return (
		<div className="address">
			{street || 'unknown'}
			<br />
			{displayState}, {zip}
		</div>
	);
};

Address.propTypes = {
	office: PropTypes.string,
	state: PropTypes.string.isRequired,
};

Address.defaultProps = {
	office: '',
};

export default Address;
