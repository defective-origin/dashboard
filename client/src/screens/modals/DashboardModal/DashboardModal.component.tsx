import React from 'react'

// ---| core |---
import { cn } from 'tools'
import { Board, Ref, useBoard, useBoardMutations } from 'api'
import { t } from 'locale'

// ---| pages |---
// ---| screens |---
import FeatureModal, { FeatureModalProps } from 'screens/modals/FeatureModal'

// ---| components |---
import { useModalPayload } from 'components/popups/Modal'

// ---| self |---
import css from './DashboardModal.module.scss'

const MODAL_NAME = 'board-settings'

export type DashboardModalProps = FeatureModalProps<Board>

/**
 * Component description.
 *
 * How to use
 * @example
 * <DashboardModal />
 */
export function DashboardModal(props: DashboardModalProps): JSX.Element {
  const { children, className, ...otherProps } = props
  const _className = cn(css.DashboardModal, className)
  const payload = useModalPayload<Ref>(MODAL_NAME)
  const board = useBoard(payload?.id)
  const boardMutations = useBoardMutations()

  return (
    <FeatureModal
      className={_className}
      name={MODAL_NAME}
      icon='dashboard'
      title={board.data?.name}
      init={board.data}
      onSubmit={patch => boardMutations.update.mutateAsync(patch)}
      {...otherProps}
    >
      {/* <Text.H3 content='Active layout' /> */}
      {/* <Layout v='board' columns={5} g='sm' >
        <Field.Switch path='tv' label='Tv' checked={options?.markups.tv?.active} />
        <Field.Switch path='computer' label='Computer' checked={options?.markups.computer?.active} />
        <Field.Switch path='tablet' label='Tablet' checked={options?.markups.tablet?.active} />
        <Field.Switch path='mobile' label='Mobile' checked={options?.markups.mobile?.active} />
        <Field.Switch path='watch' label='Watch' checked={options?.markups.watch?.active} />
      </Layout> */}

      {children}
    </FeatureModal>
  )
}

DashboardModal.modalName = MODAL_NAME
DashboardModal.displayName = 'DashboardModal'

export default DashboardModal
