# JWT Auth - Designer/Developer Quick Reference

## 🎨 Quick Start Guide

### Colors
```css
Primary:     #2563eb  (Blue - main brand)
Dark Blue:   #1e40af  (Hover state)
Darker Blue: #1e3a8a  (Active state)
Success:     #10b981  (Green - valid)
Warning:     #f59e0b  (Amber - caution)
Error:       #ef4444  (Red - error)
White:       #ffffff  (Cards/forms)
Dark Text:   #1e293b  (Body text)
Muted Text:  #94a3b8  (Secondary)
Background:  #0f172a  (Dark gradient bg)
```

### Fonts
```css
Font:       -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Helvetica Neue'
H1:         3rem, weight 900
H2:         1.8rem, weight 800  
Body:       1rem, weight 500
Small:      0.88rem, weight 600
```

---

## 🧩 Common Components

### Buttons

**Primary (Dark)**
```html
<button type="submit" class="btn btn-dark">Sign In</button>
```
- Blue gradient background
- Full width on mobile
- Hover: Lift effect + darker gradient

**Secondary (Light)**
```html
<a class="btn btn-light" href="/register">Get Started</a>
```
- White background + blue border
- Hover: Fills with blue gradient

### Form Group

```html
<div class="form-group">
  <label for="email" class="form-label">Email Address</label>
  <div class="form-group-wrapper">
    <i class="fas fa-envelope form-group-icon"></i>
    <input 
      type="email" 
      id="email"
      class="form-control" 
      name="email"
      placeholder="your.email@example.com"
    >
  </div>
  <!-- Optional helper text -->
  <small class="helper-text success">
    <i class="fas fa-check-circle"></i> Valid email
  </small>
</div>
```

**Key Points:**
- Always use semantic labels
- Icons go in `.form-group-icon` (inside wrapper)
- Use helper text for feedback
- Include autocomplete attributes

### Cards

```html
<div class="card">
  <div class="card-header">
    <h1>Welcome Back</h1>
    <p>Subheading text here</p>
  </div>
  <div class="card-body">
    <!-- Form or content -->
  </div>
</div>
```

### Helper Text Styles

```html
<!-- Success -->
<small class="helper-text success">
  <i class="fas fa-check-circle"></i> All good!
</small>

<!-- Error -->
<small class="helper-text error">
  <i class="fas fa-exclamation-circle"></i> Invalid format
</small>

<!-- Info -->
<small class="helper-text text-muted">
  <i class="fas fa-info-circle"></i> Help message
</small>
```

### Password Strength Meter

```html
<div class="password-strength show">
  <div class="password-strength-meter good"></div>
</div>
<div class="password-strength-text good">✓ Strong password</div>
```

**Classes:** `weak`, `fair`, `good`

---

## 🎬 Animations

### Available Animation Classes

```css
slideInUp        /* Entrance animation */
slideInLeft      /* From left */
slideInRight     /* From right */
fadeIn           /* Fade in */
spin             /* Loading spinner */
pulse            /* Pulsing effect */
```

### Usage

```css
/* In CSS */
animation: slideInUp 0.8s cubic-bezier(0.34, 1.56, 0.64, 1) 0.3s backwards;

/* In HTML with utility class */
<div class="loading">
  <i class="fas fa-spinner"></i>
</div>
```

---

## 📱 Responsive Breakpoints

```css
Desktop:  1200px+  (Full design)
Tablet:   481-768px  (Optimized layout)
Mobile:   <480px   (Compact, touch-optimized)
```

### Mobile-First Utilities

```css
/* Hide on mobile, show on desktop */
@media (max-width: 480px) {
  .hide-mobile { display: none; }
}

/* Show on mobile, hide on desktop */
@media (min-width: 768px) {
  .show-desktop { display: none; }
}
```

---

## 🔒 Form Validation Examples

### Email Validation
```javascript
const isValidEmail = (email) => {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
};
```

### Password Strength Check
```javascript
function checkPasswordStrength(password) {
  let strength = 0;
  if (password.length >= 8) strength++;
  if (/[A-Z]/.test(password)) strength++;
  if (/\d/.test(password)) strength++;
  if (/[a-z]/.test(password)) strength++;
  if (/[!@#$%^&*]/.test(password)) strength++;
  
  return strength <= 2 ? 'weak' : strength <= 3 ? 'fair' : 'good';
}
```

### Show Helper Text
```javascript
// Show success
document.getElementById('emailHelper').style.display = 'flex';

// Show error
document.getElementById('emailError').style.display = 'flex';

// Hidden by default
```

---

## 🎨 Customization

### Change Primary Color

Find and replace in `styles.css`:
```css
#2563eb  → Your color (primary)
#1e40af  → Your color (dark 20%)
#1e3a8a  → Your color (dark 40%)
```

### Change Font Family

```css
body {
  font-family: 'Your Font', -apple-system, ...;
}
```

### Adjust Spacing

Base unit is 8px. Common values:
```css
12px  → 1.5 units
16px  → 2 units
20px  → 2.5 units
24px  → 3 units
28px  → 3.5 units
32px  → 4 units
```

---

## ⚠️ Common Mistakes

### Don't
```html
<!-- ❌ Missing label -->
<input type="email" class="form-control">

<!-- ❌ Wrong button class -->
<button class="btn">Sign In</button>

<!-- ❌ Missing icon wrapper -->
<i class="form-group-icon"></i>
<input class="form-control">

<!-- ❌ Hardcoded spacing -->
<div style="margin: 35px;">
```

### Do
```html
<!-- ✅ Proper label association -->
<label for="email">Email</label>
<input type="email" id="email" class="form-control">

<!-- ✅ Use proper button class -->
<button class="btn btn-dark">Sign In</button>

<!-- ✅ Wrap icon properly -->
<div class="form-group-wrapper">
  <i class="fas fa-envelope form-group-icon"></i>
  <input class="form-control">
</div>

<!-- ✅ Use class-based spacing -->
<div class="form-group">
```

---

## 🧪 Testing Checklist

```
Device Tests:
  □ Desktop (1920x1080)
  □ Tablet (768x1024)
  □ Mobile (375x667)

Browser Tests:
  □ Chrome/Edge latest
  □ Firefox latest
  □ Safari latest
  □ Mobile Safari
  □ Chrome Mobile

Accessibility:
  □ Tab navigation works
  □ Focus indicators visible
  □ Color contrast sufficient
  □ No color-only info
  □ Keyboard-only navigation

Forms:
  □ Validation works
  □ Helper text displays
  □ Errors clear on fix
  □ Submit button disables
  □ Loading spinner shows

Animations:
  □ Smooth 60fps
  □ No flashing
  □ Respects prefers-reduced-motion
  □ Completes properly
```

---

## 🚀 Performance Tips

### Do
```css
/* Good: Uses GPU acceleration */
transform: translateY(-3px);
opacity: 0.5;

/* Good: Uses CSS transitions */
transition: all 0.3s ease;

/* Good: Minimal selectors */
.btn-dark { ... }
```

### Don't
```css
/* Bad: CPU intensive */
animation: top 0.3s ease, left 0.3s ease;

/* Bad: Too specific */
body > div > form > input.form-control { ... }

/* Bad: Excessive shadows */
box-shadow: 0 0 100px rgba(0,0,0,0.5) !important;
```

---

## 🔗 Icon Reference

**Common Icons**
```
Envelope:    fas fa-envelope
Lock:        fas fa-lock
Lock Open:   fas fa-lock-open
Key:         fas fa-key
Eye:         fas fa-eye
Check:       fas fa-check-circle
Error:       fas fa-exclamation-circle
Info:        fas fa-info-circle
Spinner:     fas fa-spinner
Heart:       fas fa-heart
Shield:      fas fa-shield-alt
Secret:      fas fa-secret
```

**Usage**
```html
<i class="fas fa-envelope"></i>
<i class="fas fa-spinner loading"></i> <!-- Loading animation -->
```

---

## 📚 File Structure

```
JWT_Auth/
├── public/
│   └── css/
│       └── styles.css          ← Main stylesheet (700+ lines)
├── views/
│   ├── partials/
│   │   ├── header.ejs          ← Meta tags, CDNs
│   │   └── footer.ejs          ← Footer, scripts
│   ├── home.ejs                ← Landing page
│   ├── login.ejs               ← Login form
│   ├── register.ejs            ← Register form with strength meter
│   └── secrets.ejs             ← Secret display
├── DESIGN_GUIDE.md             ← Comprehensive design system
├── CHANGELOG.md                ← What changed
└── QUICK_REFERENCE.md          ← This file
```

---

## 🎓 Learning Resources

**Design**
- [Material Design 3](https://m3.material.io)
- [Tailwind CSS](https://tailwindcss.com)
- [CSS-Tricks](https://css-tricks.com)

**Accessibility**
- [WCAG 2.1](https://www.w3.org/WAI/WCAG21/quickref)
- [WebAIM](https://webaim.org)

**Web Standards**
- [MDN Web Docs](https://developer.mozilla.org)
- [Web.dev](https://web.dev)

---

## 💡 Pro Tips

1. **Use CSS Variables** for consistency
   ```css
   --primary: #2563eb;
   color: var(--primary);
   ```

2. **Always test on real devices**, not just browser emulation

3. **Check contrast** with tools like WebAIM
   ```
   Text: 4.5:1 minimum
   Large text: 3:1 minimum
   ```

4. **Use semantic HTML** - it improves accessibility automatically

5. **Mobile-first approach** - start with mobile styles, then add desktop

6. **Performance audits** - use Lighthouse in DevTools

---

## 🆘 Troubleshooting

### Buttons not styling
- Check for correct class: `btn btn-dark` or `btn btn-light`
- Verify CSS file is linked in header
- Clear browser cache

### Form icons not showing
- FontAwesome CDN link in header
- Icon class format: `fas fa-icon-name`
- Check console for 404 errors

### Animations not smooth
- Use `transform` and `opacity` (GPU accelerated)
- Avoid animating `width`, `height`, `top`, `left`
- Check for prefers-reduced-motion

### Mobile layout broken
- Verify viewport meta tag in header
- Check responsive breakpoints
- Test with real device, not emulation

### Colors look different
- Check browser color profile
- Verify hex codes are exact
- Test contrast with WebAIM

---

## 📞 Quick Links

- **Design System**: See `DESIGN_GUIDE.md`
- **Changes Log**: See `CHANGELOG.md`
- **CSS Reference**: See `/public/css/styles.css`
- **Template Reference**: See `/views/`

---

**Version**: 2.0  
**Last Updated**: March 14, 2024  
**Status**: Active ✅

Keep this guide handy for quick reference!
