import React, { useCallback, useLayoutEffect, useRef, useState } from 'react'

// ---| components |---
import Drawer, { DrawerProps } from 'components/Drawer'

// ---| common |---
import { cn, wk, _ } from 'common/tools'
import { useDeviceOptions, useToggler } from 'common/hooks'

// ---| self |---
import { TITLE_TAGS, FIRST_LEVEL_TAGS } from './Article.conf'
import ArticleMenu, { ArticleMenuOption } from './ArticleMenu'
import ArticleNavigation, { ArticleNavigationProps } from './ArticleNavigation'
import ArticleContent, { ArticleContentProps } from './ArticleContent'
import css from './Article.module.scss'

type Options = {
  menu?: ArticleMenuOption[]
  content?: React.ReactNode
}

export type ArticleProps = DrawerProps
& Omit<ArticleNavigationProps, 'onMenuClick'>
& Omit<ArticleContentProps, 'scrollManagerRef'> & {
  // content menu. If passed true then built menu from content
  menu?: ArticleMenuOption[] | boolean
  // title for drawer menu
  menuTitle?: React.ReactNode
}

// TODO: do as RichText in uui
/**
 * View article with menu and navigation buttons.
 * @example
 * // article with auto generated menu.
 * // menu is generated by h1-h6 tags.
 * // h1-h2 are first level menu items.
 * // h3-h6 are second level menu items.
 * <Article
 *    menuTitle="Navigation menu"
 *    menuBtnTitle="Open content menu"
 *    prevBtnTitle="Previous page"
 *    nextBtnTitle="Next page"
 *    upBtnTitle="Back to start of page"
 *    menu // generate menu
 *    onPrevClick={() => {}}
 *    onNextClick={() => {}}
 *   >
 *   <div className="block">
 *     <h1>Header 1</h1>
 *     <div>Lorem, ipsum dolor sit amet consectetur adipisicing elit.</div>
 *   </div>
 *   <div className="block">
 *     <h2>Header 2</h2>
 *     <div>Lorem, ipsum dolor sit amet consectetur adipisicing elit.</div>
 *   </div>
 *   <div className="block">
 *     <h3>Subheader 3</h3>
 *     <div>Lorem, ipsum dolor sit amet consectetur adipisicing elit.</div>
 *   </div>
 * </Article>
 *
 * // render article with certain menu
 * const menu = [
 *   { title: 'Header 1', href: '#id1' },
 *   { title: 'Header 2', href: '#id2' },
 *   { title: 'Header 3', href: '#id3' },
 *   { title: 'Header 4', href: '#id4' },
 *   {
 *     title: 'Header 5',
 *     href: '#id5',
 *     items: [
 *       { title: 'Header 11', href: '#id11' },
 *       { title: 'Header 22', href: '#id22' },
 *       { title: 'Header 33', href: '#id33' },
 *       { title: 'Header 44', href: '#id44' },
 *       { title: 'Header 55', href: '#id55' },
 *       { title: 'Header 66', href: '#id66' },
 *       { title: 'Header 77', href: '#id77' },
 *       { title: 'Header 88', href: '#id88' },
 *       { title: 'Header 99', href: '#id99' },
 *     ],
 *   },
 *   { title: 'Header 66', href: '#id6' },
 *   { title: 'Header 77', href: '#id7' },
 *   { title: 'Header 88', href: '#id8' },
 *   { title: 'Header 99', href: '#id9' },
 * ]
 * <Article menu={menu}>
 *   Some content
 * </Article>
 */
export default function Article(props: ArticleProps): JSX.Element {
  const {
    menu,
    content,
    menuTitle,
    menuBtnTitle,
    upBtnTitle,
    prevBtnTitle,
    nextBtnTitle,
    size = 'sm',
    onPrevClick,
    onNextClick,
    className,
    children,
    ...otherProps
  } = props
  const [options, setOptions] = useState<Options>()
  const deviceOptions = useDeviceOptions()
  const menuToggler = useToggler()
  const showMenu = !!options?.menu?.length && menuToggler.isOn()
  const _className = cn(css.Article, {
    [css.ArticleWithMenu]: showMenu,
  }, className)

  const containTag = useCallback(
    (node: React.ReactElement, tags: string[]): boolean => tags.some((tagName) => tagName === node.type),
    [],
  )

  // FIXME:  move  to react  utils  
  const getNodeText = useCallback((node: React.ReactNode): string => {
    if (node instanceof Array) return node.map(getNodeText).join('')
    if (React.isValidElement(node)) return getNodeText(node.props.children)

    return String(node)
  }, [])

  const updateContent = useCallback((
    items: React.ReactNode,
  ): React.ReactNode => React.Children.map(items, (node) => {
    if (React.isValidElement(node)) {
      const subChildren = updateContent(node.props.children)
      if (containTag(node, TITLE_TAGS)) {
        const id = node.props.id || wk(node.props)

        return React.cloneElement(node, { ...node.props, id, children: subChildren })
      }

      return React.cloneElement(node, { ...node.props, children: subChildren })
    }

    return node
  }), [])

  const buildMenu = useCallback(
    (nodes: React.ReactElement[]): ArticleMenuOption[] => nodes.reduce((acc, node) => {
      const lastSubTitleContainer = _.last(acc)?.items || acc
      const container = containTag(node, FIRST_LEVEL_TAGS) ? acc : lastSubTitleContainer

      container.push({
        text: getNodeText(node),
        href: `#${node.props.id}`,
        items: [],
      })

      return acc
    }, [] as ArticleMenuOption[]),
    [],
  )

  // FIXME: use react-nanny
  const findContentTitles = useCallback((
    nodes: React.ReactNode,
    titles: React.ReactElement[] = [],
  ): React.ReactElement[] => {
    React.Children.forEach(nodes, (node) => {
      if (React.isValidElement(node)) {
        if (containTag(node, TITLE_TAGS)) {
          titles.push(node)
        }

        findContentTitles(node.props.children, titles)
      }
    })

    return titles
  }, [])

  // find menu in content and set anchors for titles
  useLayoutEffect(() => {
    const currentContent = content || children

    // register menu which was passed into component
    if (Array.isArray(menu)) {
      setOptions({ menu, content: currentContent })

    // generate menu from passed content
    } else if (menu) {
      const updatedContent = updateContent(currentContent)
      const foundContentTitles = findContentTitles(updatedContent)
      const builtMenu = buildMenu(foundContentTitles)
      setOptions({ menu: builtMenu, content: updatedContent })

    // render article without menu
    } else {
      setOptions({ content: currentContent })
    }
  }, [menu, content, children, updateContent, findContentTitles, buildMenu])

  //  FIXME: parse  content to json format  on  backend and send only formatted data
  return (
    <Drawer
      className={_className}
      stretch="xy"
      positioned={deviceOptions.screenWidth < 768}
      onClose={menuToggler.toggle}
      {...otherProps}
    >
      <Drawer.Content position='relative'>
        <ArticleContent
          size={size}
          upBtnTitle={upBtnTitle}
          content={options?.content}
        />

        <ArticleNavigation
            size={size}
            prevBtnTitle={prevBtnTitle}
            onPrevClick={onPrevClick}
            nextBtnTitle={nextBtnTitle}
            onNextClick={onNextClick}
            menuBtnTitle={menuBtnTitle}
            onMenuClick={menuToggler.toggle}
        />
      </Drawer.Content>

      <Drawer.RightAside open={showMenu}>
        <ArticleMenu
          title={menuTitle}
          items={options?.menu}
          onClose={menuToggler.toggle}
        />
      </Drawer.RightAside>
    </Drawer>
  )
}
