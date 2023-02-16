export const getUserId = async (
  username: string | null,
  usertype: string | null
): Promise<number | null> => {
  try {
    const response = await fetch(
      `https://mayo-final-project.herokuapp.com/api/login/${usertype}`,
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
    console.log(response);
    const data = await response.json();
    const userId = await data?.id;
    if (userId) {
      return userId;
    } else {
      console.log(data);
      console.error("No matching user found in database");
      return null;
    }
  } catch (err) {
    console.error("Error getting user ID from database:", err);
    return null;
  }
};
