import { useState, useRef, useEffect } from 'react';
import GraphicEqIcon from '@mui/icons-material/GraphicEq';
import MicIcon from '@mui/icons-material/Mic';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import DeleteIcon from '@mui/icons-material/Delete';
import CancelIcon from '@mui/icons-material/Cancel';
import CheckIcon from '@mui/icons-material/Check';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';

function SoundRecord() {
    const [deleteMode, setDeleteMode] = useState(false);
    const [isPlaying, setIsPlaying] = useState(false);
    const [audioUrl, setAudioUrl] = useState(null);
    const [mediaRecorder, setMediaRecorder] = useState(null);
    const [sounds, setSounds] = useState(JSON.parse(localStorage.getItem("sounds")) || []);

    useEffect(() => {
        localStorage.setItem('sounds', JSON.stringify(sounds));
    }, [sounds])
    
    const startRecording = async () => {
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        const mediaRecorder = new MediaRecorder(stream);
        mediaRecorder.start();
    
        let localChunks = [];
    
        mediaRecorder.ondataavailable = (e) => {
            localChunks.push(e.data);
        };
    
        mediaRecorder.onstop = () => {
            const blob = new Blob(localChunks, { 'type' : 'audio/ogg; codecs=opus' });
            const newAudioUrl = URL.createObjectURL(blob);
            const newAudio = {
                id: Date.now(),
                name: `Sound ${sounds.length + 1}`,
                audioUrl: newAudioUrl
            }
            setSounds((prevSounds) => [...prevSounds, newAudio]); // Add new sound to sounds state
        };
        setMediaRecorder(mediaRecorder);
    };

    const stopRecording = () => {
        if (mediaRecorder) {
            mediaRecorder.stop();
        }
    };

    const deleteSound = (id) => {
        setSounds(prev => prev.filter(sound => sound.id !== id))
    }

    return (
        <div className='relative h-full w-full bg-secondary p-5 flex'>
            <div className={`${isPlaying ? "blur" : ""} w-full h-full bg-secondary p-5`}>
                <div className='gap-5 w-full grid grid-cols-2'>
                    {sounds.map(sound => (
                    <div key={sound.id}
                    onClick={() => {!deleteMode ? sound.audioUrl && setAudioUrl(sound.audioUrl): ""; !deleteMode ? setIsPlaying(true) : "";}} 
                    className='cursor-pointer bg-primary w-full h-20 rounded-3xl'>
                        <div className='relative flex justify-center items-center h-full'>
                            <GraphicEqIcon className='text-white'/>
                            <h1 className='text-white'>{sound.name}</h1>
                            { deleteMode &&
                            <div onClick={() => deleteSound(sound.id)} className='absolute right-2'>
                                <HighlightOffIcon className='text-white cursor-pointer' />
                            </div>
                            }
                        </div>
                    </div>
                    ))
                    }
                    <div className='cursor-white bg-red-600 w-full h-20 rounded-3xl'>
                        <div className='flex justify-center items-center h-full'>
                            <MicIcon className='text-white'/>
                            <h1 className='text-white' onClick={mediaRecorder && mediaRecorder.state === 'recording' ? stopRecording : startRecording}>
                                {mediaRecorder && mediaRecorder.state === 'recording' ? 'Stop Recording' : 'Record new sound'}
                            </h1>
                        </div>
                    </div>
                </div>
            </div>
            <div className='flex'>
            {!deleteMode ?
            <DeleteIcon onClick={() => setDeleteMode(true)} className='cursor-pointer text-white'/>
            :
            <CancelIcon onClick={() => setDeleteMode(false)} className='cursor-pointer text-white'/>
            }
            </div>
            {audioUrl &&
                <div className={`absolute z-50 inset-0 rounder-3xl ${isPlaying ? "" : "hidden"}`}>
                    <div className='flex justify-center items-center min-h-screen'>
                        <div className='bg-white w-80 h-60 flex justify-center items-center rounded-3xl p-3'>
                            <ArrowBackIcon onClick={() => {
                                setAudioUrl(null); setIsPlaying(false)
                            }} className='text-white absolute top-3 left-3 cursor-pointer'/>
                            <audio src={audioUrl} controls />
                        </div>
                    </div>
                </div>
            }
        </div>
    );
}

export default SoundRecord