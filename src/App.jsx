
import React, { Component } from 'react';

import Menu from './components/Menu.jsx';
import Representatives from './Representatives/index.jsx';

import './App.css';

export default class App extends Component {
	static reset = {
		senate: false,
		house: false,
	};

	constructor() {
		super();

		this.house = this.viewHouse.bind(this);
		this.senate = this.viewSenate.bind(this);
		this.usState = this.selectState.bind(this);

		this.state = {
			state: '',
			senate: false,
			house: false,
			view: '',
		};

		// ******************************************************* Development Only XXX
		// this.state = {
		// 	// state: 'ut',
		// 	// state: 'ny',
		// 	state: 'al',
		//
		// 	view: 'senators',
		// 	senate: true,
		// 	house: false,
		//
		// 	// view: 'representatives',
		// 	// senate: false,
		// 	// house: true,
		// };
		// ************************************************** END: Development Only XXX
	}

	render() {
		return (
			<div className="root">
				<header>
					<h1>
						Who is my Representative?
					</h1>
					{/* <img src="/images/congress.png" alt="Unitend States Congress" className="congress circle" /> */}
				</header>
				<Menu
					selectState={this.usState}
					viewSenate={this.senate}
					viewHouse={this.house}
					{...this.state}
				/>
				<Representatives
					selectRep={this.show}
					senate={this.state.senate}
					detail={this.state.house}
					branch={this.state.view}
					state={this.state.state}
				/>
			</div>
		);
	}

	selectState(e) { this.setState({ state: e.target.value.toLowerCase() }); }

	viewHouse() {
		this.setState({ ...App.reset, view: 'representatives', house: true });
	}

	viewSenate() {
		this.setState({ ...App.reset, view: 'senators', senate: true });
	}
}
