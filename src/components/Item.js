import React, { useState } from 'react';

const Item = () => {
  const [puzzles, setPuzzles] = useState([
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
  ]);

  const [newPuzzle, setNewPuzzle] = useState({
    description: "",
    options: ["", "", ""],
    correct: 0
  });

  const handleOptionSelect = (puzzleId, optionIndex) => {
    const updatedPuzzles = puzzles.map(puzzle => {
      if (puzzle.id === puzzleId) {
        return { ...puzzle, selectedOption: optionIndex };
      }
      return puzzle;
    });
    setPuzzles(updatedPuzzles);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewPuzzle(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleOptionChange = (index, value) => {
    const updatedOptions = [...newPuzzle.options];
    updatedOptions[index] = value;
    setNewPuzzle(prevState => ({
      ...prevState,
      options: updatedOptions
    }));
  };

  const handleAddPuzzle = () => {
    const newId = puzzles.length + 1;
    const newPuzzles = [
      ...puzzles,
      {
        id: newId,
        description: newPuzzle.description,
        options: newPuzzle.options,
        correct: parseInt(newPuzzle.correct),
        selectedOption: null
      }
    ];
    setPuzzles(newPuzzles);
    setNewPuzzle({
      description: "",
      options: ["", "", ""],
      correct: 0
    });
  };

  return (
    <div>
      {puzzles.map(puzzle => (
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
      <div>
        <h3>Добавить новую загадку:</h3>
        <input
          type="text"
          placeholder="Описание"
          name="description"
          value={newPuzzle.description}
          onChange={handleInputChange}
        />
        {newPuzzle.options.map((option, index) => (
          <input
            key={index}
            type="text"
            placeholder={`Вариант ответа ${index + 1}`}
            value={option}
            onChange={(e) => handleOptionChange(index, e.target.value)}
          />
        ))}
        <select
          value={newPuzzle.correct}
          onChange={(e) => setNewPuzzle(prevState => ({
            ...prevState,
            correct: e.target.value
          }))}
        >
          {newPuzzle.options.map((option, index) => (
            <option key={index} value={index}>{`Вариант ${index + 1}`}</option>
          ))}
        </select>
        <button onClick={handleAddPuzzle}>Добавить</button>
      </div>
    </div>
  );
};

export default Item;
