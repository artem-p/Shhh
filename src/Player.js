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
        const bufferSize = audioContext.sampleRate * noiseDuration;

        const getWhiteBuffer = () => {
            const buffer = audioContext.createBuffer(1, bufferSize, audioContext.sampleRate);
            let data = buffer.getChannelData(0);

            for (let i = 0; i < bufferSize; i++) {
                data[i] = Math.random() * 2 - 1;
            }

            return buffer;
        }

        const getBrownBuffer = () => {
            const buffer = audioContext.createBuffer(1, bufferSize, audioContext.sampleRate);
            let data = buffer.getChannelData(0);

            let lastOut = 0.0;
            for (let i = 0; i < bufferSize; i++) {
                var white = Math.random() * 2 - 1;
				data[i] = (lastOut + (0.02 * white)) / 1.02;
				lastOut = data[i];
				data[i] *= 3.5;
            }

            return buffer;
        }

        const whiteBuffer = getWhiteBuffer();
        const brownBuffer = getBrownBuffer();

        let whiteNoise, brownNoise;
        
        if (playWhite) {
            whiteNoise = audioContext.createBufferSource();
            let gainNode = audioContext.createGain();

            whiteNoise.buffer = whiteBuffer; 
            whiteNoise.loop = true;
            gainNode.gain.setValueAtTime(0.04, audioContext.currentTime);
            
            whiteNoise.connect(gainNode);
            gainNode.connect(audioContext.destination);
            whiteNoise.start();
        } else {
            if(whiteNoise) {
                whiteNoise.stop();
                whiteNoise.disconnect();
            }
        }


        if (playBrown) {
            brownNoise = audioContext.createBufferSource();
            let gainNode = audioContext.createGain();

            brownNoise.buffer = brownBuffer; 
            brownNoise.loop = true;
            gainNode.gain.setValueAtTime(0.04, audioContext.currentTime);
            
            brownNoise.connect(gainNode);
            gainNode.connect(audioContext.destination);
            brownNoise.start();
        } else {
            if(brownNoise) {
                brownNoise.stop();
                brownNoise.disconnect();
            }
        }


        return () => {
            if (whiteNoise) {
                whiteNoise.stop();
                whiteNoise.disconnect();
            }

            if (brownNoise) {
                brownNoise.stop();
                brownNoise.disconnect();
            }
        }
    }, [playWhite, playBrown]);


    return (
        <div className="player">
            <button className="play-white" onClick={togglePlayWhite}>White Noise</button>
            <button className="play-brown" onClick={togglePlayBrown}>Brown Noise</button>
        </div>
    )
}

export default Player;
