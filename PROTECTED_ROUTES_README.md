# Protected Route System Documentation

## Overview

This system provides role-based access control for your Next.js application with the following roles:

- **VENDOR**
- **MERCHANT**
- **SOP_MANAGER**
- **ADMIN**
- **TECH**
- **SAMPLING**

## Features

✅ **Route-level protection** - Entire pages restricted by role  
✅ **Component-level protection** - UI elements hidden/shown by role  
✅ **User Management restriction** - Only Admin and SOP Manager access  
✅ **Flexible role system** - Easy to add new roles and permissions  
✅ **Type safety** - Full TypeScript support  
✅ **Automatic redirects** - Unauthorized users redirected appropriately

## Files Structure

```
lib/
├── types/roles.ts              # Role definitions and route permissions
├── utils/role-utils.ts         # Role checking utilities
└── hooks/useRole.ts           # React hook for role management

components/
└── Protected_Route/
    ├── Protected_Route.tsx     # Main route protection component
    ├── RoleGuard.tsx          # Component-level role protection
    └── index.ts               # Exports
```

## Configuration

### 1. Role Definitions (`lib/types/roles.ts`)

```typescript
export type UserRole =
  | "VENDOR"
  | "MERCHANT"
  | "SOP_MANAGER"
  | "ADMIN"
  | "TECH"
  | "SAMPLING";

// Define which routes require specific roles
export const ROUTE_PERMISSIONS: RoutePermission[] = [
  {
    path: "/user-detail", // User management page
    allowedRoles: ["ADMIN", "SOP_MANAGER"], // Only these roles can access
    redirectTo: "/dashboard", // Where to redirect unauthorized users
  },
  // Add more restricted routes here
];

// Public routes (no authentication required)
export const PUBLIC_ROUTES = [
  "/",
  "/Auth/Login",
  "/Auth/first_time_login",
  // Add more public routes
];
```

### 2. Integration in Layout

The `ClientLayout` automatically handles route protection:

```tsx
// components/core/ClientLayout.tsx
{
  isPublicRoute ? (
    // Public routes don't need protection
    <div className="min-h-screen bg-gray-100">{children}</div>
  ) : (
    // Protected routes
    <ProtectedRoute>{/* Your app layout */}</ProtectedRoute>
  );
}
```

## Usage Examples

### 1. Component-Level Protection

```tsx
import { RoleGuard } from "@/components/Protected_Route";

const MyComponent = () => {
  return (
    <div>
      {/* Visible to everyone */}
      <h1>Public Content</h1>

      {/* Only Admin and SOP Manager can see this */}
      <RoleGuard allowedRoles={["ADMIN", "SOP_MANAGER"]}>
        <button>Delete User</button>
        <button>Edit Permissions</button>
      </RoleGuard>

      {/* Only Admin can see this */}
      <RoleGuard allowedRoles={["ADMIN"]}>
        <button>System Settings</button>
      </RoleGuard>

      {/* With fallback message */}
      <RoleGuard
        allowedRoles={["TECH", "SAMPLING"]}
        showFallback={true}
        fallback={<p>Access restricted to technical staff</p>}
      >
        <div>Technical content here</div>
      </RoleGuard>
    </div>
  );
};
```

### 2. Using the Role Hook

```tsx
import { useRole } from "@/hooks/useRole";

const Dashboard = () => {
  const { userRole, isAdmin, isSopManager, isAdminOrSopManager, hasRole } =
    useRole();

  return (
    <div>
      <h1>Welcome {userRole}!</h1>

      {isAdmin && <AdminPanel />}
      {isSopManager && <ManagerPanel />}
      {hasRole(["TECH", "SAMPLING"]) && <TechnicalPanel />}
    </div>
  );
};
```

### 3. Navigation with Role-Based Items

```tsx
import { RoleGuard } from "@/components/Protected_Route";

const Navigation = () => {
  return (
    <nav>
      <Link href="/dashboard">Dashboard</Link>
      <Link href="/reports">Reports</Link>

      {/* Only show to Admin and SOP Manager */}
      <RoleGuard allowedRoles={["ADMIN", "SOP_MANAGER"]}>
        <Link href="/user-detail">User Management</Link>
      </RoleGuard>

      {/* Only show to Admin */}
      <RoleGuard allowedRoles={["ADMIN"]}>
        <Link href="/system-settings">System Settings</Link>
      </RoleGuard>
    </nav>
  );
};
```

### 4. Conditional User Actions

```tsx
const UserCard = ({ user }) => {
  return (
    <div className="user-card">
      <h3>{user.name}</h3>
      <p>{user.email}</p>

      <div className="actions">
        {/* Everyone can view */}
        <button>View Profile</button>

        {/* Only Admin and SOP Manager can edit */}
        <RoleGuard allowedRoles={["ADMIN", "SOP_MANAGER"]}>
          <button>Edit User</button>
        </RoleGuard>

        {/* Only Admin can delete */}
        <RoleGuard allowedRoles={["ADMIN"]}>
          <button className="danger">Delete User</button>
        </RoleGuard>
      </div>
    </div>
  );
};
```

## How It Works

### 1. Route Protection Flow

1. User navigates to a page
2. `ProtectedRoute` checks if user is authenticated
3. If not authenticated → redirect to `/Auth/Login`
4. If authenticated → check role permissions for current route
5. If no permission → redirect to fallback page (usually `/dashboard`)
6. If has permission → render the page

### 2. Role Storage

User roles are stored in `localStorage` as `user_role` after login:

```typescript
// In your login mutation
localStorage.setItem("user_role", "ADMIN"); // or any role
```

### 3. Permission Checking

The system checks permissions hierarchically:

```
1. Is route public? → Allow access
2. Is user authenticated? → If not, redirect to login
3. Does route have role restrictions? → If not, allow access
4. Does user have required role? → If yes, allow access
5. Otherwise → Redirect to fallback page
```

## Adding New Roles

1. **Add to type definition:**

```typescript
// lib/types/roles.ts
export type UserRole =
  | "VENDOR"
  | "MERCHANT"
  | "SOP_MANAGER"
  | "ADMIN"
  | "TECH"
  | "SAMPLING"
  | "NEW_ROLE";
```

2. **Add route permissions if needed:**

```typescript
export const ROUTE_PERMISSIONS: RoutePermission[] = [
  {
    path: "/new-feature",
    allowedRoles: ["NEW_ROLE", "ADMIN"],
    redirectTo: "/dashboard",
  },
];
```

3. **Use in components:**

```tsx
<RoleGuard allowedRoles={["NEW_ROLE"]}>
  <NewFeatureComponent />
</RoleGuard>
```

## Security Notes

⚠️ **Important:** This is client-side protection only. Always validate permissions on your backend/API as well.

✅ **Best Practices:**

- Always verify roles on the server-side
- Use HTTPS in production
- Implement proper token validation
- Add rate limiting to authentication endpoints

## Testing

You can test different roles by changing the `user_role` in localStorage:

```javascript
// In browser console
localStorage.setItem("user_role", "ADMIN"); // Test admin access
localStorage.setItem("user_role", "VENDOR"); // Test vendor access
window.location.reload(); // Refresh to see changes
```

## Example Page

Visit `/example-roles` to see a demonstration of different role-based content sections.

## Current Access Control

- **User Management** (`/user-detail`) - Only `ADMIN` and `SOP_MANAGER`
- **All other pages** - Available to all authenticated users
- **Public pages** - Available to everyone (login, forgot password, etc.)
