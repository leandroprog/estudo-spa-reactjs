'use strict'

import React, { PureComponent } from 'react'
import { BrowserRouter, Link, Route } from 'react-router-dom'

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
          <this.state.Component>{this.state.title}</this.state.Component>

          <Route path="/" component={Home} exact/>
          <Route path="/sobre" component={Sobre} />
          <Route path="/contato" component={Contato} />
          <ul>
            <li> <Link to='/'>Home</Link></li>
            <li> <Link to='/sobre'>Sobre</Link></li>
            <li> <Link to='/contato'>Contato</Link></li>
          </ul>

        </div>
      </BrowserRouter>
    )
  }
}

const Home = () => (<h1>Home</h1>)
const Sobre = () => (<h1>Sobre</h1>)
const Contato = () => (<h1>Contato</h1>)

export default App
