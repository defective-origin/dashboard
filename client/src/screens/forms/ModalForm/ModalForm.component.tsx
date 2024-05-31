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

export type ModalFormProps<T> = ModalProps<T> & Pick<FormProps, 'onReset' | 'onSubmit'> & {
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
 *    <ModalForm name='form-modal' title={locale.t('FORM.BOARD_SETTINGS')} onOpen={setOptions}>
 *      <Field.Text name='name' label={locale.t('FIELD.NAME')} value={options?.name} />
 *      <Field.Text name='endpoint' label={locale.t('FIELD.ENDPOINT')} value={options?.endpoint} />
 *    </ModalForm>
 *  )
 * }
 */
export function ModalForm<T>(props: ModalFormProps<T>): JSX.Element {
  const { onSubmit, onReset, open, title, name, children, className, ...otherProps } = props
  const _className = cn(css.ModalForm, className)
  const resetId = `modal-form-reset-${name}`
  const submitId = `modal-form-submit-${name}`

  // TODO: add reset, save, release, cancel flags to props?
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
      <Form name={name} resetId={resetId} submitId={submitId} g='md' onSubmit={onSubmit} onReset={onReset}>
        {children}
      </Form>
    </Modal>
  )
}

ModalForm.displayName = 'ModalForm'

export default ModalForm
