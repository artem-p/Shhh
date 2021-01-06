import React, {useEffect} from 'react';
import './Player.css';


function Player() {
    useEffect(() => {
        const AudioContext = window.AudioContext || window.webkitAudioContext;

        const noiseDuration = 2;

        const audioContext = new AudioContext();
        const bufferSize = audioContext.sampleRate * noiseDuration;
        const buffer = audioContext.createBuffer(1, bufferSize, audioContext.sampleRate);
        let data = buffer.getChannelData(0);

        for (let i = 0; i < bufferSize; i++) {
            data[i] = Math.random() * 2 - 1;
        }

        let noise = audioContext.createBufferSource();
        noise.buffer = buffer; 

        noise.connect(audioContext.destination);
        noise.start();

        // todo Player.js:24 The AudioContext was not allowed to start. It must be resumed (or created) after a user gesture on the page. https://goo.gl/7K7WLu

        return () => {
            
        }
    }, [])


    return (
        <div className="player">
            <button className="play-white">White Noise</button>
        </div>
    )
}

export default Player;
