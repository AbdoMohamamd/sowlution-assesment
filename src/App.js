import React, { useState, useRef, useEffect } from "react";
import "./App.css";

const App = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [highlightedIndex, setHighlightedIndex] = useState(null);
  const [highlightedWords, setHighlightedWords] = useState([]);
  const articlesRef = useRef([]);

  const articles = [
    {
      title: "Introduction to React",
      description:
        "React is a JavaScript library for building user interfaces. It allows developers to build single-page applications with a component-based architecture. React promotes the use of reusable components and provides a virtual DOM to optimize performance.",
      date: "2024-01-15",
    },
    {
      title: "Understanding Components",
      description:
        "Components are the building blocks of React applications. They let you split the UI into independent, reusable pieces that can be managed separately. Components can be class-based or functional, and they encapsulate their own state and behavior.",
      date: "2024-02-20",
    },
    {
      title: "Props and State",
      description:
        "Props are used to pass data from parent to child components, while state is used to manage data within a component. Props are immutable and allow components to be reusable, while state is mutable and managed within the component.",
      date: "2024-03-05",
    },
    {
      title: "React's Virtual DOM",
      description:
        "React uses a virtual DOM to optimize performance. It minimizes the number of direct DOM manipulations by using a lightweight virtual representation of the real DOM. This approach enhances the efficiency of rendering updates.",
      date: "2024-04-10",
    },
    {
      title: "Lifecycle Methods",
      description:
        "Lifecycle methods are hooks that allow you to run code at specific points in a component's life. They are essential for managing side effects, such as data fetching or subscriptions, and optimizing performance by controlling component updates.",
      date: "2024-05-25",
    },
    {
      title: "React Hooks Overview",
      description:
        "React hooks are functions that let you use state and other React features without writing a class. Hooks like useState and useEffect simplify the process of managing state and side effects in functional components.",
      date: "2024-06-15",
    },
    {
      title: "Handling Events",
      description:
        "Event handling in React involves attaching event handlers to elements. React provides a consistent way to handle events across different browsers, and you can use synthetic events to manage user interactions effectively.",
      date: "2024-07-20",
    },
    {
      title: "Context API",
      description:
        "The Context API provides a way to pass data through the component tree without having to pass props down manually at every level. It’s useful for managing global state and avoiding prop drilling in React applications.",
      date: "2024-08-10",
    },
    {
      title: "React Router",
      description:
        "React Router is a library for routing in React applications. It enables navigation between different views or pages within a single-page application and supports dynamic routing and URL parameters.",
      date: "2024-09-05",
    },
  ];

  useEffect(() => {
    // Find all highlighted words
    const newHighlightedWords = [];
    articles.forEach((article, articleIndex) => {
      if (
        article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        article.description.toLowerCase().includes(searchTerm.toLowerCase())
      ) {
        const words = [];

        const addHighlightedWord = (text, type) => {
          let startIndex = 0;
          let searchTermLower = searchTerm.toLowerCase();
          while (
            (startIndex = text
              .toLowerCase()
              .indexOf(searchTermLower, startIndex)) > -1
          ) {
            words.push({
              start: startIndex,
              end: startIndex + searchTerm.length,
              type,
            });
            startIndex += searchTerm.length;
          }
        };

        addHighlightedWord(article.title, "title");
        addHighlightedWord(article.description, "description");

        if (words.length > 0) {
          newHighlightedWords.push({ articleIndex, words });
        }
      }
    });
    setHighlightedWords(newHighlightedWords);
    setHighlightedIndex(0); // Start from the first highlighted word
  }, [searchTerm, articles]);

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleClearSearch = () => {
    setSearchTerm("");
    setHighlightedIndex(null);
  };

  const highlightText = (text, type) => {
    if (!searchTerm) return text;
    const highlighted = highlightedWords.flatMap((h) =>
      h.words.filter((w) => w.type === type)
    );
    const parts = text.split(new RegExp(`(${searchTerm})`, "gi"));
    return parts.map((part, index) =>
      highlighted.some(
        (h) =>
          part.toLowerCase() === searchTerm.toLowerCase() &&
          h.start <= index &&
          h.end >= index
      ) ? (
        <mark key={index} className="highlight">
          {part}
        </mark>
      ) : (
        part
      )
    );
  };

  const scrollToHighlightedWord = (direction) => {
    const currentHighlighted = highlightedWords[highlightedIndex];
    if (!currentHighlighted) return;

    let newIndex = highlightedIndex;
    if (direction === "next") {
      newIndex = (highlightedIndex + 1) % highlightedWords.length;
    } else {
      newIndex =
        (highlightedIndex - 1 + highlightedWords.length) %
        highlightedWords.length;
    }

    const nextHighlighted = highlightedWords[newIndex];
    if (nextHighlighted) {
      setHighlightedIndex(newIndex);
      const element = articlesRef.current[nextHighlighted.articleIndex];
      if (element) {
        element.scrollIntoView({ behavior: "smooth", block: "center" });
      }
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Article Search</h1>
        <div className="App-search-container">
          <input
            type="text"
            placeholder="Search..."
            value={searchTerm}
            onChange={handleSearchChange}
            className="App-search-input"
          />
          <button onClick={handleClearSearch} className="App-clear-button">
            Clear
          </button>
        </div>
        <div className="App-counter">
          {highlightedWords.length}{" "}
          {highlightedWords.length === 1
            ? "highlighted word"
            : "highlighted words"}{" "}
          found
        </div>
        <div className="App-navigation">
          <button
            onClick={() => scrollToHighlightedWord("prev")}
            className="App-nav-button"
          >
            ◀
          </button>
          <button
            onClick={() => scrollToHighlightedWord("next")}
            className="App-nav-button"
          >
            ▶
          </button>
        </div>
        <div className="App-articles">
          {articles.map((article, index) => (
            <div
              key={index}
              ref={(el) => {
                if (el) articlesRef.current[index] = el;
              }}
              className={`App-article ${
                highlightedWords.some((h) => h.articleIndex === index)
                  ? "has-highlight"
                  : ""
              }`}
            >
              <h2>{highlightText(article.title, "title")}</h2>
              <p>{highlightText(article.description, "description")}</p>
              <small>{article.date}</small>
            </div>
          ))}
        </div>
      </header>
      <div className="App-fixed-arrows">
        <button
          onClick={() => scrollToHighlightedWord("prev")}
          className="App-nav-button"
        >
          ◀
        </button>
        <button
          onClick={() => scrollToHighlightedWord("next")}
          className="App-nav-button"
        >
          ▶
        </button>
      </div>
    </div>
  );
};

export default App;
