import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'

import { useStore, mutation } from '../state/useStore'

import { TORUS_ID, COLORS} from '../constants'

import randomHslColor from '../util/randomHslColor'

export default function Torus() {

    const incrementLevel = useStore(s => s.incrementLevel)
    const sequenceLightTime = useStore(s => s.sequenceLightTime)
    const coordinates = useStore(s => s.coordinates)

    const setSuccessClick = useStore(s => s.setSuccessClick)
    const setPlayTime = useStore(s => s.setPlayTime)

    // This reference will give us direct access to the mesh
    const torus = useRef()
    
    function torusClicked() {
        if(mutation.interactive)
        {
            //Success in sequence
            if(TORUS_ID === mutation.sequence[mutation.actualIndex])
            {
                let tmp = torus.current.material.color.getHex()
                mutation.interactive  = false
                torus.current.material.color.set(COLORS[1].hex)
                setTimeout(() => {
                    torus.current.material.color.setHex(tmp)
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
        if(mutation.showingSequence && TORUS_ID === mutation.sequence[mutation.actualIndex])
        {
            let tmp = torus.current.material.color.getHex()
            torus.current.material.color.set(COLORS[0].hex)
            mutation.showingSequence = false
            setTimeout(() => {
                torus.current.material.color.setHex(tmp)
                setTimeout(() => {
                    mutation.showingSequence = true
                    nextIndex()
                }, 1000);
              }, sequenceLightTime*1000);
            
        }
        torus.current.rotation.x += 0.01
    })
    
    return (
        <mesh 
            ref={torus} 
            position={coordinates[5]} 
            onClick={torusClicked}
            name={TORUS_ID}
        >
            <torusBufferGeometry args={[0.8, 0.3, 32, 24]} />
            <meshPhongMaterial fog={false} attach="material" color={randomHslColor()} />
        </mesh>
    )
}