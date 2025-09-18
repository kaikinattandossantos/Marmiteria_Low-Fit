import type { Metadata } from 'next'
import { GeistSans } from 'geist/font/sans'
import './globals.css'
import { ThemeProvider } from '@/components/theme-provider'
import { CartProvider } from '@/app/context/CartContext'
import { Header } from '@/components/header'       // Header fica aqui
import { Footer } from '@/components/footer'       // Footer fica aqui

export const metadata: Metadata = {
  title: 'Low&Fit - Marmitas Fitness em Olinda',
  description: 'Refeições saudáveis, saborosas e práticas para sua rotina. Peça online!',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <body className={`font-sans ${GeistSans.variable}`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
        >
          <CartProvider>
            <Header /> {/* <-- HEADER NA MOLDURA */}
            <main>{children}</main> {/* <-- CONTEÚDO DA PÁGINA ENTRA AQUI */}
            <Footer /> {/* <-- FOOTER NA MOLDURA */}
          </CartProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}