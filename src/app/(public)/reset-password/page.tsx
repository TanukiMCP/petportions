'use client'

import Link from 'next/link'
import React, { useEffect, useState } from 'react'

import Input from '@/components/form/input/InputField'
import Label from '@/components/form/Label'
import Button from '@/components/ui/button/Button'
import { ChevronLeftIcon } from '@/icons'

type Step = 'request' | 'sent'

export default function ResetPasswordPage() {
  const [step, setStep] = useState<Step>('request')
  const [email, setEmail] = useState('')
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    setError('')
  }, [email])

  const requestReset = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setIsLoading(true)

    try {
      if (!window.netlifyIdentity) {
        setError('Password reset is not available right now.')
        return
      }

      // Netlify Identity Widget supports recovery via the widget API.
      // requestPasswordRecovery(email) is available after the widget script loads.
      const identity: any = window.netlifyIdentity
      if (typeof identity.requestPasswordRecovery !== 'function') {
        setError('Password reset is not available right now.')
        return
      }

      await identity.requestPasswordRecovery(email)
      setStep('sent')
    } catch (err: any) {
      setError(err?.message || 'Could not send reset email.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="flex items-center justify-center w-full min-h-[calc(100vh-4rem)] py-12 px-4 sm:px-6 lg:px-8 bg-tertiary">
      <div className="w-full max-w-md">
        <div className="mb-6">
          <Link
            href="/login"
            className="inline-flex items-center text-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            <ChevronLeftIcon />
            Back to sign in
          </Link>
        </div>

        <div className="mb-8">
          <h1 className="mb-3 text-h1 font-bold text-primary dark:text-primary">Reset Password</h1>
          <p className="text-body-md text-secondary dark:text-secondary">
            Enter the email for your account and we’ll send you a password reset link.
          </p>
        </div>

        {step === 'sent' ? (
          <div className="space-y-5">
            <div className="p-3 text-sm text-secondary bg-primary/5 border border-primary/20 rounded-lg dark:bg-primary/10 dark:border-primary/25 dark:text-secondary">
              If an account exists for <span className="font-semibold">{email}</span>, a reset email has been sent.
            </div>
            <Link href="/login">
              <Button className="w-full py-3.5 text-body-md font-semibold">Return to sign in</Button>
            </Link>
          </div>
        ) : (
          <form onSubmit={requestReset}>
            <div className="space-y-5">
              {error && (
                <div className="p-3 text-sm text-destructive bg-destructive/10 border border-destructive/20 rounded-lg">
                  {error}
                </div>
              )}

              <div>
                <Label>
                  Email <span className="text-error-500">*</span>
                </Label>
                <Input
                  type="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  disabled={isLoading}
                />
              </div>

              <div>
                <Button type="submit" className="w-full py-3.5 text-body-md font-semibold" disabled={isLoading}>
                  {isLoading ? 'Sending…' : 'Send reset link'}
                </Button>
              </div>
            </div>
          </form>
        )}
      </div>
    </div>
  )
}
