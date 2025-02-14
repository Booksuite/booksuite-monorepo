export interface LinkType {
  href: string; 
  label: string 
}

export interface NavMenuProps {
  links: LinkType[]  
  isFooter?: boolean
}
