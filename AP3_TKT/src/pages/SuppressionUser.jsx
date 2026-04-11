import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import API_URL from '../api_url';
import "./GestionUser.css";

function SuppressionUser() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    let isMounted = true;
    setLoading(true);
    fetch(`${API_URL}/api/users/affichage/${id}`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    })
      .then(async (res) => {
        if (!res.ok) throw new Error("Erreur chargement utilisateur");
        const data = await res.json();
        const firstUser = Array.isArray(data) ? data[0] : data;
        if (isMounted) {
          setUser(firstUser || null);
        }
      })
      .catch((err) => {
        if (isMounted) setError(err?.message || "Utilisateur introuvable");
      })
      .finally(() => {
        if (isMounted) setLoading(false);
      });

    return () => {
      isMounted = false;
    };
  }, [id]);

  const handleCancel = () => {
    navigate("/gestion_users/");
  };

  const handleConfirm = async () => {
    setSubmitting(true);
    setError("");
    try {
      const res = await fetch(`${API_URL}/api/users/supprimer`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      });
      if (!res.ok) throw new Error("Erreur suppression utilisateur");
      navigate("/gestion_users/");
    } catch (err) {
      setError(err?.message || "Erreur suppression utilisateur");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section className="gestion_user">
      <div className="pannel_user">
        <div className="tool">
          <h2>Suppression utilisateur</h2>
          {loading ? (
            <p>Chargement...</p>
          ) : (
            <div className="pannel_user_liste">
              <p>
                Confirmer la suppression de{" "}
                <strong>
                  {user?.prenom_usr || user?.prenom || "Utilisateur"}{" "}
                  {user?.nom_usr || user?.nom || ""}
                </strong>
                ?
              </p>
              <p>Cette action est irréversible.</p>
              {error && <p className="error_message">{error}</p>}
              <div className="btn_admin">
                <button type="button" onClick={handleCancel} disabled={submitting}>
                  Annuler
                </button>
                <button type="button" onClick={handleConfirm} disabled={submitting}>
                  Oui, supprimer
                </button>
              </div>
            </div>
          )}
          {!loading && !user && !error && (
            <p className="error_message">Utilisateur introuvable</p>
          )}
        </div>
      </div>
    </section>
  );
}

export default SuppressionUser;
