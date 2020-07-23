'use strict'

import React, { PureComponent } from 'react'
import { BrowserRouter, Link, Route, Switch } from 'react-router-dom'

import './css/style.css'

class App extends PureComponent {
  constructor () {
    super()
    this.state = {
      title: '...',
      Component: 'div'
    }
  }

  getTitle () {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve('My app with async / await!')
      }, 2000)
    })
  }

  async componentDidMount () {
    const title = await import('components/title')

    this.setState({
      title: await this.getTitle(),
      Component: title.default
    })
  }

  render () {
    return (
      <BrowserRouter>
        <div>
          {/* <this.state.Component>{this.state.title}</this.state.Component> */}
          <ul>
            <li> <Link to='/'>Home</Link></li>
            <li> <Link to='/sobre'>Sobre</Link></li>
            <li> <Link to='/blog'>Blog</Link></li>
            <li> <Link to='/contato'>Contato</Link></li>
          </ul>

        <Switch>
          <Route path="/" component={Home} exact/>
          <Route path="/sobre" component={Sobre} />
          <Route path="/blog" component={Blog} />
          <Route path="/contato" component={Contato} />
          <Route component={Erro404} />
        </Switch>
        </div>
      </BrowserRouter>
    )
  }
}

const Home = () => (<h1>Home</h1>)
const Sobre = () => (<h1>Sobre</h1>)
const Contato = () => (<h1>Contato</h1>)
const Blog = () => (
    <div>
      <h1>Blog</h1>
      <ul>
        <li><Link to="/blog/post-1">Post 1</Link></li>
        <li><Link to="/blog/post-2">Post 2</Link></li>
      </ul>
      <Route path="/blog/:post" component={Post} />
      <Route exact path="/blog" component={NoPosts} />
    </div>
  )

 const Post = (props) => (
   <div>
     {console.log(props)}
     <h2>{props.match.params.post}</h2>
   </div>
 )

const NoPosts = () => (
 <p>Selecione um post</p>
)
const Erro404 = () => (<h1>Página não encontrada</h1>)

export default App
