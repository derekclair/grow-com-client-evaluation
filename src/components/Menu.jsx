
import React, { PropTypes } from 'react';

import { states } from '../state_names.js';

import './Menu.css';

const Menu = ({ view, senate, house, viewSenate, viewHouse, selectState }) => (
	<menu>
		<span className="text-fancy text-center">
			in the
		</span>
		<div className={`congressional-branch view-${view}`}>
			<div onClick={viewSenate} className="logo-container" id="senate">
				<img alt="" className="senate circle" />
				Senate
			</div>

			<div className={!senate && !house ? 'text-fancy' : 'divider'}>
				{!senate && !house &&
					<span className="or">- or -</span>
				}
			</div>

			<div onClick={viewHouse} className="logo-container" id="house">
				House of
				<br />
				Representatives
				<img alt="" className="house circle" />
			</div>
		</div>
		<form>
			<div className="form-group">
				<span className="text-fancy">from</span>
				<div className="select">
					<select onChange={selectState} className="form-control">
						<option value="">Select Your State</option>
						{states.map(({ value, name }) => (
							<option key={value} value={value}>{name}</option>
						))}
					</select>
				</div>
			</div>
		</form>
	</menu>
);

Menu.propTypes = {
	view: PropTypes.string.isRequired,
	house: PropTypes.bool.isRequired,
	senate: PropTypes.bool.isRequired,
	selectState: PropTypes.func.isRequired,
	viewSenate: PropTypes.func.isRequired,
	viewHouse: PropTypes.func.isRequired,
};

export default Menu;
