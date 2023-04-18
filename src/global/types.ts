export interface IMission {
  id: string, 
  mission_name: string, 
  launch_date_unix: string, 
  details: null | string, 
  links: {
    presskit: null | string
  }, 
  rocket: {
    rocket_name: string
  }
}

export interface IMissionsListProps {
  isBookmarks: boolean, 
  bookmarks: IMission[], 
  addToBookmarks: (mission: IMission) => void, 
  removeFromBookmarks: (mission: IMission) => void
}

export interface IMissionItemProps {
  mission: IMission, 
  addToBookmarks: (mission: IMission) => void, 
  removeFromBookmarks: (mission: IMission) => void
}

export type MissionsContainerProps = {
  isMoreMissions: boolean
}

export type ActiveTypeButtonProps = {
  isActive: boolean
}

export type BookmarkIconProps = {
  isInBookmarks: boolean
}
