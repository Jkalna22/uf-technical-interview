export async function fetchCrashEventData() {
    try {
      const response = await fetch(`http://localhost:3000/api/crashEvent`, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      return data;
    } catch (error) {
      throw error;
    }
  }