"use client"

import * as React from "react"
import { useRouter } from "next/navigation"
import {
  Header,
  PlatformStats,
} from "@/components/trading"
import { Button } from "@/components/ui/button"
import { Icon } from "@/components/ui/icon"
import { Switch } from "@/components/ui/switch"
import { useAgentLaunch, useProfile } from "@/contexts"
import { AGENTS, formatMarketCap, MY_WALLET } from "@/fixtures"
import { getFieldError } from "@/lib/profile-validation"
import type { SocialPlatform } from "@/types/profile"

// Build marquee pools from unified agents
const MARQUEE_POOLS = AGENTS.slice(0, 20).map((agent) => ({
  name: agent.name,
  ticker: agent.ticker,
  price: `$${(agent.price_usd ?? 0).toFixed(4)}`,
  change: agent.price_change_percent_in_24_hours,
  volume: formatMarketCap(agent.volume_24h_usd ?? 0),
  marketCap: formatMarketCap(agent.market_cap_usd_latest),
}))

// Social link configuration for rendering
const SOCIAL_CONFIG = [
  { id: "twitter" as SocialPlatform, name: "Twitter / X", icon: "x-twitter", placeholder: "@username" },
  { id: "discord" as SocialPlatform, name: "Discord", icon: "discord", placeholder: "username#0000" },
  { id: "telegram" as SocialPlatform, name: "Telegram", icon: "telegram", placeholder: "@username" },
  { id: "github" as SocialPlatform, name: "GitHub", icon: "github", placeholder: "username" },
]

// =============================================================================
// COMPONENT
// =============================================================================

export default function ProfileClient() {
  const router = useRouter()
  const { openCreateAgent, isHFAuthenticated, hfUsername, signOutHF } = useAgentLaunch()
  const {
    profile,
    isLoading,
    isSaving,
    error,
    validationErrors,
    loadProfile,
    saveProfile,
    getFormData,
    clearErrors,
  } = useProfile()

  // Hydration-safe state for auth
  const [mounted, setMounted] = React.useState(false)

  // Local form state (synced from context)
  const [displayName, setDisplayName] = React.useState("")
  const [email, setEmail] = React.useState("")
  const [bio, setBio] = React.useState("")
  const [socials, setSocials] = React.useState({
    twitter: "",
    discord: "",
    telegram: "",
    github: "",
  })
  const [preferences, setPreferences] = React.useState({
    emailNotifications: true,
    agentAlerts: true,
    weeklyDigest: true,
    marketingEmails: false,
  })

  // Track if we've loaded initial data
  const [initialLoadDone, setInitialLoadDone] = React.useState(false)

  // Mount effect
  React.useEffect(() => {
    setMounted(true)
  }, [])

  // Load profile on mount
  React.useEffect(() => {
    if (mounted && !initialLoadDone) {
      loadProfile(MY_WALLET)
      setInitialLoadDone(true)
    }
  }, [mounted, initialLoadDone, loadProfile])

  // Sync form state when profile loads
  React.useEffect(() => {
    if (!isLoading && initialLoadDone) {
      const formData = getFormData()
      setDisplayName(formData.displayName)
      setEmail(formData.email)
      setBio(formData.bio)
      setSocials({
        twitter: formData.socials.twitter ?? "",
        discord: formData.socials.discord ?? "",
        telegram: formData.socials.telegram ?? "",
        github: formData.socials.github ?? "",
      })
      setPreferences(formData.preferences)
    }
  }, [isLoading, initialLoadDone, getFormData])

  const updateSocial = (id: SocialPlatform, value: string) => {
    setSocials(prev => ({ ...prev, [id]: value }))
    clearErrors()
  }

  const updatePreference = (key: keyof typeof preferences, value: boolean) => {
    setPreferences(prev => ({ ...prev, [key]: value }))
  }

  const handleSave = async () => {
    const success = await saveProfile({
      displayName,
      email,
      bio,
      socials,
      preferences,
    })

    if (success) {
      // Could show toast here
    }
  }

  const handleCancel = () => {
    // Reset form to saved values
    const formData = getFormData()
    setDisplayName(formData.displayName)
    setEmail(formData.email)
    setBio(formData.bio)
    setSocials({
      twitter: formData.socials.twitter ?? "",
      discord: formData.socials.discord ?? "",
      telegram: formData.socials.telegram ?? "",
      github: formData.socials.github ?? "",
    })
    setPreferences(formData.preferences)
    clearErrors()
    router.back()
  }

  const handleDisconnect = () => {
    router.push("/trading")
  }

  // Helper to get field error
  const fieldError = (field: string) => getFieldError(validationErrors, field)

  return (
    <div className="min-h-screen bg-zeus-surface-default">
      <Header
        isAuthenticated={true}
        walletAddress="J181...U7Wi"
        balance="0.00 SOL"
        onCreateCoin={openCreateAgent}
        onDisconnect={handleDisconnect}
        onProfile={() => router.push("/trading/profile")}
      />

      <main>
        <h1 className="sr-only">My Profile</h1>

        {/* Platform Stats */}
        <section aria-label="Platform Statistics">
          <PlatformStats endsIn="0m 0s" jackpot="$201" tokens={AGENTS.length} topPools={MARQUEE_POOLS} />
        </section>

        {/* Profile Content */}
        <section className="px-3 sm:px-6 pt-4 pb-20" aria-label="Profile Settings">
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-0 mb-4 sm:mb-6">
            <h2 className="text-body-l sm:text-heading-md font-bold text-zeus-text-primary">
              Profile Settings
            </h2>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" onClick={handleCancel}>
                Cancel
              </Button>
              <Button
                variant="brand"
                size="sm"
                onClick={handleSave}
                disabled={isSaving || isLoading}
              >
                {isSaving ? "Saving..." : "Save Changes"}
              </Button>
            </div>
          </div>

          {/* Error Banner */}
          {error && (
            <div className="mb-4 p-3 bg-zeus-status-error/10 border border-zeus-status-error/20 rounded-lg">
              <p className="text-body-s text-zeus-status-error">{error}</p>
            </div>
          )}

          {isLoading ? (
            <div className="flex items-center justify-center py-12">
              <div className="animate-spin w-8 h-8 border-2 border-zeus-text-tertiary border-t-sedona-500 rounded-full" />
            </div>
          ) : (
            <div className="space-y-4">
              {/* Basic Info */}
              <div className="rounded-xl overflow-hidden">
                <div className="px-4 py-2.5 bg-zeus-surface-elevated border border-zeus-border-alpha border-b-0 rounded-t-xl">
                  <span className="text-body-m font-bold text-zeus-text-primary">Basic Information</span>
                </div>
                <div className="bg-zeus-surface-elevated border border-zeus-border-alpha border-t-0 rounded-b-xl p-4 space-y-4">
                  <div>
                    <label className="block text-caption-s text-zeus-text-secondary mb-1.5">
                      Display Name
                    </label>
                    <input
                      type="text"
                      value={displayName}
                      onChange={(e) => { setDisplayName(e.target.value); clearErrors() }}
                      placeholder="How you want to be known"
                      className="w-full bg-zeus-surface-default border border-zeus-border-alpha rounded-lg px-3 py-2 text-body-s text-zeus-text-primary placeholder:text-zeus-text-tertiary focus:outline-none focus:border-sedona-500/50"
                    />
                    {fieldError("displayName") && (
                      <p className="mt-1 text-caption-s text-zeus-status-error">{fieldError("displayName")}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-caption-s text-zeus-text-secondary mb-1.5">
                      Email Address
                    </label>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => { setEmail(e.target.value); clearErrors() }}
                      placeholder="your@email.com"
                      className="w-full bg-zeus-surface-default border border-zeus-border-alpha rounded-lg px-3 py-2 text-body-s text-zeus-text-primary placeholder:text-zeus-text-tertiary focus:outline-none focus:border-sedona-500/50"
                    />
                    {fieldError("email") && (
                      <p className="mt-1 text-caption-s text-zeus-status-error">{fieldError("email")}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-caption-s text-zeus-text-secondary mb-1.5">
                      Bio
                    </label>
                    <textarea
                      value={bio}
                      onChange={(e) => { setBio(e.target.value); clearErrors() }}
                      placeholder="Tell us about yourself..."
                      rows={3}
                      className="w-full bg-zeus-surface-default border border-zeus-border-alpha rounded-lg px-3 py-2 text-body-s text-zeus-text-primary placeholder:text-zeus-text-tertiary focus:outline-none focus:border-sedona-500/50 resize-none"
                    />
                    {fieldError("bio") && (
                      <p className="mt-1 text-caption-s text-zeus-status-error">{fieldError("bio")}</p>
                    )}
                  </div>
                </div>
              </div>

              {/* Connections */}
              <div className="rounded-xl overflow-hidden">
                <div className="px-4 py-2.5 bg-zeus-surface-elevated border border-zeus-border-alpha border-b-0 rounded-t-xl">
                  <span className="text-body-m font-bold text-zeus-text-primary">Connections</span>
                </div>
                <div className="bg-zeus-surface-elevated border border-zeus-border-alpha border-t-0 rounded-b-xl p-4">
                  <div className="flex items-center justify-between p-3 bg-zeus-surface-default rounded-lg border border-zeus-border-alpha">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-zeus-surface-elevated flex items-center justify-center">
                        <span className="text-lg">🤗</span>
                      </div>
                      <div>
                        <p className="text-body-s font-medium text-zeus-text-primary">
                          Hugging Face
                        </p>
                        {mounted ? (
                          isHFAuthenticated && hfUsername ? (
                            <p className="text-caption-s text-zeus-text-tertiary">
                              Connected as {hfUsername}
                            </p>
                          ) : (
                            <p className="text-caption-s text-zeus-text-tertiary">
                              Not connected
                            </p>
                          )
                        ) : (
                          <p className="text-caption-s text-zeus-text-tertiary">
                            Loading...
                          </p>
                        )}
                      </div>
                    </div>

                    {mounted && (
                      isHFAuthenticated ? (
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={signOutHF}
                          className="text-zeus-status-error hover:text-zeus-status-error hover:bg-zeus-status-error/10"
                        >
                          Disconnect
                        </Button>
                      ) : (
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={openCreateAgent}
                        >
                          Connect
                        </Button>
                      )
                    )}
                  </div>
                </div>
              </div>

              {/* Social Links */}
              <div className="rounded-xl overflow-hidden">
                <div className="px-4 py-2.5 bg-zeus-surface-elevated border border-zeus-border-alpha border-b-0 rounded-t-xl">
                  <span className="text-body-m font-bold text-zeus-text-primary">Social Links</span>
                </div>
                <div className="bg-zeus-surface-elevated border border-zeus-border-alpha border-t-0 rounded-b-xl p-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {SOCIAL_CONFIG.map((social) => (
                      <div key={social.id}>
                        <div className="relative">
                          <Icon
                            icon={["fab", social.icon] as any}
                            className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zeus-text-tertiary"
                          />
                          <input
                            type="text"
                            value={socials[social.id]}
                            onChange={(e) => updateSocial(social.id, e.target.value)}
                            placeholder={social.placeholder}
                            className="w-full bg-zeus-surface-default border border-zeus-border-alpha rounded-lg pl-10 pr-3 py-2 text-body-s text-zeus-text-primary placeholder:text-zeus-text-tertiary focus:outline-none focus:border-sedona-500/50"
                          />
                        </div>
                        {fieldError(social.id) && (
                          <p className="mt-1 text-caption-s text-zeus-status-error">{fieldError(social.id)}</p>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Communication Preferences */}
              <div className="rounded-xl overflow-hidden">
                <div className="px-4 py-2.5 bg-zeus-surface-elevated border border-zeus-border-alpha border-b-0 rounded-t-xl">
                  <span className="text-body-m font-bold text-zeus-text-primary">Communication Preferences</span>
                </div>
                <div className="bg-zeus-surface-elevated border border-zeus-border-alpha border-t-0 rounded-b-xl p-4 space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-body-s font-medium text-zeus-text-primary">
                        Email Notifications
                      </p>
                      <p className="text-caption-s text-zeus-text-tertiary">
                        Receive important updates about your account
                      </p>
                    </div>
                    <Switch
                      checked={preferences.emailNotifications}
                      onCheckedChange={(checked) => updatePreference("emailNotifications", checked)}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-body-s font-medium text-zeus-text-primary">
                        Agent Alerts
                      </p>
                      <p className="text-caption-s text-zeus-text-tertiary">
                        Get notified about your agent&apos;s performance
                      </p>
                    </div>
                    <Switch
                      checked={preferences.agentAlerts}
                      onCheckedChange={(checked) => updatePreference("agentAlerts", checked)}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-body-s font-medium text-zeus-text-primary">
                        Weekly Digest
                      </p>
                      <p className="text-caption-s text-zeus-text-tertiary">
                        Summary of platform activity and top agents
                      </p>
                    </div>
                    <Switch
                      checked={preferences.weeklyDigest}
                      onCheckedChange={(checked) => updatePreference("weeklyDigest", checked)}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-body-s font-medium text-zeus-text-primary">
                        Marketing Emails
                      </p>
                      <p className="text-caption-s text-zeus-text-tertiary">
                        News, announcements, and promotional content
                      </p>
                    </div>
                    <Switch
                      checked={preferences.marketingEmails}
                      onCheckedChange={(checked) => updatePreference("marketingEmails", checked)}
                    />
                  </div>
                </div>
              </div>
            </div>
          )}
        </section>
      </main>
    </div>
  )
}
