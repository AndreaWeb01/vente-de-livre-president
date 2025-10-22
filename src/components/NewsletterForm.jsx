import { useState } from "react";

function NewsletterForm() {
  const [email, setEmail] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!email.includes("@")) {
      alert("L'email doit contenir @");
      return;
    }

    alert("Merci, votre email " + email + " a été enregistré :");
    setEmail("");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex w-full max-w-md rounded-md overflow-hidden bg-white "
    >
      {/* Input email */}
      <input
        type="email"
        placeholder="Entrez votre email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="flex-1 px-2  sm:px-3 py-3 text-textColor outline-none border-none rounded-none"
      />

      {/* Bouton submit */}
      <button
        type="submit"
        className="bg-orange-500 hover:bg-orange-600 transition-colors text-white font-semibold px-3  sm:px-3 py-3 "
      >
        Recevoir
      </button>
    </form>
  );
}

export default NewsletterForm;
