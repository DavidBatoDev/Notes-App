import React, {useEffect, useState} from 'react'
import SketchesView from './SketchesView'
import Canvas from './Canvas'
import { nanoid } from 'nanoid'

function Sketches() {
    const [sketches, setSketches] = useState(JSON.parse(localStorage.getItem('sketches')) || [])
    const [currentSketchId, setCurrentSketchId] = useState(null)


    useEffect(() => {
        localStorage.setItem('sketches', JSON.stringify(sketches))
    }, [sketches])

    const addSketch = (id, title, dataSrc, dataPath) => {
        const newSketch = {
            id,
            title,
            dataSrc,
        }
        setCurrentSketchId(newSketch.id)
        setSketches([newSketch, ...sketches])
    }

    return (
        currentSketchId ?
            <Canvas 
            setSketches={setSketches} 
            sketches={sketches}
            id={currentSketchId}
            addSketch={addSketch}
            setCurrentSketchId={setCurrentSketchId}/>
            :
            <SketchesView 
                sketches={sketches}
                setCurrentSketchId={setCurrentSketchId}
                addSketch={addSketch}
            />
    )
}

export default Sketches
