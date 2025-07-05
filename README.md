This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

https://chatgpt.com/c/684f064c-2f78-8010-b455-e5f20c1a0958
Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

add qa in input

110 -> as it is here -> original extract using filter -> create sheet mid1 -> filtered for mid 1 only -> format copied mid 1

add border in 110 feeding window

add the funcnality to fogzee mutiple column

action

every one can upload image
tech spec must be filled by the tech team
watch must be added by the merchant
fit pp top web report must be added by the tech team
intial file data red data must be cumpolsy to add
merchant can only create order
shipment complted will done by tech team
vendor can only view the spec and alll sheet
tech graded must be added by tech team
no one can edit the view file

ctrl b , ctrl i, ctrl u not working for formatting not needed

even after dropping image, placeholder text showing 'drop or paste image' (needed this kind of feature, it's not bug it's feature)

resize row (good to have)
multiple line edit ( good to have)

ctrl shift down arrow + ctrl d not working (good to have)

after dropping image, image not getting removed on backspace button click (image delete feature, required) ( 45min) (done)

auto fill not working (1 -> 1, 1, 1 || 1, 2 -> 3, 4, 5 || formula adjusting) (not needed) ( need merchant confirmation) (done)

shift > button (right, bottom, top) to multi select horizontal cells (same as line 78) (1hr) (remove)

ctrl z ctrl y not working (2hr) (done)

insert row above, insert row below modal/pop-up/dialog not coming in any cell of measurement picture (30min) (done)

insert row above dialog not disappearingn (bug, needs fix) (20min) (done)

column is value is copy paste at the time of drag not working (84) (done)

if freeze a column that other some column is hide (1.5hr) (done)

_! HUGE ISSUE IN COPY PASTE, NOT SMOOTH_! very imp (2hr) (done)

scrolling feature is not run properly (good to have) (45min)

column width is not in resize correct colimn j (good to have) (30min) (done)

first column may write karte time if scroll hai that time text sahi nhi dikhta hai (crucial) (45min)

drag and iscon is not write choice (99)

reduce the image height of the column on image delete (done)

chat gpt

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
https://chatgpt.com/share/68628966-8cb0-8011-8514-b70acdf8f0c1
