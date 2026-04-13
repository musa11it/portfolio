# Portfolio Website Setup Guide

## ✅ Completed Features

Your portfolio website is now complete with:
- ✅ Professional design with hero section and profile image
- ✅ Full English and Kinyarwanda language switching
- ✅ All sections (About, Experience, Skills, Education, Languages)
- ✅ Fully detailed contact form
- ✅ Responsive design (mobile-friendly)
- ✅ Smooth animations and transitions

## 🔧 Contact Form Setup (Optional but Recommended)

The contact form currently shows success messages locally. To actually receive emails, follow these simple steps:

### Option 1: Using Formspree (Easiest - FREE)

1. Visit https://formspree.io
2. Sign up with your email (itangishatsemusa@gmail.com)
3. Create a new form
4. Copy the form endpoint ID
5. Open `script.js` and find this line (around line 100):
   ```javascript
   const response = await fetch('https://httpbin.org/post', {
   ```
6. Replace it with:
   ```javascript
   const response = await fetch('https://formspree.io/f/YOUR_FORM_ID', {
   ```
   (Replace `YOUR_FORM_ID` with the ID from Formspree)
7. Change `headers` section to:
   ```javascript
   headers: { 'Accept': 'application/json' }
   ```
8. Save and test the form!

### Option 2: Using EmailJS (Alternative)

1. Visit https://www.emailjs.com
2. Sign up free
3. Create an email service (Gmail works great)
4. Get your Service ID, Template ID, and Public Key
5. Add this to your HTML `<head>`:
   ```html
   <script type="text/javascript" src="https://cdn.jsdelivr.net/npm/@emailjs/browser@3/dist/index.min.js"></script>
   ```
6. Replace the form submission code in `script.js` with EmailJS logic

## 📱 Viewing Your Portfolio

1. **Local Testing**: Open `index.html` in your browser
2. **Online Testing**: Upload to any web hosting (GitHub Pages, Netlify, etc.)

## 🌐 Create Features

- **Language Switching**: Click EN/RW buttons in navbar - any language preference is saved
- **Smooth Scrolling**: All navigation links smoothly scroll to sections
- **Mobile Responsive**: Works perfectly on phones, tablets, and desktops
- **Dark Theme**: Modern, professional dark design with cyan accents
- **Profile Image**: Your photo displays beautifully in the hero section

## 📂 File Structure

```
my_portfolio/
├── index.html          # Main webpage
├── styles.css          # All styling
├── script.js           # Interactive features
├── me.jpeg             # Your profile photo
└── SETUP_GUIDE.md      # This file
```

## 🚀 Deploy Your Portfolio

### GitHub Pages (Free & Easy)
1. Create a GitHub account
2. Create a new repository named `<username>.github.io`
3. Upload these files to the repository
4. Visit `https://<username>.github.io` to see your portfolio live!

### Netlify (Free & Easy)
1. Visit https://netlify.com
2. Drag and drop your portfolio folder
3. Your site is live in seconds!

### Vercel (Free & Easy)
1. Visit https://vercel.com
2. Import your project/folder
3. Deploy with one click!

## ✨ Optional Enhancements

Consider adding:
- Project portfolio/case studies
- Blog section for articles
- Download CV button
- Social media links
- Dark/Light mode toggle
- Custom domain name

## 🎨 Customization Tips

- **Colors**: Edit CSS variables at the top of `styles.css` (lines 1-9)
- **Content**: Edit text directly in `index.html`
- **Fonts**: Change font-family in `styles.css`
- **Animations**: Modify animation timing in `styles.css`

## ❓ Troubleshooting

**Language not switching?**
- Clear browser cache (Ctrl+Shift+Delete)
- Check browser console for errors (F12)

**Form not working?**
- Check that all form fields are filled
- Verify email format (must have @ and domain)
- Check browser console for network errors

**Images not showing?**
- Verify `me.jpeg` is in the same folder as `index.html`
- Check file name capitalization (case-sensitive on web servers)

---

**Enjoy your professional portfolio! 🎉**

For support or questions about specific features, feel free to reach out!
