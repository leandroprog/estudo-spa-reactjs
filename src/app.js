"use strict";

import React, { PureComponent } from "react";
import { BrowserRouter, NavLink, Route, Switch } from "react-router-dom";

import "./css/style.css";

class App extends PureComponent {
  constructor() {
    super();
    this.state = {
      title: "...",
      Component: "div",
    };
  }

  getTitle() {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve("My app with async / await!");
      }, 2000);
    });
  }

  async componentDidMount() {
    const title = await import("components/title");

    this.setState({
      title: await this.getTitle(),
      Component: title.default,
    });
  }

  render() {
    return (
      <BrowserRouter>
        <div>
          {/* <this.state.Component>{this.state.title}</this.state.Component> */}
          <ul>
            <li>
              {" "}
              <Link to="/" exact>
                Home
              </Link>
            </li>
            <li>
              {" "}
              <Link to="/sobre">Sobre</Link>
            </li>
            <li>
              {" "}
              <Link to="/blog">Blog</Link>
            </li>
            <li>
              {" "}
              <Link to="/contato">Contato</Link>
            </li>
          </ul>

          <Switch>
            <Route path="/" component={Home} exact />
            <Route path="/(sobre|contato)" component={Page} />
            <Route path="/blog" component={Blog} />
            <Route component={Erro404} />
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}

const Home = ({ match }) => (
  <div>
    {console.log("Home match", match)}
    <h1>Home</h1>
  </div>
);

const Page = ({ match }) => (
  <div>
    {console.log("Page match", match)}
    <p>{match.url}</p>
  </div>
);

const Blog = ({ match }) => (
  <div>
    {console.log("Home match", match)}
    <h1>Blog</h1>
    <ul>
      <li>
        <Link to="/blog/post-1">Post 1</Link>
      </li>
      <li>
        <Link to="/blog/post-2">Post 2</Link>
      </li>
    </ul>
    <Switch>
      <Route exact path="/blog" render={() => <NoPosts numberOfPost={2} />} />
      <Route path="/blog/:post(post-1|post-2)" component={Post} />
      <Route component={Post404} />
    </Switch>
  </div>
);

const Post = ({ match }) => (
  <div>
    {console.log("Post match", match)}
    <h2>{match.params.post}</h2>
  </div>
);

const NoPosts = ({ numberOfPost }) => (
  <div>

    <p>Selecione um dos {numberOfPost} post</p>
  </div>
);
const Erro404 = ({ match }) => (
  <div>
    {console.log("Home match", match)}
    <h1>Página não encontrada</h1>
  </div>
);
const Post404 = ({ match }) => (
  <div>
    {console.log("Post404 match", match)}
    <h1>Post não encontrado</h1>
  </div>
);

// const Link = (props) => (
//   <NavLink activeClassName="active-link"   {...props} />
// )

const Link = (props) => (
  <Route path={props.to} exact={props.exact}>
    {({ match, history }) => (
      <a
        href={props.to}
        style={match ? { color: "red" } : null}
        onClick={(e) => {
          e.preventDefault();
          history.push(props.to);
        }}
      >
        {props.children}
      </a>
    )}
  </Route>
);

export default App;
