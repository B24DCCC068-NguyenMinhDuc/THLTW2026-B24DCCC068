import React, { useState } from 'react';
import { Button, Table, Tag, Space, Card } from 'antd';
import type { ColumnsType } from 'antd/es/table';

type Choice = "Búa" | "Bao" | "Kéo";

interface History {
    key: Number,
    player: Choice,
    computer: Choice,
    result: string,
}

const choices: Choice[] = ["Búa", "Bao", "Kéo"];

const getComputerChoice = (): Choice => {
    const randomIndex = Math.floor(Math.random() * choices.length);
    return choices[randomIndex];
}

const getResult = (player: Choice, computer: Choice) => {
    if (player === computer) return "Hòa";

    if (
        (player === "Búa" && computer === "Kéo") ||
        (player === "Kéo" && computer === "Bao") ||
        (player === "Bao" && computer === "Búa")
    ) {
        return "Thắng";
    }

    return "Thua";
}

const RockPaperScissor: React.FC = () => {
    const [history, setHistory] = useState<History[]>([]);
    const [round, setRound] = useState(1);

    const playGame = (playerChoice: Choice) => {
        const computerChoice = getComputerChoice();
        const result = getResult(playerChoice, computerChoice);

        const newRound: History = {
            key: round,
            player: playerChoice,
            computer: computerChoice,
            result,
        };

        setHistory([newRound, ...history]);
        setRound(round + 1);
    }

    const columns: ColumnsType<History> = [
        {
            title: "Ván",
            dataIndex: "key",
        },
        {
            title: "Người chơi",
            dataIndex: "player",
        },
        {
            title: "Máy",
            dataIndex: "computer",
        },
        {
            title: "Kết quả",
            dataIndex: "result",
            render: (result: String) => {
                let color = "default";
                if (result === "Thắng") color = "green";
                if (result === "Hòa") color = "gold";
                if (result === "Thua") color = "red";

                return <Tag color={color}>{result}</Tag>
            },
        },
    ];

    return (
        <Card title="Trò Chơi Oẳn Tù Tì" style={{ maxWidth: 600, margin: "auto" }}>
            <Space style={{ marginBottom: 20 }}>
                <Button type="primary" onClick={() => playGame("Kéo")}>
                    Kéo
                </Button>
                <Button type="primary" onClick={() => playGame("Búa")}>
                    Búa
                </Button>
                <Button type="primary" onClick={() => playGame("Bao")}>
                    Bao
                </Button>
            </Space>

            <Table
                columns={columns}
                dataSource={history}
                pagination={false}
                bordered
            />
        </Card>
    );
};

export default RockPaperScissor;