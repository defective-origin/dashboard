/**
 * Return widget array. And can include nested widgets.
 *
 * @param { T | Array<T> } value Value which should be handled
 * @param { boolean } nested Should array include all nested widgets
 * @returns { Array<GeneralWidget> } Return widgets
*/export const initArray = <T>(value: Array<T> | T = []): Array<T> => (Array.isArray(value) ? value : [value])
