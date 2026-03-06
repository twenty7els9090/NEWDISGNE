'use client'

import { useEffect, useState, useCallback } from 'react'
import { TabBar } from '@/components/layout/TabBar'
import { Header } from '@/components/layout/Header'
import { TasksSection } from '@/components/tasks/TasksSection'
import { EventsSection } from '@/components/events/EventsSection'
import { WishlistSection } from '@/components/wishlist/WishlistSection'
import { ProfileSection } from '@/components/profile/ProfileSection'
import { BirthdayReminders } from '@/components/shared/BirthdayReminders'
import { useUIStore, useUserStore, useFriendsStore } from '@/store'
import { Loader2 } from 'lucide-react'

export default function Home() {
  const { activeTab } = useUIStore()
  const { setUser, setFamilies, setLoading, isLoading } = useUserStore()
  const { friends } = useFriendsStore()
  const [isInitialized, setIsInitialized] = useState(false)
  const [birthdayUsers, setBirthdayUsers] = useState<any[]>([])

  const fetchUserFamilies = useCallback(
    async (userId: string) => {
      try {
        const response = await fetch(`/api/families?userId=${userId}`)
        const data = await response.json()

        if (data.families) {
          setFamilies(data.families)
        }
      } catch (error) {
        console.error('Error fetching families:', error)
      }
    },
    [setFamilies]
  )

  const authenticateWithTelegram = useCallback(
    async (_tgUser: any, initData: string) => {
      try {
        const response = await fetch('/api/auth/telegram', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ initData }),
        })

        const data = await response.json()

        if (data.user) {
          setUser(data.user)
          await fetchUserFamilies(data.user.id)
          return true
        }
      } catch (error) {
        console.error('Error authenticating:', error)
      }
      return false
    },
    [setUser, fetchUserFamilies]
  )

  const initializeDemoMode = useCallback(async () => {
    const demoUser = {
      id: 'demo-user-id',
      telegram_id: 123456789,
      username: 'demo_user',
      first_name: 'Demo',
      last_name: 'User',
      avatar_url: null,
      birthday: '1990-05-15',
      chat_id: 123456789,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    }

    setUser(demoUser)

    setFamilies([
      {
        id: 'demo-family-id',
        name: 'Demo family',
        created_by: 'demo-user-id',
        created_at: new Date().toISOString(),
        members: [
          {
            id: 'demo-member-id',
            family_id: 'demo-family-id',
            user_id: 'demo-user-id',
            role: 'admin',
            joined_at: new Date().toISOString(),
            user: demoUser,
          },
        ],
      },
    ])
  }, [setFamilies, setUser])

  const initializeApp = useCallback(async () => {
    setLoading(true)

    try {
      let tg: any = null
      let attempts = 0
      const maxAttempts = 10

      while (!tg && attempts < maxAttempts) {
        if (typeof window !== 'undefined') {
          tg = (window as any).Telegram?.WebApp
        }

        if (!tg) {
          await new Promise((resolve) => setTimeout(resolve, 100))
          attempts++
        }
      }

      if (tg) {
        tg.expand()
        if (tg.ready) tg.ready()

        const initData = tg.initData
        const tgUser = tg.initDataUnsafe?.user

        if (tgUser && initData) {
          const success = await authenticateWithTelegram(tgUser, initData)
          if (!success) {
            await initializeDemoMode()
          }
        } else {
          await initializeDemoMode()
        }
      } else {
        await initializeDemoMode()
      }
    } catch (error) {
      console.error('Error initializing app:', error)
      await initializeDemoMode()
    } finally {
      setLoading(false)
      setIsInitialized(true)
    }
  }, [setLoading, authenticateWithTelegram, initializeDemoMode])

  useEffect(() => {
    initializeApp()
  }, [initializeApp])

  useEffect(() => {
    const upcomingBirthdays = friends
      .filter((f) => f.birthday)
      .map((f) => ({
        id: f.id,
        first_name: f.first_name,
        last_name: f.last_name,
        avatar_url: f.avatar_url,
        birthday: f.birthday!,
        hasWishlist: true,
      }))
      .filter((f) => {
        const birthday = new Date(f.birthday)
        const today = new Date()

        birthday.setFullYear(today.getFullYear())
        if (birthday < today) birthday.setFullYear(today.getFullYear() + 1)

        const daysUntil = Math.ceil(
          (birthday.getTime() - today.getTime()) / (1000 * 60 * 60 * 24)
        )

        return daysUntil <= 30
      })
      .slice(0, 5)

    setBirthdayUsers(upcomingBirthdays)
  }, [friends])

  if (isLoading || !isInitialized) {
    return (
      <div className="app-background min-h-screen px-3 py-4 sm:py-6">
        <div className="app-shell items-center justify-center">
          <div className="glass-panel-strong rounded-[30px] px-8 py-10 flex flex-col items-center gap-4">
            <Loader2 className="w-10 h-10 text-burgundy animate-spin" />
            <p className="text-[hsl(var(--muted-foreground))]">Loading...</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="app-background min-h-screen px-3 py-4 sm:py-6">
      <div className="app-shell">
        <Header />

        {activeTab === 'tasks' && birthdayUsers.length > 0 && (
          <div className="px-4 pt-4">
            <BirthdayReminders users={birthdayUsers} />
          </div>
        )}

        <main className="flex-1 flex flex-col">
          {activeTab === 'tasks' && <TasksSection />}
          {activeTab === 'events' && <EventsSection />}
          {activeTab === 'wishlist' && <WishlistSection />}
          {activeTab === 'profile' && <ProfileSection />}
        </main>

        <TabBar />
      </div>
    </div>
  )
}
