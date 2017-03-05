
import React, { PropTypes } from 'react';

const ErrorMessage = ({ branch }) => (
	<div className="error">
		<span>ERROR:</span>
		<br />
		{branch[0].toUpperCase()}{branch.slice(1, branch.length)} Not Found
	</div>
);

ErrorMessage.propTypes = {
	branch: PropTypes.string,
};

ErrorMessage.defaultProps = {
	branch: 'representatives',
};

export default ErrorMessage;
