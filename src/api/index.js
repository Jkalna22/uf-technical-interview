export async function fetchAllCrashEventData() {
    try {
      const response = await fetch(`/api/crashEvent`, {
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

  export async function fetchCrashData(reportNumber) {
    try {
      const response = await fetch(`/api/crashEvent/${reportNumber}`, {
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

  export async function fetchVehicleData(reportNumber) {
    try {
      const response = await fetch(`/api/vehicle/${reportNumber}`, {
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

  export async function fetchDriverData(reportNumber) {
    try {
      const response = await fetch(`/api/driver/${reportNumber}`, {
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

  export async function fetchAllDriverData() {
    try {
      const response = await fetch(`/api/driver`, {
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