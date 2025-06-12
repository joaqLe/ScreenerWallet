import { Link, useLocation } from 'react-router-dom'
import {
  HomeIcon,
  ArrowsRightLeftIcon,
  UserIcon,
  WalletIcon,
} from '@heroicons/react/24/outline'

export default function BottomNav() {
  const { pathname } = useLocation()

  const link = (
    path: string,
    Icon: React.ComponentType<React.SVGProps<SVGSVGElement>>,
  ) => (
    <Link to={path} className="flex flex-col items-center">
      <Icon
        className={`w-6 h-6 ${
          pathname === path ? 'text-purple-600' : 'text-gray-400'
        }`}
      />
    </Link>
  )

  return (
    // Fixed bottom navigation
    <footer className="fixed bottom-0 left-0 w-full bg-white h-16 flex justify-around items-center shadow-t">
      {link('/', HomeIcon)}
      {link('/swap', ArrowsRightLeftIcon)}
      {link('/wallet', WalletIcon)}
      {link('/profile', UserIcon)}
    </footer>
  )
}
