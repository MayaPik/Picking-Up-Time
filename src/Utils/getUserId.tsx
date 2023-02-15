export async function getUserId(
  username: string | null,
  userType: string | null
): Promise<string | null> {
  try {
    const response = await fetch(
      `https://mayo-final-project.herokuapp.com/api/login/${userType}`,
      {
        method: "POST",
        body: JSON.stringify({
          username: username,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const data = await response.json();
    if (data[`${userType}id`]) {
      return data[`${userType}id`];
    } else {
      console.log("No matching user found in database");
      return null;
    }
  } catch (err) {
    console.log("Error getting user ID from database:", err);
    return null;
  }
}
