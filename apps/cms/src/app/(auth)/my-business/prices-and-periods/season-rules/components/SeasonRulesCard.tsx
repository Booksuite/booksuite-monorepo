import { SeasonRuleFull } from '@booksuite/sdk'
import { Divider, ListItemIcon, Menu, MenuItem, styled } from '@mui/material'
import { Edit, Eye, EyeOff, Trash } from 'lucide-react'
import { useState } from 'react'

import { Card } from '@/components/atoms/Card'

interface SeasonRulesCardProps {
    seasonRules: SeasonRuleFull
    onClick?: (id: string) => void
}

const OptionDotsButton = styled(Card.OptionDots)({
    padding: '8px',
    borderRadius: '50%',
    '&:hover': {
        backgroundColor: 'rgba(0, 0, 0, 0.04)',
    },
})

const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
const open = Boolean(anchorEl)

const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    event.stopPropagation()
    setAnchorEl(event.currentTarget)
}

const handleClose = () => {
    setAnchorEl(null)
}

export const SeasonRulesCard: React.FC<SeasonRulesCardProps> = ({
    seasonRules,
    onClick,
}) => {
    return (
        <Card.Container
            key={seasonRules.id}
            sx={{
                '&:hover': {
                    bgcolor: 'action.hover',
                },
            }}
        >
            <Card.Section style={{ flex: 1 }}>
                <Card.Title>{seasonRules.name}</Card.Title>

                <Card.Text>{seasonRules.startDate}</Card.Text>

                <Card.Text>{seasonRules.endDate}</Card.Text>
            </Card.Section>

            <Card.Section style={{ flex: 1 }}>
                <Card.Highlight>{seasonRules.published}</Card.Highlight>
            </Card.Section>

            <Card.Section>
                <div>
                    <OptionDotsButton onClick={handleClick} />
                    <Menu
                        anchorEl={anchorEl}
                        open={open}
                        onClose={handleClose}
                        onClick={(e) => e.stopPropagation()}
                    >
                        {/* TODO: Implementar campo published */}
                        <MenuItem onClick={handleClose}>
                            <ListItemIcon>
                                <EyeOff size={14} />
                            </ListItemIcon>
                            Despublicar
                        </MenuItem>
                        <MenuItem onClick={handleClose}>
                            <ListItemIcon>
                                <Eye size={14} />
                            </ListItemIcon>
                            Publicar
                        </MenuItem>
                        <MenuItem onClick={handleClose}>
                            <ListItemIcon>
                                <Edit size={14} />
                            </ListItemIcon>
                            Editar
                        </MenuItem>
                        <Divider />
                        <MenuItem onClick={handleClose}>
                            <ListItemIcon>
                                <Trash size={14} color="error" />
                            </ListItemIcon>
                            <span style={{ color: 'red' }}>Excluir</span>
                        </MenuItem>
                    </Menu>
                </div>
            </Card.Section>
        </Card.Container>
    )
}
