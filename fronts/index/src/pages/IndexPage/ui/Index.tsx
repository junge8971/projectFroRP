import { lazy, Suspense } from 'react';

const DDDModel = lazy(() => import('treeJS/DDDModel'));

export const IndexPage = () => {
    return (
        <>
            <h1>Главная</h1>
            <Suspense fallback={<div>Загрузка...</div>}>
                <DDDModel />
            </Suspense>
        </>
    );
};
