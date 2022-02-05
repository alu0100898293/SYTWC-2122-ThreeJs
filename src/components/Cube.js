import { useRef } from 'react'
import { useFrame} from '@react-three/fiber'

import { useStore, mutation } from '../state/useStore'

import { CUBE_ID, COLORS} from '../constants'

import randomHslColor from '../util/randomHslColor'

export default function Cube() {

    const incrementLevel = useStore(s => s.incrementLevel)
    const sequenceLightTime = useStore(s => s.sequenceLightTime)
    const coordinates = useStore(s => s.coordinates)

    const setSuccessClick = useStore(s => s.setSuccessClick)
    const setPlayTime = useStore(s => s.setPlayTime)

    // This reference will give us direct access to the mesh
    const cube = useRef()

    function cubeClicked() {
        if(mutation.interactive)
        {
            //Success in sequence
            if(CUBE_ID === mutation.sequence[mutation.actualIndex])
            {
                let tmp = cube.current.material.color.getHex()
                mutation.interactive  = false
                cube.current.material.color.set(COLORS[1].hex)
                setTimeout(() => {
                    cube.current.material.color.setHex(tmp)
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
                setPlayTime(false)
                mutation.newLevel = true
                incrementLevel()
            }
        }
    }

    // Subscribe this component to the render-loop, rotate the mesh every frame
    useFrame(() => {
        
        if(mutation.showingSequence && CUBE_ID === mutation.sequence[mutation.actualIndex])
        {
            let tmp = cube.current.material.color.getHex()
            cube.current.material.color.set(COLORS[0].hex)
            mutation.showingSequence = false
            setTimeout(() => {
                cube.current.material.color.setHex(tmp)
                setTimeout(() => {
                    mutation.showingSequence = true
                    nextIndex()
                }, 1000);
              }, sequenceLightTime*1000);
            
        }
        
        cube.current.rotation.x += 0.01
        cube.current.rotation.y += 0.01
    })
    
    return (
        <mesh
            ref={cube} 
            position={coordinates[0]} 
            onClick={cubeClicked}
            name={CUBE_ID}
        >
            <boxBufferGeometry args={[1, 1, 1]} />
            <meshStandardMaterial fog={false} attach="material" color={randomHslColor()}/>
        </mesh>
    )
}