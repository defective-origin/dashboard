import { useCallback } from 'react'
import useStateful from './UseStateful.hook'

export type ChainFunc = <T>(val?: T, ...args: any[]) => any

/**
 * Allows to chain functions.
 *
 * @returns { (...args: any[]) => any } Return callback function
 *
 * @example
 * const handleA = (val, ...args) => console.log('A', val, ...args)
 * const handleB = (val, ...args) => console.log('B', val, ...args)
 * const handleC = (val, ...args) => console.log('C', val, ...args)
 * const chain = useChain(
 *  handleA,
 *  handleB,
 *  handleC,
 * )
 * 
 * chain()
 * chain(arg1, arg2, arg3,  ...)
 */
export const useChain = (...funcs: ChainFunc[]): ChainFunc => {
  const funcsRef = useStateful(funcs, [funcs])
  const chainFunc = useCallback((...args: any[]) => funcsRef.current.reduce((acc, func) => func(acc, ...args), undefined), [])

  return chainFunc
}

export default useChain
