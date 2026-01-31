import { createContext, useState, useEffect } from 'react';
import { STORAGE_KEYS, EDITOR_CONSTANTS } from '../utils/constants';
import { loadLevels } from '../utils/levelsData';

export const GameContext = createContext();

export const GameProvider = ({ children }) => {
    console.log('🎮 GameProvider: Initializing State...');

    useEffect(() => {
        console.log('🎮 GameProvider: MOUNTED');
        return () => console.log('🎮 GameProvider: UNMOUNTED');
    }, []);

    const [currentLevel, setCurrentLevel] = useState(EDITOR_CONSTANTS.LEVEL_START);
    const [levels, setLevels] = useState([]);
    const [progress, setProgress] = useState(() => {
        try {
            const stored = localStorage.getItem(STORAGE_KEYS.PROGRESS);
            console.log('📦 GameProvider: Stored progress found:', stored);
            return stored ? JSON.parse(stored) : { completedLevels: [] };
        } catch (err) {
            console.error('❌ GameProvider: Error parsing progress from localStorage:', err);
            return { completedLevels: [] };
        }
    });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const initLevels = async () => {
            console.log('🔄 GameProvider: initLevels triggered');
            try {
                setLoading(true);
                const loadedLevels = await loadLevels();
                console.log('✅ GameProvider: Levels received from loadLevels:', loadedLevels);

                if (!loadedLevels || loadedLevels.length === 0) {
                    console.warn('⚠️ GameProvider: Loaded levels array is empty');
                }

                setLevels(loadedLevels);
                setLoading(false);
            } catch (err) {
                console.error('❌ GameProvider: Error in initLevels:', err);
                setError(err.message || 'Unknown error loading levels');
                setLoading(false);
            }
        };

        initLevels();
    }, []);

    useEffect(() => {
        try {
            localStorage.setItem(STORAGE_KEYS.PROGRESS, JSON.stringify(progress));
        } catch (err) {
            console.error('❌ GameProvider: Error saving progress to localStorage:', err);
        }
    }, [progress]);

    const markLevelComplete = (levelIndex) => {
        setProgress(prev => {
            const completedLevels = [...prev.completedLevels];
            if (!completedLevels.includes(levelIndex)) {
                completedLevels.push(levelIndex);
            }
            return { ...prev, completedLevels };
        });
    };

    const isLevelCompleted = (levelIndex) => {
        return progress.completedLevels.includes(levelIndex);
    };

    const isLevelAccessible = (levelIndex) => {
        if (levelIndex === 0) return true;
        return isLevelCompleted(levelIndex - 1);
    };

    const navigateToLevel = (levelIndex) => {
        if (levelIndex >= 0 && levelIndex < levels.length && isLevelAccessible(levelIndex)) {
            setCurrentLevel(levelIndex);
        }
    };

    return (
        <GameContext.Provider
            value={{
                currentLevel,
                levels,
                loading,
                error,
                progress,
                setCurrentLevel,
                markLevelComplete,
                isLevelCompleted,
                isLevelAccessible,
                navigateToLevel,
            }}
        >
            {children}
        </GameContext.Provider>
    );
};
