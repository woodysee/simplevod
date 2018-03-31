// console.log("Importing fundamental modules...");
import React, { Component } from 'react';
// console.log("Importing presentational modules...");
// import logo from '../logo.svg';
import './poster.css';

class Poster extends Component {
	
	render() {
		// console.log(this.props.poster);
		
		let poster = {
			content: {
				link: 'https://i.imgur.com/EgnNfZo.gifv',
				title: 'Loading...'
			},
			style: {
				backgroundImage: `url('https://i.imgur.com/EgnNfZo.gifv')`
			}
		}
		
		if (typeof this.props.poster !== 'undefined') {
			if (typeof this.props.poster.images !== 'undefined') {
				if (typeof this.props.poster.images[0].url !== 'undefined') {
					poster.style.backgroundImage = `url('${this.props.poster.images[0].url}')`;
				}
			}

			if (typeof this.props.poster.contents !== 'undefined') {
				poster.content.link = this.props.poster.contents[0].url;
			}
			
			if (typeof this.props.poster.title !== 'undefined') {
				poster.content.title = this.props.poster.title;
			}
		}
		

		
		return (
			<li className="carousel-item">
				<div className="poster" style={poster.style}></div>
				<a href="#" test={poster.content.link}>
					<div className="content">
						<h2>{poster.content.title}</h2>
					</div>
				</a>
			</li>
		);
	}
	
}

export default Poster;
