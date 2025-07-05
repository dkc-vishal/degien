- All new users can only be created by Admin ✅

- First original and 1 Repeat is displayed on the webpage. When user hit "Create Repeat", then a backend call executes and create a empty cells for rows and columns which will be returned back with websocket. In frontend we statically display original & repeat labels by giving a static columns space. 

- Print view (Merchant, Feeding Sampling)

- import style from sampling  

- create new style ✅ 

- Users List -> All users -> Add new User  Name. ✅ 

- Mark user as inactive. Trash icon ✅  

- Sampling -> Protected Route only DKC people will see it. , Production -> Sabko in DKC

- Sampling mai folder jaisa dikhega jisme style ka naam aayega. On the top there will be a button called Create new style.  ✅ 

- Inside style. Sampling Watchpoints ki sheet hogi. 

- Order received. 


Production: 

- Style -> Master -> Order -> Create New order / 110 -> each order will then have all the folders.  ✅

- Pending of ()

- sidebar (sampling styles, production styles, user management, dashboard, shipped styles) ✅

- dashboard (no of running orders -> card: number ; no of running styles ; pendings -> according to shipment x-date; shipped style )

- text wrapping in style name 

- order qty large ✅

- 5 layout cards ✅

- order qty in tabular structure ✅

- information easy to view - large ✅

- vendors (master - production_watchpoints, tech_specs -> file), quantity 

- qa audit analysis (initial-2, mid-8) ✅

- user management (radio button -> DKC Employee, Vendor). If click DKC, then show department (by default hidden) and if click vendor then direct create account button  ✅

- classic polo shirt / ${name}  ✅ 

http://localhost:3000/production-styles/classic-polo-shirt/master

- master , orders and then ns blake thermal, naval ✅ 

- Master (production watchpoint, tech spec, sampling watchpoint ) - total styles quantity ✅

- Orders (NS Black thermal, Naval) - order quantity ✅

- API Docs 

- a page where user can request for changing the password, the page should ask for user email, new password, confirm new password, and then on clicking submit user gets an otp on his/her email .. also will get email-token from the backend  ✅

http://localhost:3000/production-styles/classic-polo-shirt

- master -> sampling watchpoint (graded-out to show not editable), tech graded specs, production watchpoint ✅

- Sampling (Sampling watchpoint) ; Master-110 (110) ; Tech Graded Spec (Tech spec view, graded spec, print) ; Fit/PP (Fit 1, fit 2, fit 3, pp1-2, web 1-12) , QA Audit forms (mid1-3, inital, initial follow up, final1-3) ; QA Audit Analysis (callouts, qa audit form, inspection point print) ✅ 

- Page for vendor will be different (they will be able to see their styles only)

- sampling (list , styles -> watchpoints)

- user management (update, delete button working, working), also admin can change the department of user ✅

- reset password ✅ 

- Individual page for user as well with dynamic routing (should be able to update his name only) ✅ 

- Sampling styles (all styles same as production styles except order and qty) ✅

- Sampling styles -> Sampling Watchpoint, Master-110, Tech Graded Spec, Fit/PP/Top/Web, QA Audit forms, QA Audit Analysis ✅ 

- http://localhost:3000/production-styles/denim-jacket/ns-blake-thermal (Empty folder - should be light red) ✅ 

- Production Styles / Classic Polo Shirt / Ns Blake Thermal / Master-110 -> Floor tag  ✅ 

- Production Styles / Classic Polo Shirt / Ns Blake Thermal / QA Audit Forms initial folder ✅ 

Production Styles / Classic Polo Shirt / Ns Blake Thermal / QA Audit Analysis no callouts , qa spec audit form, qa inspection point audit form 



#### FP One Testing 

- Change Password not working (When a user is created from 'Staff User Management', the user gets an email containing the details, and a 'Change Password' button, the button do redirects to a new page, but the page isn't opening..likely the page wasn't developed)

- On Click of 'Reset Password', the user does't gets any modal/pop-up  

- "Reset Password" button not working (The user gets an email upon clicking 'Reset Password', the button just like 'Change Password' button redirects to another URL, but the URL doesn't has anything to offer to user)

- User has been deleted, but still when we try to create an User account with the same email, it's not getting created and getting message "User with this email already exists, Kindly ask them to Login. Or Reset Password if they forgot.". User has been cleared from frontend, but might be possible not been cleared from database. 

- ADD NEW STYLE -> Click to select an image (only WEBP image showing up, not all ) , duplicate images are also being added 

- Apparel Category Management 

- MSR Season name disappeared after update (MSR Category and Years Management)

- Home -> Category -> Dress (After Enable Drag and Drop, when we place the image somewhere else then on submit, the image goes back to its previous position, doesn't resides at its new position)

- Duplicate images being uploaded (Add New Style)

- Only image with extension 'jpg' is being uploaded (Website Cover Photo)


### Vishal 110 Testing

1. Column header flowing outside of its boundary (when shrinked to smallest) - should be wrapped inward instead (good to have )

        - Measurement type 
        - Measurement Picture 
        - Fit changed measurement 
        - PP Changed Measurement 
        - Top Changed measurement 
        - Top Changed Grading Rule 
        - Real time measurement 
        - Helper Column For Measurement (not being displayed correctly)

2. Inputs are being replicated 

        - Fit Grading Rule, Real Time Grading
        - Fit Changed Measurement, Real Time measurement
        - MSR Grading Rule, Real time grading rule 
        - MSR Measurement, Real time measurement 
        - PP Changed measurement, Real Time Measurement 
        - PP Changed Grading Rule, Real Time Grading Rule 
        - Top Changed Measurement, Real Time Measurement

3. Not being able to input 

        - XS, S, M, L, XL (only 0 is being added, for any keystroke, its adding 0)
        
        - If we try to input in a particular column (Say XS), it adds a default value 0 and that too in all the columns (XS, S, M, L, XL)


5. Ctrl Z not working (When we use options like Insert Column Left, then on Ctrl Z it should undo, which means remove the newly added column at the left, but it's not doing so) - Ctrl Z only working for data, and not on the structure of table 

6. Print button not working 

- cell -> background color from backend 



- Sonu NM 11, sonu.mahto@dkcexports.co.in , txnVJfzLQx

- Sonu NM, sonumn@gmail.com , JxoD1UDdxc

- Golu Don, golu.don@gmail.com, PzAGcgoDOF

- Sonu N Mahto, sonu.mahto+1@dkcexport.co.in , pd5IhkafEx , 1234