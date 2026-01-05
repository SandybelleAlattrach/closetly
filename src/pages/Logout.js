import { useEffect } from "react";

function Logout() {
  useEffect(() => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");

    // إعادة تحميل الموقع (هي اللي بتحل كل شي)
    window.location.href = "/login";
  }, []);

  return (
    <div style={{ textAlign: "center", marginTop: "100px" }}>
      <h2>Logging out...</h2>
    </div>
  );
}

export default Logout;
