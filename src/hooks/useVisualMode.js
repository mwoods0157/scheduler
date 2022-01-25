import React, { useState } from 'react';

export default function useVisualMode(initial) {
    const [mode, setMode] = useState(initial);
    const [history, setHistory] = useState([initial]);

    function transition(mode, replace=false) {
        if (replace) {
            setHistory(history[-1] = mode);
            return setMode(mode);
        }
        console.log("Transition ---", history);
        setHistory(history.push(mode));
        console.log("Transition 2---", history);
        setHistory(history.pop());
        console.log("Transition 3---", history);
        return setMode(mode);
    }

    function back() {
        if (mode.length < 1) {
            console.log("History---", history);
           
            return;
        }
        if (mode === initial) {
            return;
        }
        console.log("History---", history);
        setHistory(history.pop());
        console.log("Transition4 ---", history);
        setMode(history[0]);
    }

    return {mode, transition, back};
}