import React from 'react'
import './globals.css'
import Image from 'next/image'
import { Header } from '@/components/layout/header'
import { UserNav } from '@/components/layout/UserNav'
import Link from 'next/link'
import { Toaster } from '@/components/ui/toaster'
import StoreProvider from '../store/provider'
import { headers } from 'next/headers'

export const metadata = {
  title: 'Tour Dasboard',
  description: 'Generated by Next.js',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const headersList = headers()

  return (
    <html lang="en">
      <body>
        <div className="flex-col md:flex">
          {headersList.get('x-invoke-path') !== '/auth/login' && (
            <div className="border-b">
              <div className="flex justify-between h-16 items-center px-4">
                <Link href={'/dashboard'}>
                  <Image
                    src={'/logo.webp'}
                    alt={'logo'}
                    width={100}
                    height={50}
                    style={{}}
                  />
                </Link>

                <Header />
                <div className="flex items-center space-x-4">
                  {/* <Search /> */}
                  <UserNav />
                  <Toaster />
                </div>
              </div>
            </div>
          )}

          <div className="container mt-3">
            <StoreProvider>{children}</StoreProvider>
          </div>
        </div>
      </body>
    </html>
  )
}
