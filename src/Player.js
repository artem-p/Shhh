import React, {useState, useEffect} from 'react';
import './Player.css';


function Player() {
    const [play, handlePlay] = useState(false);

    const togglePlay = () => handlePlay(!play);

    const toggleWhiteClick = togglePlay;


    const AudioContext = window.AudioContext || window.webkitAudioContext;

    const noiseDuration = 2;
    
    
    useEffect(() => {
        let noise;
        if (play) {
            const audioContext = new AudioContext();
            noise = audioContext.createBufferSource();
            const bufferSize = audioContext.sampleRate * noiseDuration;
            const buffer = audioContext.createBuffer(1, bufferSize, audioContext.sampleRate);
            let data = buffer.getChannelData(0);

            for (let i = 0; i < bufferSize; i++) {
                data[i] = Math.random() * 2 - 1;
            }

            noise.buffer = buffer; 
            noise.loop = true;
    
            noise.connect(audioContext.destination);
            console.log('start');
            noise.start();
        } else {
            console.log('stop');
            if(noise) {
                noise.stop();
                noise.disconnect();
            }
        }

        return () => {
            if (noise) {
                noise.stop();
                noise.disconnect();
            }
        }
    }, [play]);


    return (
        <div className="player">
            <button className="play-white" onClick={toggleWhiteClick}>White Noise</button>
        </div>
    )
}

export default Player;
