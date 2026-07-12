"use client"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { createAuthClient } from "@/lib/supabase/auth-client"

const ADMIN_EMAIL = "guptarupali@gmail.com"

function maskEmail(email: string) {
  const [user, domain] = email.split("@")
  const maskedUser = user.slice(0, 1) + "*".repeat(Math.max(user.length - 1, 4))
  const maskedDomain = "*".repeat(Math.max(domain.split(".")[0].length, 4)) + "." + domain.split(".").slice(1).join(".")
  return maskedUser + "@" + maskedDomain
}

export default function AdminLogin() {
  const router = useRouter()
  const supabase = createAuthClient()
  const [code, setCode] = useState("")
  const [step, setStep] = useState<"start" | "code">("start")
  const [msg, setMsg] = useState("")
  const [loading, setLoading] = useState(false)

  const sendCode = async () => {
    setLoading(true); setMsg("")
    const { error } = await supabase.auth.signInWithOtp({ email: ADMIN_EMAIL, options: { shouldCreateUser: false } })
    setLoading(false)
    if (error) { setMsg(error.message); return }
    setStep("code")
    setMsg("Code sent to your email (expires in 5 minutes).")
  }

  const verify = async () => {
    setLoading(true); setMsg("")
    const { error } = await supabase.auth.verifyOtp({ email: ADMIN_EMAIL, token: code.trim(), type: "email" })
    setLoading(false)
    if (error) { setMsg(error.message); return }
    router.push("/admin")
    router.refresh()
  }

  const input = { padding: "12px", background: "#1a1a1a", border: "1px solid #333", color: "#fff", borderRadius: "6px", width: "100%", fontSize: "15px" }
  const btn = { padding: "12px", background: "#C9A24B", color: "#000", border: "none", borderRadius: "6px", fontWeight: "bold" as const, cursor: "pointer", width: "100%", fontSize: "15px" }

  return (
    <div style={{ minHeight: "70vh", display: "flex", alignItems: "center", justifyContent: "center", padding: "40px" }}>
      <div style={{ width: "100%", maxWidth: "380px" }}>
        <h1 style={{ marginBottom: "8px" }}>Admin Login</h1>
        <p style={{ color: "#999", marginBottom: "8px", fontSize: "14px" }}>A one-time code will be sent to:</p>
        <p style={{ color: "#C9A24B", marginBottom: "24px", fontSize: "15px", fontWeight: "bold" }}>{maskEmail(ADMIN_EMAIL)}</p>
        <div style={{ display: "grid", gap: "14px" }}>
          {step === "start" ? (
            <button onClick={sendCode} disabled={loading} style={btn}>{loading ? "Sending..." : "Send code to my email"}</button>
          ) : (
            <>
              <input type="text" inputMode="numeric" placeholder="Enter 6-digit code" value={code} onChange={(e) => setCode(e.target.value)} style={input} />
              <button onClick={verify} disabled={loading} style={btn}>{loading ? "Verifying..." : "Verify and sign in"}</button>
              <button onClick={() => { setStep("start"); setMsg(""); setCode("") }} style={{ background: "transparent", border: "none", color: "#999", cursor: "pointer", fontSize: "13px" }}>Resend code</button>
            </>
          )}
          {msg && <p style={{ color: msg.includes("sent") ? "#51cf66" : "#ff6b6b", fontSize: "14px" }}>{msg}</p>}
        </div>
      </div>
    </div>
  )
}
