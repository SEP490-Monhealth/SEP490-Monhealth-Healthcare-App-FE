"use client"

import React, { useEffect, useState } from "react"

import { usePathname } from "next/navigation"

import { Home } from "lucide-react"

import { sidebarItems } from "@/configs/site"

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator
} from "../atoms/breadcrumb"

interface BreadcrumbItem {
  title: string
  path: string
}

interface SidebarItem {
  title: string
  path: string
  icon?: React.ElementType
  children?: SidebarItem[]
}

function findPathInSidebarItems(
  path: string,
  items: SidebarItem[]
): BreadcrumbItem[] {
  for (const item of items) {
    if (item.path === path) {
      return [{ title: item.title, path: item.path }]
    }

    if (item.children && item.children.length > 0) {
      const foundInChildren = findPathInSidebarItems(path, item.children)
      if (foundInChildren.length > 0) {
        return [{ title: item.title, path: item.path }, ...foundInChildren]
      }
    }
  }

  return []
}

function TopBarBreadcrumb() {
  const pathname = usePathname()
  const [breadcrumbItems, setBreadcrumbItems] = useState<BreadcrumbItem[]>([])

  useEffect(() => {
    const breadcrumbs = findPathInSidebarItems(pathname, sidebarItems)
    setBreadcrumbItems(breadcrumbs)
  }, [pathname])

  if (breadcrumbItems.length === 0) {
    return null
  }

  return (
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink href="/admin/dashboard">
            <Home size={20} />
          </BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />

        {breadcrumbItems.map((item, index) => {
          const isLastItem = index === breadcrumbItems.length - 1

          return (
            <React.Fragment key={index}>
              <BreadcrumbItem>
                {isLastItem ? (
                  <BreadcrumbPage>{item.title}</BreadcrumbPage>
                ) : (
                  <BreadcrumbLink href={item.path}>{item.title}</BreadcrumbLink>
                )}
              </BreadcrumbItem>

              {!isLastItem && <BreadcrumbSeparator />}
            </React.Fragment>
          )
        })}
      </BreadcrumbList>
    </Breadcrumb>
  )
}

export default TopBarBreadcrumb
