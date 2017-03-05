/* eslint react/no-array-index-key: 0 */

import React, { Component, PropTypes } from 'react';

import ErrorMsg from '../components/Error.jsx';
import stateName from '../state_names.js';
import { ListItem } from './List.jsx';
import Detail from './Detail.jsx';

import './Representatives.css';

export default class Representatives extends Component {
	constructor() {
		super();

		this.state = {
			// loading: true, // XXX: Development Only
			loading: false,
			selected: null,
			results: [],
		};
	}

	// ********************************************************* Development Only XXX
	// componentDidMount() {
	// 	console.log('Representatives.componentDidMount()');
	//
	// 	this.setState({ loading: true });
	//
	// 	const { branch, state } = this.props;
	//
	// 	fetch(`/${branch}/${state}`)
	// 	.then((response) => response.json())
	// 	.then(({ results }) => this.setState({ results, loading: false }));
	// }
	// **************************************************** END: Development Only XXX

	componentWillReceiveProps({ branch, state }) {
		if (branch !== this.props.branch || state !== this.props.state) {
			this.setState({ loading: true });
		}

		if (branch !== this.props.branch) {
			this.setState({ selected: null, results: [] });
		}

		if (!!branch && !!state) {
			fetch(`/${branch}/${state}`)
			.then((response) => response.json())
			.then(({ results }) => this.setState({ results, loading: false }));
			// .then(({ results }) => this.setState({ loading: false })); // XXX NOTE: Test Error
		}
	}

	render() {
		const { results, loading } = this.state;
		let { branch } = this.props;

		if (!this.props.branch || !this.props.state) {
			return null;
		}

		if (loading) {
			return <div className="loading">Loading...</div>;
		}

		if (!results || !results.length) {
			return <ErrorMsg branch={branch} />;
		}

		branch = `${branch[0].toUpperCase()}${branch.slice(1, branch.length)}`;

		return (
			<main id={this.props.branch}>
				<h3>
					{stateName(this.props.state)} {branch}
				</h3>

				<div>
					{this.props.senate ?
						results.map((rep, i) => (
							<Detail
								key={i + rep.district}
								{...this.props}
								{...rep}
							/>
						))
						:
						<ul>
							{results.map((rep, i) => {
								const { selected } = this.state;
								const active = selected ? selected.index === i : false;

								return (
									<ListItem
										key={i + rep.district}
										select={this.selectRep.bind(this, { index: i, ...rep })}
										active={active}
										{...rep}
									/>
								);
							})}
						</ul>
					}
					{this.state.selected &&
						<Detail
							state={this.props.state}
							{...this.state.selected}
						/>
					}

				</div>

				<div className="footer">
					<span className="blue">(D)</span>emocrat
					<br />
					<span className="red">(R)</span>republican
				</div>
			</main>
		);
	}

	selectRep(selected) { this.setState({ selected }); }
}

Representatives.propTypes = {
	branch: PropTypes.oneOf([
		'',
		'senators',
		'representatives',
	]).isRequired,
	state: PropTypes.string.isRequired,
};
