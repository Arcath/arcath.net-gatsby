import * as React from 'react'

import {MainLayout} from '../layouts/main'

import {ArticleGrid} from '../components/grid'
import {DateHeading} from '../components/article-list'

interface NotFoundProps{
  location: LocationProps
}

const NotFoundPage = ({location}: NotFoundProps) => {
  return <MainLayout>
    <ArticleGrid>
      <h1>Not Found!</h1>
      <p>You have arrived at a page that does not exist.</p>
      <p>The path:</p>
      <DateHeading>{location.pathname}</DateHeading>
      <p>Does not lead to a page. If you came here from a link on this site let me know using the social buttons below.</p>
    </ArticleGrid>
  </MainLayout>
}

export default NotFoundPage
