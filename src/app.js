"use strict";

import React, { PureComponent } from "react";
import { BrowserRouter, NavLink, Route, Switch, Redirect } from "react-router-dom";

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
              <Link to={{pathname: '/', state:{id: 'home'}}}exact>
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
            <li>< a href="#informacoes-do-site">Informações do site</a></li>
            <li><Link to='voltar-para-home'>Voltar para home</Link></li>
          </ul>

          <Switch>
            <Route path="/" component={Home} exact />
            <Redirect from='/voltar-para-home' to='/' />
            <Route path="/(sobre|contato)" component={Page} />
            <Route path="/blog" component={Blog} />
            {/* <Route path="/voltar-para-home" render={ () => <Redirect to='/' />} /> */}
            <Route component={Erro404} />
          </Switch>
          <div id="informacoes-do-site" style={{margin: '1000px 0'}}>
            <h2>Informações do site</h2>
          </div>
        </div>
      </BrowserRouter>
    );
  }
}

const Home = ({ match, location, history }) => (
  <div>
    {console.log("Home location", location)}
    {console.log("Home history", history)}
    {
      console.log('Location search', location.search.replace('?', '').split('&').reduce((acc, item) => {
        const [key, value ] = item.split('=');
        acc[key] = value;
        return acc;
      }, {}))
    }
    <h1>Home</h1>
  </div>
);

const Page = ({ match, location }) => (
  <div>
    {console.log("Page location", location)}
    <p>{match.url}</p>
  </div>
);

const Blog = ({ match, location, history }) => (
  <div>
    {console.log("Home location", location)}
    {console.log("Home history", history)}
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

const Post = ({ match, location, history }) => (
  <div>
    {console.log("Post location", location)}
    {console.log("Home history", history)}
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
const Post404 = ({ match, location, history }) => (
  <div>
    {console.log("Post404 location", location)}
    {console.log("Home history", history)}
    <h1>Post não encontrado</h1>
  </div>
);

const Link = (props) => (
  <NavLink activeClassName="active-link"   {...props} />
)

export default App;
