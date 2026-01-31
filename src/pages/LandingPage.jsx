import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import Navbar from '../components/Navbar';
import AuthModal from '../components/AuthModal';
import { ROUTES, MESSAGES } from '../utils/constants';

const LandingPage = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const { user } = useAuth();
    const navigate = useNavigate();

    const handleStartGame = () => {
        if (!user) {
            setIsModalOpen(true);
            window.dispatchEvent(new CustomEvent('aa:auth:prompt', { detail: { reason: 'startGame' } }));
        } else {
            navigate(ROUTES.GAME);
        }
    };

    return (
        <>
            <Navbar onLoginClick={() => setIsModalOpen(true)} />

            <main className="landing-page">
                <section className="page-description">
                    <h1>Learn CSS Animations Through Play</h1>
                    <p>
                        Animation Arcade is a gamified platform that teaches CSS animations,
                        transforms, and transitions using hands-on, cricket-themed challenges.
                    </p>
                    <button id="startGameBtn" className="start-btn" onClick={handleStartGame}>
                        Start Playing Now
                    </button>
                </section>

                <section className="hero-section">
                    <h2 className="hero-title">
                        Master CSS Animations Through Interactive Challenges
                    </h2>
                    <p className="hero-subtitle">
                        Write real CSS, animate real elements, and level up your animation
                        skills through gameplay.
                    </p>

                    <div className="features-grid">
                        <div className="feature-card">
                            <div className="feature-icon"></div>
                            <h3>Interactive Learning</h3>
                            <p>
                                Write real CSS code and instantly see animations execute on the
                                game board.
                            </p>
                        </div>

                        <div className="feature-card">
                            <div className="feature-icon"></div>
                            <h3>Progressive Levels</h3>
                            <p>
                                Progress through 10 carefully designed levels with increasing
                                difficulty.
                            </p>
                        </div>

                        <div className="feature-card">
                            <div className="feature-icon"></div>
                            <h3>Hints & Learning</h3>
                            <p>
                                Use built-in hints to understand CSS animation concepts while
                                playing.
                            </p>
                        </div>

                        <div className="feature-card">
                            <div className="feature-icon"></div>
                            <h3>Track Progress</h3>
                            <p>Track completed levels and continue your progress anytime.</p>
                        </div>
                    </div>
                </section>

                <section className="info-section">
                    <h2>How Animation Arcade Works</h2>
                    <div className="steps">
                        <div className="step">
                            <div className="step-number">1</div>
                            <h3>Read the Challenge</h3>
                            <p>
                                Each level introduces a cricket-themed and CSS animation challenge
                                with clear goals.
                            </p>
                        </div>

                        <div className="step">
                            <div className="step-number">2</div>
                            <h3>Write Your CSS</h3>
                            <p>
                                Write real CSS animations, transforms, and transitions in the
                                editor.
                            </p>
                        </div>

                        <div className="step">
                            <div className="step-number">3</div>
                            <h3>See the Animation</h3>
                            <p>
                                The animation engine executes your CSS and shows real-time
                                results.
                            </p>
                        </div>

                        <div className="step">
                            <div className="step-number">4</div>
                            <h3>Progress & Improve</h3>
                            <p>
                                Pass validation, unlock new levels, and sharpen your CSS skills.
                            </p>
                        </div>
                    </div>
                </section>
            </main>

            <AuthModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
        </>
    );
};

export default LandingPage;
