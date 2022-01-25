import React, { useState } from 'react';

export default function useVisualMode(initial) {
    const [mode, setMode] = useState(initial);
    const [history, setHistory] = useState([initial]);

    function transition(mode, replace=false) {
        if (replace === true) {
            setHistory(history[-1] = mode);
            return setMode(mode);
        }
        setHistory(history.push(mode));
        return setMode(mode);
    }

    function back() {
        setHistory(history.pop());
        setMode(history[-1]);
    }

    return {mode, transition, back};
}