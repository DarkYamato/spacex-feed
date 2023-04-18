import { useState } from 'react'
import styled from '@emotion/styled'
import { Box, Typography, Paper, IconButton, Link } from '@mui/material'
import StarIcon from '@mui/icons-material/Star'

import { IMissionItemProps, BookmarkIconProps } from '@/global/types'

export default function MissionsListItem({ mission, addToBookmarks, removeFromBookmarks }: IMissionItemProps) {
  const { id, mission_name: missonName, launch_date_unix: launchDateUnix , details, links, rocket } = mission
  const { presskit } = links
  const { rocket_name: rocketName } = rocket
  const initialBookmarkState = localStorage.getItem(id) !== null ? true : false

  const [ isInBookmarks, setIsInBookmarks ] = useState(initialBookmarkState)

  const date = new Date(Number(launchDateUnix) * 1000)
  const dateString = `${date.getDate()} ${date.toLocaleString('en', { month: 'long' })} ${date.getFullYear()}`

  const toggleBookmark = () => {
    if (isInBookmarks) {
      setIsInBookmarks(false)
      localStorage.removeItem(id)
      removeFromBookmarks(mission)
    } else {
      setIsInBookmarks(true)
      localStorage.setItem(id, JSON.stringify(mission))
      addToBookmarks(mission)
    }
  }

  return (
    <Card>
      <HeaderContainer>
          <Title>{missonName}</Title>
          <ButtonIcon onClick={() => toggleBookmark()}>
              <BookmarkIcon isInBookmarks={isInBookmarks} />
          </ButtonIcon>
      </HeaderContainer>
      <FlexContainer>
          <Typography mr={2}>
              {dateString}
          </Typography>
          <Typography>
              {rocketName}
          </Typography>
      </FlexContainer>
      {details && 
        <>
          <SecondaryTitle mt={1}>Details</SecondaryTitle> 
          <Details>
            {details}
          </Details>
        </>
      }
      {presskit &&
        <Box mt={1}>
            <Link href={presskit} target="_blank" color="inherit">
              Press Kit
            </Link>
        </Box>    
      }      
    </Card>
  )
}

const HeaderContainer = styled(Box)`
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
`

const FlexContainer = styled(Box)`
  display: flex;
`

const Title = styled(Typography)`
  font-size: 32px;
`

const SecondaryTitle = styled(Typography)`
  color: #606060;
`

const Card = styled(Paper)`
  padding: 24px;
  border-radius: 16px;
  margin-bottom: 16px;
  box-shadow: none;
`

const ButtonIcon = styled(IconButton) `
  &:hover {
    background-color: transparent;
  }
`

const BookmarkIcon = styled(StarIcon, {
  shouldForwardProp: (props) => props !== 'isInBookmarks',
})<BookmarkIconProps>(({ isInBookmarks }) => ({
  fontSize: '32px',
  color: isInBookmarks ? '#EBEBEB' : '#606060',
  '&:hover': {
    color: '#EBEBEB'
  }
}))

const Details = styled(Typography)`
  display: -webkit-box;
  -webkit-line-clamp: 6;
  -webkit-box-orient: vertical;
  overflow: hidden;
`
