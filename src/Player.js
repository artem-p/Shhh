import React, {useState, useEffect} from 'react';
import './Player.css';


function Player() {
    const [connect, handleConnect] = useState(false);
    const [play, handlePlay] = useState(false);

    const togglePlay = () => handlePlay(!play);

    const toggleWhiteClick = togglePlay;


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
    noise.loop = true;
    noise.start();
    
    useEffect(() => {
        if (play) {
            noise.connect(audioContext.destination);
            handleConnect(true);
        } else {
            if (connect) {
                noise.disconnect(audioContext.destination);
                handleConnect(false);
            }

            // noise.stop();
        }

        return () => {
            
        }
    }, [play, noise]);


    return (
        <div className="player">
            <button className="play-white" onClick={toggleWhiteClick}>White Noise</button>
        </div>
    )
}

export default Player;
