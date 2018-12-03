import * as React from 'react'

import {format} from 'date-fns'

import {Helmet} from 'react-helmet'

export const formatAsDate = (date: Date | string) => {
  return format(date, 'Do MMMM YYYY')
}

export const pageTitle = (chunks: string[]) => {
  return chunks.join(' / ') + ' / Adam Laycock'
}

export const PageTitle = ({chunks}: {chunks: string[]}) => {
  return <Helmet title={pageTitle(chunks)} />
}
