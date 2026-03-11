"use client"

import * as React from "react"
import { cn } from "@/lib/utils"
import { Icon } from "@/components/ui/icon"
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { ContactForm } from "@/components/contact/ContactForm"
import { SEO_CONFIG } from "@/lib/seo-config"
import { track, trackExternalLink } from "@/lib/analytics"

export interface FooterProps extends React.HTMLAttributes<HTMLElement> {}

const Footer = React.forwardRef<HTMLElement, FooterProps>(
  ({ className, ...props }, ref) => {
    const [feedbackOpen, setFeedbackOpen] = React.useState(false)

    return (
      <>
        <ContactForm
          open={feedbackOpen}
          onOpenChange={setFeedbackOpen}
          mode="feedback"
          source="footer"
        />
        <div className="fixed bottom-4 right-4 z-50 flex flex-col gap-2 sm:hidden">
          <button
            type="button"
            onClick={() => setFeedbackOpen(true)}
            className="inline-flex items-center gap-2 rounded-full border border-sedona-500/30 bg-zeus-surface-elevated px-4 py-2 text-caption-m font-medium text-zeus-text-primary shadow-lg shadow-black/20"
          >
            <Icon icon="comment-dots" className="h-4 w-4 text-sedona-400" aria-hidden="true" />
            Feedback
          </button>
        </div>
      <footer
        ref={ref}
        className={cn(
          "fixed bottom-0 left-0 right-0 hidden sm:flex items-center justify-between px-6 py-3 bg-zeus-surface-elevated border-t border-zeus-border-alpha z-50",
          className
        )}
        {...props}
      >
        <div className="flex items-center gap-1">
          <span className="text-zeus-text-primary text-caption-m font-medium">
            Sedona
          </span>
          <Tooltip>
            <TooltipTrigger asChild>
              <a
                href={SEO_CONFIG.social.twitter}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => {
                  track("twitter_clicked", { source: "footer" })
                  trackExternalLink(SEO_CONFIG.social.twitter, "footer_twitter")
                }}
                className="inline-flex items-center gap-1.5 text-zeus-text-secondary hover:text-zeus-text-primary transition-colors text-caption-m ml-4"
              >
                <Icon icon={["fab", "x-twitter"]} className="w-3.5 h-3.5" aria-hidden="true" />
                Twitter
              </a>
            </TooltipTrigger>
            <TooltipContent>
              <p>Follow us on X (opens in new tab)</p>
            </TooltipContent>
          </Tooltip>
          <Tooltip>
            <TooltipTrigger asChild>
              <a
                href={SEO_CONFIG.social.discord}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => {
                  track("discord_clicked", { source: "footer" })
                  trackExternalLink(SEO_CONFIG.social.discord, "footer_discord")
                }}
                className="inline-flex items-center gap-1.5 text-zeus-text-secondary hover:text-zeus-text-primary transition-colors text-caption-m ml-4"
              >
                <Icon icon={["fab", "discord"]} className="w-3.5 h-3.5" aria-hidden="true" />
                Discord
              </a>
            </TooltipTrigger>
            <TooltipContent>
              <p>Join our Discord community (opens in new tab)</p>
            </TooltipContent>
          </Tooltip>
          <Tooltip>
            <TooltipTrigger asChild>
              <a
                href="https://docs.sedona.io/api"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => {
                  track("docs_clicked", { section: "footer_api" })
                  trackExternalLink("https://docs.sedona.io/api", "footer_api")
                }}
                className="inline-flex items-center gap-1.5 text-zeus-text-secondary hover:text-zeus-text-primary transition-colors text-caption-m ml-4"
              >
                <Icon icon="terminal" className="w-3.5 h-3.5" aria-hidden="true" />
                API
              </a>
            </TooltipTrigger>
            <TooltipContent>
              <p>API documentation (opens in new tab)</p>
            </TooltipContent>
          </Tooltip>
          <Tooltip>
            <TooltipTrigger asChild>
              <a
                href="https://docs.sedona.io/methodology"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => {
                  track("docs_clicked", { section: "footer_methodology" })
                  trackExternalLink("https://docs.sedona.io/methodology", "footer_methodology")
                }}
                className="text-zeus-text-secondary hover:text-zeus-text-primary transition-colors text-caption-m ml-4"
              >
                Methodology
              </a>
            </TooltipTrigger>
            <TooltipContent>
              <p>Evaluation methodology (opens in new tab)</p>
            </TooltipContent>
          </Tooltip>
          <Tooltip>
            <TooltipTrigger asChild>
              <button
                onClick={() => setFeedbackOpen(true)}
                className="inline-flex items-center gap-1.5 text-zeus-text-secondary hover:text-zeus-text-primary transition-colors text-caption-m ml-4"
              >
                <Icon icon="comment-dots" className="w-3.5 h-3.5" aria-hidden="true" />
                Feedback
              </button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Send product feedback</p>
            </TooltipContent>
          </Tooltip>
        </div>

        <span className="text-zeus-text-tertiary text-caption-s">
          Not affiliated with any third party
        </span>
      </footer>
      </>
    )
  }
)

Footer.displayName = "Footer"

export { Footer }
