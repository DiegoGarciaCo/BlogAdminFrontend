// components/SignOutButton.tsx
"use client";

export default function SignOutButton() {
  const handleSignOut = async () => {
    try {
      const res = await fetch("https://soldbyghost.com/api/auth/logout", {
        method: "POST",
        credentials: "include",
      });

      if (res.ok) {
        window.location.replace("/login");
      } else {
        console.error("Logout failed:", res.status);
      }
    } catch (error) {
      console.error("Error during logout:", error);
    }
  };

  return (
    <button
      onClick={handleSignOut}
      className="text-brand-secondary hover:text-brand-accent transition-colors cursor-pointer"
    >
      Sign Out
    </button>
  );
}
