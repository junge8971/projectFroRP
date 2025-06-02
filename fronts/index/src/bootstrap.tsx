import { createRoot } from 'react-dom/client';
import { IndexPage } from './pages/IndexPage';

const root = document.getElementById('root');

if (!root) {
    throw new Error('root not found');
}

const container = createRoot(root);

container.render(<IndexPage />);
