// app/Auth/Verify-OTP/page.tsx
import { Suspense } from "react";
import VerifyOtpClient from "./VerifyOtpClient"; // ⬅️ Direct import (NOT dynamic)

export default function Page() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <VerifyOtpClient />
    </Suspense>
  );
}
