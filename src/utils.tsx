import * as React from 'react'
import styled from '@emotion/styled'
import {clearFix} from 'polished'


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

export const keys = function<T extends Object>(o: T): (keyof T)[] {
  return Object.keys(o) as any
}

export const Clear = styled('div')`
  ${clearFix()}
`
