import React from 'react'
import { NavLink } from 'react-router-dom'

interface SidebarLinkProps {
  title: string,
  icon: React.ReactNode,
  path: string,
  onSelect: () => void
}

const SidebarLink: React.FC<SidebarLinkProps> = ({ title, icon, path, onSelect }) => {
  const activeStyle = {
    color: 'rgb(23 37 84)',
    // color: '#0D47A1',
    backgroundColor: 'rgb(226 232 240)',
    fontWeight: '600'
  }

  return (
    <li className="pb-2 pt-3">
      <NavLink to={path}
        onClick={onSelect}
        style={({ isActive }) => isActive ? activeStyle : undefined}
        className="inline-flex text-sm lg:text-base rounded-lg hover:bg-blue-900 px-4 py-2 space-x-1 lg:space-x-2 text-neutral-300 font-medium items-center w-full transition-colors duration-700">
        {icon}
        <span>{title}</span>
      </NavLink>
    </li>
  )
}

export default SidebarLink
