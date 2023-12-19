import React, { useState } from 'react';
import tracksList from '../../assets/tracksList';
import style from './mainPage.module.scss';
import Track from '../../components/Track/Track';
import {Input, Button} from '@mui/material';

import videoBg1 from './../../Fon/pexels_videos_2324293 (2160p).mp4';
import videoBg2 from './../../Fon/pexels-mikhail-nilov-7677514 (1080p).mp4';
import videoBg3 from './../../Fon/pexels-mart-production-7565833 (Original).mp4';
import videoBg4 from './../../Fon/pexels-mart-production-7565971 (Original).mp4';
import videoBg5 from './../../Fon/pexels-mikhail-nilov-7677117 (1080p).mp4';
import videoBg6 from './../../Fon/pexels-mikhail-nilov-7677513 (1080p).mp4';
import videoBg7 from './../../Fon/pexels-cottonbro-9694807 (1080p).mp4';
import videoBg8 from './../../Fon/pexels-cottonbro-9694224 (1080p).mp4';
import videoBg9 from './../../Fon/Heart-Float-Live-Wallpaper-Free.mp4';
import videoBg10 from './../../Fon/Fly-In-Clouds.mp4';
import videoBg11 from './../../Fon/eternal_light_v2_4K.mp4';
import videoBg12 from './../../Fon/pexels-rostislav-uzunov-5680034 (1080p).mp4';
import videoBg13 from './../../Fon/Sphere.mp4';
import videoBg14 from './../../Fon/star dust.mp4';
import videoBg15 from './../../Fon/Sunset_Cruise_4k.mp4';
import videoBg16 from './../../Fon/Autumn River Live Wallpaper.mp4';
import videoBg17 from './../../Fon/Anime Train.mp4';
import videoBg18 from './../../Fon/pexels-mart-production-7565825 (1080p).mp4';

const runSearch = (query) => {
	if (!query) {
		return tracksList;
	}

	const lowerCaseQuery = query.toLowerCase();

	return tracksList.filter((track) => track.title.toLowerCase().includes(lowerCaseQuery) || track.artists.toLowerCase().includes(lowerCaseQuery));
};

const MainPage = () => {
	const [tracks, setTracks] = useState(tracksList);
	const [videoSources] = useState([videoBg1, videoBg2, videoBg3, videoBg4, videoBg5, videoBg6, videoBg7, videoBg8, videoBg9, videoBg10, videoBg11, videoBg12, videoBg13, videoBg14, videoBg15, videoBg16, videoBg17, videoBg18]);
	const [currentVideoIndex, setCurrentVideoIndex] = useState(0);

	const handleChange = (event) => {
		const foundTracks = runSearch(event.target.value);
		setTracks(foundTracks);
	};

	const handleModeChangeNext = () => {
		setCurrentVideoIndex((prevIndex) => (prevIndex + 1) % videoSources.length);
	};
const handleModeChangeBack = () => {
  setCurrentVideoIndex((prevIndex) =>
    prevIndex === 0 ? videoSources.length - 1 : prevIndex - 1
  );
};

	return (
		<div className={style.search}>
			{videoSources.map((source, index) => (
				<video key={index} className={style.bg} autoPlay loop muted style={{ display: currentVideoIndex === index ? 'block' : 'none' }}>
					<source src={source} type='video/mp4' />
				</video>
			))}

			<div className={style.container}>
				<div className={style.top_search}>
					<Input className={style.input} placeholder='Track search' onChange={handleChange} />
					<Button className={style.btn__Fon} onClick={handleModeChangeBack}>
						previous fon
					</Button>
					<Button className={style.btn__Fon} onClick={handleModeChangeNext}>
						Next fon
					</Button>
				</div>
			</div>
			<div className={style.list}>
				{tracks.map((track) => (
					<Track key={track.id} {...track} />
				))}
			</div>
		</div>
	);
};

export default MainPage;
