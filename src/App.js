import React, { useState, useRef, useEffect } from "react";
import "./App.css";

const App = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [articleCount, setArticleCount] = useState(0);
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
    const filteredArticles = articles.filter(
      (article) =>
        article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        article.description.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setArticleCount(filteredArticles.length);
  }, [searchTerm]);

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleClearSearch = () => {
    setSearchTerm("");
  };

  const highlightText = (text) => {
    if (!searchTerm) return text;
    const parts = text.split(new RegExp(`(${searchTerm})`, "gi"));
    return parts.map((part, index) =>
      part.toLowerCase() === searchTerm.toLowerCase() ? (
        <mark key={index} className="highlight">
          {part}
        </mark>
      ) : (
        part
      )
    );
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
          {articleCount} {articleCount === 1 ? "article" : "articles"} found
        </div>
        <div className="App-articles">
          {articles.map((article, index) => (
            <div
              key={index}
              ref={(el) => {
                if (el) articlesRef.current[index] = el;
              }}
              className="App-article"
            >
              <h2>{highlightText(article.title)}</h2>
              <p>{highlightText(article.description)}</p>
              <small>{article.date}</small>
            </div>
          ))}
        </div>
      </header>
    </div>
  );
};

export default App;
