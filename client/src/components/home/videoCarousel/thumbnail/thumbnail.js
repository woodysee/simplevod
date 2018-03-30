// console.log("Importing fundamental modules...");
import React, { Component } from 'react';
// console.log("Importing presentational modules...");
// import logo from '../logo.svg';
import './thumbnail.css';

class Thumbnail extends Component {
	
	constructor(props) {
		super(props);

		this.state = {
			thumbnail: {
				img: {
					style: {
						backgroundImage: "url('http://lewihussey.com/codepen-img/orangeisthenewblack.jpg')"
					}
				},
				content: {
					title: "Orange Is The New Black"
				}
			}
		}
		
	}
	
	render() {
		return (
			<li>
				<div className="bg-img" style={this.state.thumbnail.img.style}></div>
				<a href="#">
					<div className="content">
						<h2>{this.state.thumbnail.content.title}</h2>
					</div>
				</a>
			</li>
		);
	}
	
}

export default Thumbnail;
