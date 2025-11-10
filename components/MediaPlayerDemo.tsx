import React, { useState, useRef, useEffect } from 'react';
import { LivePreview, TechnicalOverview } from './ShowcaseContainer';

const MediaPlayer: React.FC<{ src: string; type: 'video' | 'audio' }> = ({ src, type }) => {
    const mediaRef = useRef<HTMLVideoElement | HTMLAudioElement>(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [progress, setProgress] = useState(0);
    const [volume, setVolume] = useState(1);
    const [duration, setDuration] = useState(0);
    const [currentTime, setCurrentTime] = useState(0);

    useEffect(() => {
        const media = mediaRef.current;
        if (!media) return;

        const setMediaData = () => {
            setDuration(media.duration);
            setCurrentTime(media.currentTime);
        };
        const setTime = () => {
            setCurrentTime(media.currentTime);
            setProgress((media.currentTime / media.duration) * 100);
        };

        media.addEventListener('loadeddata', setMediaData);
        media.addEventListener('timeupdate', setTime);

        return () => {
            media.removeEventListener('loadeddata', setMediaData);
            media.removeEventListener('timeupdate', setTime);
        };
    }, []);

    const togglePlay = () => {
        if (isPlaying) {
            mediaRef.current?.pause();
        } else {
            mediaRef.current?.play();
        }
        setIsPlaying(!isPlaying);
    };

    const handleProgressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newTime = (Number(e.target.value) / 100) * duration;
        if (mediaRef.current) {
            mediaRef.current.currentTime = newTime;
        }
    };
    
    const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newVolume = Number(e.target.value);
        setVolume(newVolume);
        if (mediaRef.current) {
            mediaRef.current.volume = newVolume;
        }
    };
    
    const formatTime = (time: number) => {
        const minutes = Math.floor(time / 60);
        const seconds = Math.floor(time % 60);
        return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
    };

    return (
        <div className="bg-slate-800 p-4 rounded-lg">
            {type === 'video' ? (
                <video ref={mediaRef as React.RefObject<HTMLVideoElement>} src={src} className="w-full rounded-md" />
            ) : (
                <audio ref={mediaRef as React.RefObject<HTMLAudioElement>} src={src} />
            )}
            <div className="mt-4 space-y-3">
                <div className="flex items-center gap-4">
                    <button onClick={togglePlay} className="p-2 bg-sky-600 rounded-full text-white hover:bg-sky-500 transition-colors">
                        {isPlaying ? 
                            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20"><path d="M5.75 4.5a.75.75 0 0 0-.75.75v10.5a.75.75 0 0 0 1.5 0V5.25a.75.75 0 0 0-.75-.75zM14.25 4.5a.75.75 0 0 0-.75.75v10.5a.75.75 0 0 0 1.5 0V5.25a.75.75 0 0 0-.75-.75z"></path></svg> : 
                            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20"><path d="M6.3 2.841A1.5 1.5 0 0 0 4 4.11V15.89a1.5 1.5 0 0 0 2.3 1.269l9.344-5.89a1.5 1.5 0 0 0 0-2.538L6.3 2.84z"></path></svg>
                        }
                    </button>
                    <span className="text-sm text-slate-400">{formatTime(currentTime)}</span>
                    <input
                        type="range"
                        min="0"
                        max="100"
                        value={progress}
                        onChange={handleProgressChange}
                        className="w-full h-2 bg-slate-600 rounded-lg appearance-none cursor-pointer accent-sky-500"
                    />
                    <span className="text-sm text-slate-400">{formatTime(duration)}</span>
                </div>
                <div className="flex items-center gap-2">
                    <svg className="w-5 h-5 text-slate-400" fill="currentColor" viewBox="0 0 20 20"><path d="M9.25 4.75a.75.75 0 0 0-1.5 0v10.5a.75.75 0 0 0 1.5 0V4.75zM6.25 7a.75.75 0 0 0-1.5 0v6a.75.75 0 0 0 1.5 0V7zM12.25 7a.75.75 0 0 0-1.5 0v6a.75.75 0 0 0 1.5 0V7zM15.25 4.75a.75.75 0 0 0-1.5 0v10.5a.75.75 0 0 0 1.5 0V4.75z"></path></svg>
                     <input
                        type="range"
                        min="0"
                        max="1"
                        step="0.05"
                        value={volume}
                        onChange={handleVolumeChange}
                        className="w-24 h-2 bg-slate-600 rounded-lg appearance-none cursor-pointer accent-sky-500"
                    />
                </div>
            </div>
        </div>
    );
};


const MediaPlayerDemo: React.FC = () => {
    return (
        <div>
            <LivePreview>
                <div className="space-y-8">
                     <MediaPlayer src="https://storage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4" type="video" />
                     {/* Note: A sample audio file URL should be used here. For demo purposes, we will not include one. */}
                     {/* <MediaPlayer src="path/to/audio.mp3" type="audio" /> */}
                </div>
            </LivePreview>
            <TechnicalOverview
                library="ReactPlayer / Video.js"
                officialName="CookPete/react-player"
                githubUrl="https://github.com/CookPete/react-player"
                description="A media player component provides a consistent and customizable interface for playing video and audio content. Libraries often abstract away the complexities of different media formats and browser inconsistencies."
                features={[
                    "Support for various sources (files, YouTube, Vimeo, etc.)",
                    "Customizable controls and skinning",
                    "Playback rate and volume controls",
                    "Responsive design for different screen sizes"
                ]}
                installation="npm install react-player"
                usage={`import ReactPlayer from 'react-player';\n\n<ReactPlayer url='https://www.youtube.com/watch?v=xyz' />`}
            />
        </div>
    );
};

export default MediaPlayerDemo;