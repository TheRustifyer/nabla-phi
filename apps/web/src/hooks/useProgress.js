import { useCallback, useEffect, useState } from 'react';

const KEY = 'alb-progress-v1';

function read() {
    try {
        const raw = window.localStorage.getItem(KEY);
        return raw ? JSON.parse(raw) : { lessons: [], answered: {} };
    } catch {
        return { lessons: [], answered: {} };
    }
}

export default function useProgress() {
    const [state, setState] = useState(() => (typeof window === 'undefined' ? { lessons: [], answered: {} } : read()));

    useEffect(() => {
        try {
            window.localStorage.setItem(KEY, JSON.stringify(state));
        } catch {
            /* storage unavailable */
        }
    }, [state]);

    const toggleLesson = useCallback((slug) => {
        setState((prev) => ({
            ...prev,
            lessons: prev.lessons.includes(slug) ? prev.lessons.filter((s) => s !== slug) : [...prev.lessons, slug],
        }));
    }, []);

    const recordAnswer = useCallback((id, correct) => {
        setState((prev) => ({ ...prev, answered: { ...prev.answered, [id]: correct } }));
    }, []);

    const reset = useCallback(() => setState({ lessons: [], answered: {} }), []);

    return { progress: state, toggleLesson, recordAnswer, reset };
}
