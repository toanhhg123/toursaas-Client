import Link from 'next/link'

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

export function Header() {
  return (
    <nav className={'flex items-center space-x-4 lg:space-x-6'}>
      {navs.map((nav) => {
        if (nav.childrens)
          return (
            <DropdownMenu key={nav.label}>
              <DropdownMenuTrigger asChild>
                <div className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary cursor-pointer flex justify-center gap-1">
                  {nav.label}
                </div>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56" align="center" forceMount>
                <DropdownMenuGroup>
                  {nav.childrens.map((link) => (
                    <DropdownMenuItem key={link.label}>
                      <Link
                        href={link.href}
                        className="text-sm w-full font-medium text-muted-foreground transition-colors hover:text-primary"
                      >
                        {link.label}
                      </Link>
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuGroup>
              </DropdownMenuContent>
            </DropdownMenu>
          )

        return (
          <Link
            key={nav.label}
            href={nav.href}
            className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
          >
            {nav.label}
          </Link>
        )
      })}
    </nav>
  )
}

interface INavItem {
  href: string
  label: string
  childrens?: INavItem[]
}

const navs: INavItem[] = [
  {
    href: '/',
    label: 'Danh sách tour',
    childrens: [
      { label: 'Tour trong nước', href: '/tours' },
      { label: 'Tour ngoài nước', href: '/' },
    ],
  },
  {
    href: '/',
    label: 'Vé series',
  },
  {
    href: '/',
    label: 'Lịch dành cho khách',
    childrens: [
      { label: 'Tour trong nước', href: '/' },
      { label: 'Tour ngoài nước', href: '/' },
    ],
  },
  {
    href: '/',
    label: 'Giao dịch',
    childrens: [
      { label: 'Danh sách vé nước ngoài', href: '/' },
      { label: 'Danh sách giữ chỗ vé nước ngoài', href: '/' },
    ],
  },
]
