// @flow

// Note: Entity Types can be found in ../decls/types.js and are imported in ../.flowconfig

import * as React from 'react';

const ARTICLES = [
  { id: '0', title: 'How to fetch data in React', url: 'https://www.robinwieruch.de/react-fetching-data/' },
  { id: '1', title: 'React\'s Ecosystem as a flexible Framework', url: 'https://www.robinwieruch.de/essential-react-libraries-framework/' },
  { id: '2', title: 'What\'s new in React 16?', url: 'https://www.robinwieruch.de/what-is-new-in-react-16/' },
  { id: '3', title: '8 things to learn in React before using Redux', url: 'https://www.robinwieruch.de/learn-react-before-using-redux/' },
  { id: '4', title: 'Accept Stripe Payments with React and Express', url: 'https://www.robinwieruch.de/react-express-stripe-payment/' },
  { id: '5', title: 'Tips to learn React + Redux', url: 'https://www.robinwieruch.de/tips-to-learn-react-redux/' },
  { id: '6', title: '10 Reasons why I moved from Angular to React', url: 'https://www.robinwieruch.de/reasons-why-i-moved-from-angular-to-react/' },
  { id: '7', title: 'All the Conditional Renderings in React', url: 'https://www.robinwieruch.de/conditional-rendering-react/' },
  { id: '8', title: 'Redux or MobX: An attempt to dissolve the Confusion', url: 'https://www.robinwieruch.de/redux-mobx-confusion/' },
  { id: '9', title: 'Tips to learn React + Redux', url: 'https://www.robinwieruch.de/tips-to-learn-react-redux/' },
  { id: '10', title: 'A gentle Introduction to React\'s Higher Order Components', url: 'https://www.robinwieruch.de/gentle-introduction-higher-order-components/' },
  { id: '11', title: 'Complete Course to learn Redux and MobX', url: 'https://roadtoreact.com/' },
];

type AppProps = {

};

type AppState = {
  searchTerm: string,
};

const applyFilter = (searchTerm: string): Function => (article: ArticleEntity): boolean =>
  article.title.toLowerCase().includes(searchTerm.toLowerCase());

const applySearchTerm = (searchTerm: string): Function => () => ({
  searchTerm,
});

class App extends React.Component<AppProps, AppState> {
  constructor() {
    super();

    this.state = {
      searchTerm: '',
    };

    (this:any).onSearch = this.onSearch.bind(this);
  }

  onSearch(event: SyntheticInputEvent<HTMLInputElement>) {
    const { value } = event.target;

    this.setState(applySearchTerm(value));
  }

  render() {
    const { searchTerm } = this.state;

    return (
      <div>
        <Search value={searchTerm} onSearch={this.onSearch}>
          <p>Search</p>
        </Search>

        <Articles articles={ARTICLES.filter(applyFilter(searchTerm))} />

        <p>Found in <a href="https://roadtoreact.com/">the Road to learn React</a></p>
      </div>
    );
  }
}

type SearchProps = {
  value: string,
  onSearch: Function,
  children: React.Element<any> | string,
};

function Search({ value, onSearch, children }: SearchProps) {
  return (
    <div>
      {children} <input
        value={value}
        onChange={onSearch}
        type="text"
      />
    </div>
  );
}

type ArticlesProps = {
  articles: ArticlesEntity,
};

function Articles({ articles }: ArticlesProps) {
  return (
    <ul>
      {articles.map(article =>
        <li key={article.id}>
          <Article article={article} />
        </li>
      )}
    </ul>
  );
}

type ArticleProps = {
  article: ArticleEntity,
};

function Article({ article }: ArticleProps) {
  return <a href={article.url}>{article.title}</a>
}

export default App;
