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
  description: 'ASI1/docs',
  applicationName: 'ASI1/docs',
  generator: 'Next.js',
  appleWebApp: {
    title: 'ASI1 Docs'
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
          <b>ASI1/docs</b>{' '}
        </div>
      }
      chatLink="https://discord.com/invite/fetchai"
    />
  )
  const pageMap = await getPageMap()
  return (
      <html className={lexend.className} lang="en" dir="ltr" suppressHydrationWarning>
      <head>
        <script
            dangerouslySetInnerHTML={{
              __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start': new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer','GTM-MGNF8Z9K');`
            }}
        />
      </head>
      <body id="modal-root">
      {/* Google Tag Manager (noscript) */}
      <noscript>
        <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-MGNF8Z9K"
            height="0"
            width="0"
            style={{display: 'none', visibility: 'hidden'}}
        ></iframe>
      </noscript>
      <OSProvider>
        <Layout
            navbar={navbar}
            footer={<Footer>{new Date().getFullYear()} © Fetch.ai.</Footer>}
            editLink="Edit this page on GitHub"
            docsRepositoryBase="https://github.com/fetchai/asi-1-docs/tree/main"
            sidebar={{defaultMenuCollapseLevel: 1}}
            pageMap={pageMap}
            search={<Search/>}
        >
          {children}
        </Layout>
      </OSProvider>
      </body>
    </html>
  )
}
