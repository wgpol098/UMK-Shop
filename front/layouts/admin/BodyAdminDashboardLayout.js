export default function AdminDashboard(props) {
  return (
    <div
      style={{
        width: "100%",
        display: "flex",
        alignItems: "center",
        flexDirection: "column",
      }}
    >
      <div className="login-title">Witaj w panelu admina</div>
      <div
        className="login-title"
        style={{ borderBottom: "none", fontSize: "28px", margin: "10px 0" }}
      >
        Zarządzaj:
      </div>

      <a href="/admin/products" className="admin-dashboard-list-el">
        Produktami
      </a>
      <a href="/admin/users" className="admin-dashboard-list-el">
        Użytkownikami
      </a>
      <a href="/admin/orders" className="admin-dashboard-list-el">
        Zamówieniami
      </a>
    </div>
  );
}
