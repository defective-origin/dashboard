import { ToastContainer, ToastOptions as RTToastOptions } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

export * from 'react-toastify'
export default ToastContainer

export type ToastOptions = RTToastOptions & { content: React.ReactNode }
