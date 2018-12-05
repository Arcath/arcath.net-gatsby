import * as React from 'react'
import {faExclamationTriangle} from '@fortawesome/free-solid-svg-icons'

import IndexLayout from '../layouts/index'

import {Container} from '../components/container'
import {colors} from '../styles/variables'
import {DateHeading} from '../components/article-list'

interface NotFoundProps{
  location: LocationProps
}

const NotFoundPage = ({location}: NotFoundProps) => {
  return <IndexLayout color={colors.red} icon={faExclamationTriangle}>
    <Container>
      <h1>Not Found!</h1>
      <p>You have arrived at a page that does not exist.</p>
      <p>The path:</p>
      <DateHeading>{location.pathname}</DateHeading>
      <p>Does not lead to a page. If you came here from a link on this site let me know using the social buttons below.</p>
    </Container>
  </IndexLayout>
}

export default NotFoundPage
