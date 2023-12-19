import React, { useContext, useState, useEffect } from 'react';
import { AudioContext } from '../../context/AudioContext';
import style from './playbar.module.scss';
import { Slider, IconButton } from '@mui/material';
import { Pause, PlayArrow, SkipPrevious, SkipNext, Repeat, Shuffle, RepeatOne, VolumeDown, VolumeUp } from '@mui/icons-material';
import secondsToMMSS from '../../utils/secondsToMMSS';

const TimeControls = () => {
	const { audio, currentTrack } = useContext(AudioContext);
	const { duration } = currentTrack;
	const [currentTime, setCurrentTime] = useState(0);
	const formattedCurrentTime = secondsToMMSS(currentTime);
	const sliderCurrentTime = Math.round((currentTime / duration) * 100);

	const handleChangeCurrentTime = (_, value) => {
		const time = Math.round((value / 100) * duration);
		setCurrentTime(time);
		audio.currentTime = time;
	};

	useEffect(() => {
		const timeInterval = setInterval(() => {
			setCurrentTime(audio.currentTime);
		}, 1000);

		return () => {
			clearInterval(timeInterval);
		};
	}, [audio]);

	return (
		<div className={style.slider}>
			<p>{formattedCurrentTime}</p>
			<Slider step={1} min={0} max={100} value={sliderCurrentTime} onChange={handleChangeCurrentTime} />
			<p>{secondsToMMSS(duration)}</p>
		</div>
	);
};

const VolumeControls = () => {
	const { audio } = useContext(AudioContext);
	const [volume, setVolume] = useState(audio.volume * 100);

	const handleChangeVolume = (_, value) => {
		const newVolume = value / 100;
		setVolume(value);
		audio.volume = newVolume;
	};

	return (
		<div className={style.volumeSlider}>
			<VolumeDown />
			<Slider step={1} min={0} max={100} value={volume} onChange={handleChangeVolume} />
			<VolumeUp />
		</div>
	);
};

const Playbar = () => {
	const { currentTrack, handleToggleAudio, handlePreviousTrack, handleNextTrack, isPlaying, playbackMode, togglePlaybackMode } = useContext(AudioContext);
	const { title, artists, preview } = currentTrack;

	return (
		<div className={style.playbar}>
			<img className={style.preview} src={preview} alt='' />
			<IconButton onClick={handlePreviousTrack}>
				<SkipPrevious />
			</IconButton>
			<IconButton onClick={() => handleToggleAudio(currentTrack)}>{isPlaying ? <Pause /> : <PlayArrow />}</IconButton>
			<IconButton onClick={handleNextTrack}>
				<SkipNext />
			</IconButton>
			<IconButton onClick={togglePlaybackMode}>{playbackMode === 'sequential' ? <Repeat /> : playbackMode === 'shuffle' ? <Shuffle /> : <RepeatOne />}</IconButton>
			<div className={style.credits}>
				<h4>{title}</h4>
				<p>{artists}</p>
			</div>
			<TimeControls />
			<VolumeControls />
		</div>
	);
};

export default Playbar;
