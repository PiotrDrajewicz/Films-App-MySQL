import './globals.css';
import NavList from '../components/NavList';
// import Providers from '@/components/Providers';

export const metadata = {
  title: 'Films App 2',
  description: 'Generated by Next.js',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        {/* <Providers> */}
          <main>
            <nav>
              <NavList />
            </nav>
            {children}
          </main>
        {/* </Providers> */}
      </body>
    </html>
  )
}
