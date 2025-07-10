/* eslint-env node */
import { Footer, Layout, Navbar } from 'nextra-theme-docs'
import { Banner, Head } from 'nextra/components'
import { getPageMap } from 'nextra/page-map'
import 'nextra-theme-docs/style.css'
import '../style/globals.css'
import { Lexend } from 'next/font/google'
import { Search } from '../components/search'
import { OSProvider } from '../contexts/os-provider'

const lexend = Lexend({ subsets: ['latin'] })

export const metadata = {
  metadataBase: new URL('https://docs.asi1.ai/docs'),
  title: {
    template: '%s'
  },
  description: 'ASI:One/docs',
  applicationName: 'ASI:One/docs',
  generator: 'Next.js',
  appleWebApp: {
    title: 'ASI:One Docs'
  },
  other: {
    'msapplication-TileImage': '/ms-icon-144x144.png',
    'msapplication-TileColor': '#fff'
  },
  twitter: {
    site: 'https://fetch.ai'
  }
}

export default async function RootLayout({ children }) {
  const navbar = (
    <Navbar
      logo={
        <div>
          <b>ASI:One/docs</b>{' '}
        </div>
      }
      chatLink="https://discord.com/invite/fetchai"
    />
  )
  const pageMap = await getPageMap()
  return (
    <html className={lexend.className} lang="en" dir="ltr" suppressHydrationWarning>
      <Head faviconGlyph="✦" />
      <body id="modal-root" >
        <OSProvider>
        <Layout
          navbar={navbar}
          footer={<Footer>{new Date().getFullYear()} © Fetch.ai.</Footer>}
          editLink="Edit this page on GitHub"
          docsRepositoryBase="https://github.com/fetchai/asi-1-docs/tree/main"
          sidebar={{ defaultMenuCollapseLevel: 1 }}
          pageMap={pageMap}
          search={<Search />}
        >
          {children}
        </Layout>
        </OSProvider>
      </body>
    </html>
  )
}
