// src/CoffeeManager.js
import { useState, useEffect } from "react";

// Access the API key from environment variables
const API_TOKEN = process.env.API_KEY;
const API_BASE_URL = 'https://crudapi.co.uk/api/v1/coffees';

function App() {
  const [coffees, setCoffees] = useState([]);
  const [coffeeName, setCoffeeName] = useState("");
  const [ingredients, setIngredients] = useState("");
  const [editId, setEditId] = useState(null); // ID of the coffee item to edit
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  // Fetch all coffee items when the component mounts
  useEffect(() => {
    fetchCoffees();
  }, []);

  const fetchCoffees = async () => {
    setIsLoading(true);
    setError(null);

    // try {
    //   const response = await fetch(API_BASE_URL, {
    //     method: "GET",
    //     headers: {
    //       "Authorization": `Bearer ${API_TOKEN}`,
    //       "Content-Type": "application/json"
    //     }
    //   });

    //   if (!response.ok) {
    //     throw new Error(`HTTP error! Status: ${response.status}`);
    //   }

    //   const data = await response.json();
    //   setCoffees(data);
    // } catch (error) {
    //   setError(error.message);
    //   console.error("Error fetching coffees:", error);
    // } finally {
    //   setIsLoading(false);
    // }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    const requestData = { name: coffeeName, ingredients };

    try {
      if (editId) {
        // Update an existing coffee item
        const response = await fetch(`${API_BASE_URL}/${editId}`, {
          method: "PUT",
          headers: {
            "Authorization": `Bearer ${API_TOKEN}`,
            "Content-Type": "application/json"
          },
          body: JSON.stringify(requestData)
        });

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        console.log("Coffee updated:", data);
        setEditId(null);
      } else {
        // Create a new coffee item
        const response = await fetch(API_BASE_URL, {
          method: "POST",
          headers: {
            "Authorization": `Bearer ${API_TOKEN}`,
            "Content-Type": "application/json"
          },
          body: JSON.stringify(requestData)
        });

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        console.log("Coffee created:", data);
      }

      // Reset form fields
      setCoffeeName("");
      setIngredients("");
      fetchCoffees(); // Refresh coffee list
    } catch (error) {
      setError(error.message);
      console.error("Error submitting coffee:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <h1>Coffee Manager</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={coffeeName}
          onChange={(e) => setCoffeeName(e.target.value)}
          placeholder="Coffee Name"
          required
        />
        <input
          type="text"
          value={ingredients}
          onChange={(e) => setIngredients(e.target.value)}
          placeholder="Ingredients"
          required
        />
        <button type="submit">
            create
        </button>
      </form>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <ul>
        {coffees.map(coffee => (
          <li key={coffee.id}>
            <strong>{coffee.name}</strong>: {coffee.ingredients}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
