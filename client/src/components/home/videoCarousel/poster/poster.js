// console.log("Importing fundamental modules...");
import React, { Component } from 'react';
// console.log("Importing presentational modules...");
// import logo from '../logo.svg';
import './poster.css';

class Poster extends Component {
	
	constructor(props) {
		super(props);
		
		this.state = {
			poster: {
				style: {
					backgroundImage: `url('${this.props.video.images[0].url}')`
				}
			},
			content: {
				link: this.props.video.contents[0].url,
				title: this.props.video.title
			}
		}
		
	}
	
	render() {
		console.log(this.props.video);
		return (
			<li>
				<div className="poster" style={this.state.poster.style}></div>
				<a href={this.state.content.link}>
					<div className="content">
						<h2>{this.state.content.title}</h2>
					</div>
				</a>
			</li>
		);
	}
	
}

export default Poster;
