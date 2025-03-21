import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import SideBar from './components/SideBar';
import NavBar from './components/NavBar';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="flex min-h-screen bg-stockDark text-white">
        <SideBar />
        <div className="flex-1 ml-64">
          <NavBar />
          <div className="pt-20 px-6">{children}</div>
        </div>
      </body>
    </html>
  );
}
