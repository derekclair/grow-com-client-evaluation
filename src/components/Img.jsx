/* eslint jsx-a11y/img-has-alt: 0 */

import React, { Component, PropTypes } from 'react';
import { findDOMNode } from 'react-dom';

export default class Img extends Component {
	constructor(props) {
		super(props);

		const { square } = props;

		// if ()
	}

	componentDidMount() {
		// console.log(findDOMNode(this).clientHeight, findDOMNode(this).clientWidth);
		// const { ...props } = findDOMNode(this);
		const { ...props } = window.getComputedStyle(findDOMNode(this));
		console.log(props);
	}

	render() {
		const otherProps = !this.props.alt ? { role: 'presentation' } : {};

		const { square, ...props } = this.props;

		if (square) {
			// props.style = {
			// 	maxWidth: this.client
			// }
		}


		return (
			<img {...props} {...otherProps} />
		);
	}
}

Img.propTypes = {
	src: PropTypes.string.isRequired,
	alt: PropTypes.string,
	className: PropTypes.string,
	square: PropTypes.bool.isRequired,
	// square: PropTypes.bool,
};

Img.defaultProps = {
	alt: '',
	className: '',
	square: false,
};
