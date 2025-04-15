import num from 'tools/Number'

const OBJECT_KEY_SEPARATOR = '.'

/** Performance optimization */
const OBJECT_KEY_MAP: Record<string, string[]> = {}

export type Obj = { [key: string]: any }

export const clone = <T extends object>(obj?: T): T => {
  return JSON.parse(JSON.stringify(obj))
}

export const toKeys = (path?: string) => {
  return path ? OBJECT_KEY_MAP[path as string] ?? path?.split(OBJECT_KEY_SEPARATOR) : []
}

export const toPath = (keys?: string[]) => {
  return keys?.join(OBJECT_KEY_SEPARATOR) ?? ''
}

export const toObject = <T extends object>(target: T, ...args: T[]) => {
  return Object.assign(target, ...args)
}

export const isObject = (value: any): value is object => {
  return (typeof value === 'object' || typeof value === 'function') && (value !== null)
}

export const has = (obj: Obj, path?: string): boolean => {
  const keys = toKeys(path)
  let current = obj

  for (const key of keys) {
    if (!(key in current)) {
      return false
    }
    current = current[key]
  }

  return true
}

/** Return nested value by path or undefined if value is not exist */
export const get = (obj: Obj | undefined | null, path?: string): any => {
  if (!obj) {
    return obj
  }

  const keys = toKeys(path)
  let current = obj

  for (const key of keys) {
    if (key in current) {
      current = current[key]
    } else {
      return undefined
    }
  }

  return current
}

export const set = (obj: Obj | undefined | null, path: string, value: any): Obj | undefined | null => {
  if (!obj) {
    return obj
  }

  const keys = toKeys(path)
  let current = obj

  for (const [index, key] of keys.entries()) {
    if (index + 1 !== keys.length) {
      if (!current[key]) {
        current[key] = num.isNumber(keys[index + 1]) ? [] : {}
      }

      current = current[key]
    }
  }

  current[keys.at(-1) as string] = value

  return obj
}

export const del = (obj: Obj | undefined | null, path: string, removeEmptyObjects?: boolean): Obj | undefined | null => {
  if (!obj) {
    return obj
  }

  const keys = toKeys(path)
  const map: Record<string, Obj> = {}
  let current = obj

  for (const key of keys) {
    if (key in current) {
      map[key] = current
      current = current[key]
    } else {
      return obj
    }
  }

  for (const entry of Object.entries(map).reverse()) {
    const len = Object.keys(entry[1]).length
    if (len === 1) {
      delete entry[1][entry[0]]
    } else if (len === 2) {
      delete entry[1][entry[0]]
      return obj
    } else {
      return obj
    }

    if (!removeEmptyObjects) {
      return obj
    }
  }

  return obj
}

/** Remove undefined values */
export const clear = <T extends Obj>(obj: T | undefined | null): T | undefined | null => {
  if (!obj) {
    return obj
  }

  return Object.keys(obj).reduce((acc, key: keyof T) => {
    if (obj[key] !== undefined) {
      acc[key] = obj[key]
    }

    return acc
  }, {} as T)
}


// TODO: create recursive module
// findRecursive
// foreachRecursive
// someRecursive and everyRecursive() => !someRecursive()
// and other
// export const mapRecursive = <R, T>(
//   items: T[],
//   callback: (
//     innerCallback: (items?: T[]) => R[],
//     item: T,
//     index: number,
//     array: T[],
//   ) => R,
// ) => {
//   const dive = (innerItems?: T[]) => innerItems && mapRecursive(innerItems, callback);

//   return items.map((item, index, array) => callback(dive, item, index, array));
// };
// export const reduceRecursive = <T, R = T>(
//   items: T[],
//   callback: (
//     innerCallback: (items: T[] | undefined) => R,
//     previousValue: R,
//     currentValue: T,
//     currentIndex: number,
//     array: T[],
//   ) => R,
//   initialValue?: R,
// ): R => {
//   let state = initialValue as R;
//   const dive = (innerItems?: T[]) => innerItems ? reduceRecursive(innerItems, callback) : state;

//   for (const key in items) {
//     state = callback(dive, state, items[key], key, items);
//   }
//   return state;
// };

// TODO:
// typescript create function recursiveMerge({
// 	a: 1,
// 	val: {
// 		name: 1
// 	},
// 	child: {
// 		a: 2
// 		val: {
// 			name2: 2
// 		},
// 		child: {
// 			b: 3,
// 			c: 10
// 			val: {
// 				name3: 1
// 			},
// 		}
// 	}
// }, 'child', ['c', 'name3']) => { a: 1, b:3, val: { name: 1, name: 2 }, child: as is }

// /** Merge recursive object fields */
// export const mergeRecursive = <T extends Record<string, any>>(
//   obj: T,
//   childKey: string,
//   ignore: string[] = [],
// ): T => {
//   const result: Record<string, any> = {}

//   // Traverse each key in the object
//   for (const key in obj) {
//     if (!obj.hasOwnProperty(key)) continue

//     // If the key is the child key, recurse but keep the `child` object as-is
//     if (key === childKey) {
//       result[childKey] = obj[childKey]
//       continue
//     }

//     // If the key is in the ignore list, skip it
//     if (ignore.includes(key)) {
//       continue
//     }

//     if (typeof obj[key] === 'object' && obj[key] !== null && !Array.isArray(obj[key])) {
//       // If the key points to a nested object, merge recursively
//       const childResult = mergeRecursive(obj[key], childKey, ignore)

//       // TODO: combine array?
//       // Merge nested properties into the result
//       for (const nestedKey in childResult) {
//         if (!ignore.includes(nestedKey)) {
//           result[nestedKey] = childResult[nestedKey]
//         }
//       }
//     } else {
//       // Otherwise, add the key-value pair directly to the result
//       result[key] = obj[key]
//     }
//   }

//   return result
// }

//   describe('[mergeRecursive] func', () => {
//     it('should merge recursive object fields', () => {
//       const input = {
//         a: 1,
//         val: {
//           name: 1,
//         },
//         child: {
//           a: 2,
//           val: {
//             name2: 2,
//           },
//           child: {
//             b: 3,
//             c: 10,
//             val: {
//               name3: 1,
//             },
//           },
//         },
//       }

//       expect(tools.mergeRecursive(input, 'child', ['c', 'name3'])).toEqual({
//         a: 1,
//         b: 3,
//         val: {
//           name: 1,
//           name2: 2,
//         },
//         child: input.child,
//       })
//     })
//   })



export default {
  isObject,
  toObject,
  toKeys,
  toPath,
  get,
  set,
  del,
  has,
  clear,
}
