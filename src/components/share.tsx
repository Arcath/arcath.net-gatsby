import * as React from 'react'
import styled from '@emotion/styled'
import {FacebookShareButton, TwitterShareButton, RedditShareButton} from 'react-share'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faFacebookF, faTwitter, faRedditAlien} from '@fortawesome/free-brands-svg-icons'

import {colors} from '../styles/variables'

interface ShareButtonsProps{
  url: string
  title: string
}

const ShareButton = styled('div')`
  width:40px;
  line-height:40px;
  background-color:${(props: {color: string}) => props.color};
  color:#fff;
  text-align:center;
  vertical-align:middle;
  float:left;
  margin-right:10px;
`

export const ShareButtons = ({url, title}: ShareButtonsProps) => {
  return <div>
    <FacebookShareButton url={url} quote={title}>
      <ShareButton color={colors.brands.facebook}>
        <FontAwesomeIcon icon={faFacebookF} />
      </ShareButton>
    </FacebookShareButton>
    <TwitterShareButton url={url} title={title}>
      <ShareButton color={colors.brands.twitter}>
        <FontAwesomeIcon icon={faTwitter} />
      </ShareButton>
    </TwitterShareButton>
    <RedditShareButton url={url} title={title}>
      <ShareButton color={colors.brands.reddit}>
        <FontAwesomeIcon icon={faRedditAlien} />
      </ShareButton>
    </RedditShareButton>
  </div>
}
