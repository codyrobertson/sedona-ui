"use client"

import * as React from "react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Icon } from "@/components/ui/icon"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import {
  getStatusColor,
  getStatusLabel,
  formatDuration,
  formatTimeRemaining,
  GPU_PRICING,
  calculateCost,
} from "@/fixtures/gpu-instances"
import type { GPUInstance } from "@/types/gpu-instance"

export interface GPUInstanceCardProps {
  instance: GPUInstance
  onViewDetails: (instance: GPUInstance) => void
  onTerminate: (instanceId: string) => void
  isTerminating?: boolean
}

export function GPUInstanceCard({
  instance,
  onViewDetails,
  onTerminate,
  isTerminating = false,
}: GPUInstanceCardProps) {
  const pricing = GPU_PRICING[instance.tier]
  const currentCost = calculateCost(instance.startedAt, instance.tier)
  const displayCost = Math.max(instance.totalSpend, currentCost)

  const isActive = instance.status === "running" || instance.status === "provisioning"

  return (
    <div
      className={cn(
        "p-4 rounded-xl border transition-colors",
        instance.status === "terminated"
          ? "bg-zeus-surface-neutral/50 border-zeus-border-alpha/50 opacity-60"
          : "bg-zeus-surface-elevated border-zeus-border-alpha"
      )}
    >
      {/* Header Row */}
      <div className="flex items-start justify-between gap-3 mb-3">
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2">
            <h3 className="text-zeus-text-primary text-body-s font-semibold truncate">
              {instance.modelName}
            </h3>
            {instance.modelTicker && (
              <span className="text-zeus-text-tertiary text-caption-s">
                ${instance.modelTicker}
              </span>
            )}
          </div>
          <div className="flex items-center gap-2 mt-1">
            <span className={cn("text-caption-s font-medium", getStatusColor(instance.status))}>
              {getStatusLabel(instance.status)}
            </span>
            <span className="text-zeus-text-quaternary">•</span>
            <span className="text-zeus-text-tertiary text-caption-s">
              {pricing.name}
            </span>
          </div>
        </div>

        {/* Status Indicator */}
        <div className="flex items-center gap-1.5">
          {instance.status === "running" && (
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-zeus-status-success opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-zeus-status-success" />
            </span>
          )}
          {instance.status === "provisioning" && (
            <Icon icon="spinner" className="w-4 h-4 text-zeus-accent-blue animate-spin" />
          )}
          {instance.status === "terminating" && (
            <Icon icon="spinner" className="w-4 h-4 text-zeus-accent-orange animate-spin" />
          )}
        </div>
      </div>

      {/* Stats Row */}
      <div className="grid grid-cols-3 gap-3 mb-4">
        <div>
          <p className="text-zeus-text-tertiary text-caption-s">Uptime</p>
          <p className="text-zeus-text-primary text-caption-l font-medium">
            {formatDuration(instance.startedAt)}
          </p>
        </div>
        <div>
          <p className="text-zeus-text-tertiary text-caption-s">Cost</p>
          <p className="text-zeus-text-primary text-caption-l font-medium">
            ${displayCost.toFixed(2)}
          </p>
        </div>
        <div>
          <p className="text-zeus-text-tertiary text-caption-s">Payment</p>
          <p className="text-zeus-text-primary text-caption-l font-medium capitalize">
            {instance.paymentMethod}
          </p>
        </div>
      </div>

      {/* Time Remaining */}
      {instance.status === "running" && (
        <div className="flex items-center gap-1.5 mb-4 text-caption-s text-zeus-text-secondary">
          <Icon icon="clock" className="w-3.5 h-3.5" />
          {formatTimeRemaining(instance.expiresAt)}
        </div>
      )}

      {/* Actions */}
      {isActive && (
        <div className="flex items-center gap-2">
          <Button
            variant="secondary"
            size="sm"
            className="flex-1"
            onClick={() => onViewDetails(instance)}
          >
            <Icon icon="code" className="w-3.5 h-3.5 mr-1.5" />
            View Details
          </Button>

          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button
                variant="outline"
                size="sm"
                className="text-zeus-status-destructive border-zeus-status-destructive/30 hover:bg-zeus-status-destructive/10"
                disabled={isTerminating || instance.status !== "running"}
              >
                {isTerminating ? (
                  <Icon icon="spinner" className="w-3.5 h-3.5 animate-spin" />
                ) : (
                  <Icon icon="stop" className="w-3.5 h-3.5" />
                )}
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Terminate Instance?</AlertDialogTitle>
                <AlertDialogDescription>
                  This will immediately stop <span className="font-medium text-zeus-text-primary">{instance.modelName}</span>.
                  You will be charged for the time used (${displayCost.toFixed(2)}).
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction
                  onClick={() => onTerminate(instance.id)}
                  className="bg-zeus-status-destructive hover:bg-zeus-status-destructive/90"
                >
                  Terminate
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      )}
    </div>
  )
}

export default GPUInstanceCard
