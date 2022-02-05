import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'

import { useStore, mutation} from '../state/useStore'

import { OCTAHEDRON_ID, COLORS} from '../constants'

import randomHslColor from '../util/randomHslColor'

export default function Octahedron() {

    const incrementLevel = useStore(s => s.incrementLevel)
    const sequenceLightTime = useStore(s => s.sequenceLightTime)
    const coordinates = useStore(s => s.coordinates)

    const setSuccessClick = useStore(s => s.setSuccessClick)
    const setPlayTime = useStore(s => s.setPlayTime)

    // This reference will give us direct access to the mesh
    const octahedron = useRef()
    
    function octahedronClicked() {
        if(mutation.interactive)
        {
            //Success in sequence
            if(OCTAHEDRON_ID === mutation.sequence[mutation.actualIndex])
            {
                let tmp = octahedron.current.material.color.getHex()
                mutation.interactive  = false
                octahedron.current.material.color.set(COLORS[1].hex)
                setTimeout(() => {
                    octahedron.current.material.color.setHex(tmp)
                    nextIndex()
                    mutation.interactive  = true
                }, 1000);
                setSuccessClick(true)
            }
            //Fail in sequence
            else
                mutation.gameOver = true
        }
    }

    function nextIndex(){
        mutation.actualIndex++
        if(mutation.actualIndex === mutation.sequenceLength)
        {
            //Finshing the showning sequence
            if(mutation.showingSequence){
                mutation.showingSequence = false
                mutation.interactive = true
                mutation.actualIndex = 0
                setPlayTime(true)
            }
            //The sequence was completed
            else{
                mutation.newLevel = true
                incrementLevel()
            }
        }
    }

    // Subscribe this component to the render-loop, rotate the mesh every frame
    useFrame((state, delta) => {
        if(mutation.showingSequence && OCTAHEDRON_ID === mutation.sequence[mutation.actualIndex])
        {
            let tmp = octahedron.current.material.color.getHex()
            octahedron.current.material.color.set(COLORS[0].hex)
            mutation.showingSequence = false
            setTimeout(() => {
                octahedron.current.material.color.setHex(tmp)
                setTimeout(() => {
                    mutation.showingSequence = true
                    nextIndex()
                }, 1000);
              }, sequenceLightTime*1000);
            
        }
        octahedron.current.rotation.x += 0.01
    })
    return (
        <mesh 
            ref={octahedron} 
            position={coordinates[3]} 
            onClick={octahedronClicked}
            name={OCTAHEDRON_ID}
        >
            <octahedronBufferGeometry args={[1, 0]} />
            <meshPhongMaterial fog={false} attach="material" color={randomHslColor()} />
        </mesh>
    )
}