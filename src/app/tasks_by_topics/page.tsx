"use client";

import { useState } from "react";

const topics = [
    {
      category: "Алгебра і початки аналізу",
      icon: "📚",
      subtopics: [
        {
          title: "1. Цілі числа і вирази",
          subtasks: [
            "Дійсні числа",
            "Відношення та пропорції",
            "Показникові, логарифмічні вирази",
            "Раціональні, ірраціональні числа",
          ],
        },
        { title: "2. Рівняння, нерівності та їхні системи", 
          subtasks: [
            "Лінійні, квадратні, раціональні рівняння та системи рівнянь",
            "Ірраціональні, тригонометричні рівняння та системи рівнянь",
            "Показникові, логарифмічні рівняння та системи рівнянь",
            "Нерівності та системи нерівностей",
            "Розв’язування задач за допомогою рівнянь і систем рівнянь"
          ] },
        { title: "3. Функції", subtasks: [
            "Числові послідовності",
            "Функціональна залежність",
            "Лінійні та квадратні функції",
            "Степеневі, показникові, логарифмічні та тригонометричні функції.",
            "Похідна функції",
            "Первісна та визначений інтеграл "
        ] },
        {
          title: "4. Комбінаторика, теорія ймовірностей, статистика",
          subtasks: [
            "Перестановки, комбінації, розміщення. Комбінаторні правила суми та добутку",
            "Ймовірність випадкової події. Вибіркові характеристики"
          ],
        },
      ],
    },
    {
      category: "Геометрія",
      icon: "📐",
      subtopics: [
        {
          title: "1. Планіметрія",
          subtasks: [
            "Елементарні геометричні фігури на площині. Геометричні величини",
            "Трикутники",
            "Паралелограм. Ромб. Трапеція",
            "Прямокутник. Квадрат",
            "Коло та круг. Многокутники",
            "Координати та вектори на площині. Геометричні переміщення "
          ],
        },
        {
          title: "2. Стереометрія",
          subtasks: [
            "Прямі та площини у просторі",
            "Призма",
            "Піраміда",
            "Тіла обертання",
            "Координати та вектори у просторі"
          ],
        },
      ],
    },
];

export default function TopicsPage() {
  const [expandedTopics, setExpandedTopics] = useState<Record<string, boolean>>(
    {}
  );

  const toggleTopic = (title: string) => {
    setExpandedTopics((prev) => ({
      ...prev,
      [title]: !prev[title],
    }));
  };

  return (
    <div className="container-fluid px-0" style={{ margin: 0, padding: 0 }}>
      {/* Заголовок сторінки */}
      <header className="mb-4 text-center">
        <h1 className="fw-bold text-primary">Задачі за темами</h1>
        <p className="text-muted">Оберіть тему, щоб отримати теорію та задачі.</p>
      </header>

      {/* Список категорій */}
      <div className="accordion mx-4">
        {topics.map((topic, index) => (
          <div key={index} className="mb-4">
            <h2 className="fw-bold mb-3 text-primary" style={{ marginLeft: "100px" }}>
              {topic.icon} {topic.category}
            </h2>
            {topic.subtopics.map((subtopic, subIndex) => (
              <div key={subIndex} className="mb-3" style={{ marginLeft: "120px" }}>
                <button
                  className="btn btn-link text-dark text-decoration-none fw-bold"
                  onClick={() => toggleTopic(subtopic.title)}
                >
                  {subtopic.title} {expandedTopics[subtopic.title] ? "▾" : "▸"}
                </button>
                {expandedTopics[subtopic.title] && (
                  <ul className="list-unstyled ps-3" style={{ marginLeft: "20px" }}>
                    {subtopic.subtasks.map((task, taskIndex) => (
                      <li key={taskIndex} className="mb-2">
                        {task}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
