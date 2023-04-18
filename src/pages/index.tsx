import { useState, useEffect, useCallback } from 'react'
import Head from 'next/head'
import styled from '@emotion/styled'
import { ButtonGroup, Button, Box, Container, Typography } from '@mui/material'

import { ActiveTypeButtonProps, IMission } from '@/global/types'
import { Tabs } from '@/global/defenitions'
import { MissionsList } from '@/components'

export default function Home() {
  const [ activeTab, setActiveTab ] = useState(Tabs.All)
  const [ bookmarks, setBookmarks ] = useState<IMission[]>([])

  useEffect(() => {
    const res = Object.values(localStorage).reduce((acc, x) => {
      x.includes('__typename') ? acc.push(JSON.parse(x)) : null
      return acc
    }, [])
    setBookmarks(res)
  },[])

  const addToBookmarks = useCallback((mission: IMission) => {
    setBookmarks([...bookmarks, mission])
  }, [bookmarks])

  const removeFromBookmarks = useCallback((mission: IMission) => {
    setBookmarks(bookmarks.filter(x => x.id !== mission.id))
  }, [bookmarks])

  return (
    <>
      <Head>
        <title>SpaceX Missions</title>
        <meta name="description" content="SpaceX Missions" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <ContentContainer maxWidth="sm">
        <Content>
          <HeaderContainer>
            <Title>SpaceX Missions</Title>
            <ButtonGroup variant="text">
              <TypeButton onClick={() => setActiveTab(Tabs.All)} isActive={activeTab === Tabs.All}>
                <UnderlinedText>Show all</UnderlinedText>
              </TypeButton>
              <TypeButton onClick={() => setActiveTab(Tabs.Bookmarks)} isActive={activeTab === Tabs.Bookmarks}>
                <UnderlinedText>Bookmarks</UnderlinedText>
                <Typography ml={1.3}>{bookmarks.length}</Typography>
              </TypeButton>
            </ButtonGroup>
          </HeaderContainer>
          <MissionsList 
            isBookmarks={activeTab === Tabs.Bookmarks} 
            bookmarks={bookmarks} 
            addToBookmarks={addToBookmarks} 
            removeFromBookmarks={removeFromBookmarks} 
          />
        </Content>
      </ContentContainer>
    </>
  )
}

const ContentContainer = styled(Container)`
  @media (min-width: 600px) {
    padding-right: 8px !important;
    padding-left: 8px !important;
  }
`

const Content = styled(Box)`
  padding: 32px 0;
`

const HeaderContainer = styled(Box)`
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  padding-bottom: 40px;
`

const Title = styled(Typography)`
  font-size: 32px;
`

const TypeButton = styled(Button, {
  shouldForwardProp: (props) => props !== 'isActive',
})<ActiveTypeButtonProps>(({ isActive }) => ({
  borderRight: '0 !important',
  background: isActive ? '#252525' : 'transparent',
  borderRadius: '8px !important',
  textTransform: 'none',
  color: '#EBEBEB',
  padding: '12px 17px',

  '&:hover': {
    backgroundColor: isActive ? '#252525' : 'transparent'
  }
}));

const UnderlinedText = styled(Typography)`
  text-decoration-line: underline;
`
