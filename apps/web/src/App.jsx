import React from 'react';
import { Route, Routes, BrowserRouter as Router } from 'react-router-dom';
import ScrollToTop from './components/ScrollToTop';
import HomePage from './pages/HomePage';
import NotesPage from './pages/NotesPage';
import LessonPage from './pages/LessonPage';
import PracticePage from './pages/PracticePage';
import ResourcesPage from './pages/ResourcesPage';

function App() {
    return (
        <Router>
            <ScrollToTop />
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/apuntes" element={<NotesPage />} />
                <Route path="/apuntes/:slug" element={<LessonPage />} />
                <Route path="/practicar" element={<PracticePage />} />
                <Route path="/recursos" element={<ResourcesPage />} />
            </Routes>
        </Router>
    );
}

export default App;
