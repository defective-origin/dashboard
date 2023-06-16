// ---| Components |---
import Card, { CardProps } from 'components/Card'
import Backdrop, { BackdropProps } from 'components/Backdrop'

// ---| common |---
import { cn } from 'common/tools'

// ---| self |---
import css from './Modal.module.scss'

export type ModalProps = BackdropProps & CardProps

/**
 * Card.
 * @example
 *   <Modal placement="center-center" width='md' visible open onClose={() => console.log('close')}>
 *     <Modal.Header text="Title" onClose={() => {}} />
 *
 *     <Modal.Content padding="xs">Content</Modal.Content>
 *
 *     <Modal.Media src="https://content.fortune.com/wp-content/uploads/2014/06/105461347.jpg">
 *       EXTRA CONTENT
 *     </Modal.Media>
 *
 *     <Modal.Footer padding="xs" cgap="xs">
 *       Actions
 *       <Modal.Button>Button</Modal.Button>
 *       <Modal.Button>Button</Modal.Button>
 *     </Modal.Footer>
 *
 *     LINE
 *
 *     <Modal.Divider />
 *
 *     <Modal.Footer padding="xs" cgap="xs">
 *       Actions
 *       <Modal.Button>Button</Modal.Button>
 *       <Modal.Button>Button</Modal.Button>
 *     </Modal.Footer>
 *   </Modal>
 */
export default function Modal(props: ModalProps): JSX.Element | null {
  const {
    placement = 'center-center',
    attach = 'window',
    open = false,
    visible,
    direction,
    onClose,
    className,
    children,
    ...otherProps
  } = props

  return (
    <Backdrop
      className={cn(css.Modal, className)}
      attach={attach}
      open={open}
      visible={visible}
      onClose={onClose}
    >
      <Backdrop.Item placement={placement}>
        <Card className={css.ModalContent} shadow='xs' divided {...otherProps}>
          {children}
        </Card>
      </Backdrop.Item>
    </Backdrop>
  )
}

Modal.Media = Card.Media
Modal.Header = Card.Header
Modal.Content = Card.Content
Modal.Footer = Card.Footer
Modal.Divider = Card.Divider
Modal.Button = Card.Button

export type ModalMediaProps = React.ComponentProps<typeof Card.Media>
export type ModalHeaderProps = React.ComponentProps<typeof Card.Header>
export type ModalContentProps = React.ComponentProps<typeof Card.Content>
export type ModalFooterProps = React.ComponentProps<typeof Card.Footer>
export type ModalDividerProps = React.ComponentProps<typeof Card.Divider>
export type ModalButtonProps = React.ComponentProps<typeof Card.Button>
