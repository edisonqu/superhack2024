"use client";

// for Next.js app router
import { IDKitWidget, ISuccessResult, VerificationLevel } from "@worldcoin/idkit";
import { NextPage } from "next";

const handleVerify = async (proof: ISuccessResult) => {
  try {
    const res = await fetch("/api/verify", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(proof),
    });

    if (!res.ok) {
      const errorData = await res.json();
      throw new Error(errorData.error || "Verification failed");
    }

    const data = await res.json();
    console.log("Verification response:", data);
  } catch (error) {
    console.error("Verification error:", error);
    throw new Error("Verification failed"); // IDKit will display this error message
  }
};

const onSuccess = () => {
  // This is where you should perform any actions after the modal is closed
  // Such as redirecting the user to a new page
  window.location.href = "/success";
};

const Verify: NextPage = () => {
  console.log("env", process.env.NEXT_PUBLIC_APP_ID, process.env.NEXT_PUBLIC_ACTION_ID);
  return (
    <IDKitWidget
      app_id={process.env.NEXT_PUBLIC_APP_ID!} // Note the change here
      action={process.env.NEXT_PUBLIC_ACTION_ID!}
      onSuccess={onSuccess}
      handleVerify={handleVerify}
      verification_level={VerificationLevel.Orb}
    >
      {({ open }: { open: () => void }) => <button onClick={open}>Verify with World ID</button>}
    </IDKitWidget>
  );
};

export default Verify;
