import { createContext, useState, useEffect } from 'react';
import tracksList from '../assets/tracksList';

const audio = new Audio();

export const AudioContext = createContext({});

const AudioProvider = ({ children }) => {
	const [currentTrack, setCurrentTrack] = useState(tracksList[0]);
	const [isPlaying, setPlaying] = useState(false);
	const [trackIndex, setTrackIndex] = useState(0);
	const [lastPlayedIndices, setLastPlayedIndices] = useState([]);
	const [nextTracks, setNextTracks] = useState([]);
	const [playbackMode, setPlaybackMode] = useState('sequential');

	const handleToggleAudio = (track, forcePlay = false) => {
		if (currentTrack.id !== track.id || forcePlay) {
			setCurrentTrack(track);
			setPlaying(true);

			audio.src = track.src;
			audio.currentTime = 0;
			audio.play();

			return;
		}

		if (isPlaying) {
			audio.pause();
			setPlaying(false);
		} else {
			audio.play();
			setPlaying(true);
		}
	};

	const handlePreviousTrack = () => {
		let newIndex;

		if (playbackMode === 'shuffle') {
			if (nextTracks.length > 0) {
				newIndex = nextTracks.shift();
			} else {
				newIndex = Math.floor(Math.random() * tracksList.length);
			}
			setLastPlayedIndices([trackIndex, ...lastPlayedIndices]);
		} else {
			newIndex = trackIndex - 1 >= tracksList.length ? 0 : trackIndex - 1;
		}

		setTrackIndex(newIndex);
		handleToggleAudio(tracksList[newIndex]);
	};

	const handleNextTrack = () => {
		let newIndex;

		if (playbackMode === 'shuffle') {
			if (lastPlayedIndices.length > 0) {
				newIndex = lastPlayedIndices.pop();
			} else {
				newIndex = Math.floor(Math.random() * tracksList.length);
			}
			setLastPlayedIndices([...lastPlayedIndices]);
		} else {
			newIndex = trackIndex + 1 >= tracksList.length ? 0 : trackIndex + 1;
		}

		setNextTracks([trackIndex, ...nextTracks]);
		setTrackIndex(newIndex);
		handleToggleAudio(tracksList[newIndex]);
	};

	const togglePlaybackMode = () => {
		const modes = ['sequential', 'shuffle', 'repeat'];
		const currentIndex = modes.indexOf(playbackMode);
		const newIndex = (currentIndex + 1) % modes.length;
		setPlaybackMode(modes[newIndex]);
	};

	useEffect(() => {
		const handleEnded = () => {
			if (playbackMode === 'repeat') {
				audio.currentTime = 0;
				audio.play();
			} else {
				handleNextTrack();
			}
		};

		audio.addEventListener('ended', handleEnded);

		return () => {
			audio.removeEventListener('ended', handleEnded);
		};
	}, [trackIndex, playbackMode, audio]);

	const value = {
		audio,
		currentTrack,
		isPlaying,
		handleToggleAudio,
		handlePreviousTrack,
		handleNextTrack,
		playbackMode,
		togglePlaybackMode,
	};

	return <AudioContext.Provider value={value}>{children}</AudioContext.Provider>;
};

export default AudioProvider;
