import {em} from 'polished'
import {dimensions} from './variables'

export const getEmSize = (size: number) => em(size, dimensions.fontSize.regular)
