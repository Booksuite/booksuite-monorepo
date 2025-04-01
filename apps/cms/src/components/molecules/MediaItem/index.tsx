'use client'

import {
    Box,
    Button,
    IconButton,
    ListItemIcon,
    ListItemText,
    Menu,
    MenuItem,
    styled,
    useTheme,
} from '@mui/material'
import { Check, ChevronDown } from 'lucide-react'
import React, { PropsWithChildren } from 'react'

import { AspectRatioBox } from '@/components/atoms/AscpectRatio'

import { MediaItemProps } from './types'
import { getMediaItem } from './utils'

const MediaContainer = styled(Box, {
    shouldForwardProp: (prop) => prop !== 'hoverable' && prop !== 'isSelected',
})<{ hoverable?: boolean; isSelected?: boolean }>(
    ({ theme, hoverable, isSelected }) => ({
        position: 'relative',
        borderRadius: theme.shape.borderRadius,
        '& .container': {
            outline: 'none',
            transition: 'all 0.2s',
        },
        ...(isSelected && {
            '& .container': {
                outline: `3px solid ${theme.palette.primary.main}`,
            },
            '& .checkbox': {
                opacity: 1,
            },
        }),
        '& .hideable': {
            opacity: 0,
        },
        ...(hoverable && {
            '&:hover': {
                '& .hideable': {
                    opacity: 1,
                },
                '& .container': {
                    outline: `3px solid ${theme.palette.primary.main}`,
                    backgroundColor: `${theme.palette.blueGrey[900]}30`,
                },
                '& .checkbox': {
                    opacity: 1,
                },
                '& .menu-button': {
                    opacity: 1,
                },
            },
        }),
    }),
)

export const MediaItem: React.FC<PropsWithChildren<MediaItemProps>> = ({
    onSelect,
    item,
    isSelected,
    actions,
    selectable,
    children,
    ...props
}) => {
    const theme = useTheme()
    const hoverable = !!actions || selectable
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null)
    const open = Boolean(anchorEl)

    const handleClick = () => {
        if (selectable) {
            onSelect?.(item)
        }
    }

    const handleMenuClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.stopPropagation()
        setAnchorEl(event.currentTarget)
    }

    const handleMenuClose = () => {
        setAnchorEl(null)
    }

    return (
        <MediaContainer
            hoverable={hoverable}
            isSelected={isSelected}
            {...props}
        >
            <AspectRatioBox borderRadius={1} overflow="hidden">
                {getMediaItem(item)}
            </AspectRatioBox>

            <Box
                sx={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    p: 1.5,
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    borderRadius: 1,
                    bgcolor: 'transparent',
                }}
                onClick={handleClick}
                className="container"
            >
                {selectable && (
                    <Button
                        size="small"
                        className="checkbox"
                        variant="contained"
                        color={isSelected ? 'primary' : 'inherit'}
                        onClick={handleClick}
                        sx={{
                            opacity: 0,
                            position: 'absolute',
                            top: 8,
                            left: 8,
                            transition: 'opacity 0.2s',
                            borderRadius: 0.5,
                            p: 0,
                            minWidth: '20px',
                            height: '20px',
                        }}
                    >
                        {isSelected && <Check size={12} />}
                    </Button>
                )}

                {!!actions && (
                    <Box
                        sx={{
                            position: 'absolute',
                            top: theme.spacing(1),
                            right: theme.spacing(1),
                        }}
                    >
                        <IconButton
                            className="menu-button"
                            size="small"
                            sx={{
                                borderRadius: 0.8,
                                opacity: 0,
                                bgcolor: 'background.paper',
                                '&:hover': {
                                    bgcolor: 'background.default',
                                },
                            }}
                            aria-label="Options"
                            onClick={handleMenuClick}
                            aria-controls={open ? 'media-menu' : undefined}
                            aria-haspopup="true"
                            aria-expanded={open ? 'true' : undefined}
                        >
                            <ChevronDown size={16} />
                        </IconButton>
                        <Menu
                            id="media-menu"
                            anchorEl={anchorEl}
                            open={open}
                            onClose={handleMenuClose}
                            onClick={handleMenuClose}
                        >
                            {actions?.map((action) => (
                                <MenuItem
                                    key={action.id}
                                    sx={{
                                        '& .MuiListItemIcon-root': {
                                            minWidth: 25,
                                        },
                                        '& .MuiTypography-root  ': {
                                            fontSize: 12,
                                        },
                                    }}
                                    onClick={(e) => {
                                        e.stopPropagation()
                                        action.onClick?.()
                                        handleMenuClose()
                                    }}
                                >
                                    {action.icon && (
                                        <ListItemIcon>
                                            {action.icon}
                                        </ListItemIcon>
                                    )}
                                    <ListItemText>
                                        {action.children}
                                    </ListItemText>
                                </MenuItem>
                            ))}
                        </Menu>
                    </Box>
                )}

                {children}
            </Box>
        </MediaContainer>
    )
}
