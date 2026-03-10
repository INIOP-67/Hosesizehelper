Create a **modern SaaS-style responsive web application UI** for a smart utility tool called

สายยางกี่หุนดี
(Hose Size Helper)

The app helps homeowners determine the correct garden hose size based on the outer diameter of their faucet.

The design should feel like a modern startup product similar to Stripe, Linear, Notion, or Vercel dashboards.

Focus on a clean, premium UI with smooth animations, strong hierarchy, and excellent mobile usability.

---

DESIGN STYLE

Modern SaaS UI
Minimalist but colorful
Glassmorphism + soft shadows
Rounded UI elements (16px–20px radius)
Soft gradients and smooth transitions

Color palette:

Primary
Emerald Green #10B981

Accent
Sky Blue #38BDF8

Background
Soft white #F9FAFB

Cards
White with subtle shadow

Typography

Headings
Inter / Plus Jakarta Sans

Body text
Inter Regular

Large friendly typography with strong hierarchy.

---

GLOBAL UX PRINCIPLES

Mobile-first design
Fast and simple interaction
Clear visual feedback
Friendly tool-like experience

Every action must feel smooth and intuitive.

Include:

micro animations
hover states
active states
smooth transitions

---

APP STRUCTURE

Landing Hero
Interactive Calculator Tool
Recommendation Results
Usage Suggestions
Search Keyword Generator
Measurement History
Footer

---

HERO SECTION

Full width hero section.

Large title:

สายยางกี่หุนดี

Subtitle:

วัดขนาดก๊อกน้ำ แล้วระบบจะแนะนำขนาดสายยางที่ควรซื้อ

Add a friendly illustration of:

a faucet connecting to a garden hose.

CTA Button:

เริ่มวัดขนาด

When clicked → smooth scroll to calculator.

Background decoration:

soft gradient blobs and subtle grid pattern.

---

INTERACTIVE CALCULATOR CARD

Place a centered card component.

Title:

วัดขนาดก๊อกน้ำ

Card should look like a modern SaaS widget.

Include:

Unit selector

cm
mm
inch

Segmented control UI.

Selected unit highlighted with gradient background.

---

MEASUREMENT INPUT

Input label:

เส้นผ่านศูนย์กลางด้านนอกของก๊อก

Large numeric input field.

Example placeholder:

1.65

Unit label displayed next to input.

Add button:

วิเคราะห์ขนาดสายยาง

Button style:

Large gradient button
rounded
hover animation
soft shadow

---

USAGE TYPE SELECTOR

Below input show usage options as selectable cards.

Options:

รดน้ำต้นไม้
ล้างรถ
งานบ้านทั่วไป
งานช่าง / แรงดันสูง

Each card includes:

icon
label
hover effect
selection highlight

---

HOSE SIZE DATABASE

Use standard hose sizes:

3 หุน = 3/8 inch = 9.5 mm = 0.95 cm
4 หุน = 1/2 inch = 12.7 mm = 1.27 cm
5 หุน = 5/8 inch = 15.8 mm = 1.58 cm
6 หุน = 3/4 inch = 19.0 mm = 1.90 cm
8 หุน = 1 inch = 25.4 mm = 2.54 cm

The system must detect the closest size.

---

RESULT DISPLAY

After calculation show animated result cards.

Card title:

ขนาดสายยางที่เหมาะสม

Display sizes:

5 หุน
5/8 inch
15.8 mm
1.58 cm

The user-selected unit should be visually emphasized.

Use a modern card layout.

---

FIT ANALYSIS

Display status badge:

Perfect Fit
Slightly Loose
Loose

Color codes:

Green → perfect
Yellow → slightly loose
Red → loose

Add small explanation text.

---

HOSE CLAMP RECOMMENDATION

If the hose is loose, show another card:

คำแนะนำเข็มขัดรัดสาย

Clamp sizes:

1/2 hose → clamp 12–20 mm
5/8 hose → clamp 16–25 mm
3/4 hose → clamp 18–30 mm
1 inch hose → clamp 25–40 mm

Include a small illustration of a hose clamp.

---

HOSE TYPE SUGGESTION

Based on usage selection show recommendation:

Garden watering → lightweight PVC hose
Car washing → durable 5/8 hose
Household cleaning → multipurpose hose
Heavy duty → reinforced hose

Show as card with icon and description.

---

SEARCH KEYWORD GENERATOR

Generate shopping keywords automatically.

Example:

สายยาง 5 หุน
สายยาง 5/8 นิ้ว
garden hose 5/8
สายยางรดน้ำ 5/8

Add buttons:

Copy Keywords
Search on Shopee

Shopee link format:

https://shopee.co.th/search?keyword=สายยาง%205/8

Buttons must have hover animation.

---

MEASUREMENT HISTORY

Create a clean table card.

Columns:

Date
Measured Size
Unit
Recommended Hose
Fit Result

Add:

Clear History button

History stored locally and ready for Firebase integration.

---

FIREBASE READY STRUCTURE

Prepare a configuration module.

firebaseConfig.ts

Include placeholders for:

API_KEY
AUTH_DOMAIN
PROJECT_ID
STORAGE_BUCKET
MESSAGING_SENDER_ID
APP_ID

Data model for Firestore collection:

measurements

Fields:

diameter
unit
hose_inch
hose_hun
fit_result
clamp_size
usage
timestamp

---

COMPONENT STRUCTURE

Use modular components.

HeroSection
CalculatorCard
UnitSelector
MeasurementInput
UsageSelector
ResultCard
FitBadge
ClampSuggestion
KeywordGenerator
HistoryTable

---

TECH STACK

Next.js
React
TypeScript
Tailwind CSS

Responsive layout.

Animations with Framer Motion.

---

INTERACTION DESIGN

Use smooth transitions.

Input updates results dynamically.

Cards fade-in when results appear.

Hover effects on buttons and cards.

---

FINAL GOAL

Generate a beautiful modern SaaS-style web interface that looks like a real startup product.

The UI should be highly polished, responsive, interactive, and ready to be implemented as a production web application deployable on Vercel.
