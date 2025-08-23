'use client'

import { Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import StrategicChat from '@/components/StrategicChat'
import CoreAppNavigation from '../../../../components/app/CoreAppNavigation'

function StrategicChatContent() {
  const searchParams = useSearchParams()
  const initialQuestion = searchParams.get('q') || ''

  return <StrategicChat initialQuestion={initialQuestion} />
}

export default function StrategicChatPage() {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900">
      <CoreAppNavigation />
      <div className="pt-16"> {/* Account for fixed navigation */}
        <Suspense fallback={
          <div className="flex items-center justify-center h-96">
            <div className="animate-spin w-8 h-8 border-2 border-blue-500 border-t-transparent rounded-full"></div>
          </div>
        }>
          <StrategicChatContent />
        </Suspense>
      </div>
    </div>
  )
}