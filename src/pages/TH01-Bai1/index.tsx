import React, { useState } from 'react';
import { Button } from 'antd';

const RandomNumberGenerate: React.FC = () => {
    const [targetNumber, setTargetNumber] = useState<number>(
        Math.floor(Math.random() * 100) + 1
    );
    const [guess, setGuess] = useState<string>("");
    const [message, setMessage] = useState<string>("");
    const [attempts, setAttempts] = useState<number>(0);
    const maxAttempts = 10;

    const handleSubmit = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();

        if (attempts > maxAttempts) return;

        const guessedNumber = Number(guess);

        if (isNaN(guessedNumber) || guessedNumber < 1 || guessedNumber > 100) {
            setMessage("Vui lòng nhập số từ 1 đến 100");
            return;
        }

        const newAttempts = attempts + 1;
        setAttempts(newAttempts);

        if (guessedNumber < targetNumber) {
            setMessage("Bạn đoán quá thấp!");
        } else if (guessedNumber > targetNumber) {
            setMessage("Bạn đoán quá cao!");
        } else {
            setMessage("Chúc mừng! Bạn đã đoán đúng!");
            return;
        }

        if (newAttempts === maxAttempts) {
            setMessage(`Bạn đã hết lượt! Số đúng là ${targetNumber}`);
        }

        setGuess("");
    };

    const handleReset = () => {
        setTargetNumber(Math.floor(Math.random() * 100) + 1);
        setGuess("");
        setMessage("");
        setAttempts(0);
    };

    return (
        <div style={{ padding: 24 }}>
            <h1>Trò chơi đoán số</h1>
            <div
                style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    marginBottom: 16,
                    gap: 8,
                }}
            >
                <input 
                    type="number"
                    min={1}
                    max={100}
                    value={guess}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                        setGuess(e.target.value)
                    }
                    placeholder="Nhập số từ 1 - 100"
                    style={{
                        flex: 1,
                        padding: 8,
                        borderRadius: 4,
                        border: '1px solid #ccc',
                    }}
                    disabled={attempts >= 10}
                />
                <Button
                    type="primary"
                    onClick={handleSubmit}
                    disabled={attempts >= 10}
                >
                    Đoán
                </Button>
                <Button onClick={handleReset}>
                    Chơi lại
                </Button>
            </div>
            <p>Số lượt đã dùng: {attempts} / 10</p>
            {message && (
                <div
                    style={{
                        marginTop: 12,
                        padding: 12,
                        background: "#f5f5f5",
                        borderRadius: 6,
                    }}
                >
                    {message}
                </div>
            )}
        </div>
    );
};

export default RandomNumberGenerate;