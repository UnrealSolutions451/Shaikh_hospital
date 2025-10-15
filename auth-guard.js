import { auth, db } from "./firebase-config.js";
import { onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-auth.js";
import { doc, getDoc } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-firestore.js";

function authGuard() {
  onAuthStateChanged(auth, async (user) => {
    if (!user) {
      console.warn("⚠️ No user → redirecting to login");
      const redirectUrl = encodeURIComponent(window.location.pathname);
      window.location.href = `login.html?redirect=${redirectUrl}`;
      return;
    }

    console.log("👤 Authenticated UID:", user.uid);

    try {
      const userDocRef = doc(db, "users", user.uid);
      const userDoc = await getDoc(userDocRef);

      if (!userDoc.exists()) {
        console.warn("⚠️ User doc not found. Logging out.");
        await signOut(auth);
        window.location.href = "login.html";
        return;
      }

      const role = userDoc.data().role || "unknown";
      const path = window.location.pathname;
      const currentPage = path.split("/").pop();

      console.log("🔎 Role:", role, " | Current page:", currentPage);

      // Restricted pages
      const restrictedPages = [
        "doc-dashboard.html",
        "analytics.html",
        "prescription.html",
        "staff-managment.html"
      ];

      if (role.toLowerCase() === "staff" && restrictedPages.includes(currentPage)) {
        console.warn("🚫 Staff not allowed on:", currentPage, " → redirecting");
        window.location.href = "index.html";
        return;
      }

      console.log("✅ Access granted for role:", role, "on", currentPage);

    } catch (err) {
      console.error("🔥 Error fetching user role:", err);
      window.location.href = "login.html";
    }
  });
}

export { authGuard };
