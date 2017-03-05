
import React, { PropTypes } from 'react';

import Address from '../components/Address.jsx';
import { byCode } from '../state_names.js';
import ordinal from '../ordinal_number.js';

import './Detail.css';

const Detail = ({
	name,
	party,
	district,
	phone,
	link,
	...props
}) => (
	<div className={`${party.toLowerCase()} detail`}>
		{!!district &&
			<div className="district">
				{byCode[props.state]} {ordinal(district)} District
				{/* {ordinal(district)} District */}
			</div>
		}
		<h3>
			<span>
				({party[0]})
			</span>
			{name}
		</h3>
		<div>
			<a className="tel" href={`tel:1-${phone}`}>
				<i className="ion-ios-telephone" />
				{phone}
			</a>
			<Address {...props} />
			<a href={link} target="_blank">
				<i className="ion-ios-world-outline" />
				web
			</a>
		</div>
	</div>
);

Detail.propTypes = {
	name: PropTypes.string.isRequired,
	party: PropTypes.oneOf([
		'Republican',
		'Democrat',
	]).isRequired,
	district: PropTypes.string.isRequired,
	phone: PropTypes.string,
	office: PropTypes.string.isRequired,
	link: PropTypes.string.isRequired,
};

Detail.defaultProps = {
	phone: '',
};

export default Detail;
