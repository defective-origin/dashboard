import mongoose from 'mongoose'
import { ChangeStamps, refs, Ref } from '@services/Database'

export const PATHNAME = 'accounts'

export type SchemaType = 'WIDGETS' | 'WIDGET-VIEWS' | 'BOARDS' | 'ACCOUNTS'
export type Bookmark = {
  type: SchemaType
  items: Ref[]
}

export const BookmarkSchema = new mongoose.Schema<Bookmark>({
  type: { type: String, enum: ['WIDGETS', 'WIDGET-VIEWS', 'BOARDS'] },
  items: refs(),
}, { _id: false })

export type AccountGroup = {
  type: SchemaType
  users: Ref[]
}

export const AccountGroupSchema = new mongoose.Schema<AccountGroup>({
  type: { type: String, enum: ['WIDGETS', 'WIDGET-VIEWS', 'BOARDS'] },
  users: refs('users'),
}, { _id: false })

export type Account = ChangeStamps & {
  id: string
  bookmarks: Bookmark[]
  groups: AccountGroup[]
}

export const AccountSchema = new mongoose.Schema<Account>({
  bookmarks: { type: [BookmarkSchema], default: [
    { type: 'BOARDS', items: [] },
    { type: 'WIDGETS', items: [] },
    { type: 'WIDGET-VIEWS', items: [] },
  ] },
  groups: { type: [AccountGroupSchema], default: [
    { type: 'BOARDS', users: [] },
    { type: 'WIDGETS', users: [] },
    { type: 'WIDGET-VIEWS', users: [] },
  ] },
}, { ChangeStamps: true })

export const AccountModel = mongoose.model(PATHNAME, AccountSchema)

export default AccountModel
