import React, { useState } from "react";
import Badge from "./Badge";
const BadgeContainer = ({setBadgeName, setBadgeNameColor}) => {

    const [selectedBadge, setSelectedBadge] = useState(null);

    const handleBadgeClick = (index) => {
        setSelectedBadge(index);
        setBadgeName(badgeNames[index]);
        setBadgeNameColor("main-color");
    }

    const badgeNames = [
        "오점먹", "오저먹", "오점뭐", "오저뭐", "다이어트", "식당추천", "혼밥", "혼술"
    ]

    return (
        <div
            className="gap-1"
            style={{
                display: "flex",
                flexWrap: "wrap",
                width: "100%",
            }}
        >
            {badgeNames.map((name, index) => (
                <Badge
                    key={index}
                    name={name}
                    isSelected={selectedBadge === index}
                    onClick={() => handleBadgeClick(index)}
                />
            ))}
        </div>
    );
};

export default BadgeContainer;