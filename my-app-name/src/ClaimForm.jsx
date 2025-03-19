import { useState } from "react";
import axios from "axios";

const ClaimForm = () => {
    // State variables for form input, API response, and error handling
    const [claim, setClaim] = useState("");
    const [response, setResponse] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    // Function to handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault(); // Prevent page reload on form submission

        if (!claim.trim()) {
            setError("Please enter a claim.");
            return;
        }

        setLoading(true);
        setError("");

        try {
            // Send POST request to the backend
            const res = await axios.post("http://localhost:5000/app/verify-claim", { claim });
            setResponse(res.data.result);
        } catch (err) {
            setError("Error verifying claim. Please try again.");
            console.error(err);
        }

        setLoading(false);
    };

    return (
        <div style={{ maxWidth: "400px", margin: "auto", padding: "20px", textAlign: "center", border: "1px solid #ccc", borderRadius: "8px" }}>
            <h2>Verify a Claim</h2>
            <form onSubmit={handleSubmit}>
                <textarea
                    value={claim}
                    onChange={(e) => setClaim(e.target.value)}
                    placeholder="Enter a claim..."
                    rows={4}
                    style={{ width: "100%", padding: "10px", marginBottom: "10px" }}
                />
                <br />
                <button type="submit" disabled={loading} style={{ padding: "10px 15px", cursor: "pointer" }}>
                    {loading ? "Verifying..." : "Verify Claim"}
                </button>
            </form>

            {error && <p style={{ color: "red" }}>{error}</p>}
            {response && <p><strong>Result:</strong> {response}</p>}
        </div>
    );
};

export default ClaimForm;
