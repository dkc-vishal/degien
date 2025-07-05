#### GET logged-in User Profile -> (MyProfilePage.tsx)

- id 
- Employee Name
- Email 
- Department 

#### UPDATE Profile Info -> (UpdateProfileInfo.tsx)

- Employee Name (updated name)

#### CHANGE Password -> (ChangePasswordModal.tsx)

- "oldPassword" : "current_password"
- "newPassword" : "new_password"
- confirmPassword : "new_password"

#### User Management 

1. GET all users -> return list of active users 

    - id 
    - Employee name 
    - email 
    - department 

2. GET inactive users -> return list of inactive users 

    - id
    - Employee name 
    - email 
    - department 

3. ADD user (POST)

    - employee name 
    - email 
    - department 

4. UPDATE user 

    - "employee name" : "Updated Name"  
    - "email" : "new@gmail.com" 
    - department : "IT"

5. Mark User as Inactive (PUT)

    - /users/:id/deactivate 

6. RESET Password (PUT)

    - /users/:id/reset-password 

    - reset password link 

#### GET all styles ->  (SamplingStyles.tsx)

- styleName
- image (implemented somewhere else)

#### ADD new style -> (AddStyleModal.tsx)

- styleName