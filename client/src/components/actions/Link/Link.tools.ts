/**
 * Return true if passed href is a part of browser url.
 * By default takes window location host.
 *
 * How to use
 * @example
 * isActiveLink('/a/b')
 * isActiveLink('?a=1&b=2')
 * isActiveLink('https://current.com')
 * isActiveLink('https://current.com/a/b')
 * isActiveLink('https://current.com?a=1&b=2')
 *
 * // check custom current location
 * isActiveLink('https://current.com', 'https://domain.com')
 */
export function hasSameLinkHost(href?: string, location = window.location.host) {
  if (!href) {
    return false
  }

  return ['/', '?'].includes(href[0]) || href.includes(location)
}

/**
 * Return true if passed href is a part of browser url or target has '_blank' value.
 *
 * How to use
 * @example
 * isNewTabLink('/a/b') // false
 * isNewTabLink('/a/b', '_blank') // true
 * isNewTabLink('https://current.com') // false
 * isNewTabLink('https://current.com', '_blank') // true
 */
export function isNewTabLink(href?: string, target?: React.HTMLAttributeAnchorTarget) {
  const hasSameHost = hasSameLinkHost(href)

  return !hasSameHost || target === '_blank'
}
