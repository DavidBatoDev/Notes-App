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

    useEffect(() => {
        const sketch = sketches.find(sketch => sketch.id === id)
        if (!sketch) {
            addSketch(id, "Untitled", dataSrc,)
        }

        // else continue the sketch progress
    }, [])

    const canvasRef = useRef(null);

    async function handleExportImage () {
        const dataUrl = await canvasRef.current.exportImage("png");
        setDataSrc(dataUrl);
        setSketches(prevSketches => prevSketches.map(sketch => sketch.id === id ? {...sketch, dataSrc: dataUrl} : sketch))
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

    const handleExportSvg = () => {
        canvasRef.current.exportSvg().then(svg => {
            console.log(svg);
        });
    };

    return (
        <div className='bg-white h-full w-full flex flex-col'>
            <div className="flex w-full justify-between">
                <ArrowBackIcon onClick={() => setCurrentSketchId(null)} className='cursor-pointer text-black' />
                <button className='mb-2' onClick={handleExportImage}>Save</button>
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
                        backgroundColor: "url('https://upload.wikimedia.org/wikipedia/commons/7/70/Graph_paper_scan_1600x1000_%286509259561%29.jpg')",
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
                    <button className='mb-2' onClick={handleExportSvg}>Export SVG</button>
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
