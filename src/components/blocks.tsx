import styled from '@emotion/styled'

import {Colors, Dimensions} from '../styles/variables'

export const Block = styled('div')`
  background:linear-gradient(${Dimensions.lightsource}, ${Colors.brand.light}, ${Colors.brand.dark});
  color:${Colors.primary.white};
  padding:${Dimensions.sizes.padding}px;
  box-sizing:border-box;
  box-shadow: 0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23);
  border-radius:${Dimensions.sizes.padding / 2}px;
`
