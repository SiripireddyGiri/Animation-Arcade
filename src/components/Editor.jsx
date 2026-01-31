import { useEffect, useRef } from 'react';
import { EDITOR_CONSTANTS, EDITOR_CSS_CLASSES } from '../utils/constants';

const Editor = ({ level, onValidate, inputs, setInputs, submitLabel = 'Next' }) => {
    const codeContentRef = useRef(null);

    useEffect(() => {
        if (inputs.length > 0) {
            setTimeout(() => {
                const firstInput = codeContentRef.current?.querySelector('input');
                firstInput?.focus();
            }, EDITOR_CONSTANTS.FOCUS_DELAY);
        }
    }, [level, inputs.length]);

    const handleInputChange = (index, value) => {
        const newInputs = [...inputs];
        newInputs[index] = { ...newInputs[index], value };
        setInputs(newInputs);
    };

    const handleKeyDown = (e) => {
        if (e.key === EDITOR_CONSTANTS.KEYS.ENTER && (e.ctrlKey || e.metaKey)) {
            onValidate();
        }
    };

    const renderDescription = () => {
        if (!level.description) return null;

        let formattedDesc = level.description;

        if (level.descriptionCode) {
            level.descriptionCode.forEach((code) => {
                formattedDesc = formattedDesc.replace(
                    code.placeholder,
                    `<code>${code.value}</code>`
                );
            });
        }

        return <p className="game-description" dangerouslySetInnerHTML={{ __html: formattedDesc }} />;
    };

    const renderKeyframesHeader = () => {
        if (!level.keyframes) return null;

        return (
            <div className="keyframes-header">
                <span className="keyframes-name">@keyframes {level.keyframes.name}</span>
                {' {'}
            </div>
        );
    };

    return (
        <div className="editor-container">
            <div className="description-box">
                <h2 className="level-title">{level.title}</h2>
                {renderDescription()}
                {level.question && <p className="question-highlight">{level.question}</p>}
            </div>

            <div className="code-editor">
                <div className="line-numbers" id="lineNumbers">
                    {level.code.map((_, index) => (
                        <span key={index}>{index + EDITOR_CONSTANTS.LINE_NUMBER_START}</span>
                    ))}
                </div>

                <pre className="code-content" id="codeContent" ref={codeContentRef}>
                    {renderKeyframesHeader()}
                    {level.code.map((line, lineIndex) => {
                        const blank = level.blanks.find((b) => b.line === lineIndex);

                        if (blank) {
                            const parts = line.split(EDITOR_CONSTANTS.BLANK_PLACEHOLDER);
                            const inputIndex = level.blanks.findIndex((b) => b.line === lineIndex);

                            return (
                                <div key={lineIndex} className={EDITOR_CSS_CLASSES.CODE_LINE}>
                                    {parts[0] && (
                                        <span className={EDITOR_CSS_CLASSES.CODE_LINE_TEXT}>{parts[0]}</span>
                                    )}
                                    <span className={EDITOR_CSS_CLASSES.CODE_LINE_BLANK}>
                                        <input
                                            type="text"
                                            className={`${EDITOR_CSS_CLASSES.BLANK_INPUT} ${inputs[inputIndex]?.status || ''}`}
                                            value={inputs[inputIndex]?.value || ''}
                                            onChange={(e) => handleInputChange(inputIndex, e.target.value)}
                                            onKeyDown={handleKeyDown}
                                            data-answer={blank.answer}
                                            data-line={lineIndex}
                                            placeholder=""
                                        />
                                    </span>
                                    {parts[1] && (
                                        <span className={EDITOR_CSS_CLASSES.CODE_LINE_TEXT}>{parts[1]}</span>
                                    )}
                                </div>
                            );
                        }

                        return (
                            <div key={lineIndex} className={EDITOR_CSS_CLASSES.CODE_LINE}>
                                <span className={EDITOR_CSS_CLASSES.CODE_LINE_TEXT}>{line}</span>
                            </div>
                        );
                    })}
                </pre>
            </div>

            <div className="editor-footer">
                <button className="submit-btn" onClick={onValidate}>
                    {submitLabel}
                </button>
            </div>
        </div>
    );
};

export default Editor;
