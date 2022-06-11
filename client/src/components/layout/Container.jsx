import React, { PropsWithChildren } from 'react'
import styles from './Container.module.scss'

export const Container = props => {

  const classOuter = [ props.classOuter ].join( ' ' )

  const classInner = [ styles.Container, props.classInner ].join( ' ' )

  return (
      React.createElement( props.elementOuter || 'div', { className: classOuter },
          React.createElement( props.elemInner || 'div', { className: classInner },
              props.children
          )
      )
  )
}