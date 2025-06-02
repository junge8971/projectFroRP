import { useGLTF } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import { useRef } from 'react';
import { animated, useSpring } from '@react-spring/three';
import { Group } from 'three';

interface ModelProps {
    hovered: boolean;
    clicked: boolean;
    setClicked: (clicked: boolean) => void;
}

export default function Model(props: ModelProps) {
    const { hovered, clicked, setClicked } = props;

    const groupRef = useRef<Group>(null);

    const { nodes, materials } = useGLTF('/assets/logo/logo-cropped.gltf');

    const { positionZ } = useSpring({
        positionZ: clicked ? -1 : 0,
        config: {
            tension: 170,
            friction: 12,
        },
        onRest: () => {
            if (clicked) {
                setClicked(false);
            }
        },
    });

    useFrame((_, delta) => {
        if (groupRef.current) {
            const speed = hovered ? 4.0 : 0.5;
            groupRef.current.rotation.y += delta * speed;
        }
    });

    return (
        <animated.group
            ref={groupRef}
            dispose={null}
            position-z={positionZ}
            onClick={() => setClicked(true)}
        >
            <lineSegments
                // @ts-ignore
                geometry={nodes.meshes0.geometry}
                material={materials['Default Material']}
            />
            <mesh
                castShadow
                receiveShadow
                // @ts-ignore
                geometry={nodes.meshes0_1.geometry}
                material={materials['Default Material']}
                scale={0.01}
            />
        </animated.group>
    );
}

useGLTF.preload('/assets/logo/logo-cropped.gltf');
