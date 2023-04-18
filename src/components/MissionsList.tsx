import { useRef } from 'react';
import { useQuery } from "@apollo/client";
import { ViewportList } from 'react-viewport-list';
import styled from '@emotion/styled'
import { Button, Box, Skeleton, Typography } from '@mui/material'

import { GET_MISSIONS } from '@/pages/queries/missions-query'
import { IMission, IMissionsListProps, MissionsContainerProps } from '@/global/types';
import MissionsListItem from './MissionsListItem'

export default function MissionsList({ isBookmarks, bookmarks, addToBookmarks, removeFromBookmarks }: IMissionsListProps) {
  const { loading, error, data, fetchMore } = useQuery(GET_MISSIONS, {
    variables: { 
      offset: 0, 
      limit: 2 
    },
    notifyOnNetworkStatusChange: true
  })

  const missions = (isBookmarks ? bookmarks : data?.launches) || []
 
  const skeletons = new Array(2).fill(null)

  const loadMoreMissions = () => {
    fetchMore({
      variables: {
        offset: missions.length,
        limit: missions.length + 10
      },
      updateQuery: (previousResult, { fetchMoreResult }) => {
        if (!fetchMoreResult.launches.length) {
          return previousResult
        }
        return {...previousResult, launches: [...previousResult.launches, ...fetchMoreResult.launches]};
      }
    })
  }

  const containerRef = useRef<HTMLDivElement | null>(
    null,
  );

  return (
    <MissionsContainer ref={containerRef} isMoreMissions={missions.length > 2}>
      {loading && missions.length < 2 ? 
          skeletons.map((x, i) => 
            <CardSkeleton key={i} variant="rectangular" width={584} height={176} />
          ) :
        <ViewportList
          viewportRef={containerRef}
          items={missions}
        >
          {(item: IMission) => (
            <div key={item.id} className="item">
              <MissionsListItem 
                mission={item}
                addToBookmarks={addToBookmarks} 
                removeFromBookmarks={removeFromBookmarks} 
              />
            </div>
          )}
        </ViewportList>
      }
      {error && <ErrorText mb={2} variant="h5">Somehing wrong</ErrorText>}
      {!isBookmarks &&
        <MoreButton disabled={loading} variant="contained" fullWidth onClick={() => loadMoreMissions()}>
          {loading ? 'Loading...' : 'More'}
        </MoreButton>
      }
    </MissionsContainer>
  )
}

const CardSkeleton = styled(Skeleton)`
  padding: 24px;
  border-radius: 16px;
  margin-bottom: 16px;
`

const MissionsContainer = styled(Box, {
  shouldForwardProp: (props) => props !== 'isMoreMissions',
})<MissionsContainerProps>(({ isMoreMissions }) => ({
  paddingBottom: '40px',
  height: isMoreMissions ? '100vh' : 'auto',
  display: 'flex',
  flexDirection: 'column',
  overflowX: 'hidden',
  overflowY: 'auto',

  '::-webkit-scrollbar': {
    display: 'none'
  },

  scrollbarWidth: 'none'
}))

const ErrorText = styled(Typography)`
  text-align: center;
`

const MoreButton = styled(Button)`
  background: #313131;
  border-radius: 16px;
  padding: 15px 16px;
  font-size: 24px;
  text-transform: unset;
  color: #EBEBEB;
  box-shadow: none;

  &:hover {
    background-color: #ffffff4d;
  }
`
