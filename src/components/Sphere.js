import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'

import { useStore, mutation } from '../state/useStore'

import { SPHERE_ID, COLORS} from '../constants'

import randomHslColor from '../util/randomHslColor'

export default function Sphere() {

    const incrementLevel = useStore(s => s.incrementLevel)
    const sequenceLightTime = useStore(s => s.sequenceLightTime)
    const coordinates = useStore(s => s.coordinates)

    const setSuccessClick = useStore(s => s.setSuccessClick)
    const setPlayTime = useStore(s => s.setPlayTime)

    // This reference will give us direct access to the mesh
    const sphere = useRef()

    function sphereClicked() {
        if(mutation.interactive)
        {
            //Success in sequence
            if(SPHERE_ID === mutation.sequence[mutation.actualIndex])
            {
                let tmp = sphere.current.material.color.getHex()
                mutation.interactive  = false
                sphere.current.material.color.set(COLORS[1].hex)
                setTimeout(() => {
                    sphere.current.material.color.setHex(tmp)
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
        if(mutation.showingSequence && SPHERE_ID === mutation.sequence[mutation.actualIndex])
        {
            let tmp = sphere.current.material.color.getHex()
            sphere.current.material.color.set(COLORS[0].hex)
            mutation.showingSequence = false
            setTimeout(() => {
                sphere.current.material.color.setHex(tmp)
                setTimeout(() => {
                    mutation.showingSequence = true
                    nextIndex()
                }, 1000);
              }, sequenceLightTime*1000);
            
        }
        sphere.current.rotation.x += 0.01
    })
    
    return (
        <mesh 
            ref={sphere} 
            position={coordinates[1]} 
            onClick={sphereClicked}
            name={SPHERE_ID}
        >
            <sphereBufferGeometry args={[0.8, 16, 16]} />
            <meshPhongMaterial fog={false} attach="material" color={randomHslColor()} />
        </mesh>
    )
}