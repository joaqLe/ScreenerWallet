import { useState } from 'react'
import {
  BellIcon,
  EyeIcon,
  PlusIcon,
  ArrowDownTrayIcon,
  ArrowUpTrayIcon,
  ArrowsRightLeftIcon,
  ChevronUpIcon,
  ArrowsRightLeftIcon as SwapIcon,
} from '@heroicons/react/24/outline'

export default function Dashboard() {
  const [tab, setTab] = useState('Crypto')

  return (
    // Main container with gray background
    <div className="bg-gray-100 min-h-screen p-4">
      {/* Center card */}
      <div className="bg-white rounded-2xl shadow-md max-w-sm mx-auto p-4">
        {/* Header with avatar, name and notification bell */}
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <img
              className="w-10 h-10 rounded-full"
              src="https://via.placeholder.com/40"
              alt="avatar"
            />
            <span className="ml-2 text-gray-800 font-semibold text-lg">
              Mitchell Santos
            </span>
          </div>
          <button className="relative bg-white shadow p-2 rounded-xl">
            <BellIcon className="w-5 h-5 text-gray-600" />
            <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full" />
          </button>
        </div>

        {/* Total balance */}
        <div className="mt-4">
          <div className="flex items-center gap-1 text-sm text-gray-500">
            <span>Total balance</span>
            <EyeIcon className="w-4 h-4" />
          </div>
          <div className="text-4xl font-bold text-gray-900 mt-1">$72 829,62</div>
        </div>

        {/* Quick actions */}
        <div className="grid grid-cols-4 gap-3 mt-4">
          <div className="flex flex-col items-center">
            <button className="flex items-center justify-center bg-white shadow rounded-xl w-12 h-12">
              <PlusIcon className="w-6 h-6 text-gray-700" />
            </button>
            <span className="text-xs text-gray-600 mt-1">Add saving</span>
          </div>
          <div className="flex flex-col items-center">
            <button className="flex items-center justify-center bg-white shadow rounded-xl w-12 h-12">
              <ArrowDownTrayIcon className="w-6 h-6 text-gray-700" />
            </button>
            <span className="text-xs text-gray-600 mt-1">Withdraw</span>
          </div>
          <div className="flex flex-col items-center">
            <button className="flex items-center justify-center bg-white shadow rounded-xl w-12 h-12">
              <ArrowUpTrayIcon className="w-6 h-6 text-gray-700" />
            </button>
            <span className="text-xs text-gray-600 mt-1">Top up</span>
          </div>
          <div className="flex flex-col items-center">
            <button className="flex items-center justify-center bg-white shadow rounded-xl w-12 h-12">
              <ArrowsRightLeftIcon className="w-6 h-6 text-gray-700" />
            </button>
            <span className="text-xs text-gray-600 mt-1">Exchange</span>
          </div>
        </div>

        {/* Tabs */}
        <nav className="flex mt-4 space-x-4 overflow-x-auto">
          {['Crypto', 'Fiat', 'Card', 'Savings', '📊'].map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={`uppercase text-xs pb-1 ${
                tab === t ? 'text-purple-600 border-b-2 border-purple-600' : 'text-gray-400'
              }`}
            >
              {t}
            </button>
          ))}
        </nav>

        {/* Asset cards */}
        <ul className="space-y-3 mt-4">
          <li className="flex items-center justify-between bg-white rounded-2xl p-3 shadow">
            <div className="flex items-center">
              <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center mr-2">₿</div>
              <span className="font-semibold">BTC</span>
            </div>
            <span className="text-sm text-gray-500">1,1272 · $67 203,95</span>
            <span className="text-green-500 flex items-center text-sm">
              <ChevronUpIcon className="w-4 h-4" />2,15%
            </span>
          </li>
          <li className="flex items-center justify-between bg-white rounded-2xl p-3 shadow">
            <div className="flex items-center">
              <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center mr-2">Ξ</div>
              <span className="font-semibold">ETH</span>
            </div>
            <span className="text-sm text-gray-500">0,6948 · $1 801,73</span>
            <span className="text-green-500 flex items-center text-sm">
              <ChevronUpIcon className="w-4 h-4" />1,12%
            </span>
          </li>
        </ul>

        {/* Recent transactions */}
        <h4 className="text-sm font-semibold text-gray-800 mt-6">Recent transactions</h4>
        <div className="flex items-center justify-between bg-white rounded-2xl p-3 shadow mt-2">
          <div>
            <div className="flex items-center">
              <SwapIcon className="w-5 h-5 text-gray-600 mr-1" />
              <span>USDT to BTC</span>
            </div>
            <div className="text-xs text-gray-400">2023-07-25</div>
          </div>
          <span className="text-green-500 text-sm">+0,0116 BTC</span>
        </div>
      </div>
    </div>
  )
}
