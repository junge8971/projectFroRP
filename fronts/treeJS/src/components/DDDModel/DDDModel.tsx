import { Canvas } from '@react-three/fiber';
import { Suspense, useState } from 'react';
import { Environment, OrbitControls } from '@react-three/drei';

import Model from './Model/Model';

const DDDModel = () => {
    const [hovered, setHovered] = useState<boolean>(false);
    const [clicked, setClicked] = useState<boolean>(false);
    return (
        <div onMouseOver={() => setHovered(true)} onMouseLeave={() => setHovered(false)}>
            <Canvas>
                <ambientLight />
                <OrbitControls enableZoom={false} />
                <Suspense fallback={null}>
                    <Model hovered={hovered} clicked={clicked} setClicked={setClicked} />
                </Suspense>
                <Environment preset="sunset" />
            </Canvas>
        </div>
    );
};
export default DDDModel;
