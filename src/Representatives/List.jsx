/* eslint react/no-array-index-key: 0 */

import React, { PropTypes } from 'react';

import './List.css';

export const ListItem = ({ active, select, name, party }) => (
	<li onClick={select} className={`${party.toLowerCase()} ${active ? 'active' : ''}`}>
		<h3>
			<span>
				({party[0]})
			</span>
			{name}
			{active &&
				<span className="pull-right arrow">
					<i className="ion-ios-arrow-forward" />
				</span>
			}
		</h3>
	</li>
);

ListItem.propTypes = {
	active: PropTypes.bool.isRequired,
	name: PropTypes.string.isRequired,
	party: PropTypes.string,
	select: PropTypes.func.isRequired,
};

ListItem.defaultProps = {
	party: '?',
};

const List = ({
	results,
	select,
}) => {
	return (
		<ul>
			{results.map((rep, i) => (
				<ListItem key={i + rep.district} select={select} {...rep} />
			))}
		</ul>
	);
};

List.propTypes = {
	// branch: PropTypes.oneOf([
	// 	'',
	// 	'senators',
	// 	'representatives',
	// ]).isRequired,
	// state: PropTypes.string.isRequired,
	select: PropTypes.func.isRequired,
};

export default List;
