import React from 'react'

// ---| core |---
import { cn } from 'tools'

// ---| pages |---
// ---| screens |---
// ---| components |---
import Modal, { ModalName, ModalProps } from 'components/Modal'
import Form, { FormProps } from 'components/Form'

// ---| self |---
import css from './ModalForm.module.scss'

export type ModalFormProps<T extends object, F extends object = T> = ModalProps<T> & Pick<FormProps<F>, 'onReset' | 'onSubmit'> & {
  name?: ModalName
  title?: React.ReactNode
}

/**
 * Open form in modal window.
 *
 * How to use
 * @example
 * // somewhere
 * const optionsForModal = { name: 'name', endpoint: 'endpoint' }
 *
 * const modal = useModal({ name: 'form-modal' })
 *
 * modal({ payload: optionsForModal })
 *
 * // in custom modal form
 * const CustomModalForm = () => {
 *  const [options, setOptions] = useState()
 *
 *  return (
 *    <ModalForm title={locale.t('FORM.BOARD_SETTINGS')} onOpen={setOptions}>
 *      <Field.Text path='name' label={locale.t('FIELD.NAME')} init={options?.name} />
 *      <Field.Text path='endpoint' label={locale.t('FIELD.ENDPOINT')} init={options?.endpoint} />
 *    </ModalForm>
 *  )
 * }
 */
export function ModalForm<T extends object, F extends object = T>(props: ModalFormProps<T, F>): JSX.Element {
  const { onSubmit, onReset, open, title, name, children, className, ...otherProps } = props
  const _className = cn(css.ModalForm, className)
  const resetId = `modal-form-reset-${name}`
  const submitId = `modal-form-submit-${name}`

  // TODO: add pre save, reset, save, release, cancel flags to props?
  return (
    <Modal
      className={_className}
      name={name}
      title={title}
      v='right'
      open={open}
      actions={[
        { id: resetId, content: 'Reset', color: 'info' },
        { id: submitId, content: 'Save', color: 'success' },
      ]}
      {...otherProps}
    >
      <Form resetId={resetId} submitId={submitId} g='md' onSubmit={onSubmit} onReset={onReset}>
        {children}
      </Form>
    </Modal>
  )
}

ModalForm.displayName = 'ModalForm'

export default ModalForm
