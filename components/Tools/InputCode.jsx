import React, {useState, useRef} from "react";
import styles from "@/scss/modules/code.module.scss";
import {isNumber, parseArabic} from "@/lib/Functions";

const InputCode = ({length, label, loading, onComplete}) => {
    const [code, setCode] = useState([...Array(length)].map(() => ""));
    const inputs = useRef([]);

    const processInput = (e, slot) => {
        const num = parseArabic(e.target.value);

        if (/[^0-9]/.test(num)) return;
        const newCode = [...code];
        newCode[slot] = num;
        setCode(newCode);
        if (slot !== length - 1) {
            inputs.current[slot + 1].focus();
        }
        onComplete(newCode.join(""));
        if (newCode.every(num => num !== "")) {
        }
    };

    const onKeyUp = (e, slot) => {
        if (e.keyCode === 8 && !code[slot] && slot !== 0) {
            const newCode = [...code];
            newCode[slot - 1] = "";
            setCode(newCode);
            inputs.current[slot - 1].focus();
        }
    };

    return (
        <div className={styles.codeInput}>
            <div className={styles.codeInputs}>
                {code.map((num, idx) => {
                    return (
                        <input
                            key={idx}
                            type="text"
                            inputMode="numeric"
                            maxLength={1}
                            value={num}
                            autoFocus={!code[0].length && idx === 0}
                            readOnly={loading}
                            onChange={e => processInput(e, idx)}
                            onKeyUp={e => onKeyUp(e, idx)}
                            onPaste={(e) => {
                                const code = e.clipboardData.getData("Text");
                                if (code.length && isNumber(code)) {
                                    setCode(code.split("").map(x => parseInt(x)));
                                    onComplete(code);
                                }
                            }}
                            ref={ref => inputs.current.push(ref)}
                        />
                    );
                })}
            </div>
        </div>
    );
};

export default InputCode;
