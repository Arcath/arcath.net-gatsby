import * as React from 'react'
import {faHome} from '@fortawesome/free-solid-svg-icons'

import IndexLayout from '../layouts/index'

import {Container} from '../components/container'

const IndexPage = () => {
  return <IndexLayout expanded icon={faHome}>
    <Container>
      <h2>Hi</h2>
      <p>I am an IT Engineer &amp; Web Developer from the North West of England.</p>
      <p>On this site you'll find articles about things I've done at work </p>
    </Container>
  </IndexLayout>
}

export default IndexPage
