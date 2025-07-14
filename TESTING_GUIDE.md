# Protected Routes - Testing Guide

## 🧪 How to Test Your Protected Route System

### **Step 1: Access the Testing Dashboard**
Visit: `http://localhost:3000/role-testing`

### **Step 2: Test Authentication Flow**

1. **No Token Test:**
   - Clear browser localStorage: `localStorage.clear()`
   - Try to access `/user-detail` → Should redirect to `/Auth/Login`

2. **Invalid Token Test:**
   - Set invalid token: `localStorage.setItem('auth_token', 'invalid-token')`
   - Try to access any protected route → Should redirect to `/Auth/Login`

### **Step 3: Test Role-Based Access**

1. **Admin Role:**
   ```javascript
   localStorage.setItem('auth_token', 'valid-token');
   localStorage.setItem('user_role', 'ADMIN');
   ```
   - Should access ALL routes including `/user-detail`

2. **SOP Manager Role:**
   ```javascript
   localStorage.setItem('user_role', 'SOP_MANAGER');
   ```
   - Should access `/user-detail` and other routes

3. **Vendor Role:**
   ```javascript
   localStorage.setItem('user_role', 'VENDOR');
   ```
   - Should NOT access `/user-detail` → Redirected to `/dashboard`

### **Step 4: Test Component-Level Protection**

Visit `/example-roles` and test with different roles:
- **ADMIN**: Sees all content
- **SOP_MANAGER**: Sees admin/manager content
- **VENDOR/MERCHANT**: Sees limited content
- **TECH/SAMPLING**: Sees technical content

## 🚨 Expected Behaviors

### **Authentication:**
- ✅ Valid token + Valid role = Access granted
- ❌ No token = Redirect to `/Auth/Login`
- ❌ Invalid token = Redirect to `/Auth/Login`
- ❌ Expired token = Redirect to `/Auth/Login`

### **Authorization:**
- ✅ ADMIN/SOP_MANAGER → Access to `/user-detail`
- ❌ OTHER ROLES → Redirect to `/dashboard`

### **UI Components:**
- Only show buttons/content for authorized roles
- Graceful fallbacks for unauthorized access

## 🐛 Common Issues & Fixes

### **Issue: Infinite redirect loop**
- **Cause**: Redirect path is also protected
- **Fix**: Ensure redirect paths are accessible to all authenticated users

### **Issue: Components not hiding**
- **Cause**: Role not properly cached
- **Fix**: Check localStorage for `user_role`

### **Issue: Token validation failing**
- **Cause**: Token format issues
- **Fix**: Ensure token is valid JWT format

## 📋 Test Checklist

- [ ] Public routes accessible without token
- [ ] Protected routes redirect to login without token
- [ ] User management restricted to ADMIN/SOP_MANAGER
- [ ] Other roles can access general features
- [ ] Component-level protection works
- [ ] Role switching updates UI immediately
- [ ] Invalid tokens are handled properly
- [ ] Expired tokens trigger re-authentication
