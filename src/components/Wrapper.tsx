import { Flex } from "antd"
import React, { FC } from "react"

export const Wrapper: FC<{children: React.ReactNode}> = ({children}) => {
  return  <Flex style={{height: '100%', flex: '1 1 100%'}} vertical justify="space-between">{children}</Flex>
}