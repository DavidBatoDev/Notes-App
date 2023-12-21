import React, { useState, useRef, useEffect } from 'react';
import { ReactSketchCanvas } from 'react-sketch-canvas';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

function Canvas({sketches, id, addSketch, setSketches, setCurrentSketchId}) {
    const [color, setColor] = useState("black");
    const [isEraseMode, setIsEraseMode] = useState(false);
    const [strokeWidth, setStrokeWidth] = useState(4);
    const [eraserWidth, setEraserWidth] = useState(10);
    const [title, setTitle] = useState('');
    const [dataSrc, setDataSrc] = useState(null);
    const [dataPath, setDataPath] = useState([]);

    const canvasRef = useRef(null);

    useEffect(() => {
        const sketch = sketches.find(sketch => sketch.id === id)
        if (!sketch) {
            addSketch(id, "Untitled", dataSrc, dataPath)
        } else {
            handleLoadPaths(sketch.dataPath)
        }
    }, [])

    async function handleSave () {
        try {
            const dataUrl = await canvasRef.current.exportImage("png");
            setDataSrc(dataUrl);
            const paths = await handleExportPaths();
            setSketches(prevSketches => prevSketches.map(sketch => sketch.id === id ? {...sketch, title: title, dataSrc: dataUrl, dataPath: paths} : sketch))
        } catch (error) {
            console.log(error);
        }
    };

    const handleClearCanvas = () => {
        canvasRef.current.clearCanvas();
    };

    const handleUndo = () => {
        canvasRef.current.undo();
    };

    const handleRedo = () => {
        canvasRef.current.redo();
    };

    const handleEraseMode = () => {
        setIsEraseMode(!isEraseMode);
        canvasRef.current.eraseMode(!isEraseMode);
    };

    async function handleExportPaths() {
        try {
            const paths = await canvasRef.current.exportPaths();
            setDataPath(paths);
            return paths;
        } catch (error) {
            console.log(error);
        }
    }

    async function handleLoadPaths() {
        const sketch = sketches.find(sketch => sketch.id === id);
        if (sketch) {
            try {
                await canvasRef.current.loadPaths(sketch.dataPath);
                setTitle(sketch.title);
                setDataPath(sketch.dataPath);
            } catch (error) {
                console.error(error);
            }
        }
    }    

    return (
        <div className='bg-white h-full w-full flex flex-col'>
            <div className="flex w-full">
                <ArrowBackIcon onClick={() => setCurrentSketchId(null)} className='cursor-pointer text-black' />
            </div>
            <div className='flex'>
                <button className='mb-2' onClick={handleSave}>Save</button>
            </div>
            <div className='ml-5 flex mt-2 w-full h-full'>
                <div className='w-full h-full flex flex-col justify-start items-start'>
                <input
                    placeholder='Add Title'
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className='mb-3 text-2xl font-bold whitespace-nowrap outline-none'
                />
                <ReactSketchCanvas
                    id={id}
                    ref={canvasRef}
                    style={{
                        border: "0.0625rem solid #9c9c9c",
                        borderRadius: "0.25rem",
                    }}
                    width="100%"
                    height="80%"
                    strokeWidth={strokeWidth}
                    strokeColor={color}
                    eraserWidth={eraserWidth}
                    className='mr-3'
                />
                </div>
                <div className='flex ml-5 flex-col items-start w-40 mr-8'>
                    <h1 className='text-black font-semibold mb-4'>Tools</h1>
                    <button className='mb-2' onClick={handleUndo}>Undo</button>
                    <button className='mb-2' onClick={handleRedo}>Redo</button>
                    <button className='mb-2' onClick={handleClearCanvas}>Clear All</button>
                    <button className={`mb-2 ${isEraseMode ? 'bg-red-500 text-white' : 'bg-gray-300'}`} onClick={handleEraseMode}>Erase</button>
                    <div className='items-center flex mb-2'>
                        <label>Color</label>
                        <input
                            type="color"
                            value={color}
                            onChange={(e) => setColor(e.target.value)}
                        />
                    </div>
                    <div className='flex items-center mb-2'>
                        <label>Stroke Width</label>
                        <input
                            className='w-14 border border-gray-300 p-1'
                            type="number"
                            value={strokeWidth}
                            onChange={(e) => setStrokeWidth(e.target.value)}
                        />
                    </div>
                    <div className='mb-2'>
                        <label>Opacity</label>
                        <input
                            type="range"
                            min="0"
                            max="1"
                            step="0.1"
                            value={strokeWidth}
                            onChange={(e) => setStrokeWidth(e.target.value)}
                        />
                    </div>
                    <div className='flex items-center'>
                        <label>Eraser Width</label>
                        <input
                            className='w-14 border border-gray-300 p-1'
                            type="number"
                            value={eraserWidth}
                            onChange={(e) => setEraserWidth(e.target.value)}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Canvas;
