"use client"
import { createAuthClient } from "@/lib/supabase/auth-client"
import { useRouter } from "next/navigation"

export function LogoutButton() {
  const router = useRouter()
  const logout = async () => {
    const supabase = createAuthClient()
    await supabase.auth.signOut()
    router.push("/admin/login")
    router.refresh()
  }
  return (
    <button onClick={logout} style={{ padding: "8px 16px", background: "transparent", border: "1px solid #666", color: "#999", borderRadius: "6px", cursor: "pointer", fontSize: "14px" }}>
      Log out
    </button>
  )
}
