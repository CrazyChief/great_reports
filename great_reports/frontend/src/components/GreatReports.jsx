import React, { Component } from 'react';
import {Link} from 'react-router-dom';


export default class GreatReports extends Component {
	render() {
		return (
			<div>
				<h2>Welcome to Great Reports!</h2>
				<p>
					<Link to="/contact">Click Here</Link> to contact us!
				</p>
			</div>
		)
	}
}
