import { createRoot } from 'react-dom/client';
import DDDModel from './components/DDDModel/DDDModel';

const root = document.getElementById('root');

if (!root) {
    throw new Error('root not found');
}

const container = createRoot(root);

container.render(<DDDModel />);
