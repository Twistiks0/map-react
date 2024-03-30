import React, { useState } from 'react';

const puzzles = [
  {
    id: 1,
    description: "Чем является арбуз?",
    options: ["Фруктом", "Овощем", "Ягодой"],
    correct: 2,
    selectedOption: null
  },
  {
    id: 2,
    description: "Какой гриб самый ядовитый?",
    options: ["Поганка", "Мухомор", "Лисичка"],
    correct: 1,
    selectedOption: null
  },
  {
    id: 3,
    description: "Самая высокая гора называется ...",
    options: ["Джомолунгма", "Эверест", "Урал"],
    correct: 1,
    selectedOption: null
  },
  {
    id: 4,
    description: "Где правили фараоны?",
    options: ["В Египте", "В Греции", "В Риме"],
    correct: 0,
    selectedOption: null
  }
];

const Item = () => {
  const [puzzlesData, setPuzzlesData] = useState(puzzles);

  const handleOptionSelect = (puzzleId, optionIndex) => {
    const updatedPuzzles = puzzlesData.map(puzzle => {
      if (puzzle.id === puzzleId) {
        return { ...puzzle, selectedOption: optionIndex };
      }
      return puzzle;
    });
    setPuzzlesData(updatedPuzzles);
  };

  return (
    <div>
      {puzzlesData.map(puzzle => (
        <div key={puzzle.id} className="puzzle-container">
          <h3>{puzzle.description}</h3>
          <ul>
            {puzzle.options.map((option, index) => {
              const isSelected = puzzle.selectedOption === index;
              const isCorrect = isSelected && puzzle.selectedOption === puzzle.correct;
              const isIncorrect = isSelected && puzzle.selectedOption !== puzzle.correct;
              return (
                <li
                  key={index}
                  onClick={() => handleOptionSelect(puzzle.id, index)}
                  style={{
                    cursor: 'pointer',
                    color: isCorrect ? 'green' : isIncorrect ? 'red' : 'inherit',
                    fontWeight: isSelected ? 'bold' : 'normal'
                  }}
                >
                  {option}
                </li>
              );
            })}
          </ul>
        </div>
      ))}
    </div>
  );
};

export default Item;
