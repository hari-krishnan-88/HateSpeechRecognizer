import './globals.css'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Hate Speech Recognizer',
  description: 'This is a simple NLP based Web App that uses a HuggingFace Model to classify a text to detect offensive language. The Hate score or Hope score is also displayed',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  )
}
