const upCaseFirstLetter = (str: string) => {
  return str.charAt(0).toUpperCase() + str.slice(1);
};
export const getFullName = (firstName: string, lastName: string) => {
  return `${upCaseFirstLetter(firstName)} ${upCaseFirstLetter(lastName)}`;
};

/**
 * Get the initials from first name and last name
 * @param firstName The first name
 * @param lastName The last name
 * @returns The initials (maximum 2 characters)
 */
export const getInitials = (firstName?: string, lastName?: string): string => {
  if (!firstName && !lastName) return "?";

  const firstInitial = firstName ? firstName.charAt(0).toUpperCase() : "";
  const lastInitial = lastName ? lastName.charAt(0).toUpperCase() : "";

  return `${firstInitial}${lastInitial}` || firstInitial || "?";
};
