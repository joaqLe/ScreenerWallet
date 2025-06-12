import { useState } from 'react'
import {
  ArrowLeftIcon,
  ChevronDownIcon,
  ArrowsRightLeftIcon,
} from '@heroicons/react/24/outline'

export default function Swap() {
  const [fromAmount, setFromAmount] = useState('0.6948')
  const [toAmount] = useState('1801.73')

  return (
    // Main container
    <div className="bg-gray-100 min-h-screen p-4">
      <div className="bg-white rounded-2xl shadow-md max-w-sm mx-auto p-4">
        {/* Header */}
        <div className="flex items-center mb-4">
          <button onClick={() => history.back()} className="text-gray-700">
            <ArrowLeftIcon className="w-5 h-5" />
          </button>
          <h3 className="flex-1 text-center text-lg font-semibold">Exchange</h3>
        </div>

        {/* From selector */}
        <div className="bg-white rounded-2xl p-4 shadow flex flex-col">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center">Ξ</div>
              <span className="font-semibold">ETH</span>
              <ChevronDownIcon className="w-4 h-4" />
            </div>
            <span className="text-gray-700">Send</span>
          </div>
          <div className="flex items-end mt-2">
            <input
              value={fromAmount}
              onChange={(e) => setFromAmount(e.target.value)}
              className="flex-1 text-3xl font-bold outline-none bg-transparent"
            />
            <button className="ml-2 bg-green-100 text-green-600 rounded-full px-3 text-sm">
              Max
            </button>
          </div>
          <div className="text-xs text-gray-400 mt-1">Balance: 0.6948 ETH</div>
        </div>

        {/* Swap arrows */}
        <div className="flex justify-center my-2">
          <ArrowsRightLeftIcon className="w-6 h-6 text-gray-500" />
        </div>

        {/* To selector */}
        <div className="bg-white rounded-2xl p-4 shadow flex flex-col">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center">$</div>
              <span className="font-semibold">USD</span>
              <ChevronDownIcon className="w-4 h-4" />
            </div>
            <span className="text-gray-700">Receive</span>
          </div>
          <div className="flex items-end mt-2">
            <input
              value={toAmount}
              readOnly
              className="flex-1 text-3xl font-bold outline-none bg-transparent"
            />
          </div>
          <div className="text-xs text-gray-400 mt-1">Balance: 100,95 USD</div>
        </div>

        {/* Swap button */}
        <button className="w-full bg-purple-600 text-white font-semibold py-3 rounded-2xl mt-6 shadow-lg">
          Swap
        </button>

        {/* Extra info */}
        <div className="text-xs text-gray-500 mt-4">
          <div>Rate: 1 ETH = 2 593,00 USD</div>
          <div>Estimated fee: 4,28 USD</div>
          <div className="font-medium text-gray-900">You will receive: 1 797,45 USD</div>
        </div>
      </div>
    </div>
  )
}
