import './Project.css';
import {Link, Params, useParams} from 'react-router-dom';
import projects from '../../data/projects.json';
import Frame from '../frame/Frame';

export declare type ProjectStatus = 'Finished' | 'Mantained' | 'Abandoned';

export declare type ProjectData = {
	name: string;
	description: string;
	detailedDescription: string;
	srcUrl?: string;
	websiteUrl?: string;
	status: string;
	screenshots: string[];
};

function GoBackHomeLink() {
	return (
		<Link className="project-go-back-home" to="/">
			Go back home
		</Link>
	);
}

function ErrorScreen() {
	return (
		<>
			<GoBackHomeLink />
			<h3>Failed to load the project page!</h3>
		</>
	);
}

export default function Project() {
	const params: Params = useParams();
	let idx: number = parseInt((params.id || '-1') as string);

	if (idx < 0 || idx >= projects.length) {
		console.error(`Failed to find project of idx: ${idx}`);
		return <ErrorScreen />;
	}

	const data: ProjectData = projects[idx];
	if (!data) {
		console.error(
			`Project data (idx: ${idx}) is undefined or null!`
		);
		return <ErrorScreen />;
	}

	let i: number = 0;
	const screenshotElements: JSX.Element[] = data.screenshots.map(ss => (
		<img key={i++} alt="" src={ss}></img>
	));

	return (
		<>
			<GoBackHomeLink />

			<h1 className="title">{data.name}</h1>
			<Frame>
				<h2 className="title">Details</h2>
				<p>{data.description}</p>
				<p>{data.detailedDescription}</p>
				<p>
					Status:{' '}
					<span style={{fontWeight: 'bold'}}>
						{data.status}
					</span>
				</p>

				{data.srcUrl ? (
					<a
						target="_blank"
						rel="noreferrer"
						href={data.srcUrl}
					>
						Source code
					</a>
				) : (
					<></>
				)}

				<br></br>

				{data.websiteUrl ? (
					<a
						target="_blank"
						rel="noreferrer"
						href={data.websiteUrl}
					>
						Website
					</a>
				) : (
					<></>
				)}
			</Frame>

			<div id="project-screenshots-frame" className="frame">
				<h2 className="title">Screenshots</h2>
				{screenshotElements.length > 0 ? (
					screenshotElements
				) : (
					<p>Empty!</p>
				)}
			</div>
		</>
	);
}
