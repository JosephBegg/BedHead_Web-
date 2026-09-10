# Selfie Alarm App — Product Context

*Last updated: September 2026*

This document captures the app concept, feature set, and free/premium split as brainstormed to date. Intended as a working reference for product, design, and development decisions.

---

## 1. Core Concept

An alarm app where the **only way to dismiss the alarm is by taking a selfie**. This creates a built-in proof-of-wake mechanic and a naturally shareable content loop (selfies can be shared out, watermarked with the app's logo).

**Core loop:** Set alarm → alarm fires → user takes selfie to dismiss → selfie saved to gallery → optionally shared (with watermark) → streak/stats update.

The selfie-and-streak mechanic is the product's main differentiator and its main growth channel (via shares) — feature decisions below try to protect both.

---

## 2. Free Tier

| Feature | Detail |
|---|---|
| Alarm slots | Max 5 alarms at a time (one-off, not recurring — must be manually reset/re-set each time) |
| Alarm sound | 1 default sound only |
| Photo gallery | Full history visible, but photos older than 7 days are **blurred/locked** (not deleted or hidden) — teases premium value |
| Streak restore | 1 free grace restore per month, then locked until premium/IAP |
| Sharing | Unlimited, with full logo watermark — this is the growth engine, stays free |
| Snoozes | Limited (e.g. 3 per alarm) |
| Ads | Banner or rewarded interstitial (e.g. shown after dismissal or in gallery) |
| Achievements/badges | Included — cheap to provide, drives retention |
| Verification | Basic selfie-to-dismiss only |

## 3. Premium Tier

| Feature | Detail |
|---|---|
| Alarm slots | Unlimited |
| Alarm sound | Full sound library |
| Recurring schedules | Set-and-forget weekday/custom-day schedules (no manual daily reset) |
| Photo gallery | Full unlocked history, unblurred |
| Cloud backup | Photos/streak data backed up off-device |
| Streak restore | 3 free restores, then 99p per additional restore |
| Streak freeze | Pause a streak (e.g. travel/vacation mode) without breaking it |
| Watermark | Reduced/subtler logo (see open question below — full removal not recommended by default) |
| Snoozes | Unlimited or custom-configurable |
| Ads | Removed |
| Wake-up time-lapse | Auto-generated monthly/yearly video compiled from selfie history |
| Stats dashboard | Average wake time, consistency score, longest streak, etc. |
| Filters/frames/stickers | Cosmetic packs for selfies (could also be standalone IAP) |
| Wake buddy | Pair with a friend/partner who's notified if alarm isn't dismissed in time |
| Hardcore mode | Extra verification: specific object/room in frame, math problem, location-gated dismissal |
| Friend groups | Accountability circles — see friends' streaks, react to selfies; free tier capped at small group size |
| Leaderboards | Compare streaks/wake times among friends |

---

## 4. Monetization Model — Open Decision

Two structural options, not mutually exclusive:

- **Subscription** — fits ongoing-cost features: cloud backup, sound library, wake buddy, ads removal, gallery unlock.
- **One-time unlock** — could suit alarm-count/gallery-history limits if you want a simpler "pay once, own it" paywall for less engaged users.
- **Microtransactions (IAP)** — streak restores (99p each after allowance) work as one-offs regardless of the above; cosmetic packs (filters/frames) also suit this.

**Decision needed:** subscription-first (recurring revenue, higher LTV per engaged user) vs. one-time unlock (simpler, may convert more casual users) vs. hybrid (subscription for ongoing features + à la carte IAP for restores/cosmetics). Hybrid is the most common pattern for apps with both retention features and streak mechanics.

---

## 5. Open Questions / Things to Pressure-Test

1. **Watermark removal** — full removal on premium is a common pattern (CapCut, InShot) but trades away your best organic acquisition channel. Consider keeping *some* branding even on premium (smaller/corner logo) rather than an option to remove entirely.
2. **Streak-restore aggressiveness** — Duolingo's gem economy is the model here, but it's drawn real criticism for feeling punitive. For a morning/wake-up app tied to people's jobs, the free monthly grace restore is there to blunt this — worth user-testing tone/framing carefully.
3. **Alarm-count cap (5) vs. recurring-schedule gating** — worth validating which is the actual friction point. Many users stack multiple alarms minutes apart as backups; capping count may frustrate rather than convert. Recurring schedules may be the stronger premium lever.
4. **Ads placement** — needs UX testing so it doesn't undercut the "wake up and get on with your day" moment (e.g. avoid ads immediately on dismissal if it delays the user).

---

## 6. Backlog / Ideas Not Yet Tiered

Ideas surfaced but not yet assigned to free/premium — revisit once core tiers are validated:

- Volume ramp / gentle-wake / custom vibration patterns
- Additional hardcore-mode variants (object recognition, multi-step verification)
- Expanded cosmetic packs (seasonal filters, frames) as standalone IAP
- Group leaderboard variants (weekly, monthly, friends-only, global)
- Achievement/badge expansion tied to milestones (30-day streak, 100-day streak, etc.)

---

## 7. Rationale Notes (for future reference)

- The selfie-sharing loop is the app's primary growth mechanism — any premium gating should avoid throttling sharing itself (volume of shares, not just watermark presence, matters for acquisition).
- Blurring/locking old photos (rather than hiding them outright) is a stronger conversion nudge than hard-hiding, since it visibly signals what premium unlocks.
- Recurring revenue features (backup, sounds, wake buddy) vs. one-time-purchase features (alarm cap, gallery unlock) may end up split across subscription and one-time unlock — see Section 4.

---

*This is a living document — update as features are validated, cut, or reprioritized during development.*
