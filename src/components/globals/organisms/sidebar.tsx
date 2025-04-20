import React, { useEffect, useState } from "react"

import Link from "next/link"

import { AnimatePresence, motion } from "framer-motion"
import { ChevronDown, ChevronRight, LogOut } from "lucide-react"

import { Button } from "@/components/globals/atoms/button"

import { sidebarItems } from "@/configs/site"

import { useAuth } from "@/contexts/AuthContext"

interface SidebarItem {
  title: string
  path: string
  icon?: React.ElementType
  children?: SidebarItem[]
  onClick?: () => void
}

const SidebarItemComponent = ({
  title,
  path,
  icon: Icon,
  children,
  isCollapsed,
  animationsEnabled,
  onClick
}: SidebarItem & { isCollapsed: boolean; animationsEnabled: boolean }) => {
  const [isOpen, setIsOpen] = useState(false)

  if (children && children.length > 0) {
    return (
      <div className="w-full">
        <Button
          type="button"
          variant="ghost"
          className="h-12 w-full justify-start"
          onClick={() => setIsOpen(!isOpen)}
        >
          {Icon && (
            <div className={isCollapsed ? "" : "mr-2"}>
              <Icon size={24} color="#0f172a" />
            </div>
          )}

          {!isCollapsed && <span className="font-medium">{title}</span>}

          {!isCollapsed && children && (
            <motion.span
              className="ml-auto"
              animate={animationsEnabled ? { rotate: isOpen ? 180 : 0 } : {}}
              transition={{ duration: 0.3 }}
            >
              <ChevronDown size={18} />
            </motion.span>
          )}
        </Button>

        <AnimatePresence>
          {isOpen && !isCollapsed && (
            <motion.div
              initial={
                animationsEnabled
                  ? { height: 0, opacity: 0 }
                  : { height: "auto", opacity: 1 }
              }
              animate={{ height: "auto", opacity: 1 }}
              exit={animationsEnabled ? { height: 0, opacity: 0 } : {}}
              transition={{ duration: 0.2, ease: "easeInOut" }}
              className="mt-1 ml-6 flex flex-col gap-1 overflow-hidden"
            >
              {children.map((child) => (
                <div key={child.title}>
                  <Link href={child.path}>
                    <Button
                      type="button"
                      variant="ghost"
                      className="h-10 w-full justify-start"
                    >
                      <span className="font-medium">{child.title}</span>
                    </Button>
                  </Link>
                </div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    )
  }

  if (onClick) {
    return (
      <Button
        type="button"
        variant="ghost"
        className="h-12 w-full justify-start"
        onClick={onClick}
        title={isCollapsed ? title : ""}
      >
        {Icon && (
          <div className={isCollapsed ? "" : "mr-2"}>
            {title === "Thu gọn" ? (
              <motion.div
                animate={
                  animationsEnabled ? { rotate: isCollapsed ? 0 : 180 } : {}
                }
                transition={{ duration: 0.3 }}
              >
                <Icon size={18} />
              </motion.div>
            ) : (
              <Icon size={18} />
            )}
          </div>
        )}

        {!isCollapsed && <span className="font-medium">{title}</span>}
      </Button>
    )
  }

  return (
    <Link href={path}>
      <Button
        type="button"
        variant="ghost"
        className="h-12 w-full justify-start"
        title={isCollapsed ? title : ""}
      >
        {Icon && (
          <div className={isCollapsed ? "" : "mr-2"}>
            <Icon size={24} color="#0f172a" />
          </div>
        )}

        {!isCollapsed && <span className="font-medium">{title}</span>}
      </Button>
    </Link>
  )
}

const SidebarHeader = ({ isCollapsed }: { isCollapsed: boolean }) => {
  return (
    <div
      className={`mt-4 mb-6 flex flex-col ${isCollapsed ? "items-center" : "items-center"}`}
    >
      <Link
        href="/"
        className={`${isCollapsed ? "text-xl" : "text-3xl"} font-bold text-black select-none`}
      >
        <span>{isCollapsed ? "M" : "Mon"}</span>
        <span className="text-primary">{isCollapsed ? "H" : "Health"}</span>
      </Link>

      {!isCollapsed && (
        <p className="text-muted-foreground select-none">
          Phiên bản {process.env.NEXT_PUBLIC_APP_VERSION}
        </p>
      )}
    </div>
  )
}

const SidebarMenu = ({
  isCollapsed,
  animationsEnabled
}: {
  isCollapsed: boolean
  animationsEnabled: boolean
}) => {
  return (
    <div className="flex flex-col gap-1">
      {sidebarItems.map((item) => (
        <div key={item.title}>
          <SidebarItemComponent
            {...item}
            isCollapsed={isCollapsed}
            animationsEnabled={animationsEnabled}
          />
        </div>
      ))}
    </div>
  )
}

const SidebarFooter = ({
  isCollapsed,
  toggleCollapse,
  animationsEnabled
}: {
  isCollapsed: boolean
  toggleCollapse: () => void
  animationsEnabled: boolean
}) => {
  const { logout } = useAuth()

  const footerItems: SidebarItem[] = [
    {
      title: "Thu gọn",
      path: "#",
      icon: ChevronRight,
      onClick: toggleCollapse
    },
    {
      title: "Đăng xuất",
      path: "#",
      icon: LogOut,
      onClick: logout
    }
  ]

  return (
    <div className="border-secondary mt-auto border-t pt-2">
      {footerItems.map((item) => (
        <div key={item.title}>
          <SidebarItemComponent
            {...item}
            isCollapsed={isCollapsed}
            animationsEnabled={animationsEnabled}
          />
        </div>
      ))}
    </div>
  )
}

interface SidebarProps {
  onToggleCollapse?: (isCollapsed: boolean) => void
}

function Sidebar({ onToggleCollapse }: SidebarProps) {
  const [isCollapsed, setIsCollapsed] = useState(false)
  const [animationsEnabled, setAnimationsEnabled] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimationsEnabled(true)
    }, 500)

    return () => clearTimeout(timer)
  }, [])

  const toggleCollapse = () => {
    const newCollapsedState = !isCollapsed
    setIsCollapsed(newCollapsedState)

    if (onToggleCollapse) {
      onToggleCollapse(newCollapsedState)
    }

    const event = new CustomEvent("sidebarToggle", {
      detail: { isCollapsed: newCollapsedState }
    })
    window.dispatchEvent(event)
  }

  const initialWidth = isCollapsed ? "5rem" : "18rem"

  return (
    <div
      className="transition-width fixed flex h-screen flex-col overflow-scroll px-4 py-6 shadow-md duration-300"
      style={{
        width: initialWidth,
        transitionProperty: animationsEnabled ? "width" : "none"
      }}
    >
      <SidebarHeader isCollapsed={isCollapsed} />
      <SidebarMenu
        isCollapsed={isCollapsed}
        animationsEnabled={animationsEnabled}
      />
      <SidebarFooter
        isCollapsed={isCollapsed}
        toggleCollapse={toggleCollapse}
        animationsEnabled={animationsEnabled}
      />
    </div>
  )
}

export default Sidebar
