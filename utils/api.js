export const getOpeningData = async input => {
  try {
    const response = await fetch("/api/generate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ opening: input }),
    });

    const data = await response.json();
    if (response.status !== 200) {
      throw data.error || new Error(`Request failed with status ${response.status}`);
    }

    return data
  } catch(error) {
    // Consider implementing your own error handling logic here
    console.error(error);
    alert(error.message);
    return null
  }
}

export const search = async query => {
  const response = await fetch(`/api/search?q=${query}`);
  const data = await response.json()

  return data
}