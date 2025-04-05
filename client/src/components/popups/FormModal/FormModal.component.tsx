import React, { useRef } from 'react'

// ---| core |---
import { cn } from 'tools'

// ---| pages |---
// ---| screens |---
// ---| components |---
import Modal, { ModalName, ModalProps } from 'components/popups/Modal'
import Form, { FormManager, FormProps } from 'components/forms/Form'

// ---| self |---
import css from './FormModal.module.scss'

export type FormModalProps<T extends object, F extends object = T> = ModalProps<T> & Pick<FormProps<F>, 'onReset' | 'onSubmit' | 'init'> & {
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
 * const CustomFormModal = () => {
 *  const [options, setOptions] = useState()
 *
 *  return (
 *    <FormModal title={locale.t('FORM.BOARD_SETTINGS')} onOpen={setOptions}>
 *      <Field.Text path='name' label={locale.t('FIELD.NAME')} init={options?.name} />
 *      <Field.Text path='endpoint' label={locale.t('FIELD.ENDPOINT')} init={options?.endpoint} />
 *    </FormModal>
 *  )
 * }
 */
export function FormModal<T extends object, F extends object = T>(props: FormModalProps<T, F>): JSX.Element {
  const { onSubmit, onReset, init, name, children, className, ...otherProps } = props
  const _className = cn(css.FormModal, className)
  const manager = useRef<FormManager<object>>(null)

  return (
    <Modal
      className={_className}
      name={name}
      v='right'
      actions={[
        { content: 'Reset', color: 'info', onClick: () => manager.current?.reset() },
        { content: 'Save', color: 'success', onClick: () => manager.current?.submit() },
      ]}
      {...otherProps}
    >
      <Form manager={manager} g='md' init={init} onSubmit={onSubmit} onReset={onReset}>
        {children}
      </Form>
    </Modal>
  )
}

FormModal.displayName = 'FormModal'

export default FormModal
