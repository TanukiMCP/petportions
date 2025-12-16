'use client'

import Script from 'next/script'
import { useEffect } from 'react'

export default function NetlifyIdentityScript() {
  useEffect(() => {
    let cancelled = false

    const init = () => {
      if (cancelled) return
      if (typeof window !== 'undefined' && window.netlifyIdentity) {
        window.netlifyIdentity.init()
        return
      }
      setTimeout(init, 50)
    }

    init()

    return () => {
      cancelled = true
    }
  }, [])

  return (
    <Script
      src="https://identity.netlify.com/v1/netlify-identity-widget.js"
      strategy="afterInteractive"
    />
  )
}
