// ---| components |---
import Grid, { GridProps } from 'components/Grid'
import Image, { ImageProps } from 'components/Image'

// ---| common |---
import { cn } from 'common/tools'

// ---| self |---
import css from './CardMedia.module.scss'

export type CardMediaProps = GridProps & Pick<ImageProps, 'src'>

export default function CardMedia(props: CardMediaProps): JSX.Element {
  const { src, padding = 'xs', className, children, ...otherProps } = props

  return (
    <Grid className={cn(css.CardMedia, className)} {...otherProps}>
      <Grid.Item
        className={css.Content}
        padding={padding}
        cstart={1}
        cend={1}
        rstart={1}
        rend={1}
        zIndex={1}
      >
        {children}
      </Grid.Item>

      <Image className={css.Image} preview={false} src={src} />
    </Grid>
  )
}
