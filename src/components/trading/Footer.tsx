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

export interface FooterProps extends React.HTMLAttributes<HTMLElement> {}

const Footer = React.forwardRef<HTMLElement, FooterProps>(
  ({ className, ...props }, ref) => {
    const [contactOpen, setContactOpen] = React.useState(false)

    return (
      <>
        <ContactForm open={contactOpen} onOpenChange={setContactOpen} />
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
                onClick={() => setContactOpen(true)}
                className="inline-flex items-center gap-1.5 text-zeus-text-secondary hover:text-zeus-text-primary transition-colors text-caption-m ml-4"
              >
                <Icon icon="envelope" className="w-3.5 h-3.5" aria-hidden="true" />
                Contact
              </button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Get in touch with us</p>
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
