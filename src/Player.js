import React, {useState, useEffect} from 'react';
import './Player.css';


function Player() {
    const [playWhite, handlePlayWhite] = useState(false);
    const [playBrown, handlePlayBrown] = useState(false);

    const togglePlayWhite = () => handlePlayWhite(!playWhite);
    const togglePlayBrown = () => handlePlayBrown(!playBrown);
 
    const noiseDuration = 2;
    
    
    useEffect(() => {
        const AudioContext = window.AudioContext || window.webkitAudioContext;
        const audioContext = new AudioContext();
        let noise;
        if (playWhite) {
            noise = audioContext.createBufferSource();
            let gainNode = audioContext.createGain();
            const bufferSize = audioContext.sampleRate * noiseDuration;
            const buffer = audioContext.createBuffer(1, bufferSize, audioContext.sampleRate);
            let data = buffer.getChannelData(0);

            for (let i = 0; i < bufferSize; i++) {
                data[i] = Math.random() * 2 - 1;
            }

            noise.buffer = buffer; 
            noise.loop = true;
            gainNode.gain.setValueAtTime(0.02, audioContext.currentTime);
            
            noise.connect(gainNode);
            gainNode.connect(audioContext.destination);
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
    }, [playWhite]);


    return (
        <div className="player">
            <button className="play-white" onClick={togglePlayWhite}>White Noise</button>
            <button className="play-brown" onClick={togglePlayBrown}>Brown Noise</button>
        </div>
    )
}

export default Player;
