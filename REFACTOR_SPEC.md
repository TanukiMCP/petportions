# Public Pages UI Refactor - Technical Specification

## Problem Analysis
Current state: All public pages (`/about`, `/resources`, `/how-it-works`, `/faq`, `/contact`, `/privacy`, `/terms`, `/cookies`) are static server components with:
- ❌ No animations or motion
- ❌ No interactive hover effects beyond basic CSS
- ❌ Empty, sparse layouts
- ❌ No visual interest or dynamic elements
- ❌ Static cards that feel lifeless

Landing page has:
- ✅ framer-motion animations throughout
- ✅ Staggered entrance animations
- ✅ Scroll-triggered animations (whileInView)
- ✅ Interactive hover states with scale/transform
- ✅ Rich visual mockups and illustrations
- ✅ Alternating section backgrounds
- ✅ Gradient accents and decorative elements

## Animation Patterns from Landing Page

### 1. **Hero Section Animations** (`HeroWithProductMockup.tsx`)
```typescript
// Staggered entrance with delays
initial={{ opacity: 0, y: 20 }}
animate={{ opacity: 1, y: 0 }}
transition={{ duration: 0.6, delay: 0.1 }}

// Pattern: Each element has increasing delay (0.1, 0.2, 0.3, etc.)
```

### 2. **Section Header Animations** (`FeaturesSection.tsx`, `HowItWorksSection.tsx`)
```typescript
// Title animation
const titleVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5 }
  }
};

// Usage
<motion.div
  variants={titleVariants}
  initial="hidden"
  whileInView="visible"
  viewport={{ once: true }}
>
```

### 3. **Card Grid Stagger Animations** (`FeaturesSection.tsx`)
```typescript
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1  // Each child delays by 0.1s
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5 }
  }
};

<motion.div variants={containerVariants} initial="hidden" whileInView="visible">
  {items.map(item => (
    <motion.div key={item.id} variants={itemVariants}>
      {/* Card content */}
    </motion.div>
  ))}
</motion.div>
```

### 4. **Alternating Layout Animations** (`HowItWorksSection.tsx`)
```typescript
// Different animations for left/right alternating sections
{steps.map((step, index) => {
  const isEven = index % 2 === 0;
  return (
    <motion.div
      variants={itemVariants}
      className={`flex ${isEven ? 'md:flex-row' : 'md:flex-row-reverse'}`}
    >
      {/* Content */}
    </motion.div>
  );
})}
```

### 5. **Interactive Hover States** (`FeatureCardSimple.tsx`)
```typescript
// Card hover effects
className="hover:border-primary hover:shadow-xl transition-all duration-300 group"

// Icon scale on hover
className="group-hover:scale-110 transition-transform"

// Card lift on hover
className="group-hover:-translate-y-1 transition-transform"
```

## Visual Interest Patterns

### 1. **Gradient Backgrounds**
```typescript
// Mockup backgrounds in HowItWorksSection
mockupBg: "bg-gradient-to-br from-purple-100 to-purple-50 dark:from-purple-950/30 dark:to-purple-900/20"

// Accent boxes in BasicSection
className="bg-gradient-to-br from-primary/5 to-primary/10 dark:from-primary/10 dark:to-primary/20"
```

### 2. **Alternating Section Backgrounds**
```typescript
// Pattern from landing page
<section className="bg-white dark:bg-gray-900">
<section className="bg-tertiary dark:bg-gray-800">
<section className="bg-white dark:bg-gray-900">
```

### 3. **Rich Content Elements**
- Interactive mockups with detailed UI elements
- Step numbers in colored circles
- Icon combinations (number + icon)
- Decorative pulsing dots on badges
- Multiple CTAs with different styles

## Technical Requirements for Each Page

### **All Pages Must Have:**
1. ✅ Convert to `"use client"` component
2. ✅ Import `motion` from `framer-motion`
3. ✅ Hero section with staggered entrance animations
4. ✅ Section headers with `whileInView` animations
5. ✅ Card grids with stagger animations
6. ✅ Interactive hover states on all cards/links
7. ✅ Alternating section backgrounds
8. ✅ Visual interest elements (gradients, decorative elements)

### **Page-Specific Requirements**

#### `/about` Page
- **Hero**: Staggered animations for badge → title → description → CTAs
- **Tools Section**: 3-column grid with stagger animation (0.1s delay per card)
- **Privacy Section**: 3-column grid with stagger animation
- **Disclaimer**: Fade-in animation with slight scale effect
- **Add**: Gradient accent boxes, decorative elements
- **Hover**: Card lift (-translate-y-1), icon scale (110%), border color change

#### `/how-it-works` Page
- **Hero**: Staggered entrance
- **Tool Details**: 2-column grid with stagger animation
- **Add**: Visual mockups or illustrations for each tool (like HowItWorksSection)
- **Add**: Alternating left/right layout for visual interest
- **Add**: Gradient backgrounds on cards
- **Hover**: Card scale (102%), shadow increase

#### `/resources` Page
- **Hero**: Staggered entrance
- **Resources Grid**: 2-column grid with stagger animation
- **Add**: Category badges with colors
- **Add**: Preview images or icons for each resource
- **Hover**: Card lift, icon rotation or scale

#### `/faq` Page
- **Hero**: Staggered entrance
- **FAQ Grid**: 2-column grid with stagger animation
- **Add**: Expandable/collapsible FAQ items with animation
- **Add**: Category grouping with visual separators
- **Hover**: Card highlight, icon color change

#### `/contact` Page
- **Hero**: Staggered entrance
- **Contact Card**: Scale-in animation with bounce effect
- **Add**: Multiple contact methods with icons
- **Add**: Social links with hover animations
- **Hover**: Icon scale, button pulse

#### Legal Pages (`/privacy`, `/terms`, `/cookies`)
- **Hero**: Staggered entrance
- **Content Grid**: 3-column grid with stagger animation
- **Add**: Visual hierarchy with numbered sections
- **Add**: Gradient accent boxes for important info
- **Hover**: Card highlight, subtle scale

## Animation Timing Standards
- **Entrance duration**: 0.5-0.6s
- **Stagger delay**: 0.1s per child
- **Hero element delays**: 0.1s increments (badge: 0s, title: 0.1s, desc: 0.2s, CTAs: 0.3s)
- **Hover transitions**: 0.3s (transition-all duration-300)
- **Viewport trigger**: `viewport={{ once: true }}` (animate only once on scroll)

## Implementation Pattern

```typescript
"use client";

import { motion } from "framer-motion";
// ... other imports

export default function PageName() {
  // Define animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 }
    }
  };

  return (
    <div className="min-h-screen">
      {/* Hero with staggered entrance */}
      <section className="...">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          {/* Badge */}
        </motion.div>
        
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          {/* Title */}
        </motion.h1>
        
        {/* ... more elements with increasing delays */}
      </section>

      {/* Content section with grid */}
      <section className="...">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          {/* Section header */}
        </motion.div>

        <motion.div
          className="grid ..."
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {items.map(item => (
            <motion.div key={item.id} variants={itemVariants}>
              <Card className="hover:border-primary hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group">
                {/* Card content with hover effects */}
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </section>
    </div>
  );
}
```

## Acceptance Criteria

### Visual Quality
- [ ] All pages have smooth entrance animations
- [ ] Card grids have staggered animations (visible cascade effect)
- [ ] Hover states are interactive and responsive
- [ ] Alternating section backgrounds create visual rhythm
- [ ] Gradient accents add depth and interest
- [ ] No empty or sparse feeling - content feels rich and engaging

### Technical Quality
- [ ] All pages are client components with framer-motion
- [ ] No TypeScript errors
- [ ] No console errors in browser
- [ ] Animations perform smoothly (60fps)
- [ ] Responsive on mobile (animations work on all screen sizes)

### User Experience
- [ ] Animations feel natural, not jarring
- [ ] Hover states provide clear feedback
- [ ] Page doesn't feel static or boring
- [ ] Visual hierarchy guides the eye
- [ ] Matches the professional quality of the landing page

## Verification Process
1. Take BEFORE screenshot of each page
2. Implement changes
3. Take AFTER screenshot
4. Compare side-by-side
5. Test hover interactions
6. Test scroll animations
7. Test on mobile viewport
8. Verify no console errors
9. Run TypeScript check
10. Run build check

## Notes
- Use `viewport={{ once: true }}` to prevent re-triggering on scroll
- Keep animation durations consistent with landing page (0.5-0.6s)
- Use `whileInView` for scroll-triggered animations
- Use `initial/animate` for immediate entrance animations
- Group related animations with variants for cleaner code
- Always wrap animated elements in `motion.div` or `motion.section`
